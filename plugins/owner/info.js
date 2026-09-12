import { getPluginSummary } from '../../handler.js'

let handler = async (m, { conn }) => {
    const { owner, user } = getPluginSummary()
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const total = [...new Set([...owner, ...user])].length

    let text = `ℹ️ *INFO BOT*\n\n`
    text += `机器人 Nama       : JhonBot\n`
    text += `👑 Developer  : Jhon338\n`
    text += `📦 Plugins    : ${total}\n`
    text += `⚡ Uptime     : ${days}d ${hours}h ${minutes}m\n`
    text += `🔧 Mode       : PUBLIC\n\n`
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    text += `🌐 Linktree : https://jhon338-jc.github.io/Linktree/\n\n`
    text += `*DEVELOPER BY JHON338 • v3.3.8*`

    m.reply(text)
}

handler.command = ['info']
handler.owner = true

export default handler