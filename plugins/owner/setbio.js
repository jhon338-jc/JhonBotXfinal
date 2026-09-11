import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    if (!text) return m.reply('⚠️ Masukkan bio!\n\nContoh: .setbio Bio keren')

    try {
        await conn.updateProfileStatus(text)
        m.reply('✅ Bio bot berhasil diubah!')
    } catch (e) {
        console.error(rgbTag('SETBIO', e?.message || e, COLORS.error))
        m.reply('❌ Gagal update bio!')
    }
}

handler.command = ['setbio']
handler.owner = true

export default handler
