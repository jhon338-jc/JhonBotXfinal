import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { fileTypeFromBuffer } from 'file-type';
import * as baileys from '@whiskeysockets/baileys';
import { log, COLORS } from './rgb.js';
import { stampNewsletter, getTroli } from './shop.js';

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

let _isOwnSendConn
function isOwnSend(jid) {
    try {
        const t = String(jid || '').split(':')[0].split('@')[0]
        const me = String(_isOwnSendConn?.user?.id || '').split(':')[0].split('@')[0]
        return t && me && t === me
    } catch { return false }
}

// ==================== SEND QUEUE: ANTI RATE-LIMIT ====================
// WhatsApp menolak pengiriman yang meledak: error 403 "rate-overlimit"
// muncul saat bot kirim terlalu banyak pesan dalam 1 detik (mis. 5 user
// ketik .menu bersamaan). Antrian ini men-spacing tiap pesan keluar,
// lalu saat terkena rate-overlimit memberi cooldown + retry otomatis,
// sehingga menu/respon tidak "hilang" saat ada burst.
const SEND_MIN_INTERVAL = 700 // ms jeda minimal antar pesan keluar
const RATE_COOLDOWN_MS = 30000 // jeda total setelah kena rate-overlimit
const RATE_MAX_RETRIES = 1

const sleepMs = ms => new Promise(r => setTimeout(r, ms))

function isRateLimitError(e) {
    if (!e) return false
    const msg = String(
        (e.isBoom && e.output?.payload?.data) ||
        e.data?.reason ||
        e.data?.text ||
        e.message ||
        e.data ||
        ''
    )
    return /overlimit|rate.?limit|too many (request|messages)|flood/i.test(msg)
}

let sendChain = Promise.resolve()
let lastSentAt = 0
let coolDownUntil = 0

function enqueueSend(fn) {
    const run = async (attempt = 0) => {
        const wait = Math.max(coolDownUntil - Date.now(), lastSentAt + SEND_MIN_INTERVAL - Date.now(), 0)
        if (wait > 0) await sleepMs(wait)
        try {
            const res = await fn()
            lastSentAt = Date.now()
            return res
        } catch (e) {
            if (isRateLimitError(e)) {
                coolDownUntil = Math.max(coolDownUntil, Date.now() + RATE_COOLDOWN_MS)
                if (attempt < RATE_MAX_RETRIES) return run(attempt + 1)
            }
            throw e
        }
    }
    const p = sendChain.then(() => run(0))
    sendChain = p.catch(() => {})
    return p
}

