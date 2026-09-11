let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan judul lagu! Contoh: .lirik Hakikat Sebuah Cinta')

    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        let url = 'https://api.azbry.com/api/fun/lirik?q=' + encodeURIComponent(text)
        let res = await fetch(url)
        let json = await res.json()

        if (json.status && json.result) {
            let caption = 'LIRIK LAGU\n\n'
            caption += 'Judul: ' + (json.result.title || '-') + '\n'
            caption += 'Artist: ' + (json.result.artist || '-') + '\n\n'
            caption += json.result.lyrics || 'Lirik tidak ditemukan'
            await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        } else {
            m.reply('Lirik tidak ditemukan!')
        }
    } catch (e) {
        m.reply('Error! Coba lagi.')
    }
}

handler.command = ['lirik', 'lyrics']
export default handler
