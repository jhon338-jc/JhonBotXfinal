import Jimp from 'jimp'
import { execSync } from 'child_process'
import fs from 'fs'

let handler = async (m, { conn, text }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '⚠️ Masukkan teks!\n\nContoh: .stiker Jhon338' })
    
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let url = `https://api.azbry.com/api/maker/brat?text=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let buffer = Buffer.from(await res.arrayBuffer())
        
        let image = await Jimp.read(buffer)
        image.contain(512, 512)
        image.background(0x00000000)
        
        let pngPath = `/data/data/com.termux/files/home/tmp_s_${Date.now()}.png`
        let webpPath = `/data/data/com.termux/files/home/tmp_s_${Date.now()}.webp`
        
        await image.writeAsync(pngPath)
        execSync(`convert ${pngPath} -define webp:lossless=true ${webpPath}`)
        
        let stickerBuffer = fs.readFileSync(webpPath)
        
        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
        fs.unlinkSync(pngPath)
        fs.unlinkSync(webpPath)
        
        setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)
        
    } catch (e) {
        console.error(e)
        conn.sendMessage(m.chat, { text: '❌ Gagal membuat stiker!' })
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['stiker', 's']

export default handler
