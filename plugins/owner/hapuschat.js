import { rgbTag, COLORS } from '../../lib/rgb.js'

const sleep = ms => new Promise(r => setTimeout(r, ms))

let handler = async (m, { conn }) => {
    const chat = m.chat
    const entries = (conn.ledgerGet && conn.ledgerGet(chat)) || []
    const now = Date.now()
    const DAY = 24 * 60 * 60 * 1000
    const targets = entries.filter(e => (now - (e.t || 0)) < DAY && e.id)

    if (!targets.length) {
        return m.reply(`> ***HAPUS SEMUA PESAN BOT***\n\n_Tidak ada pesan bot yang bisa dihapus di chat ini (pesan yang bisa dihapus harus < 24 jam untuk semua orang)._\n\n💬 _Total pesan bot tercatat: ${entries.length}_`)
    }

    try { await conn.sendMessage(m.chat, { react: { text: '🗑️', key: m.key } }) } catch {}

    let ok = 0
    let fail = 0

    for (const e of targets) {
        try {
            const deleteContent = {
                remoteJid: chat,
                id: e.id,
                participant: e.participant,
                fromMe: true
            }
            if (!deleteContent.participant) delete deleteContent.participant
            await conn.sendMessage(chat, { delete: deleteContent })
            ok++
        } catch (err) {
            fail++
        }
        await sleep(250)
    }

    conn.ledgerClear && conn.ledgerClear(chat)
    console.log(rgbTag('HAPUSCHAT', `Hapus ${ok} pesan bot di ${chat}`, ok ? COLORS.success : COLORS.warn))

    try { await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }) } catch {}

    const sisa = targets.length - ok
    const ringkasan = sisa > 0
        ? `\n\n⚠️ _${sisa} pesan gagal dihapus (angka feasible dihapus fast / ngga)._ Telusuri ulang beberapa detik lagi!`
        : ''
    try {
        await m.reply(`> ***HAPUS SEMUA PESAN BOT***\n\n✅ Berhasil menghapus *${ok}* pesan bot di chat ini untuk semua orang.${ringkasan}\n\n_🔒 Hanya pesan bot yang dikirim < 24 jam yang bisa dihapus untuk semua orang._`)
    } catch {}
}

handler.command = ['hapuschat', 'delmsg', 'hapuspesan']
handler.owner = true

export default handler