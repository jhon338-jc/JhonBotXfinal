let handler = async (m, { conn, text }) => {
    let nama = text || m.pushName || 'User'
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/iqc?text=${encodeURIComponent(nama)}`
        await conn.sendMessage(m.chat, { image: { url } }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)
    } catch (e) {
        conn.sendMessage(m.chat, { text: '❌ Gagal cek IQ!' })
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['iqc', 'iq']
export default handler
