import { normalizeNumber, resolveTier, addPremium, PREMIUM_TIERS, getPremiumEntry, formatPremiumEntry } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args?.[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        return m.reply('⚠️ Format salah!\n\nContoh: .addprem 628xxx premium1\n\n*Paket Premium:*\n• `.addprem 628xxx premium1` (2 hari)\n• `.addprem 628xxx premium2` (1 minggu)\n• `.addprem 628xxx premium3` (30 hari)')
    }

    const tier = resolveTier(args?.[1])
    if (!tier) {
        return m.reply('❌ Tier tidak dikenal. Gunakan: *premium1*, *premium2*, atau *premium3*.\n\n• premium1 = 2 hari\n• premium2 = 1 minggu\n• premium3 = 30 hari')
    }

    const existing = getPremiumEntry(num)
    const before = formatPremiumEntry(existing)
    const entry = addPremium(num, tier, { extend: true })
    const fmt = formatPremiumEntry(entry)
    const T = PREMIUM_TIERS[tier]

    let msg = '> *AKTIVASI PREMIUM*\n\n'
    msg += '━━━━━━━━━━━━━━━━━━\n'
    msg += `📱 Nomor : *+${num}*\n`
    msg += `🎁 Paket : *${T.label}*\n`
    msg += `💳 Harga : *Rp ${T.price.toLocaleString('id-ID')}*\n`
    msg += `⏳ Durasi: *${T.days} hari*\n`
    msg += '━━━━━━━━━━━━━━━━━━\n'

    const dStart = fmt.startDate ? new Date(fmt.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
    const dEnd = fmt.endDate ? new Date(fmt.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Selamanya'
    msg += `🗓️ Aktif sejak : ${dStart}\n`
    msg += `⌛ Berakhir   : ${dEnd}\n`
    if (before?.active && before.endDate) {
        msg += `\n📌 _Durasi dihitung dari langganan pertama (${before.startDate ? new Date(before.startDate).toLocaleDateString('id-ID') : '-'}). Sudah pernah aktif → perpanjangan otomatis._`
    }
    msg += '\n\n_⭐ Nomor ini menjadi *member premium*, bukan owner. Akses premium berakhir otomatis setelah waktu habis selama server nyala._\n_👑 Untuk owner asli (tanpa batas waktu): `.ownadd`._'
    m.reply(msg)
}

handler.command = ['addprem', 'setprem', 'addpremium']
handler.owner = true

export default handler