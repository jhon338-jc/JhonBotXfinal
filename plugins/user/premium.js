import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import sharp from 'sharp'
import { PREMIUM_TIERS, loadPremiumList, formatPremiumEntry } from '../../handler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ============================================================
//  PREMIUM — menu langganan user
//  • pilih paket (native flow quick_reply)
//  • tampilkan format pembayaran preset
//  • tombol Chat Owner (cta_url) + Salin Format (copy_code)
// ============================================================

function quickReply(display_text, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text, id }) }
}

function ctaUrl(display_text, url) {
    return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text, url }) }
}

function copyCode(display_text, copy_code) {
    return { name: 'copy_code', buttonParamsJson: JSON.stringify({ display_text, copy_code }) }
}

function loadCreator() {
    try {
        const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
        return (cfg.creator?.[0] || '6285162040043').replace(/\D/g, '')
    } catch {
        return '6285162040043'
    }
}

async function getCardImage() {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'menu.png')
        if (fs.existsSync(imgPath)) {
            return await sharp(imgPath).resize({ width: 640 }).jpeg({ quality: 75 }).toBuffer()
        }
    } catch {}
    return null
}

async function getTroliThumb(conn) {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'menu.png')
        if (fs.existsSync(imgPath)) {
            return await sharp(imgPath).resize({ width: 180 }).jpeg({ quality: 70 }).toBuffer()
        }
    } catch {}
    try {
        const botJid = conn.decodeJid(conn.user?.id)
        if (botJid) {
            const url = await conn.profilePictureUrl(botJid, 'image')
            if (url) {
                const r = await fetch(url)
                if (r.ok) return Buffer.from(await r.arrayBuffer())
            }
        }
    } catch {}
    return null
}

// Fake troli (orderMessage) — biar pesan premium tampil seperti RSITAS order
async function fakeTroli(conn, jid) {
    const thumb = await getTroliThumb(conn)
    const order = {
        orderMessage: {
            itemCount: 27948,
            status: 1,
            surface: 1,
            orderTitle: 'JhonBot • Premium',
            message: 'Pilih paket langganan di bawah 👇',
            privateAttributes: '',
            ...(thumb ? { thumbnailJpeg: thumb } : {})
        }
    }
    const msg = generateWAMessageFromContent(jid, order, { userJid: conn.user?.id || jid })
    return { key: msg.key, message: msg.message }
}

// Kirim carousel (geser ke samping) + protocolMessage interaktivitas
// supaya UI kartu & tombolnya benar-benar tampil/ter-register di WhatsApp.
async function sendCarousel(conn, jid, cards, { userJid, quoted } = {}) {
    const msg = generateWAMessageFromContent(jid, {
        interactiveMessage: {
            carouselMessage: { cards }
        }
    }, { userJid: userJid || '0@s.whatsapp.net', quoted: quoted || undefined })
    await conn.relayMessage(jid, msg.message, { messageId: msg.key.id })
    await conn.relayMessage(jid, {
        protocolMessage: {
            type: 3,
            interactiveResponseMessage: {
                body: {
                    protocolMessage: {
                        type: 3,
                        interactiveResponseMessage: {
                            interactiveMessage: msg.message.interactiveMessage
                        }
                    }
                }
            }
        }
    }, {})
    return msg.key.id
}

function buildFormat(tierKey) {
    const T = PREMIUM_TIERS[tierKey]
    if (!T) return null
    const now = new Date().toLocaleString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
    return {
        id: `.input ${tierKey}`,
        box: `┌──────────────────────────────┐
│  🛒 *ORDER PREMIUM*
│
│  • Paket: *${T.label}*
│  • Harga: *Rp ${T.price.toLocaleString('id-ID')}*
│  • Durasi: *${T.days} hari*
│
│  📅 ${now}
└──────────────────────────────┘`
    }
}

