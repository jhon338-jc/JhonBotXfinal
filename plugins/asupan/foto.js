// ============================================================
//  PHOTOS — acak foto premium dari folder src/photos
//  • tiap folder (subfolder src/photos) = 1 command (nama tanpa dash)
//  • mode SEMBUYEL INDEX: kirim berurutan dari atas folder,
//    mentok bawah → balik lagi ke atas (urut naik terus)
// ============================================================
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { log, COLORS } from '../../lib/rgb.js'
import { saveImage } from '../../lib/autosave.js'
import { sendMediaFlow, mediaButtons } from '../../lib/flow.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const PHOTOS_ROOT = path.join(__dirname, '..', '..', 'src', 'photos')

// Peta command (nama folder tanpa dash) → nama folder asli di src/photos
export const PHOTO_FOLDERS = {}

function indexFolders() {
    try {
        if (!fs.existsSync(PHOTOS_ROOT)) return
        for (const name of fs.readdirSync(PHOTOS_ROOT)) {
            const dir = path.join(PHOTOS_ROOT, name)
            if (!fs.statSync(dir).isDirectory()) continue
            const cmd = name.replace(/[^a-z0-9]+/gi, '').toLowerCase()
            if (cmd) PHOTO_FOLDERS[cmd] = name
        }
    } catch {}
}
indexFolders()

// Index berurutan per command per chat.
// key = `${chat}|${cmd}` → nilai indeks file berikutnya yang dikirim.
const seqIndex = new Map()

function nextPhoto(chat, cmd) {
    // Sanitasi anti path traversal — hanya pilih dari peta yang didaftarkan
    const folder = PHOTO_FOLDERS[cmd]
    if (!folder) return null
    try {
        const dir = path.join(PHOTOS_ROOT, folder)
        if (!fs.existsSync(dir)) return null
        const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g|webp)$/i.test(f)).sort()
        if (!files.length) return null
        const key = chat + '|' + cmd
        let i = seqIndex.get(key) || 0
        if (i >= files.length) i = 0
        seqIndex.set(key, i + 1)
        return {
            file: path.join(dir, files[i]),
            from: folder
        }
    } catch {
        return null
    }
}

let handler = async (m, { conn, command }) => {
    try {
        const found = nextPhoto(m.chat, command)
        if (!found) return m.reply(' Folder ini belum punya foto.')
        const buffer = fs.readFileSync(found.file)
        await saveImage(buffer)
        const data = {
            media: buffer,
            mimetype: 'image/jpeg',
            caption: '',
            footer: ' Tap tombol: acak lagi (berurutan dari folder)'
        }
        await sendMediaFlow(conn, m.chat, { ...data, buttons: mediaButtons(command), quoted: m })
    } catch (e) {
        console.error(log(command.toUpperCase(), e?.message || e, COLORS.error))
    }
}

handler.command = Object.keys(PHOTO_FOLDERS)

export default handler