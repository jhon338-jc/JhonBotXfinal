let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }
    const desc = (text || '').trim()
    if (!desc) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan deskripsi grup!\n\nContoh: .setds Deskripsi Baru')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        await conn.groupUpdateDescription(m.chat, desc.slice(0, 500))
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal ganti deskripsi! Pastikan bot admin.')
    }
}

handler.command = ['setds', 'setdesc']
handler.owner = true
handler.botAdmin = true

export default handler