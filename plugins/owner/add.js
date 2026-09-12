import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')

    const num = normalizeNumber(args[0])
    if (!num) return m.reply('⚠️ Masukkan nomor!\n\nContoh: .add 628xxx atau .add 08xxx')

    const who = num + '@s.whatsapp.net'
    if (who === conn.user?.id) return m.reply('❌ Tidak bisa menambahkan bot sendiri!')

    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'add')
        m.reply(`✅ Berhasil tambah @${who.split('@')[0]}`, null, { mentions: [who] })
    } catch (e) {
        m.reply('❌ Gagal menambahkan user! Pastikan bot admin & nomor valid.')
    }
}

handler.command = ['add']
handler.owner = true
handler.botAdmin = true

export default handler