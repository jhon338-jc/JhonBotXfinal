import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadBotConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function singleSelect(title, sections) {
    return { name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections }) }
}

function quickReply(display_text, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text, id }) }
}

function ctaUrl(display_text, url) {
    return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text, url }) }
}

function callBtn(display_text, phone_number) {
    return { name: 'call', buttonParamsJson: JSON.stringify({ display_text, phone_number }) }
}

function copyCode(display_text, copy_code) {
    return { name: 'copy_code', buttonParamsJson: JSON.stringify({ display_text, copy_code }) }
}

function carouselBtn(messageVersion, buttons) {
    return { messageVersion, buttons }
}

let handler = async (m, { conn }) => {
    const botCfg = loadBotConfig()
    const botName = botCfg.botName || 'JhonBot'
    const botVersion = botName + ' v' + (botCfg.version || '3.3.8')
    const ownerNumber = (botCfg.creator?.[0] || '').replace(/\D/g, '')
    const ownerName = botCfg.ownerName || 'Jhon338'
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'

    await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } })

    // ============ 1) TEKS DENGAN KOMBINASI FORMAT ============
    const intro = '> *PREVIEW UI & BUTTONS BOT*\n' +
        '> _Berikut semua jenis tampilan yang didukung bot_\n\n' +
        '*1. Format Teks:*\n' +
        '- *Tebal* \u00b7 _Miring_ \u00b7 ~Coret~ \u00b7 `mono`\n' +
        '- *Tebal + Miring* \u00b7 *~Tebal + Coret~* \u00b7 _~Miring + Coret~_\n\n' +
        '*2. Tombol (interactive card di bawah):*\n' +
        '- ☰ List Menu (dropdown)\n' +
        '- ⚡ Quick Reply\n' +
        '- 🌐 URL Button\n' +
        '- 📞 Call Button\n' +
        '- 🔑 Copy Code Button\n\n' +
        '*3. UI khusus:* Slide Card (Carousel) \u00b7 VCard Kontak \u00b7 Polling \u00b7 Lokasi'
    await m.reply(intro)

    // ============ 2) INTERACTIVE CARD — 6 JENIS TOMBOL ============
    const sections = [{
        title: 'NAVIGASI',
        highlight_label: 'PILIH',
        rows: [
            { id: '.menu', rowId: '.menu', title: '.menu', description: 'Buka menu utama bot' },
            { id: '.info', rowId: '.info', header: '', title: '.info', description: 'Info lengkap bot' },
            { id: '.profil', rowId: '.profil', header: '', title: '.profil', description: 'Lihat profil kamu' },
            { id: '.poll', rowId: '.poll', header: '', title: '.poll', description: 'Buat polling grup' }
        ]
    }]

    const native = [
        singleSelect('LIST MENU ☰', sections),
        quickReply('⚡ Quick Reply', '.menu'),
        ctaUrl('🌐 URL Button', channelLink),
        callBtn('📞 Call Owner', '+' + ownerNumber),
        copyCode('🔑 Copy Code', 'Kode Bot: ' + botVersion)
    ]

    try {
        const interactiveMsg = {
            interactiveMessage: {
                header: { title: '🤖 *UI BUTTONS*', hasMediaAttachment: false },
                body: { text: '_Setiap tombol ini punya fungsi yang bisa kamu pakai._' },
                footer: { text: botVersion + ' • Powered by Baileys' },
                nativeFlowMessage: { messageVersion: 1, buttons: native }
            }
        }
        const msg = generateWAMessageFromContent(m.chat, interactiveMsg, { userJid: conn.user?.id || m.sender, quoted: m })
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    } catch (e) {
        await m.reply('❌ _Gagal kirim interactive card: ' + (e?.message || e) + '_')
    }

    // ============ 3) SLIDE CARD / CAROUSEL UI ============
    try {
        const carouselCards = [
            {
                header: { title: '🤖 Perintah Bot', hasMediaAttachment: false },
                body: { text: '_Pilih perintah cepat untuk dicoba._' },
                footer: { text: 'Menu' },
                nativeFlowMessage: carouselBtn(1, [
                    quickReply('📖 Menu', '.menu'),
                    quickReply('👤 Profil', '.profil'),
                    quickReply('⚡ Ping', '.ping')
                ])
            },
            {
                header: { title: '🌐 Sosial & Kode', hasMediaAttachment: false },
                body: { text: '_Buka link dan salin kode versi bot._' },
                footer: { text: 'Komunitas' },
                nativeFlowMessage: carouselBtn(1, [
                    ctaUrl('🌐 Linktree', channelLink),
                    copyCode('🔑 Salin Versi', botVersion)
                ])
            },
            {
                header: { title: '📞 Kontak Owner', hasMediaAttachment: false },
                body: { text: '_Butuh bantuan? Hubungi owner langsung._' },
                footer: { text: 'Support' },
                nativeFlowMessage: carouselBtn(1, [
                    callBtn('📞 Call Owner', '+' + ownerNumber),
                    quickReply('🗣 Info', '.info')
                ])
            }
        ]

        const carouselMsg = {
            interactiveMessage: {
                header: { title: '🛒 *SLIDE CARD / CAROUSEL*', hasMediaAttachment: false },
                body: { text: '_Geser kartu untuk melihat yang lain 👉_' },
                footer: { text: botVersion },
                carouselMessage: { cards: carouselCards }
            }
        }
        const msg = generateWAMessageFromContent(m.chat, carouselMsg, { userJid: conn.user?.id || m.sender, quoted: m })
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    } catch (e) {
        await m.reply('❌ _Gagal kirim slide card: ' + (e?.message || e) + '_')
    }

    // ============ 4) VCARD / CONTACT CARD ============
    try {
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + ownerName + '\n' +
            'ORG:' + botName + ';\n' +
            'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' +
            'URL:' + channelLink + '\n' +
            'END:VCARD\n'
        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: ownerName,
                contacts: [{ displayName: ownerName, vcard }]
            }
        })
    } catch (e) {
        await m.reply('❌ _Gagal kirim VCard: ' + (e?.message || e) + '_')
    }

    // ============ 5) POLL UI ============
    try {
        await conn.sendMessage(m.chat, {
            poll: {
                name: 'Apakah tampilan bot ini sudah keren? 🎨',
                values: ['Sudah keren ✨', 'Biasa aja 😐', 'Perlu diperbaiki 😅'],
                selectableCount: 1
            }
        })
    } catch (e) {
        await m.reply('❌ _Gagal kirim poll: ' + (e?.message || e) + '_')
    }

    // ============ 6) LOCATION UI ============
    try {
        await conn.sendMessage(m.chat, {
            location: {
                degreesLatitude: -6.200000,
                degreesLongitude: 106.816666,
                name: 'Jakarta, Indonesia',
                address: 'Lokasi demo bot ' + botVersion
            }
        })
    } catch (e) {
        await m.reply('❌ _Gagal kirim lokasi: ' + (e?.message || e) + '_')
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['ui', 'preview']
handler.owner = true

export default handler