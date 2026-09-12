let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!text) return m.reply('⚠️ Masukkan nama grup!\n\nContoh: .setnm Nama Grup Baru')

    try {
        await conn.groupUpdateSubject(m.chat, text)
        m.reply(`✅ Nama grup diubah menjadi: *${text}*`)
    } catch (e) {
        m.reply('❌ Gagal ganti nama grup! Pastikan bot admin.')
    }
}

handler.command = ['setnm', 'setname']
handler.owner = true
handler.botAdmin = true

export default handler