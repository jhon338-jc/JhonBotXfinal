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
    text += `▧ Dev : ${config.ownerName}\n`
    text += `▧ Mode : ${config.botMode.toUpperCase()}\n`
    text += `▧ Plugin : ${totalPlugin}\n`
    text += `▧ RAM : ${ram} GB\n`
    text += `▧ Uptime : ${days}h ${hours}m ${minutes}s\n`
    
    conn.sendMessage(m.chat, { text })
}
handler.command = ['info', 'botinfo']
export default handler
