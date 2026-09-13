import path from 'path';
import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type';
import * as baileys from '@whiskeysockets/baileys';
import { rgbTag, COLORS } from './rgb.js';

let _makeWaSocket = baileys.default;
if (typeof _makeWaSocket !== 'function') {
    _makeWaSocket = baileys.makeWASocket;
}
if (typeof _makeWaSocket !== 'function') {
    _makeWaSocket = baileys.makeSocket;
}
if (typeof _makeWaSocket !== 'function' && baileys.default && typeof baileys.default === 'object') {
    _makeWaSocket = baileys.default.default || baileys.default.makeWASocket || baileys.default.makeSocket;
}
if (typeof _makeWaSocket !== 'function') {
    throw new Error(`makeWASocket not found in Baileys. Available exports: ${Object.keys(baileys).join(', ')}`);
}

const { downloadContentFromMessage, jidDecode, areJidsSameUser } = baileys;

function pickPhone(jids) {
    for (const j of jids) {
        if (!j) continue
        const s = String(j)
        if (/@lid$/i.test(s) || /@hosted\.lid$/i.test(s)) continue
        return j
    }
    return null
}

async function resolveLid(conn, jid, m) {
    try {
        if (m?.isGroup) {
            let meta = conn.chats?.[m.chat]?.metadata || await conn.groupMetadata(m.chat).catch(() => null)
            const p = meta?.participants?.find(u => u.lid === jid)
            if (p) return p.id
        }
        const pn = await conn.signalRepository?.lidMapping?.getPNForLID(jid)
        if (pn) return pn
    } catch {}
    return null
}

export function makeWASocket(connectionOptions, options = {}) {
    // ==================== PATCH OUTGOING (LABEL DITERUSKAN) ====================
    // Baileys memanggil patchMessageBeforeSending utk SEMUA pesan keluar
    // (PM, grup, media, interactive). Di sini kita sematkan isForwarded ke
    // contextInfo setiap konten, sehingga semua pesan bot tampil "Diteruskan".
    const _userPatch = connectionOptions?.patchMessageBeforeSending
    connectionOptions = {
        ...connectionOptions,
        patchMessageBeforeSending: (message, recipientJids) => {
            try {
                stampForwarded(message)
            } catch {}
            if (_userPatch) {
                try {
                    const patched = _userPatch(message, recipientJids)
                    if (patched) message = patched
                } catch {}
            }
            return message
        }
    }

    let conn = _makeWaSocket(connectionOptions);

    conn.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
        } else return jid;
    };

    conn.reply = (jid, text, m, options) => {
        try {
            jid = String(jid || '')
            if (!jid || !jid.includes('@')) {
                console.error(rgbTag('CONN.REPLY', 'Invalid JID: ' + jid, COLORS.error))
                return null
            }
            return conn.sendMessage(jid, { text: String(text) }, { quoted: m, ...options });
        } catch (e) {
            console.error(rgbTag('CONN.REPLY', e?.message || e, COLORS.error))
            return null
        }
    };

    conn.getFile = async (PATH, saveToFile = false) => {
        let res, filename;
        const data = Buffer.isBuffer(PATH)
            ? PATH
            : PATH instanceof ArrayBuffer
                ? Buffer.from(PATH)
                : /^data:.*?\/.*?;base64,/i.test(PATH)
                    ? Buffer.from(PATH.split`,`[1], 'base64')
                    : /^https?:\/\//.test(PATH)
                        ? (res = await fetch(PATH), Buffer.from(await res.arrayBuffer()))
                        : fs.existsSync(PATH)
                            ? (filename = PATH, fs.readFileSync(PATH))
                            : typeof PATH === 'string'
                                ? Buffer.from(PATH)
                                : Buffer.alloc(0);
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');
        const type = await fileTypeFromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
        if (data && saveToFile && !filename) {
            const tmpDir = './temp';
            if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
            filename = path.join(tmpDir, `${Date.now()}.${type.ext}`);
            fs.writeFileSync(filename, data);
        }
        return {
            res,
            filename,
            ...type,
            data,
            deleteFile() {
                return filename && fs.unlinkSync(filename);
            }
        };
    };

    conn.sendFile = async (jid, mediaPath, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await conn.getFile(mediaPath, true);
        let { res, data: file, filename: pathFile } = type;
        if (res && res.status !== 200) {
            try {
                const errJson = JSON.parse(file.toString());
                throw { json: errJson };
            } catch (e) {
                throw e;
            }
        }
        const fileSize = fs.statSync(pathFile).size / 1024 / 1024;
        if (fileSize >= 100) throw new Error('File size is too big!');
        let opt = {};
        if (quoted) opt.quoted = quoted;
        if (!type.mime || type.mime === 'application/octet-stream') options.asDocument = true;
        let mtype = '', mimetype = options.mimetype || type.mime;
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) mtype = 'audio';
        else mtype = 'document';
        if (options.asDocument) mtype = 'document';
        if (mtype === 'sticker') mimetype = 'image/webp';

        let message = {
            ...options,
            caption,
            ptt,
            [mtype]: { url: pathFile },
            mimetype,
            fileName: filename || path.basename(pathFile)
        };
        let m;
        try {
            m = await conn.sendMessage(jid, message, { ...opt, ...options });
        } catch (e) {
            m = null;
        } finally {
            if (!m) m = await conn.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            return m;
        }
    };

