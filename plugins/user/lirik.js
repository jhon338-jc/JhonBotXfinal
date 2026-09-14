let handler = async (m, { conn, text }) => {
    if (!text) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan judul lagu!\n\nContoh: .lirik Hakikat Sebuah Cinta')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })

    try {
        const res = await fetch('https://api.azbry.com/api/fun/lirik?q=' + encodeURIComponent(text))
        const json = await res.json()

        if (json.status && json.result) {
            let caption = '🎼 *LIRIK LAGU*\n\n'
            caption += 'Judul : ' + (json.result.title || '-') + '\n'
            caption += 'Artis : ' + (json.result.artist || '-') + '\n\n'
            caption += json.result.lyrics || 'Lirik tidak ditemukan'
            await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } else {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['lirik', 'lyrics']
export default handler