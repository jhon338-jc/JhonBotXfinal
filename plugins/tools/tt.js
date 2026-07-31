let handler = async (m, { conn, text }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '⚠️ Masukkan URL TikTok!\n\nContoh: .tt https://vt.tiktok.com/xxx' })
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/download/tiktok?url=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let json = await res.json()
        
        if (json.status && json.result) {
            let data = json.result
            let caption = `🎵 *TIKTOK*\n📌 ${data.title || '-'}\n👤 ${data.author || '-'}\n⏱️ ${data.duration || 0}s`
            let videoUrl = data.links?.[0] || data.links?.[1] || data.links?.[2]
            
            if (videoUrl) await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption }, { quoted: m })
            if (data.music?.url) await conn.sendMessage(m.chat, { audio: { url: data.music.url }, mimetype: 'audio/mp4' }, { quoted: m })
            
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
            setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)
        } else {
            conn.sendMessage(m.chat, { text: '❌ Gagal Download! URL tidak valid.' })
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
    } catch (e) {
        console.error(e)
        conn.sendMessage(m.chat, { text: '❌ Error! Coba lagi.' })
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['tt', 'tiktok', 'ttdl']
export default handler