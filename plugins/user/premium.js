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
            itemCount: 0,
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
        // Format pesan otomatis utk wa.me + copy_code
        const copyText = `Halo Admin JhonBot, saya mau langganan *${Tsel.label}* (Rp ${Tsel.price.toLocaleString('id-ID')} / ${Tsel.days} hari).\nNomor saya: +${m.sender?.split('@')[0] || '?'}\n\nIni bukti pembayarannya 👇`
        const waLink = `https://wa.me/${creator}?text=${encodeURIComponent(copyText)}`

        const caption = [
            `> ***ORDER PREMIUM ${Tsel.label}***`,
            '',
            `🗒️ ***RINCIAN PESANAN:***`,
            `- Paket : *${Tsel.label}*`,
            `- Harga : *Rp ${Tsel.price.toLocaleString('id-ID')}*`,
            `- Durasi: *${Tsel.days} hari*`,
            '',
            `💵 ***CARA BAYAR:***`,
            `1. Tekan tombol *👤 Chat Owner* di bawah`,
            `2. Format pesan sudah terisi otomatis`,
            `3. Kirim bukti transfer, lalu owner akan aktivasi premium`,
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

    // ===== Tampilkan daftar paket (menu utama premium) =====
    const list = loadPremiumList()
    const myFmt = formatPremiumEntry(list.find(e => e && e.number === m.sender?.split('@')[0]))
    const rows = tiers.map(t => {
        const tinfo = T[t]
        return `• *${tinfo.label}* — Rp ${tinfo.price.toLocaleString('id-ID')} / ${tinfo.days} hari (_ .premium ${t} _)`
    }).join('\n')

    let hdr = '> ***MENU LANGANGGANAN PREMIUM***\n\n'
    hdr += `👤 *${m.pushName || 'User'}*\n`
    if (m.isOwner) hdr += '👑 _Status: OWNER_\n'
    else if (m.isPremium) {
        const dur = myFmt?.endDate ? Math.max(0, Math.ceil((myFmt.endDate - Date.now()) / 86400000)) : null
        hdr += '⭐ _Status: PREMIUM' + (dur && myFmt?.active ? ` (sisa ~${dur} hari)` : '') + '_\n'
    }
    hdr += '\n'
    hdr += '📦 *PAKET TERSEDIA:*\n'
    hdr += rows + '\n\n'
    hdr += '👆 _Pilih paket di bawah, lalu klik tombol **Chat Owner**_\n'
    hdr += '_Format pesan & bukti transfer otomatis terisi._'

    const native = tiers.map(t => quickReply(T[t].label, '.premium ' + t))
    if (native.length < 6) native.push(quickReply('🖨️ Status Premium', '.premium status'))

    const body = {
        interactiveMessage: {
            header: { hasMediaAttachment: false, title: '👑 JhonBot Premium' },
            body: { text: hdr },
            footer: { text: 'Developer: Jhon338 • JhonBot' },
            nativeFlowMessage: {
                messageVersion: 1,
                buttons: native
            }
        }
    }

    // Sebelum promo, cek status / tampilkan troli menu
    const troli = await fakeTroli(conn, m.chat)
    const msg = generateWAMessageFromContent(m.chat, body, { userJid: conn.user?.id || m.sender, quoted: troli })
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } })
}

handler.command = ['premium', 'langganan']
export default handler