let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!text) return m.reply('⚠️ Masukkan nama grup!\n\nContoh: .setname Nama Grup Baru')
    
    try {
        await conn.groupUpdateSubject(m.chat, text)
        m.reply(`✅ Nama grup diubah menjadi: *${text}*`)
    } catch (e) {
        m.reply('❌ Gagal ganti nama grup! Pastikan bot admin.')
    }
}

handler.command = ['setname']
handler.owner = true
handler.botAdmin = true

export default handler