conn.downloadM = async (m, type, saveToFile) => {
    let M = m.msg || m;
    let mtype = M.mtype ? M.mtype.replace(/Message/i, '') : type;
    let message = M.message ? M.message[mtype] : M;
    
    // Validasi mediaKey untuk view once
    if (message && !message.mediaKey) {
        throw new Error('Media key kosong - view once sudah expired/dibuka');
    }
    
    let stream = await downloadContentFromMessage(message, mtype);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        if (saveToFile) {
            let ran = Math.floor(Math.random() * 100000);
            let ext = ((message.mimetype || 'application/octet-stream').split('/')[1] || 'bin');
            const tempDir = path.join('./temp');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
            let filename = path.join(tempDir, `${ran}.${ext}`);
            fs.writeFileSync(filename, buffer);
            return filename;
        }
        return buffer;
    };

    conn.resolveLidToJid = conn.resolveLidToJid || (async (lid) => {
        try {
            return (await conn.signalRepository?.lidMapping?.getPNForLID(lid)) || lid
        } catch {
            return lid
        }
    });

    // ==================== LEDGER PESAN BOT (untuk .hapuschat) ====================
    // Map<chatJid, Array<{id, participant, t}>> — kunci pesan yg bot kirim
    // diisi langsung saat relayMessage/sendMessage sukses.
    const botLedger = new Map()
    conn.botLedger = botLedger
    conn.ledgerPush = (chat, entry) => {
        try {
            if (!chat || !entry?.id) return
            const list = botLedger.get(chat) || []
            list.push({ ...entry, t: Date.now() })
            if (list.length > 2000) list.splice(0, list.length - 2000)
            botLedger.set(chat, list)
        } catch {}
    }
    conn.ledgerGet = (chat) => botLedger.get(chat) || []
    conn.ledgerClear = (chat) => { botLedger.delete(chat) }

    const _relayMessage = conn.relayMessage.bind(conn)
    conn.relayMessage = async (jid, message, opts) => {
        const res = await _relayMessage(jid, message, opts)
        try {
            const msgid = opts?.messageId
            conn.ledgerPush(jid, { id: msgid, participant: conn.user?.id })
        } catch {}
        return res
    }

    const _sendMessage = conn.sendMessage.bind(conn)
    conn.sendMessage = async (jid, content, opts) => {
        const res = await _sendMessage(jid, content, opts)
        try {
            const key = res?.key
            if (key) conn.ledgerPush(jid, { id: key.id, participant: key.participant || conn.user?.id })
        } catch {}
        return res
    }

    return conn;
}

