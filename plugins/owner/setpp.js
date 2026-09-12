import Jimp from 'jimp'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!mime || !mime.startsWith('image/')) {
        return m.reply('⚠️ Kirim/Reply gambar dengan caption *.setpp*')
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let media = await q.download()
        let image = await Jimp.read(media)
        image.cover(640, 640)
        let buffer = await image.getBufferAsync(Jimp.MIME_JPEG)

        await conn.updateProfilePicture(m.chat, buffer)
        m.reply('✅ Foto profil grup berhasil diganti!')
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        
    } catch (e) {
        console.error(rgbTag('SETPP', e?.message || e, COLORS.error))
        m.reply('❌ Gagal ganti foto profil! Pastikan bot admin.')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['setpp', 'setppgroup']
handler.owner = true
handler.botAdmin = true

export default handler