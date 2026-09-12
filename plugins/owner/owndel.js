import fs from 'fs'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor!\n\nContoh: .owndel 628xxx')
    }

    const db = JSON.parse(fs.readFileSync('./database/owner.json', 'utf-8'))
    db.owner ??= []

    const myNum = normalizeNumber(m.sender.split('@')[0])
    if (num === myNum) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Tidak bisa menghapus Owner sendiri!')
    }

    if (!db.owner.includes(num)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Nomor tersebut bukan Owner.')
    }

    db.owner = db.owner.filter(v => v !== num)
    fs.writeFileSync('./database/owner.json', JSON.stringify(db, null, 2))
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['owndel', 'delowner']
handler.owner = true

export default handler