import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const PAP_ROOT = path.join(__dirname, '..', 'src', 'image_pap')

export const PAP_FOLDERS = {
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

export function randomImage(folder = '') {
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
        const files = filesIn(dir)
        if (files.length) {
            return { file: path.join(dir, files[Math.floor(Math.random() * files.length)]), from: f }
        }
    }
    return null
}