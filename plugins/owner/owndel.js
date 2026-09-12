import fs from 'fs'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { args }) => {
    const num = normalizeNumber(args[0])
    if (!num) return m.reply('⚠️ Masukkan nomor!\n\nContoh: .owndel 628xxx')

    const db = JSON.parse(fs.readFileSync('./database/owner.json', 'utf-8'))
    db.owner ??= []

    const myNum = normalizeNumber(m.sender.split('@')[0])
    if (num === myNum) return m.reply('❌ Tidak bisa menghapus Owner sendiri!')

    if (!db.owner.includes(num)) return m.reply('❌ Nomor tersebut bukan Owner.')

    db.owner = db.owner.filter(v => v !== num)
    fs.writeFileSync('./database/owner.json', JSON.stringify(db, null, 2))
    m.reply(`✅ Berhasil menghapus Owner:\n\n${num}`)
}

handler.command = ['owndel', 'delowner']
handler.owner = true

export default handler