import fs from 'fs'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor valid!\n\nContoh: .ownadd 628xxx atau .ownadd 08xxx')
    }

    let db
    try {
        db = JSON.parse(fs.readFileSync('./database/owner.json', 'utf-8'))
        if (!db || typeof db !== 'object') db = {}
    } catch {
        db = {}
    }
    db.owner ??= []
    if (!Array.isArray(db.owner)) db.owner = []
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