import { loadPremiumList, formatPremiumEntry, PREMIUM_TIERS } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const list = loadPremiumList()
    const records = list.map(formatPremiumEntry).filter(Boolean).sort((a, b) => (b.endDate || 0) - (a.endDate || 0))

    const active = records.filter(r => r.active)
    const expired = records.filter(r => !r.active)

    const tierName = t => (PREMIUM_TIERS[t]?.label || t)
    const dash = '──────────────────────────'

    let msg = '> *DAFTAR PREMIUM*\n\n'
    msg += dash + '\n'

    if (!records.length) {
        msg += '_Belum ada user premium._\n\n'
        msg += 'Gunakan `.addprem 628xxx premium2` untuk menambahkan.'
    } else {
        msg += `Total: *${records.length}*  Aktif: *${active.length}*  Habis: *${expired.length}*\n`
        msg += dash + '\n'

        if (active.length) {
            msg += '\n*AKTIF:*\n'
            active.forEach((r, i) => {
                const dEnd = r.endDate ? new Date(r.endDate).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Selamanya'
                const sisa = r.remainingMs ? Math.ceil(r.remainingMs / 86400000) + ' hari' : '-'
                msg += `${i + 1}. +${r.number} • ${tierName(r.tier)} • ±${sisa} • s/d ${dEnd}\n`
            })
        }

        if (expired.length) {
            msg += '\n*EXPIRED:*\n'
            expired.forEach((r, i) => {
                const dEnd = r.endDate ? new Date(r.endDate).toLocaleDateString('id-ID') : 'Tanpa tanggal'
                msg += `${i + 1}. +${r.number} • ${tierName(r.tier)} • habis ${dEnd}\n`
            })
        }
    }

    msg += '\n' + dash + '\n'
    msg += '\n_Paket premium bisa diperpanjang, durasi dihitung dari langganan pertama._'
    m.reply(msg)
}

handler.command = ['premlist', 'listprem', 'listpremium']
handler.ownerOnly = true

export default handler