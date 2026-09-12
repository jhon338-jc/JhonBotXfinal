import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'
import { createRequire } from 'module'
import { rgbTag, COLORS } from '../../lib/rgb.js'
import { saveImage, saveVideo } from '../../lib/autosave.js'

const require = createRequire(import.meta.url)
const FFMPEG = process.env.FFMPEG_PATH || (() => {
    try { return require('ffmpeg-static') } catch { return 'ffmpeg' }
})()

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    if (!m.quoted) return m.reply('⚠️ Reply stiker! Contoh: Reply stiker + .toimg')

    const buffer = await m.quoted.download()
    if (!buffer) return m.reply('❌ Gagal mengunduh stiker!')

    let isAnimated = false
    try {
        const header = buffer.slice(0, 400).toString('latin1')
        if (header.includes('ANIM') || header.includes('ANMF')) isAnimated = true
    } catch {}

    try {
        if (isAnimated) {
            const webpPath = path.join(os.tmpdir(), `stick_${Date.now()}.webp`)
            const mp4Path = path.join(os.tmpdir(), `video_${Date.now()}.mp4`)
            fs.writeFileSync(webpPath, buffer)

            let sent = false
            // Coba convert webp animasi → video mp4
            try {
                execFileSync(FFMPEG, [
                    '-v', 'error', '-i', webpPath,
                    '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
                    '-profile:v', 'main', '-movflags', '+faststart',
                    mp4Path
                ], { timeout: 90000 })
                const vidBuf = fs.readFileSync(mp4Path)
                await saveVideo(vidBuf)
                await conn.sendMessage(m.chat, {
                    video: vidBuf,
                    caption: '✅ Stiker video → MP4',
                    mimetype: 'video/mp4'
                }, { quoted: m })
                sent = true
            } catch {}

            // Fallback: frame pertama → PNG
            if (!sent) {
                const pngPath = path.join(os.tmpdir(), `img_${Date.now()}.png`)
                execFileSync(FFMPEG, ['-v', 'error', '-i', webpPath, '-frames:v', '1', pngPath], { timeout: 60000 })
                const imgBuf = fs.readFileSync(pngPath)
                await saveImage(imgBuf)
                await conn.sendMessage(m.chat, { image: imgBuf, caption: '✅ Frame pertama dari stiker animasi' }, { quoted: m })
                try { fs.unlinkSync(pngPath) } catch {}
            }

            try { fs.unlinkSync(webpPath) } catch {}
            try { fs.unlinkSync(mp4Path) } catch {}
        } else {
            const imgBuffer = await sharp(buffer).png().toBuffer()
            await saveImage(imgBuffer)
            await conn.sendMessage(m.chat, { image: imgBuffer, caption: '✅ Stiker → Gambar (PNG)' }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('TOIMG', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal mengonversi stiker!')
    }
}

handler.command = ['toimg']
export default handler