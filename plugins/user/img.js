import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { createRequire } from 'module'
import { rgbTag, COLORS } from '../../lib/rgb.js'
import { makeSticker, makeWatermarkPng, videoStickerArgs } from '../../lib/sticker.js'
import { saveSticker } from '../../lib/autosave.js'

const require = createRequire(import.meta.url)
const FFMPEG = process.env.FFMPEG_PATH || (() => {
    try { return require('ffmpeg-static') } catch (e) { return 'ffmpeg' }
})()

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })

    try {
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
            return m.reply('⚠️ Reply gambar/video atau kirim langsung dengan caption **.img**')
        }

        if (isVideo) {
            const mp4Path = path.join(os.tmpdir(), `tmp_v_${Date.now()}.mp4`)
            const webpPath = path.join(os.tmpdir(), `tmp_v_${Date.now()}.webp`)
            const wmPath = path.join(os.tmpdir(), `tmp_v_${Date.now()}_wm.png`)

            fs.writeFileSync(mp4Path, buffer)
            fs.writeFileSync(wmPath, await makeWatermarkPng())
            execFileSync(FFMPEG, videoStickerArgs(mp4Path, wmPath, webpPath), { timeout: 90000 })

            let stickerBuffer = fs.readFileSync(webpPath)
            if (stickerBuffer.length > 650000) {
                const webpPath2 = path.join(os.tmpdir(), `tmp_v_${Date.now()}_2.webp`)
                execFileSync(FFMPEG, videoStickerArgs(mp4Path, wmPath, webpPath2, 512, { fps: 8, bitrate: '250k', maxrate: '300k', bufsize: '600k' }), { timeout: 90000 })
                stickerBuffer = fs.readFileSync(webpPath2)
                try { fs.unlinkSync(webpPath2) } catch {}
            }

            await saveSticker(stickerBuffer)
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
            try { fs.unlinkSync(mp4Path) } catch {}
            try { fs.unlinkSync(webpPath) } catch {}
            try { fs.unlinkSync(wmPath) } catch {}
        } else {
            const stickerBuffer = await makeSticker(buffer)
            await saveSticker(stickerBuffer)
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('IMG', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['img', 'stikergambar']
export default handler