let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL YouTube! Contoh: .mp3 url')

    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        let url = 'https://api.azbry.com/api/download/ytmp3?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result && json.result.download) {
            await conn.sendMessage(m.chat, { audio: { url: json.result.download }, mimetype: 'audio/mp3' }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        } else {
            m.reply('Gagal Download!')
        }
    } catch (e) {
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['mp3', 'ytmp3', 'ytaudio']
export default handler