export function makeWASocket(connectionOptions, options = {}) {
    // ==================== PATCH OUTGOING (LABEL DITERUSKAN) ====================
    // Baileys memanggil patchMessageBeforeSending utk SEMUA pesan keluar
    // (PM, grup, media, interactive). Di sini kita sematkan isForwarded ke
    // contextInfo setiap konten, sehingga semua pesan bot tampil "Diteruskan".
    const _userPatch = connectionOptions?.patchMessageBeforeSending
    const selfNums = selfNumbersOf(connectionOptions)
    connectionOptions = {
        ...connectionOptions,
        patchMessageBeforeSending: (message, recipientJids) => {
            if (!isSelfChatSend(recipientJids, selfNums)) {
                try {
                    stampForwarded(message)
                } catch {}
                try {
                    stampNewsletter(message)
                } catch {}
            }
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
    _isOwnSendConn = conn

    conn.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
        } else return jid;
    };

    conn.reply = async (jid, text, m, options) => {
        try {
            jid = String(jid || '')
            if (!jid || !jid.includes('@')) {
                console.error(log('CONN.REPLY', 'Invalid JID: ' + jid, COLORS.error))
                return null
            }
            options = options || {}
            let quoted
            if (Object.prototype.hasOwnProperty.call(options, 'quoted')) {
                quoted = options.quoted
            } else {
                const troli = await getTroli(conn, jid).catch(() => null)
                quoted = troli || m
            }
            const { quoted: _q, ...rest } = options
            return conn.sendMessage(jid, { text: String(text) }, { ...rest, quoted });
        } catch (e) {
            console.error(log('CONN.REPLY', e?.message || e, COLORS.error))
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
    // Persisten ke database/ledger.json agar tahan restart (bisa hapus pesan
    // dari sesi sebelumnya selama masih dalam jangkauan WhatsApp).
    const LEDGER_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'database', 'ledger.json')
    let saveTimer = null
    const saveLedger = (map) => {
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
            saveTimer = null
            try {
                const obj = {}
                for (const [chat, list] of map) if (list.length) obj[chat] = list.slice(-2000)
                fs.writeFileSync(LEDGER_FILE, JSON.stringify(obj))
            } catch {}
        }, 500)
    }
    const loadLedger = () => {
        try {
            if (fs.existsSync(LEDGER_FILE)) {
                const data = JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf-8'))
                const map = new Map()
                for (const [chat, list] of Object.entries(data || {})) {
                    if (Array.isArray(list) && list.length) map.set(chat, list.slice(-2000))
                }
                return map
            }
        } catch {}
        return new Map()
    }

    const botLedger = loadLedger()
    conn.botLedger = botLedger
    conn.ledgerPush = (chat, entry) => {
        try {
            if (!chat || !entry?.id) return
            const list = botLedger.get(chat) || []
            list.push({ ...entry, t: Date.now() })
            if (list.length > 2000) list.splice(0, list.length - 2000)
            botLedger.set(chat, list)
            saveLedger(botLedger)
        } catch {}
    }
    conn.ledgerGet = (chat) => botLedger.get(chat) || []
    conn.ledgerClear = (chat) => {
        botLedger.delete(chat)
        saveLedger(botLedger)
    }
    conn.ledgerRestore = (chat, entries) => {
        try {
            if (!chat || !Array.isArray(entries)) return
            botLedger.set(chat, entries.slice(0, 2000))
            saveLedger(botLedger)
        } catch {}
    }

    // ==================== SELF-CHAT (NOMOR BOT SENDIRI) ====================
    // Bot ter-pairing di nomor owner. Saat owner DM bot (self-chat), WhatsApp
    // memakai jid PN nomor bot sebagai chat target ("Message Yourself") — ack
    // self-chat selalu tercatat dengan remoteJid PN, BUKAN LID. Redirect ke LID
    // bikin pesan nyangkut/gagal tampil di HP, jadi di sini jid dibiarkan apa
    // adanya. Fork levvleys sudah menangani fan-out ke semua device sendiri
    // melalui pembungkus deviceSentMessage pada meJids.
    const _selfJidNumbers = () => {
        const out = new Set()
        try {
            const me = conn.user?.id
            const lid = conn.user?.lid
            if (me) out.add(String(me).split(':')[0].split('@')[0])
            if (lid) out.add(String(lid).split(':')[0].split('@')[0])
        } catch {}
        return out
    }
    const _toSelfLid = (jid) => {
        // Biarkan jid apa adanya — self-chat WhatsApp memakai jid PN nomor bot.
        return jid
    }

    const _relayMessage = conn.relayMessage.bind(conn)
    conn.relayMessage = async (jid, message, opts) => {
        jid = _toSelfLid(jid)
        const res = await enqueueSend(() => _relayMessage(jid, message, opts))
        try {
            const isProtocol = message && typeof message === 'object' && !!message.protocolMessage
            const msgid = opts?.messageId
            if (msgid && !isProtocol) conn.ledgerPush(jid, { id: msgid, participant: conn.user?.id })
        } catch {}
        return res
    }

    const _sendMessage = conn.sendMessage.bind(conn)
    conn.sendMessage = async (jid, content, opts) => {
        jid = _toSelfLid(jid)
        try {
            // Reaksi: key target harus ikut di-remap ke jid tujuan, agar
            // reaksi nempel saat chat dengan nomor bot sendiri (self-chat).
            if (content && typeof content === 'object' && content.react?.key) {
                content.react.key.remoteJid = jid
            }
        } catch {}
        const t0 = Date.now()
        try {
            const res = await enqueueSend(() => _sendMessage(jid, content, opts))
            try {
                const key = res?.key
                const skipKey = ['delete', 'react', 'pollUpdate'].some(k => content && typeof content === 'object' && k in content)
                if (key && !skipKey) conn.ledgerPush(jid, { id: key.id, participant: key.participant || conn.user?.id })
            } catch {}
            if (process.env.DEBUG_SEND || isOwnSend(jid)) {
                console.log(log('SEND', 'OK jid=' + jid + ' type=' + (content?.react ? 'react' : Object.keys(content || {})[0]) + ' ' + (Date.now() - t0) + 'ms', COLORS.info))
            }
            return res
        } catch (e) {
            if (process.env.DEBUG_SEND || isOwnSend(jid)) {
                console.log(log('SENDERR', 'FAIL jid=' + jid + ' type=' + (content?.react ? 'react' : Object.keys(content || {})[0]) + ' err=' + (e?.message || e), COLORS.error))
            }
            throw e
        }
    }

    conn.debugState = () => ({
        me: conn.user?.id,
        lid: conn.user?.lid,
        chats: Object.keys(conn.chats || {}).slice(0, 20),
        contacts: Object.keys(conn.contacts || {}).length
    })

    return conn;
}

// ==================== STAMP LABEL "DITERUSKAN" ====================
// Injeksi isForwarded ke SEMUA tipe konten pesan keluar bot,
// agar WhatsApp menampilkan label "Diteruskan" pada setiap pesan.
// KECUALI kiriman ke chat nomor bot sendiri (self-chat / Message Yourself):
// WhatsApp menolak pesan berlabel forwarded ke "Message Yourself"
// (error "not-acceptable" / "No sessions"), jadi label di-skip untuk itu.
function selfNumbersOf(connectionOptions) {
    const out = new Set();
    try {
        const me = connectionOptions?.auth?.creds?.me || {};
        if (me.id) out.add(String(me.id).split(':')[0].split('@')[0]);
        if (me.lid) out.add(String(me.lid).split(':')[0].split('@')[0]);
    } catch {}
    return out;
}

function isSelfChatSend(recipientJids, selfNums) {
    if (!Array.isArray(recipientJids) || recipientJids.length === 0) return false;
    return recipientJids.every((jid) => {
        try {
            const user = String(jid).split('@')[0].split(':')[0];
            return selfNums.has(user);
        } catch {
            return false;
        }
    });
}
const FORWARDABLE_KEYS = [
    'conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage',
    'audioMessage', 'documentMessage', 'documentWithCaptionMessage',
    'stickerMessage', 'contactMessage', 'locationMessage', 'liveLocationMessage',
    'buttonsMessage', 'listMessage', 'templateMessage',
    'productMessage', 'viewOnceMessage',
    'viewOnceMessageV2', 'viewOnceMessageV2Extension',
    'orderMessage', 'requestPaymentMessage', 'groupInviteMessage',
    'newsletterAdminInviteMessage'
]

function stampForwarded(message) {
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
                console.error(log('M.REPLY', 'Invalid JID: ' + targetJid, COLORS.error))
                return null
            }
            return conn.reply(targetJid, String(text), m, options)
        } catch (e) {
            console.error(log('M.REPLY', e?.message || e, COLORS.error))
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

