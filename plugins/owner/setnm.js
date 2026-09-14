let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {
        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }
    const name = (text || '').trim()
    if (!name) {
        return m.reply(' Masukkan nama grup!\n\nContoh: .setnm Nama Grup Baru')
    }

    try {
        await conn.groupUpdateSubject(m.chat, name.slice(0, 25))
    } catch (e) {
        m.reply(' Gagal ganti nama grup! Pastikan bot admin.')
    }
}

handler.command = ['setnm', 'setname']
handler.owner = true
handler.botAdmin = true

export default handler