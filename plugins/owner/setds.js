let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!text) return m.reply('⚠️ Masukkan deskripsi grup!\n\nContoh: .setds Deskripsi Baru')

    try {
        await conn.groupUpdateDescription(m.chat, text)
        m.reply(`✅ Deskripsi grup berhasil diubah!`)
    } catch (e) {
        m.reply('❌ Gagal ganti deskripsi! Pastikan bot admin.')
    }
}

handler.command = ['setds', 'setdesc']
handler.owner = true
handler.botAdmin = true

export default handler