import fs from 'fs'
import { rgbTag, COLORS } from '../../lib/rgb.js'
import { randomImage } from '../../lib/pap.js'
import { saveImage } from '../../lib/autosave.js'

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        const found = randomImage('pap_bugil')
        if (!found) {
            return m.reply('⚠️ Folder gambar PAP BGL masih kosong!')
        }
        const buffer = fs.readFileSync(found.file)
        await saveImage(buffer)
        await conn.sendMessage(m.chat, { image: buffer, caption: '🔥 *PAP BGL RANDOM*' }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('PAPBGL', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal mengambil gambar PAP BGL.')
    }
}

handler.command = ['papbgl']
export default handler