import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    if (!m.isGroup) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Fitur ini khusus grup!')
    }

    const num = normalizeNumber(args[0])
    if (!num) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor!\n\nContoh: .add 628xxx atau .add 08xxx')
    }

    const who = num + '@s.whatsapp.net'
    if (who === conn.user?.id) {
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