// ==================== STAMP LABEL "DITERUSKAN" ====================
// Injeksi isForwarded ke SEMUA tipe konten pesan keluar bot,
// agar WhatsApp menampilkan label "Diteruskan" pada setiap pesan.
const FORWARDABLE_KEYS = [
    'conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage',
    'audioMessage', 'documentMessage', 'documentWithCaptionMessage',
    'stickerMessage', 'contactMessage', 'locationMessage', 'liveLocationMessage',
    'interactiveMessage', 'buttonsMessage', 'listMessage', 'templateMessage',
    'productMessage', 'viewOnceMessage',
    'viewOnceMessageV2', 'viewOnceMessageV2Extension',
    'orderMessage', 'requestPaymentMessage', 'groupInviteMessage',
    'newsletterAdminInviteMessage'
]

export function stampForwarded(message) {
    if (!message || typeof message !== 'object') return message
    for (const key of FORWARDABLE_KEYS) {
        const content = message[key]
        if (!content) continue
        if (typeof content !== 'object') continue
        const ctx = (content.contextInfo && typeof content.contextInfo === 'object')
            ? content.contextInfo
            : {}
        const prev = Number(ctx.forwardingScore) || 0
        content.contextInfo = { ...ctx, isForwarded: true, forwardingScore: prev + 1 }
        // viewOnce membungkus pesan asli — masuk lebih dalam
        if ((key === 'viewOnceMessage' || key === 'viewOnceMessageV2' || key === 'viewOnceMessageV2Extension') && content.message) {
            stampForwarded(content.message)
        }
    }
    return message
}

function extractRealMessage(msg) {
    if (!msg) return null;
    if (msg.ephemeralMessage) return extractRealMessage(msg.ephemeralMessage.message);
    if (msg.viewOnceMessage) return extractRealMessage(msg.viewOnceMessage.message);
    if (msg.viewOnceMessageV2) return extractRealMessage(msg.viewOnceMessageV2.message);
    if (msg.documentWithCaptionMessage) return extractRealMessage(msg.documentWithCaptionMessage.message);
    if (msg.editedMessage) return extractRealMessage(msg.editedMessage.message);
    if (msg.botForwardedMessage) return extractRealMessage(msg.botForwardedMessage.message);
    return msg;
}

