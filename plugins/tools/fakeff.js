let handler = async (m, { conn, text }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '⚠️ Masukkan nama!\n\nContoh: .fakeff Jhon338' })
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/fakeff?name=${encodeURIComponent(text)}`
        await conn.sendMessage(m.chat, { image: { url } }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)
    } catch (e) {
        conn.sendMessage(m.chat, { text: '❌ Gagal membuat Fake FF!' })
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['fakeff']
export default handler
