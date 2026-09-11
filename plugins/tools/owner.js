import config from '../../config.json' with { type: 'json' }

let handler = async (m, { conn }) => {
    let text = `👑 *OWNER BOT*\n\n`
    text += `▧ Developer : ${config.developer || 'Jhon338'}\n`
    text += `▧ Version : ${config.version || '3.4.0'}\n`
    text += `▧ Nama : ${config.ownerName}\n`
    text += `▧ Nomor : ${config.creator[0]}\n`
    text += `▧ Bot : ${config.botName}\n\n`
    text += `━─━─━─━─━─━─━─━\n`
    text += `📌 *SOSMED & KONTAK:*\n`
    text += `▧ GitHub : ${config.githubRepo || '-'}\n`
    text += `▧ Linktree : ${config.channelLink || '-'}\n\n`
    text += `─━─━─━─━─━─━─━─\n`
    text += `DEVELOPER BY ${(config.developer || 'JHON338').toUpperCase()} v${config.version || '3.4.0'}`
    
    conn.sendMessage(m.chat, { text })
}
handler.command = ['owner', 'dev']
export default handler