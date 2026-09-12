import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAP_ROOT = path.join(__dirname, '..', '..', 'src', 'IMAGE_PAP')

const PAP_FOLDERS = {
    pap: 'pap',
    paptt: 'pap_susu',
    papmmk: 'pap_memek',
    papbugil: 'pap_bugil'
}

function randomImageFromFolder(folderName) {
    const dir = path.join(PAP_ROOT, folderName)
    if (!fs.existsSync(dir)) return null
    const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f))
    if (files.length === 0) return null
    return path.join(dir, files[Math.floor(Math.random() * files.length)])
}

let handler = async (m, { conn, command }) => {
    const folder = PAP_FOLDERS[command]
    if (!folder) return m.reply('⚠️ Perintah tidak dikenal.')

    try {
        const file = randomImageFromFolder(folder)
        if (!file) {
            return m.reply(`⚠️ Folder ${folder} kosong / belum ada gambarnya.`)
        }
        const buffer = fs.readFileSync(file)
        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: `🍑 PAP Random • ${folder.toUpperCase()}`
        }, { quoted: m })
    } catch (e) {
        console.error(rgbTag('PAP', e?.message || e, COLORS.error))
        m.reply('❌ Gagal mengambil gambar PAP.')
    }
}

handler.command = Object.keys(PAP_FOLDERS)

export default handler