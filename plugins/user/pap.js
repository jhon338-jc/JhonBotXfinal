import fs from 'fs'
import { rgbTag, COLORS } from '../../lib/rgb.js'
import { randomImage } from '../../lib/pap.js'
import { saveImage } from '../../lib/autosave.js'
import { sendMediaFlow, mediaCacheGet, mediaCacheSet, mediaButtons } from '../../lib/flow.js'

let handler = async (m, { conn, args, command }) => {
    if (args?.[0] === 'ulang') {
        const last = mediaCacheGet(m.chat, command)
        if (!last) return m.reply('⚠️ Tidak ada media sebelumnya. Silakan pilih *🎲 Acak Baru*.')
        await conn.sendMessage(m.chat, { react: { text: '🔄', key: m.key } })
        await sendMediaFlow(conn, m.chat, { ...last, buttons: mediaButtons(command), quoted: m })
        return
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        const found = randomImage('pap')
        if (!found) {
            return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
        const buffer = fs.readFileSync(found.file)
        await saveImage(buffer)
        const data = {
            media: buffer,
            mimetype: 'image/jpeg',
            caption: '📌 PAP random • JhonBot v3.3.8',
            footer: '👇 Tap tombol: kirim ulang atau acak baru'
        }
        mediaCacheSet(m.chat, command, data)
        await sendMediaFlow(conn, m.chat, { ...data, buttons: mediaButtons(command), quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('PAP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['pap']
export default handler