let handler = async (m, { conn, args, command }) => {
    const input = (args?.[0] || '').toLowerCase()
    const creator = loadCreator()

    // ===== Status premium user =====
    if (input === 'status') {
        const list = loadPremiumList()
        const myFmt = formatPremiumEntry(list.find(e => e && e.number === m.sender?.split('@')[0]))
        let s
        if (m.isOwner) s = '👑 *OWNER* — akses penuh tanpa batas.'
        else if (m.isPremium && myFmt?.active) {
            const dEnd = myFmt.endDate ? new Date(myFmt.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'
            const dur = Math.max(0, Math.ceil((myFmt.endDate - Date.now()) / 86400000))
            s = `⭐ *PREMIUM ${(PREMIUM_TIERS[myFmt.tier]?.label || '')}*\n🗓️ Aktif s/d: ${dEnd}\n⏳ Sisa: ~${dur} hari`
        } else s = '👤 *USER* — belum premium.\n\n_Gunakan `.premium` untuk melihat paket & cara aktivasi._'
        const status = [
            `> ***STATUS AKUN KAMU***`,
            '',
            `- Nama : ${m.pushName || '-'}`,
            `- Nomor: +${m.sender?.split('@')[0] || '?'}`,
            '',
            s,
            '',
            '_Mau upgrade / perpanjang? Pilih paket di menu premium._'
        ].join('\n')
        const body = {
            interactiveMessage: {
                header: { hasMediaAttachment: false, title: '👑 JhonBot Premium' },
                body: { text: status },
                footer: { text: 'Developer: Jhon338 • JhonBot' },
                nativeFlowMessage: {
                    messageVersion: 1,
                    buttons: [
                        quickReply('🛒 Lihat Paket', '.premium'),
                        quickReply('🏠 Menu Utama', '.menu')
                    ]
                }
            }
        }
        const troli = await fakeTroli(conn, m.chat)
        const msg = generateWAMessageFromContent(m.chat, body, { userJid: conn.user?.id || m.sender, quoted: troli })
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        return
    }

    // ===== Pilih tier (dari tombol quick_reply / arg) =====
    const T = PREMIUM_TIERS
    const tiers = Object.keys(T)
    let chosen = tiers.includes(input) ? input : null

    if (chosen) {
        const Tsel = T[chosen]
        // Format pesan otomatis utk wa.me + copy_code.
        // Berisi tier asli (premium1/2/3) supaya owner tinggal copy-paste:
        //   .addprem <nomor> <tier>
        const copyText = [
            'Halo Admin JhonBot, saya mau *langganan premium*.',
            `Paket: *${Tsel.label}* (Rp ${Tsel.price.toLocaleString('id-ID')} / ${Tsel.days} hari)`,
            `Nomor saya: +${m.sender?.split('@')[0] || '?'}`,
            '',
            'Mohon aktifkan premium saya ya, terima kasih 🙏'
        ].join('\n')
        const waLink = `https://wa.me/${creator}?text=${encodeURIComponent(copyText)}`

        const caption = [
            `> ***ORDER PREMIUM ${Tsel.label}***`,
            '',
            `🗒️ ***RINCIAN PESANAN:***`,
            `- Paket : *${Tsel.label}*`,
            `- Harga : *Rp ${Tsel.price.toLocaleString('id-ID')}*`,
            `- Durasi: *${Tsel.days} hari*`,
            `- Tier  : *${chosen}*`,
            '',
            `💵 ***CARA BAYAR & AKTIVASI:***`,
            `1. Tekan tombol *👤 Chat Owner* di bawah`,
            `2. Format pesan sudah terisi otomatis (berisi tier + nomor kamu)`,
            `3. Kirim bukti transfer, lalu owner akan aktivasi dengan:`,
            `   \`.addprem ${m.sender?.split('@')[0] || 'NOMOR'} ${chosen}\``,
            '',
            `⏳ _Durasi dihitung dari langganan pertama._`
        ].join('\n')

        const body = {
            interactiveMessage: {
                header: { hasMediaAttachment: false, title: '🛒 ' + Tsel.label },
                body: { text: caption },
                footer: { text: 'Developer: Jhon338 • JhonBot' },
                nativeFlowMessage: {
                    messageVersion: 1,
                    buttons: [
                        ctaUrl('👤 Chat Owner', waLink),
                        copyCode('📋 Salin Format Pesan', copyText),
                        quickReply('🏠 Menu Utama', '.menu')
                    ]
                }
            }
        }

        const troli = await fakeTroli(conn, m.chat)
        const msg = generateWAMessageFromContent(m.chat, body, { userJid: conn.user?.id || m.sender, quoted: troli })
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        await conn.sendMessage(m.chat, { react: { text: '🛒', key: m.key } })
        return
    }

    // ===== Tampilkan daftar paket (CAROUSEL — geser ke samping) =====
    const list = loadPremiumList()
    const myFmt = formatPremiumEntry(list.find(e => e && e.number === m.sender?.split('@')[0]))

    const keuntungan = '📌 *Fitur premium aktif:*\n• .pap · .paptt · .papmmk\n• .papbgl · .asp · .ccn'
    const deskripsi = {
        premium1: 'Paket *2 hari*\nCocok buat coba-coba dulu 😉',
        premium2: 'Paket *1 minggu*\nBuat yang mau pakai lebih lama 👍',
        premium3: 'Paket *1 bulan*\nPaling irit & hemat maksimal 💯'
    }

    let statLine = '👤 *_Status: Member_*'
    if (m.isOwner) statLine = '👑 *_Status: OWNER_*'
    else if (m.isPremium) {
        const dur = myFmt?.endDate ? Math.max(0, Math.ceil((myFmt.endDate - Date.now()) / 86400000)) : null
        statLine = '⭐ *_Status: Premium' + (dur && myFmt?.active ? ` (sisa ~${dur} hari)_*` : '_*')
    }

    const imgBuff = await getCardImage()
    const cards = await Promise.all(tiers.map(async t => {
        const tinfo = T[t]
        const cardBody = [
            deskripsi[t],
            '',
            `💵 *Rp ${tinfo.price.toLocaleString('id-ID')}* / ${tinfo.days} hari`,
            '',
            keuntungan,
            '',
            '_Klik tombol *PILIH PAKET* di bawah untuk pesan & bayar._'
        ].join('\n')
        let header = { title: '🛒 ' + tinfo.label, hasMediaAttachment: false }
        if (imgBuff) {
            try {
                const media = await prepareWAMessageMedia({ image: imgBuff }, { upload: conn.waUploadToServer })
                header = { title: '🛒 ' + tinfo.label, ...media, hasMediaAttachment: true }
            } catch {}
        }
        return {
            header,
            body: { text: cardBody },
            footer: { text: 'JhonBot Premium • geser 👉 lihat paket lain' },
            nativeFlowMessage: {
                messageVersion: 1,
                buttons: [
                    quickReply('✅ PILIH PAKET', '.premium ' + t),
                    quickReply('🖨️ Status Saya', '.premium status')
                ]
            }
        }
    }))

    let carouselSent = false
    try {
        const troli = await fakeTroli(conn, m.chat)
        await sendCarousel(conn, m.chat, cards, { userJid: conn.user?.id || m.sender, quoted: troli })
        carouselSent = true
    } catch {}

    if (!carouselSent) {
        const rows = tiers.map(t => {
            const tinfo = T[t]
            return `• *${tinfo.label}* — Rp ${tinfo.price.toLocaleString('id-ID')} / ${tinfo.days} hari\n   _Ketik_ \`.premium ${t}\`_ untuk order._`
        }).join('\n\n')
        await conn.sendMessage(m.chat, {
            text: `> ***MENU LANGGANAN PREMIUM***\n\n${statLine}\n\n📦 *PAKET TERSEDIA:*\n${rows}\n\n👆 _Ketik nomor paket untuk memesan._`
        }, { quoted: m })
    }
    await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } })
}

handler.command = ['premium', 'langganan']
export default handler