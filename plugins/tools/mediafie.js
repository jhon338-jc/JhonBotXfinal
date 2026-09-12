let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL MediaFire! Contoh: .mediafie url')

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let url = 'https://api.azbry.com/api/download/mediafire?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.data && json.data.link) {
            await conn.sendMessage(m.chat, { document: { url: json.data.link }, fileName: json.data.name || 'file' }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } else {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            m.reply('Gagal Download!')
        }
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['mediafie', 'mediafire']
export default handler
