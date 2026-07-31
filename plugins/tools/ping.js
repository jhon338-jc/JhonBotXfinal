let handler = async (m, { conn }) => {
    let start = Date.now()
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    let ping = Date.now() - start
    conn.sendMessage(m.chat, { text: `🏓 *Pong!*\n\n📶 ${ping} ms` })
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handler.command = ['ping']
export default handler
