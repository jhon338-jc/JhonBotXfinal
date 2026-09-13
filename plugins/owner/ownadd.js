import fs from 'fs'
import { normalizeNumber, DB_FILES, invalidateJSONCache } from '../../handler.js'

const OWNER_FILE = DB_FILES.owner

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Masukkan nomor valid!\n\nContoh: .ownadd 628xxx atau .ownadd 08xxx')
    }

    let db
    try {
        db = JSON.parse(fs.readFileSync(OWNER_FILE, 'utf-8'))
        if (!db || typeof db !== 'object') db = {}
    } catch {
        db = {}
    }
    db.owner ??= []
    if (!Array.isArray(db.owner)) db.owner = []
    if (db.owner.includes(num)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Nomor *+' + num + '* sudah menjadi Owner.')
    }

    db.owner.push(num)
    fs.writeFileSync(OWNER_FILE, JSON.stringify(db, null, 2))
    invalidateJSONCache(OWNER_FILE)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    m.reply('✅ Nomor *+' + num + '* berhasil ditambahkan sebagai Owner.\n\n👑 Total Owner sekarang: ' + db.owner.length)
}

handler.command = ['ownadd', 'addowner']
handler.owner = true

export default handler