export async function smsg(conn, m) {
    if (!m) return m;
    if (m.key) {
        m.id = m.key?.id
        m.isBaileys = !!m.id && m.id.startsWith('BAE5') && m.id.length === 16
        m.fromMe = m.key?.fromMe
        m.chat = conn.decodeJid(pickPhone([m.key?.remoteJidAlt, m.key?.remoteJid]) || m.key?.remoteJid || '')
        m.isGroup = !!m.chat && m.chat.endsWith('@g.us')
        m.sender = conn.decodeJid(pickPhone([
            (m.fromMe && conn.user?.id),
            m.participantAlt,
            m.key?.participantAlt,
            m.participant,
            m.key?.participant
        ]) || m.participant || m.key?.participant || m.chat || '')

        if (m.sender && m.sender.endsWith('@lid')) {
            m.sender = await resolveLid(conn, m.sender, m) || m.sender
        }

        if (m.chat?.endsWith('@lid') && !m.isGroup) {
            m.chat = await resolveLid(conn, m.chat, m) || m.chat
        }
    }

    if (m.isGroup && m.sender) {
        try {
            let meta = conn.chats?.[m.chat]?.metadata
            if (!meta) {
                meta = await conn.groupMetadata(m.chat).catch(() => null)
                if (meta && conn.chats) {
                    conn.chats[m.chat] = { ...(conn.chats[m.chat] || {}), metadata: meta }
                }
            }
            const isAdmin = jid => {
                const p = (meta?.participants || []).find(u => areJidsSameUser(u.id, jid))
                return !!p && (p.admin === 'admin' || p.admin === 'superadmin')
            }
            m.isAdmin = isAdmin(m.sender)
            m.isBotAdmin = isAdmin(conn.decodeJid(conn.user?.id))
        } catch {}
    }

    if (m.message) {
        m.mtype = Object.keys(m.message)[0];
        m.msg = m.message[m.mtype];
        m.messageStubType = m.message.messageStubType;
        m.messageStubParameters = m.message.messageStubParameters;
        if (m.mtype === 'viewOnceMessageV2') {
            m.msg = m.message.viewOnceMessageV2.message;
            m.mtype = Object.keys(m.msg)[0];
            m.msg = m.msg[m.mtype];
        }
        let text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';
        m.text = typeof m.msg === 'string' ? m.msg : text;
        m.download = (saveToFile = false) => conn.downloadM(m, m.mtype.replace(/Message/i, ''), saveToFile);

        let mentioned = [];
        if (m.msg?.contextInfo?.mentionedJid) {
            mentioned = m.msg.contextInfo.mentionedJid;
        } else if (m.message?.[m.mtype]?.contextInfo?.mentionedJid) {
            mentioned = m.message[m.mtype].contextInfo.mentionedJid;
        }
        m.mentionedJid = mentioned.map(jid => conn.decodeJid(jid));

        let quotedRaw = null;
        if (m.msg?.contextInfo?.quotedMessage) {
            quotedRaw = m.msg.contextInfo.quotedMessage;
        } else if (m.msg?.messageContextInfo?.quotedMessage) {
            quotedRaw = m.msg.messageContextInfo.quotedMessage;
        } else if (m.message?.contextInfo?.quotedMessage) {
            quotedRaw = m.message.contextInfo.quotedMessage;
        } else if (m.message?.messageContextInfo?.quotedMessage) {
            quotedRaw = m.message.messageContextInfo.quotedMessage;
        }

        if (!quotedRaw && m.msg?.botForwardedMessage) {
            const botMsg = m.msg.botForwardedMessage.message;
            if (botMsg?.richResponseMessage?.contextInfo?.quotedMessage) {
                quotedRaw = botMsg.richResponseMessage.contextInfo.quotedMessage;
            }
        }

        if (quotedRaw) {
            let realQuoted = extractRealMessage(quotedRaw);
            if (!realQuoted) {
                m.quoted = null;
            } else {
                let type = Object.keys(realQuoted)[0];
                let quotedContent = realQuoted[type];
                if (!quotedContent) {
                    m.quoted = null;
                } else {
                    let quotedObj = {};
                    if (typeof quotedContent === 'string') {
                        quotedObj = { text: quotedContent };
                    } else if (quotedContent && typeof quotedContent === 'object') {
                        quotedObj = { ...quotedContent };
                    } else {
                        quotedObj = { text: '' };
                    }

                    quotedObj.mtype = type;
                    quotedObj.id = m.msg.contextInfo?.stanzaId || m.message?.contextInfo?.stanzaId || null;
                    quotedObj.chat = m.msg.contextInfo?.remoteJid || m.message?.contextInfo?.remoteJid || m.chat;
                    quotedObj.sender = conn.decodeJid(m.msg.contextInfo?.participant || m.message?.contextInfo?.participant);

                    if (quotedObj.sender && quotedObj.sender.endsWith('@lid')) {
                        quotedObj.sender = await resolveLid(conn, quotedObj.sender, m) || quotedObj.sender;
                    }

                    if (quotedObj.chat && quotedObj.chat.endsWith('@lid') && !m.isGroup) {
                        quotedObj.chat = await resolveLid(conn, quotedObj.chat, m) || quotedObj.chat;
                    }

                    quotedObj.fromMe = areJidsSameUser(quotedObj.sender, conn.decodeJid(conn.user?.id));
                    quotedObj.text = quotedObj.text || quotedObj.caption || '';
                    quotedObj.key = { id: quotedObj.id, remoteJid: quotedObj.chat, fromMe: quotedObj.fromMe, participant: quotedObj.sender };
                    quotedObj.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m.quoted, options);
                    quotedObj.download = (saveToFile = false) => conn.downloadM(quotedObj, quotedObj.mtype.replace(/Message/i, ''), saveToFile);

                    m.quoted = quotedObj;
                }
            }
        } else {
            m.quoted = null;
        }
    }
    
    // FUNGSI m.reply YANG SUDAH DIPERBAIKI
    m.reply = (text, chatId, options) => {
        try {
            const targetJid = String(chatId || m.chat || m.key?.remoteJid || '')
            if (!targetJid || !targetJid.includes('@')) {
                console.error(rgbTag('M.REPLY', 'Invalid JID: ' + targetJid, COLORS.error))
                return null
            }
            return conn.reply(targetJid, String(text), m, options)
        } catch (e) {
            console.error(rgbTag('M.REPLY', e?.message || e, COLORS.error))
            return null
        }
    };
    
    return m;
}

