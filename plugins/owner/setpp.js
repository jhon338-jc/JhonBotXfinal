import Jimp from 'jimp'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }

    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!mime || !mime.startsWith('image/')) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Reply / kirim gambar dengan caption **.setpp**')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        const media = await q.download()
        const image = await Jimp.read(media)
        image.cover(640, 640)
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
        await conn.updateProfilePicture(m.chat, buffer)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('SETPP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal ganti foto profil! Pastikan bot admin.')
    }
}

handler.command = ['setpp', 'setppgrup']
handler.owner = true
handler.botAdmin = true

export default handler