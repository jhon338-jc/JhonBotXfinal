import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAP_ROOT = path.join(__dirname, '..', 'src', 'image_pap')

const PAP_FOLDERS = {
    paptt: 'pap_susu',
    papmmk: 'pap_memek',
    papbgl: 'pap_bugil'
}

function filesIn(dir) {
    try {
        if (!fs.existsSync(dir)) return []
        return fs.readdirSync(dir).filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    } catch {
        return []
    }
}

// Index berurutan per folder — kirim dari atas, mentok bawah → balik ke atas
const seqIndex = new Map()

function nextImage(folder = '') {
    // Sanitasi folder agar tidak terjadi path traversal (../../etc/passwd)
    const requestedFolder = /^[a-zA-Z0-9_-]+$/.test(folder) ? folder : ''
    let candidates = []
    const requested = requestedFolder && fs.existsSync(path.join(PAP_ROOT, requestedFolder))
    if (requested && filesIn(path.join(PAP_ROOT, requestedFolder)).length) {
        candidates = [requestedFolder]
    } else {
        candidates = [requestedFolder, ...Object.values(PAP_FOLDERS)].filter(Boolean)
    }
    for (const f of candidates) {
        const dir = path.join(PAP_ROOT, f)
        const files = filesIn(dir).sort()
        if (files.length) {
            const key = f
            let i = seqIndex.get(key) || 0
            if (i >= files.length) i = 0
            seqIndex.set(key, i + 1)
            return { file: path.join(dir, files[i]), from: f }
        }
    }
    return null
}

export const randomImage = nextImage