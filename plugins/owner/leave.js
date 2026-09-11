let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')

    try {
        await conn.groupLeave(m.chat)
    } catch (e) {
        m.reply('❌ Gagal keluar grup!')
    }
}

handler.command = ['leave']
handler.owner = true

export default handler
