let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }
    if (!text) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nama grup!\n\nContoh: .setnm Nama Grup Baru')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        await conn.groupUpdateSubject(m.chat, text)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal ganti nama grup! Pastikan bot admin.')
    }
}

handler.command = ['setnm', 'setname']
handler.owner = true
handler.botAdmin = true

export default handler