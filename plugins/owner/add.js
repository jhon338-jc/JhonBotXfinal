import { areJidsSameUser } from '@whiskeysockets/baileys'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }

    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor valid!\n\nContoh: .add 628xxx atau .add 08xxx')
    }

    const who = num + '@s.whatsapp.net'
    if (conn.user?.id && areJidsSameUser(who, conn.decodeJid(conn.user.id))) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Tidak bisa menambahkan bot sendiri!')
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        await conn.groupParticipantsUpdate(m.chat, [who], 'add')
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal menambahkan user! Pastikan bot admin & nomor valid.')
    }
}

handler.command = ['add']
handler.owner = true
handler.botAdmin = true

export default handler