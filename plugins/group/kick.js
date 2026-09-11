let handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    let who = m.mentionedJid[0] || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
    if (!who) return m.reply('⚠️ Tag user atau masukkan nomor!\n\nContoh: .kick @user atau .kick 628xxx')
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
        m.reply(`✅ Berhasil kick @${who.split('@')[0]}`, { mentions: [who] })
    } catch (e) {
        m.reply('❌ Gagal kick user! Pastikan bot admin.')
    }
}

handler.command = ['kick']
handler.owner = true
handler.admin = true
handler.botAdmin = true

export default handler