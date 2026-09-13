import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { getPluginSummary } from '../../handler.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadBotConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function quickReply(display_text, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text, id }) }
}

function ctaUrl(display_text, url) {
    return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text, url }) }
}

function copyCode(display_text, copy_code) {
    return { name: 'copy_code', buttonParamsJson: JSON.stringify({ display_text, copy_code }) }
}

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    const { owner, user } = getPluginSummary()
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const total = [...new Set([...owner, ...user])].length

    const botCfg = loadBotConfig()
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
    const botVersion = 'JhonBot v' + (botCfg.version || '3.3.8')

    const text = `> *${botVersion}*\n> _Aktif 24/7 Tanpa Henti_\n\n` +
        `- 🤖 *Nama*        : JhonBot\n` +
        `- 👑 *Developer*   : Jhon338\n` +
        `- 📦 *Plugins*     : ${total}\n` +
        `- ⚡ *Uptime*      : ${days}d ${hours}h ${minutes}m\n` +
        `- 🔧 *Mode*        : PUBLIC\n\n` +
        `*DEVELOPER BY JHON338 • POWERED BY BAILEYS*`

    await m.reply(text)

    try {
        const native = [
            quickReply('📖 Menu', '.menu'),
            quickReply('⚡ Ping', '.ping'),
            ctaUrl('🌐 Linktree', channelLink),
            copyCode('🔑 Salin Versi', botVersion)
        ]
        const interactiveMsg = {
            interactiveMessage: {
                header: { title: 'ℹ️ *INFO BOT*', hasMediaAttachment: false },
                body: { text: '_Ketuk tombol di bawah untuk aksi cepat:_' },
                footer: { text: botVersion + ' • Powered by Baileys' },
                nativeFlowMessage: { messageVersion: 1, buttons: native }
            }
        }
        const msg = generateWAMessageFromContent(m.chat, interactiveMsg, { userJid: conn.user?.id || m.sender, quoted: m })
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    } catch (e) {
        console.error(rgbTag('INFO', 'gagal kirim tombol: ' + (e?.message || e), COLORS.warn))
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['info']
handler.owner = true

export default handler