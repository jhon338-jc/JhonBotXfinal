let handler = async (m, { conn, text }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        const meta = await conn.groupMetadata(m.chat)
        const members = (meta.participants || []).map(v => v.id)
        await conn.sendMessage(m.chat, {
            text: '\u200e' + (text || ' '),
            mentions: members
        })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal! Pastikan bot masih ada di grup.')
    }
}

handler.command = ['htg', 'hidetag']
handler.owner = true

export default handler