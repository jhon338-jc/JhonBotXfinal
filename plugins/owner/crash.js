import { normalizeNumber } from '../../handler.js'

const delay = ms => new Promise(r => setTimeout(r, ms))
const MAX_CALLS = 20

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        return m.reply(`*CRASH CALL*\n\n_Penggunaan:_ \`.crash <nomor> [jumlah]\`\n_Contoh:_ \`.crash 6281234567890 5\`\n\n_[jumlah]_ opsional, default 1 panggilan (maks ${MAX_CALLS}).`)
    }

    const target = `${num}@s.whatsapp.net`
    const count = Math.max(1, Math.min(Number.parseInt(args[1]) || 1, MAX_CALLS))

    try {
        for (let i = 1; i <= count; i++) {
            await conn.offerCall(target, false)
            if (i < count) await delay(5000)
        }
        m.reply(`*CRASH CALL*\n\n_Sukses mengirim ${count} panggilan ke *+${num}*._`)
    } catch (e) {
        m.reply(`*CRASH CALL*\n\n_Gagal mengirim panggilan ke +${num}._\n_(${e?.message || e})_`)
    }
}

handler.command = ['crash', 'call']
handler.ownerOnly = true

export default handler