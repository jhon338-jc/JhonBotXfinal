import sharp from 'sharp'
import { execSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
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

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })

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

        // Kalau ga ada buffer, coba dari m.message
        if (!buffer && m.message?.imageMessage) {
            buffer = await conn.downloadM(m, 'image')
            mime = 'image/jpeg'
        }
        if (!buffer && m.message?.videoMessage) {
            buffer = await conn.downloadM(m, 'video')
            mime = 'video/mp4'
        }

        if (isVideo) {
            let mp4Path = path.join(os.tmpdir(), `tmp_v_${Date.now()}.mp4`)
            let webpPath = path.join(os.tmpdir(), `tmp_v_${Date.now()}.webp`)
            
            fs.writeFileSync(mp4Path, buffer)
            
            execSync(`ffmpeg -i "${mp4Path}" -vf "fps=15,scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2" -c:v libwebp -lossless 0 -preset default -loop 0 "${webpPath}"`)
            
            let stickerBuffer = fs.readFileSync(webpPath)
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
            
            fs.unlinkSync(mp4Path)
            fs.unlinkSync(webpPath)
        } else {
            let stickerBuffer = await webpSticker(buffer)
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: 'OK', key: m.key } })
        setTimeout(async () => { await conn.sendMessage(m.chat, { delete: m.key }) }, 1000)

    } catch (e) {
        console.error(rgbTag('SIMG', e?.message || e, COLORS.error))
        m.reply('Gagal membuat stiker!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['simg', 'stikergambar', 'stikervideo', 'svideo']
export default handler