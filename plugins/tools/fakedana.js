let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ Masukkan jumlah!\n\nContoh: .fakedana 20000')
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/fakedana?amount=${encodeURIComponent(text)}`
        await conn.sendMessage(m.chat, { image: { url } }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        m.reply('❌ Gagal membuat Fake Dana!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['fakedana']
export default handler