let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL TikTok! Contoh: .tt url')

    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        let url = 'https://api.azbry.com/api/download/tiktokv2?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result && json.result.downloads) {
            let video = json.result.downloads.find(d => d.type === 'hd' || d.type === 'mp4')
            let audio = json.result.downloads.find(d => d.type === 'mp3')

            if (video) await conn.sendMessage(m.chat, { video: { url: video.url }, mimetype: 'video/mp4' }, { quoted: m })
            if (audio) await conn.sendMessage(m.chat, { audio: { url: audio.url }, mimetype: 'audio/mp3' }, { quoted: m })

            await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        } else {
            m.reply('Gagal Download!')
        }
    } catch (e) {
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['tt', 'tiktok', 'ttdl']
export default handler
