import fs from 'fs'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor!\n\nContoh: .ownadd 628xxx atau .ownadd 08xxx')
    }

    const db = JSON.parse(fs.readFileSync('./database/owner.json', 'utf-8'))
    db.owner ??= []
    if (db.owner.includes(num)) {
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return
    }

    db.owner.push(num)
    fs.writeFileSync('./database/owner.json', JSON.stringify(db, null, 2))
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['ownadd', 'addowner']
handler.owner = true

export default handler