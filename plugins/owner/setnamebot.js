import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!text) return m.reply('⚠️ Masukkan nama!\n\nContoh: .setnamebot Nama Baru')

    try {
        await conn.updateProfileName(text)
        m.reply(`✅ Nama bot diubah menjadi: *${text}*`)
    } catch (e) {
        console.error(rgbTag('SETNAME', e?.message || e, COLORS.error))
        m.reply('❌ Gagal update nama!')
    }
}

handler.command = ['setnamebot', 'setbotname']
handler.owner = true

export default handler

