let handler = async (m, { conn, text }) => {
    if (!m.isOwner) return conn.sendMessage(m.chat, { text: '❌ Khusus Owner!' })
    
    try {
        let meta = await conn.groupMetadata(m.chat)
        let members = meta.participants || []
        let mentions = members.map(v => v.id)
        let teks = '\u200e' + (text || ' ')
        
        // Edit pesan .hidetag jadi tag item asli
        await conn.sendMessage(m.chat, { 
            text: teks, 
            mentions: mentions,
            edit: m.key 
        })
        
    } catch (e) {
        console.error(e)
        conn.sendMessage(m.chat, { text: '❌ Gagal! Pastikan bot admin.' })
    }
}

handler.command = ['hidetag', 'ht']
handler.owner = true

export default handler
