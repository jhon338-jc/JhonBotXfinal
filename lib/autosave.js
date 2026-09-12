import fs from 'fs'
import path from 'path'
import { fileTypeFromBuffer } from 'file-type'

const ROOT = path.resolve('temp')

export function ensureTemp() {
    for (const sub of ['image', 'video', 'sticker']) {
        const dir = path.join(ROOT, sub)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    }
}

export async function saveMedia(buffer, dir = '') {
    try {
        if (!Buffer.isBuffer(buffer) || !buffer.length) return null
        let type = null
        try { type = await fileTypeFromBuffer(buffer) } catch {}
        if (!dir) {
            const mime = type?.mime || ''
            if (mime.startsWith('video/')) dir = 'video'
            else if (mime.startsWith('image/')) dir = 'image'
            else dir = 'sticker'
        }
        ensureTemp()
        const ext = type?.ext || path.extname(String(buffer.length)) || 'bin'
        const name = `${Date.now()}_${Math.floor(Math.random() * 100000)}.${ext}`
        const file = path.join(ROOT, dir, name)
        fs.writeFileSync(file, buffer)
        return file
    } catch {
        return null
    }
}

export const saveImage = buffer => saveMedia(buffer, 'image')
export const saveVideo = buffer => saveMedia(buffer, 'video')
export const saveSticker = buffer => saveMedia(buffer, 'sticker')