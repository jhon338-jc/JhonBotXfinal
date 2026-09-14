import { areJidsSameUser } from '@whiskeysockets/baileys'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) {
        return m.reply('> *GROUP ONLY*\n\n_ Fitur ini hanya bisa dipakai di grup._')
    }

    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        return m.reply(' Masukkan nomor valid!\n\nContoh: .add 628xxx atau .add 08xxx')
    }

    const who = num + '@s.whatsapp.net'
    if (conn.user?.id && areJidsSameUser(who, conn.decodeJid(conn.user.id))) {
        return m.reply(' Tidak bisa menambahkan bot sendiri!')
    }

    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'add')
    } catch (e) {
        m.reply(' Gagal menambahkan user! Pastikan bot admin & nomor valid.')
    }
}

handler.command = ['add']
handler.owner = true
handler.botAdmin = true

export default handler