import fs from 'fs'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const SETTINGS_FILE = './database/settings.json'

function readSettings() {
    if (!fs.existsSync(SETTINGS_FILE)) {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ antiLink: {} }, null, 2))
    }
    return JSON.parse(fs.readFileSync(SETTINGS_FILE))
}

function writeSettings(settings) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

function isAntiLinkOn(settings, groupId) {
    return (settings.antiLink || {})[groupId] === true
}

let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')

    const settings = readSettings()
    const status = isAntiLinkOn(settings, m.chat)

    if (!text) {
        const line = status
            ? '🟢 *Anti-Link AKTIF* di grup ini'
            : '🔴 *Anti-Link NONAKTIF* di grup ini'
        return m.reply(`📊 *Status Anti-Link*\n\n${line}\n\nGunakan:\n• .antilink on → aktifkan\n• .antilink off → matikan`)
    }

    const cmd = String(text).trim().toLowerCase()

    if (cmd === 'on') {
        settings.antiLink = settings.antiLink || {}
        settings.antiLink[m.chat] = true
        writeSettings(settings)
        console.log(rgbTag('ANTILINK', `Anti-Link AKTIF di ${m.chat}`, COLORS.success))
        return m.reply('🟢 *Anti-Link diaktifkan!*\n\nMulai sekarang link akan dihapus di grup ini.\n\n⚠️ Link download (TT/IG/YT/FB/MediaFire) JUGA terhapus. Matikan dengan .antilink off jika perlu download.')
    }

    if (cmd === 'off') {
        settings.antiLink = settings.antiLink || {}
        delete settings.antiLink[m.chat]
        writeSettings(settings)
        console.log(rgbTag('ANTILINK', `Anti-Link NONAKTIF di ${m.chat}`, COLORS.warn))
        return m.reply('🔴 *Anti-Link dimatikan!*\n\nLink tidak lagi dihapus di grup ini. Fitur download bisa dipakai bebas.')
    }

    return m.reply('❌ Perintah tidak dikenal!\n\nGunakan:\n• .antilink on\n• .antilink off\n• .antilink (cek status)')
}

handler.command = ['antilink', 'anti-link', 'al']
handler.owner = true

export default handler