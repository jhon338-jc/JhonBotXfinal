import Jimp from 'jimp'
import { execSync } from 'child_process'
import fs from 'fs'

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let buffer
        
        if (m.quoted && m.quoted.mtype === 'imageMessage') {
            buffer = await m.quoted.download()
        } else if (m.mtype === 'imageMessage') {
            buffer = await m.download()
        } else {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return conn.sendMessage(m.chat, { text: '⚠️ Kirim/reply gambar!\n\nContoh: Kirim gambar dengan caption *.simg* atau reply gambar dengan *.simg*' })
        }
        
        let image = await Jimp.read(buffer)
        image.contain(512, 512)
        image.background(0x00000000)
        
        let pngPath = `/data/data/com.termux/files/home/tmp_i_${Date.now()}.png`
        let webpPath = `/data/data/com.termux/files/home/tmp_i_${Date.now()}.webp`
        
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

handler.command = ['simg', 'stikergambar']

export default handler
