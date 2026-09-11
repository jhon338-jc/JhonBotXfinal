import sharp from 'sharp'
import { rgbTag, COLORS } from '../../lib/rgb.js'

async function webpSticker(buffer) {
    return await sharp(buffer)
        .resize(512, 512, {
            fit: 'contain',
            withoutEnlargement: true,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ lossless: true })
        .toBuffer()
}

let handler = async (m, { conn, text }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '⚠️ Masukkan teks!\n\nContoh: .stiker Jhon338' })
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/brat?text=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let buffer = Buffer.from(await res.arrayBuffer())
        
        let stickerBuffer = await webpSticker(buffer)
        
        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)
        
    } catch (e) {
        console.error(rgbTag('STIKER', e?.message || e, COLORS.error))
        conn.sendMessage(m.chat, { text: '❌ Gagal membuat stiker!' })
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['stiker', 's']

export default handler