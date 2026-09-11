let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL MediaFire! Contoh: .mediafie url')

    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        let url = 'https://api.azbry.com/api/download/mediafire?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.data && json.data.link) {
            await conn.sendMessage(m.chat, { document: { url: json.data.link }, fileName: json.data.name || 'file' }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        } else {
            m.reply('Gagal Download!')
        }
    } catch (e) {
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['mediafie', 'mediafire']
export default handler