export function bind(conn) {
    if (!conn.chats) conn.chats = {};
    if (!conn.contacts) conn.contacts = {};

    function updateNameToDb(contacts) {
        if (!contacts) return;
        try {
            contacts = contacts.contacts || contacts;
            for (const contact of contacts) {
                const id = conn.decodeJid(contact.id);
                if (!id || id === 'status@broadcast') continue;

                let chats = conn.chats[id];
                if (!chats) chats = conn.chats[id] = { ...contact, id };
                conn.chats[id] = {
                    ...chats,
                    ...contact,
                    ...(id.endsWith('@g.us') ?
                        { subject: contact.subject || contact.name || chats.subject || '' } :
                        { name: contact.notify || contact.name || chats.name || chats.notify || '' })
                };

                conn.contacts[id] = {
                    ...conn.contacts[id],
                    ...contact
                };
            }
        } catch (e) {}
    }

    conn.ev.on('contacts.upsert', updateNameToDb);
    conn.ev.on('contacts.update', updateNameToDb);
    conn.ev.on('contacts.set', updateNameToDb);
    conn.ev.on('groups.update', updateNameToDb);

    conn.ev.on('messages.reaction', (reactions) => {
        try {
            for (const reaction of reactions) {
                if (reaction.key?.participant) {
                    const jid = conn.decodeJid(reaction.key.participant);
                    if (jid && !conn.contacts[jid]) {
                        conn.contacts[jid] = { id: jid };
                    }
                }
            }
        } catch (e) {}
    });

    conn.ev.on('chats.set', async ({ chats }) => {
        try {
            for (let { id, name, readOnly } of chats) {
                id = conn.decodeJid(id);
                if (!id || id === 'status@broadcast') continue;
                const isGroup = id.endsWith('@g.us');
                let localChats = conn.chats[id];
                if (!localChats) localChats = conn.chats[id] = { id };
                localChats.isChats = !readOnly;
                if (name) localChats[isGroup ? 'subject' : 'name'] = name;
                if (isGroup) {
                    const metadata = await conn.groupMetadata(id).catch(_ => null);
                    if (name || metadata?.subject) localChats.subject = name || metadata.subject;
                    if (!metadata) continue;
                    localChats.metadata = metadata;
                }
            }
        } catch (e) {}
    });

    conn.ev.on('group-participants.update', async function updateParticipantsToDb({ id, participants, action }) {
        if (!id) return;
        id = conn.decodeJid(id);
        if (id === 'status@broadcast') return;
        if (!(id in conn.chats)) conn.chats[id] = { id };
        let localChats = conn.chats[id];
        localChats.isChats = true;
        const groupMetadata = await conn.groupMetadata(id).catch(_ => null);
        if (!groupMetadata) return;
        localChats.subject = groupMetadata.subject;
        localChats.metadata = groupMetadata;
    });

    if (conn.user) {
        conn.contacts[conn.user.id] = {
            id: conn.user.id,
            name: conn.user.name,
            notify: conn.user.name
        };
    }
}

