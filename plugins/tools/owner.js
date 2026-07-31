import config from '../../config.json' with { type: 'json' }

let handler = async (m, { conn }) => {
    let text = `👑 *OWNER BOT*\n\n`
    text += `▧ Nama : ${config.ownerName}\n`
    text += `▧ Nomor : ${config.creator[0]}\n`
    text += `▧ Bot : ${config.botName}\n`
    
    conn.sendMessage(m.chat, { text })
}
handler.command = ['owner', 'dev']
export default handler
