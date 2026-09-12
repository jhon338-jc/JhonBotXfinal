import fs from 'fs'
import { rgbTag, COLORS } from '../../lib/rgb.js'
import { randomImage } from '../../lib/pap.js'
import { saveImage } from '../../lib/autosave.js'

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        const found = randomImage('pap')
        if (!found) {
            return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
        const buffer = fs.readFileSync(found.file)
        await saveImage(buffer)
        await conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('PAP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['pap']
export default handler