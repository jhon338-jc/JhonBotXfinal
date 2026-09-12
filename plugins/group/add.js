let handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    let who = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null
    if (!who) return m.reply('⚠️ Masukkan nomor!\n\nContoh: .add 628xxx')
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'add')
        m.reply(`✅ Berhasil tambah @${who.split('@')[0]}`, null, { mentions: [who] })
    } catch (e) {
        m.reply('❌ Gagal tambah user! Pastikan bot admin.')
    }
}

handler.command = ['add']
handler.owner = true
handler.admin = true
handler.botAdmin = true

export default handler