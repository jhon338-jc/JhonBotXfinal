import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { fileURLToPath } from 'url'
import { invalidateJSONCache } from '../../handler.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLAST_FILE = path.join(__dirname, '..', '..', 'database', 'blast.json')

// ============================================================
//  KIRIMTEKS — kirim pesan (teks + gambar) otomatis ke nomor
//  • .kirimteks <jumlah>  → kirim ke <jumlah> nomor sekaligus
//  • dedupe: nomor yang sudah pernah dapat pesan SAMA di-skip
//  • data di database/blast.json (message, image, numbers, sent)
// ============================================================

function readBlast() {
    try {
        if (fs.existsSync(BLAST_FILE)) {
            const db = JSON.parse(fs.readFileSync(BLAST_FILE, 'utf-8'))
            if (db && typeof db === 'object') return db
        }
    } catch {}
    return { message: '', image: '', numbers: [], sent: {} }
}

function writeBlast(db) {
    try {
        fs.writeFileSync(BLAST_FILE, JSON.stringify(db, null, 2))
        invalidateJSONCache(BLAST_FILE)
    } catch (e) {
        console.error(log('BLAST', 'Simpan gagal: ' + (e?.message || e), COLORS.error))
    }
}

function normalizeNumbers(list) {
    const out = []
    for (const n of list) {
        const digits = String(n).replace(/\D/g, '')
        let num = digits.startsWith('0') ? '62' + digits.slice(1) : digits
        if (num && !out.includes(num)) out.push(num)
    }
    return out
}

let handler = async (m, { conn, args }) => {
    const db = readBlast()

    // Normalisasi & simpan nomor sekali jalan (update otomatis dari file)
    if (Array.isArray(db.numbers)) db.numbers = normalizeNumbers(db.numbers)

    const message = db.message || ''
    if (!message) {
        return m.reply('> *BELUM ADA PESAN*\n\n_Isi dulu field_ `message` _di_ `database/blast.json`\n_\u2014 lalu jalankan `.kirimteks <jumlah>`_')
    }

    let count = parseInt(args[0], 10)
    if (!count || count < 1) count = 10

    const numbers = Array.isArray(db.numbers) ? db.numbers : []
    if (!numbers.length) {
        return m.reply('> *BELUM ADA NOMOR*\n\n_Isi dulu field_ `numbers` _di_ `database/blast.json`\n_\u2014 lalu jalankan `.kirimteks <jumlah>`_')
    }

    const hash = createHash('sha256').update(message).digest('hex').slice(0, 16)
    db.sent = db.sent && typeof db.sent === 'object' ? db.sent : {}

    const findSent = no => Array.isArray(db.sent[no]) && db.sent[no].includes(hash)

    const pending = numbers.filter(no => !findSent(no))
    const alreadySent = numbers.length - pending.length

    if (!pending.length) {
        const totalUnik = Object.keys(db.sent).length
        return m.reply(`> *SEMUA SUDAH DIKIRIM*\n\n_Semua *${numbers.length}* nomor di daftar sudah pernah dapat pesan ini._\n\n_Histori nomor yang sudah dikirim: *${totalUnik}*_\n\n_Pesan baru? Ganti isi_\` message\` _di_ \`database/blast.json\` _lalu jalankan lagi._`)
    }

    const targets = pending.slice(0, count)
    const imagePath = db.image ? path.resolve(__dirname, '..', '..', db.image) : ''
    const hasImage = imagePath && fs.existsSync(imagePath)

    let sent = 0
    let failed = 0
    const failList = []

    for (const no of targets) {
        const jid = no + '@s.whatsapp.net'
        try {
            if (hasImage) {
                await conn.sendMessage(jid, { image: fs.readFileSync(imagePath), caption: message })
            } else {
                await conn.sendMessage(jid, { text: message })
            }
            if (!db.sent[no]) db.sent[no] = []
            db.sent[no].push(hash)
            sent++
            writeBlast(db)
        } catch (e) {
            failed++
            failList.push(no)
            console.error(log('BLAST', 'Gagal ' + no + ' : ' + (e?.message || e), COLORS.error))
        }
    }

    const remaining = pending.length - targets.length
    const totalHist = Object.keys(db.sent).length

    const imageInfo = hasImage
        ? '_Gambar:_ `' + db.image + '`\n'
        : '_Gambar:_ _tidak ada (fallback teks saja)_\n'

    const txt = `> *KIRIM OTOMATIS*\n\n` +
        `_Pesan:_\n${message}\n\n` +
        imageInfo +
        `_Target perintah ini:_ *${targets.length}*\n` +
        `_Berhasil:_ *${sent}*\n` +
        `_Gagal:_ *${failed}*${failList.length ? '\n_No gagal:_ `' + failList.join('`, `') + '`' : ''}\n` +
        `_Di-skip (sudah pernah dapat):_ *${alreadySent}*\n` +
        `_Sisa belum dikirim:_ *${remaining}*\n\n` +
        `_Histori total nomor sudah dikirim:_ *${totalHist}*`

    await m.reply(txt)
}

handler.command = ['kirimteks', 'blast']
handler.ownerOnly = true

export default handler