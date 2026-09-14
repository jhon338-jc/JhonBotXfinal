import fs from 'fs'
import { log, COLORS } from '../../lib/rgb.js'
import { randomImage } from '../../lib/pap.js'
import { saveImage } from '../../lib/autosave.js'
import { sendMediaFlow, mediaCacheGet, mediaCacheSet, mediaButtons } from '../../lib/flow.js'

let handler = async (m, { conn, args, command }) => {
    if (args?.[0] === 'ulang') {
        const last = mediaCacheGet(m.chat, command)
        if (!last) return m.reply(' Tidak ada media sebelumnya. Silakan pilih * Acak Baru*.')
        await sendMediaFlow(conn, m.chat, { ...last, buttons: mediaButtons(command), quoted: m })
        return
    }

    try {
        const found = randomImage('pap')
        if (!found) {
        }
        const buffer = fs.readFileSync(found.file)
        await saveImage(buffer)
        const data = {
            media: buffer,
            mimetype: 'image/jpeg',
            caption: '',
            footer: ' Tap tombol: kirim ulang atau acak baru'
        }
        mediaCacheSet(m.chat, command, data)
        await sendMediaFlow(conn, m.chat, { ...data, buttons: mediaButtons(command), quoted: m })
    } catch (e) {
        console.error(log('PAP', e?.message || e, COLORS.error))
    }
}

handler.command = ['pap']
handler.premium = true
handler.tags = ['premium']
export default handler