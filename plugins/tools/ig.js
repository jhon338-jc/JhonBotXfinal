import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL Instagram!\n\nContoh: .ig https://www.instagram.com/reel/xxx')

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let url = 'https://api.azbry.com/api/download/instagramv2?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.links && json.links.length > 0) {
            for (const link of json.links) {
                if (link.type === 'video') {
                    await conn.sendMessage(m.chat, {
                        video: { url: link.url },
                        mimetype: 'video/mp4'
                    }, { quoted: m })
                } else if (link.type === 'image') {
                    await conn.sendMessage(m.chat, {
                        image: { url: link.url }
                    }, { quoted: m })
                }
            }

            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } else {
            m.reply('Gagal Download! URL tidak valid.')
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
    } catch (e) {
        console.error(rgbTag('IGDL', e?.message || e, COLORS.error))
        m.reply('Error! Coba lagi.')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['ig', 'instagram', 'igdl']
export default handler
