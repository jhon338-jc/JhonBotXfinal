import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'
import { createRequire } from 'module'
import { log, COLORS } from '../../lib/rgb.js'
import { saveImage, saveVideo, tmpName } from '../../lib/autosave.js'

const require = createRequire(import.meta.url)
const FFMPEG = process.env.FFMPEG_PATH || (() => {
    try { return require('ffmpeg-static') } catch { return 'ffmpeg' }
})()

let handler = async (m, { conn }) => {
    if (!m.quoted) {        return m.reply(' Reply stiker! Contoh: Reply stiker + .toimg')
    }

    const buffer = await m.quoted.download()
    if (!buffer) {        return m.reply(' Gagal mengunduh stiker!')
    }

    let isAnimated = false
    try {
        const header = buffer.slice(0, 400).toString('latin1')
        if (header.includes('ANIM') || header.includes('ANMF')) isAnimated = true
    } catch {}

    try {
        if (isAnimated) {
            const webpPath = path.join(os.tmpdir(), tmpName('webp', 'stick'))
            const mp4Path = path.join(os.tmpdir(), tmpName('mp4', 'video'))
            let pngPath = null
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
                    mimetype: 'video/mp4'
                }, { quoted: m })
                sent = true
            } catch {}

            // Fallback: frame pertama → PNG
            if (!sent) {
                pngPath = path.join(os.tmpdir(), tmpName('png', 'img'))
                execFileSync(FFMPEG, ['-v', 'error', '-i', webpPath, '-frames:v', '1', pngPath], { timeout: 60000 })
                const imgBuf = fs.readFileSync(pngPath)
                await saveImage(imgBuf)
                await conn.sendMessage(m.chat, { image: imgBuf }, { quoted: m })
            }

            for (const f of [webpPath, mp4Path, pngPath]) {
                if (f) try { fs.unlinkSync(f) } catch {}
            }
        } else {
            const imgBuffer = await sharp(buffer).png().toBuffer()
            await saveImage(imgBuffer)
            await conn.sendMessage(m.chat, { image: imgBuffer }, { quoted: m })
        }    } catch (e) {
        console.error(log('TOIMG', e?.message || e, COLORS.error))    }
}

handler.command = ['toimg']
export default handler