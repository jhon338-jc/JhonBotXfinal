let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        let url = 'https://api.azbry.com/api/news/detik'
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result && json.result.data && json.result.data.headline) {
            let text = 'BERITA DETIK\n\n'
            for (let i = 0; i < 10; i++) {
                text += (i + 1) + '. ' + json.result.data.headline[i].title + '\n'
                text += json.result.data.headline[i].link + '\n\n'
            }
            await conn.sendMessage(m.chat, { text: text }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        } else {
            m.reply('Gagal ambil berita!')
        }
    } catch (e) {
        m.reply('Error!')
    }
}

handler.command = ['detik', 'berita', 'news']
export default handler
