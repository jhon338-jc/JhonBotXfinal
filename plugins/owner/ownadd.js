import fs from 'fs'
import { DB_FILES, invalidateJSONCache } from '../../handler.js'
import { resolveOwnerInput } from '../../lib/owner-util.js'

const OWNER_FILE = DB_FILES.owner

let handler = async (m, { conn, args }) => {
    const res = await resolveOwnerInput({ conn, m, args })
    if (!res) {
        return m.reply(' Masukkan nomor valid atau *reply* pesan target!\n\nContoh:\n- `.ownadd 628xxx`\n- `.ownadd 08xxx`\n- `.ownadd` + *reply* pesan orangnya')
    }
    const { num, via } = res

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
        return m.reply(' Nomor *+' + num + '* sudah menjadi Owner.')
    }

    db.owner.push(num)
    fs.writeFileSync(OWNER_FILE, JSON.stringify(db, null, 2))
    invalidateJSONCache(OWNER_FILE)
    m.reply(' Nomor *+' + num + '* berhasil ditambahkan sebagai **Owner asli** (permanen, tanpa batas waktu).\n\nDikenali dari: *' + via + '*\nTotal Owner sekarang: ' + db.owner.length + '\n\n_ Untuk member yang langganan, gunakan `.addprem <no> <tier>` — dia menjadi **member premium** dengan masa aktif sesuai paket._')
}

handler.command = ['ownadd', 'addowner']
handler.creatorOnly = true

export default handler