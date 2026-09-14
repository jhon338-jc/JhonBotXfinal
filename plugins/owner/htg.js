let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {
        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }

    try {
        const meta = await conn.groupMetadata(m.chat)
        const members = (meta.participants || []).map(v => v.id)
        await conn.sendMessage(m.chat, {
            text: '\u200e' + (text || ' '),
            mentions: members
        })
    } catch (e) {
        m.reply(' Gagal! Pastikan bot masih ada di grup.')
    }
}

handler.command = ['htg', 'hidetag']
handler.owner = true

export default handler