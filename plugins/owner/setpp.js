import Jimp from 'jimp'
import { log, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *GROUP ONLY*\n\n_❌ Fitur ini hanya bisa dipakai di grup._')
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
        if (!media || !media.length) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('❌ Gagal mengunduh gambar!')
        }
        const image = await Jimp.read(media)
        image.cover(640, 640)
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
        await conn.updateProfilePicture(m.chat, buffer)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('SETPP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal ganti foto profil! Pastikan bot admin.')
    }
}

handler.command = ['setpp', 'setppgrup']
handler.owner = true
handler.botAdmin = true

export default handler