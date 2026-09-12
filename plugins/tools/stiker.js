import { rgbTag, COLORS } from '../../lib/rgb.js'
import { makeSticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ Masukkan teks!\n\nContoh: .stiker Jhon338')
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/brat?text=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let buffer = Buffer.from(await res.arrayBuffer())
        
        let stickerBuffer = await makeSticker(buffer)
        
        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('STIKER', e?.message || e, COLORS.error))
        m.reply('❌ Gagal membuat stiker!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['stiker', 's']

export default handler