let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }
    const desc = (text || '').trim()
    if (!desc) {        return m.reply(' Masukkan deskripsi grup!\n\nContoh: .setds Deskripsi Baru')
    }    try {
        await conn.groupUpdateDescription(m.chat, desc.slice(0, 500))    } catch (e) {        m.reply(' Gagal ganti deskripsi! Pastikan bot admin.')
    }
}

handler.command = ['setds', 'setdesc']
handler.owner = true
handler.botAdmin = true

export default handler