let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ Masukkan nama!\n\nContoh: .fakeff Jhon338')
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/fakeff?name=${encodeURIComponent(text)}`
        await conn.sendMessage(m.chat, { image: { url } }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        m.reply('❌ Gagal membuat Fake FF!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['fakeff']
export default handler