let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan URL Facebook! Contoh: .fb url')

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let url = 'https://api.azbry.com/api/download/facebook?url=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result && json.result.medias && json.result.medias.length > 0) {
            let media = json.result.medias[0]
            if (media.url) {
                await conn.sendMessage(m.chat, { video: { url: media.url }, mimetype: 'video/mp4' }, { quoted: m })
            }
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

handler.command = ['fb', 'facebook', 'fbdl']
export default handler

