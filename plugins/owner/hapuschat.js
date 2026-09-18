import { log, COLORS } from '../../lib/rgb.js'

const sleep = ms => new Promise(r => setTimeout(r, ms))
const BATCH_SIZE = 10

let handler = async (m, { conn }) => {
    const chat = m.chat
    const ledgerGet = conn.ledgerGet

    // DM/self-chat: ledger tersimpan dalam bentuk LID (karena _toSelfLid),
    // sedangkan m.chat bisa berupa PN. Pakai kunci LID kalau chat = nomor bot sendiri.
    let lookupChat = chat
    try {
        const lid = String(conn.user?.lid || '')
        if (lid && String(chat).split(':')[0].split('@')[0] === String(conn.user?.id || '').split(':')[0].split('@')[0]) {
            lookupChat = lid.split(':')[0].endsWith('@lid') ? lid.split(':')[0] : lid.split(':')[0] + '@lid'
        }
    } catch {}

    const ledgerClear = conn.ledgerClear
    const ledgerRestore = conn.ledgerRestore
    const entries = (ledgerGet && ledgerGet(lookupChat)) || []
    const targets = entries.filter(e => e.id)

    if (!targets.length) {
        return m.reply(`> *HAPUS SEMUA PESAN BOT*\n\n_Tidak ada pesan bot tercatat yang bisa dihapus di chat ini._\n\n _Total pesan bot tercatat: ${entries.length}_`)
    }


    let ok = 0
    const gagal = []
    const total = targets.length

    for (let i = 0; i < targets.length; i += BATCH_SIZE) {
        const batch = targets.slice(i, i + BATCH_SIZE)
        const results = await Promise.allSettled(batch.map(async (e) => {
            const base = {
                remoteJid: chat,
                id: e.id,
                fromMe: true
            }
            try {
                await conn.sendMessage(chat, { delete: { ...base, participant: e.participant } })
                return true
            } catch (err) {
                if (e.participant) {
                    try {
                        await conn.sendMessage(chat, { delete: base })
                        return true
                    } catch { /* gagal permanen */ }
                }
                return false
            }
        }))
        for (let j = 0; j < results.length; j++) {
            if (results[j].status === 'fulfilled' && results[j].value) ok++
            else gagal.push(batch[j])
        }
        if (i + BATCH_SIZE < targets.length) await sleep(100)
    }

    conn.ledgerRestore && ledgerRestore(chat, gagal)
    if (!gagal.length) ledgerClear && ledgerClear(chat)

    console.log(log('HAPUSCHAT', `Hapus ${ok}/${total} pesan bot di ${chat}${gagal.length ? ` (${gagal.length} gagal)` : ''}`, ok ? COLORS.success : COLORS.warn))


    const ringkasan = gagal.length
        ? `\n\n _${gagal.length} pesan gagal (biasanya karena sudah lewat batas waktu "hapus untuk semua orang" di WhatsApp). Pesan tadi disimpan, coba lagi beberapa saat!\n\n Hapus ulang dengan:_\n- \`.hapuschat\` _untuk mencoba pesan yang gagal._`
        : ''
    try {
        await m.reply(`> *HAPUS SEMUA PESAN BOT*\n\n Berhasil menghapus *${ok}/${total}* pesan bot di chat ini untuk semua orang.${ringkasan}\n\n_ WhatsApp punya batas waktu "hapus untuk semua orang" â€” pesan yang sudah lewat batas hanya bisa dihapus di sisi bot (tidak untuk semua orang)._`)
    } catch {}
}

handler.command = ['hapuschat', 'delmsg', 'hapuspesan']
handler.ownerOnly = true

export default handler
