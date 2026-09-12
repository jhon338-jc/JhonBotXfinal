import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL YouTube! Contoh: .yt url')

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let url = 'https://api.azbry.com/api/download/ytmp4?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result && json.result.download) {
            let caption = `🎬 *${json.result.title || 'Video'}\n`
            if (json.result.quality) caption += `📺 Kualitas: ${json.result.quality}\n`
            caption += '✅ Berhasil di download!'
            await conn.sendMessage(m.chat, { video: { url: json.result.download }, mimetype: 'video/mp4', caption }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } else {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            m.reply('Gagal Download!')
        }
    } catch (e) {
        console.error(rgbTag('YTDOWNLOAD', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['yt', 'ytdl', 'youtube', 'ytvideo']
export default handler