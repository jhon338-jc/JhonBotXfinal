let handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner && !m.isAdmin) return m.reply('❌ Khusus Owner/Admin!')
    
    let who
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]
    } else if (args[0]) {
        who = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    } else {
        return m.reply('⚠️ Tag user!\nContoh: .addadmin @user')
    }
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'promote')
        m.reply('✅ Berhasil jadi Admin!')
    } catch (e) {
        m.reply('❌ Gagal! Bot harus admin.')
    }
}

handler.command = ['addadmin', 'promote']
handler.group = true
export default handler