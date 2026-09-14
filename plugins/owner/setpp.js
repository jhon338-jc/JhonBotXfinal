import Jimp from 'jimp'
import { log, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.isGroup) {
        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }

    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!mime || !mime.startsWith('image/')) {
        return m.reply(' Reply / kirim gambar dengan caption **.setpp**')
    }

    try {
        const media = await q.download()
        if (!media || !media.length) {
            return m.reply(' Gagal mengunduh gambar!')
        }
        const image = await Jimp.read(media)
        image.cover(640, 640)
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
        await conn.updateProfilePicture(m.chat, buffer)
    } catch (e) {
        console.error(log('SETPP', e?.message || e, COLORS.error))
        m.reply(' Gagal ganti foto profil! Pastikan bot admin.')
    }
}

handler.command = ['setpp', 'setppgrup']
handler.owner = true
handler.botAdmin = true

export default handler