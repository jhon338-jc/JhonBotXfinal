let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    try {
        await conn.groupLeave(m.chat)
    } catch (e) {
        m.reply('❌ Gagal keluar grup!')
    }
}

handler.command = ['leave']
handler.owner = true

export default handler