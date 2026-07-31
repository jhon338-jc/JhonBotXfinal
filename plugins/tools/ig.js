let handler = async (m, { conn, text }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '⚠️ Masukkan URL Instagram!\n\nContoh: .ig https://www.instagram.com/reel/xxx' })
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/download/instagram?url=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let json = await res.json()
        
        if (json.status) {
            let type = json.type || 'video'
            
            if (json.videos && json.videos.length > 0) {
                for (let i = 0; i < json.videos.length; i++) {
                    await conn.sendMessage(m.chat, { 
                        video: { url: json.videos[i] },
                        caption: i === 0 ? `✅ *Video ${i + 1}/${json.videos.length}*\n📌 ${type.toUpperCase()}` : `📹 Video ${i + 1}/${json.videos.length}`
                    }, { quoted: m })
                }
            }
            
            if (json.images && json.images.length > 0) {
                for (let i = 0; i < json.images.length; i++) {
                    await conn.sendMessage(m.chat, { 
                        image: { url: json.images[i] },
                        caption: i === 0 ? `✅ *Gambar ${i + 1}/${json.images.length}*\n📌 ${type.toUpperCase()}` : `🖼️ Gambar ${i + 1}/${json.images.length}`
                    }, { quoted: m })
                }
            }
            
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

handler.command = ['ig', 'instagram', 'igdl']
export default handler