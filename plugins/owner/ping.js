let handler = async (m, { conn }) => {
    const start = Date.now()
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const ping = Date.now() - start
    m.reply(`🏓 *Ping!*\n\n📶 Speed: ${ping}ms`)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['ping']
handler.owner = true

export default handler