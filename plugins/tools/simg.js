import sharp from 'sharp'
import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { createRequire } from 'module'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const require = createRequire(import.meta.url)
const FFMPEG = process.env.FFMPEG_PATH || (() => {
    try { return require('ffmpeg-static') } catch (e) { return 'ffmpeg' }
})()

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

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let buffer
        let isVideo = false
        let mime = ''

        if (m.quoted) {
            mime = (m.quoted.msg || m.quoted).mimetype || ''
            buffer = await m.quoted.download()
        } else {
            mime = (m.msg || m).mimetype || ''
            buffer = await m.download()
        }

        if (!buffer && m.message?.imageMessage) {
            buffer = await conn.downloadM(m, 'image')
            mime = 'image/jpeg'
        }
        if (!buffer && m.message?.videoMessage) {
            buffer = await conn.downloadM(m, 'video')
            mime = 'video/mp4'
        }

        isVideo = mime.startsWith('video/')

        if (!buffer || !buffer.length) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('Gagal mengunduh media!')
        }

        if (isVideo) {
            let mp4Path = path.join(os.tmpdir(), `tmp_v_${Date.now()}.mp4`)
            let webpPath = path.join(os.tmpdir(), `tmp_v_${Date.now()}.webp`)

            fs.writeFileSync(mp4Path, buffer)

            execFileSync(FFMPEG, ['-i', mp4Path, '-t', '10', '-an', '-vf', 'fps=10,scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2', '-c:v', 'libwebp', '-lossless', '0', '-preset', 'default', '-loop', '0', '-b:v', '350k', '-maxrate', '450k', '-bufsize', '800k', webpPath], { timeout: 90000 })

            let stickerBuffer = fs.readFileSync(webpPath)
            if (stickerBuffer.length > 650000) {
                const webpPath2 = path.join(os.tmpdir(), `tmp_v_${Date.now()}_2.webp`)
                execFileSync(FFMPEG, ['-i', mp4Path, '-t', '10', '-an', '-vf', 'fps=8,scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2', '-c:v', 'libwebp', '-lossless', '0', '-preset', 'default', '-loop', '0', '-b:v', '250k', '-maxrate', '300k', '-bufsize', '600k', webpPath2], { timeout: 90000 })
                stickerBuffer = fs.readFileSync(webpPath2)
                try { fs.unlinkSync(webpPath2) } catch {}
            }
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })

            try { fs.unlinkSync(mp4Path) } catch {}
            try { fs.unlinkSync(webpPath) } catch {}
        } else {
            let stickerBuffer = await webpSticker(buffer)
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (e) {
        console.error(rgbTag('SIMG', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('Gagal membuat stiker!')
    }
}

handler.command = ['simg', 'stikergambar', 'stikervideo', 'svideo']
export default handler