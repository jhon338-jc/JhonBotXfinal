import fs from 'fs'
import { normalizeNumber } from '../../handler.js'

let handler = async (m, { args }) => {
    const num = normalizeNumber(args[0])
    if (!num) return m.reply('⚠️ Masukkan nomor!\n\nContoh: .ownadd 628xxx atau .ownadd 08xxx')

    const db = JSON.parse(fs.readFileSync('./database/owner.json', 'utf-8'))
    db.owner ??= []
    if (db.owner.includes(num)) return m.reply('✅ Nomor tersebut sudah menjadi Owner.')

    db.owner.push(num)
    fs.writeFileSync('./database/owner.json', JSON.stringify(db, null, 2))
    m.reply(`✅ Berhasil menambahkan Owner:\n\n${num}`)
}

handler.command = ['ownadd', 'addowner']
handler.owner = true

export default handler