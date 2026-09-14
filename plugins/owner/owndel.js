import fs from 'fs'
import { normalizeNumber, DB_FILES, invalidateJSONCache } from '../../handler.js'

const OWNER_FILE = DB_FILES.owner

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        return m.reply(' Masukkan nomor valid!\n\nContoh: .owndel 628xxx')
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

    const myNum = normalizeNumber(m.sender.split('@')[0])
    if (num === myNum) {
        return m.reply(' Tidak bisa menghapus Owner sendiri!')
    }

    if (!db.owner.includes(num)) {
        return m.reply(' Nomor *+' + num + '* bukan Owner.')
    }

    db.owner = db.owner.filter(v => v !== num)
    fs.writeFileSync(OWNER_FILE, JSON.stringify(db, null, 2))
    invalidateJSONCache(OWNER_FILE)
    m.reply(' Nomor *+' + num + '* berhasil dihapus dari daftar Owner.\n\n Total Owner sekarang: ' + db.owner.length)
}

handler.command = ['owndel', 'delowner']
handler.owner = true
handler.ownerOnly = true

export default handler