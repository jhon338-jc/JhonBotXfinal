let handler = async (m, { conn, args }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner && !m.isAdmin) return conn.sendMessage(m.chat, { text: '❌ Khusus Owner/Admin!' })
    
    let who
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]
    } else if (args[0]) {
        who = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    } else {
        return conn.sendMessage(m.chat, { text: '⚠️ Tag user!\nContoh: .addadmin @user' })
    }
    
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'promote')
        conn.sendMessage(m.chat, { text: `✅ Berhasil jadi Admin!` })
    } catch (e) {
        conn.sendMessage(m.chat, { text: '❌ Gagal! Bot harus admin.' })
    }
}

handler.command = ['addadmin', 'promote']
handler.group = true
export default handler
