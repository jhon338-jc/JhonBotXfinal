let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!text) return m.reply('⚠️ Masukkan deskripsi grup!\n\nContoh: .setdesc Deskripsi Baru')
    
    try {
        await conn.groupUpdateDescription(m.chat, text)
        m.reply(`✅ Deskripsi grup diubah!`)
    } catch (e) {
        m.reply('❌ Gagal ganti deskripsi! Pastikan bot admin.')
    }
}

handler.command = ['setdesc']
handler.owner = true
handler.botAdmin = true

export default handler