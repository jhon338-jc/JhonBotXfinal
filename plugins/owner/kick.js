import { areJidsSameUser } from '@whiskeysockets/baileys'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) {        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }

    let who = m.mentionedJid?.[0]
    if (!who) {
        const num = normalizeNumber(args[0])
        if (num && /^\d{8,15}$/.test(num)) who = num + '@s.whatsapp.net'
    }
    if (!who) {        return m.reply(' Tag user atau masukkan nomor!\n\nContoh: .kick @user atau .kick 628xxx')
    }

    if (conn.user?.id && areJidsSameUser(who, conn.decodeJid(conn.user.id))) {        return m.reply(' Tidak bisa kick bot sendiri!')
    }    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')    } catch (e) {        m.reply(' Gagal kick user! Pastikan bot admin.')
    }
}

handler.command = ['kick']
handler.owner = true
handler.botAdmin = true

export default handler