import config from '../../config.json' with { type: 'json' }
import { plugins } from '../../handler.js'
import os from 'os'

let handler = async (m, { conn }) => {
    let totalPlugin = [...new Set(plugins.values())].length
    let runtime = process.uptime()
    let days = Math.floor(runtime / 86400)
    let hours = Math.floor((runtime % 86400) / 3600)
    let minutes = Math.floor((runtime % 3600) / 60)
    let ram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1)
    
    let text = `🤖 *BOT INFO*\n\n`
    text += `▧ Nama : ${config.botName}\n`
    text += `▧ Dev : ${config.developer || config.ownerName}\n`
    text += `▧ Versi : ${config.version || '-'}\n`
    text += `▧ Mode : ${config.botMode.toUpperCase()}\n`
    text += `▧ Plugin : ${totalPlugin}\n`
    text += `▧ RAM : ${ram} GB\n`
    text += `▧ Uptime : ${days}d ${hours}h ${minutes}m\n\n`
    text += `━─━─━─━─━─━─━─━\n`
    text += `📌 *INFO BOT:*\n`
    text += `▧ GitHub : ${config.githubRepo || '-'}\n`
    text += `▧ Linktree : ${config.channelLink || '-'}\n\n`
    text += `─━─━─━─━─━─━─━─\n`
    text += `DEVELOPER BY ${(config.developer || 'JHON338').toUpperCase()} v${config.version || '3.4.0'}`
    
    m.reply(text)
}
handler.command = ['info', 'botinfo']
export default handler