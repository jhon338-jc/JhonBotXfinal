import { execSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

        if (!m.quoted) return m.reply('Reply stiker! Contoh: Reply stiker + .toimg')

        let buffer = await m.quoted.download()
        if (!buffer) return m.reply('Gagal download stiker!')

        let webpPath = path.join(os.tmpdir(), `stick_${Date.now()}.webp`)
        fs.writeFileSync(webpPath, buffer)

        // Cek animated
        let isAnimated = false
        try {
            let header = buffer.slice(0, 200).toString('latin1')
            if (header.includes('ANIM') || header.includes('ANMF')) isAnimated = true
        } catch (e) {}

        if (isAnimated) {
            // Animated → kirim ulang sebagai stiker (ga bisa convert)
            await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
            m.reply('Stiker GIF ga bisa di-convert ke video.')
        } else {
            // Static → gambar PNG
            let pngPath = path.join(os.tmpdir(), `img_${Date.now()}.png`)
            execSync(`ffmpeg -v error -i "${webpPath}" -frames:v 1 "${pngPath}"`)
            let imgBuffer = fs.readFileSync(pngPath)
            await conn.sendMessage(m.chat, { image: imgBuffer }, { quoted: m })
            fs.unlinkSync(pngPath)
        }

        fs.unlinkSync(webpPath)
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

    } catch (e) {
        console.error(rgbTag('TOIMG', e?.message || e, COLORS.error))
        m.reply('Gagal convert stiker!')
    }
}

handler.command = ['toimg', 'tovid', 'stickertoimg']
export default handler
