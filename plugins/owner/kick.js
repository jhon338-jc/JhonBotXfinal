import { areJidsSameUser } from '@whiskeysockets/baileys'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *GROUP ONLY*\n\n_❌ Fitur ini hanya bisa dipakai di grup._')
    }

    let who = m.mentionedJid?.[0]
    if (!who) {
        const num = normalizeNumber(args[0])
        if (num && /^\d{8,15}$/.test(num)) who = num + '@s.whatsapp.net'
    }
    if (!who) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Tag user atau masukkan nomor!\n\nContoh: .kick @user atau .kick 628xxx')
    }

    if (conn.user?.id && areJidsSameUser(who, conn.decodeJid(conn.user.id))) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Tidak bisa kick bot sendiri!')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal kick user! Pastikan bot admin.')
    }
}

handler.command = ['kick']
handler.owner = true
handler.botAdmin = true

export default handler