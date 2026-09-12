import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'
import { createRequire } from 'module'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const require = createRequire(import.meta.url)
const FFMPEG = process.env.FFMPEG_PATH || (() => {
    try { return require('ffmpeg-static') } catch (e) { return 'ffmpeg' }
})()

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        if (!m.quoted) return m.reply('Reply stiker! Contoh: Reply stiker + .toimg')

        let buffer = await m.quoted.download()
        if (!buffer) return m.reply('Gagal download stiker!')

        // Cek animated
        let isAnimated = false
        try {
            let header = buffer.slice(0, 200).toString('latin1')
            if (header.includes('ANIM') || header.includes('ANMF')) isAnimated = true
        } catch (e) {}

        if (isAnimated) {
            let webpPath = path.join(os.tmpdir(), `stick_${Date.now()}.webp`)
            fs.writeFileSync(webpPath, buffer)

            // Animated webp → frame pertama jadi PNG pakai ffmpeg
            let pngPath = path.join(os.tmpdir(), `img_${Date.now()}.png`)
            try {
                execFileSync(FFMPEG, ['-v', 'error', '-i', webpPath, '-frames:v', '1', pngPath], { timeout: 60000 })
                let imgBuffer = fs.readFileSync(pngPath)
                await conn.sendMessage(m.chat, { image: imgBuffer }, { quoted: m })
                try { fs.unlinkSync(pngPath) } catch {}
            } catch (e) {
                await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                m.reply('Stiker GIF hanya bisa di-convert frame pertama.')
            }
            try { fs.unlinkSync(webpPath) } catch {}
        } else {
            // Static webp → PNG (pakai sharp, tanpa ffmpeg)
            let imgBuffer = await sharp(buffer).png().toBuffer()
            await conn.sendMessage(m.chat, { image: imgBuffer }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (e) {
        console.error(rgbTag('TOIMG', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('Gagal convert stiker!')
    }
}

handler.command = ['toimg', 'tovid', 'stickertoimg']
export default handler