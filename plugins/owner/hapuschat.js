import { log, COLORS } from '../../lib/rgb.js'

const sleep = ms => new Promise(r => setTimeout(r, ms))

let handler = async (m, { conn }) => {
    const chat = m.chat
    const ledgerGet = conn.ledgerGet
    const ledgerClear = conn.ledgerClear
    const ledgerRestore = conn.ledgerRestore
    const entries = (ledgerGet && ledgerGet(chat)) || []
    const targets = entries.filter(e => e.id)

    if (!targets.length) {
        return m.reply(`> *HAPUS SEMUA PESAN BOT*\n\n_Tidak ada pesan bot tercatat yang bisa dihapus di chat ini._\n\n💬 _Total pesan bot tercatat: ${entries.length}_`)
    }

    try { await conn.sendMessage(m.chat, { react: { text: '🗑️', key: m.key } }) } catch {}

    let ok = 0
    const gagal = []

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
            gagal.push(e)
        }
        await sleep(250)
    }

    conn.ledgerRestore && ledgerRestore(chat, gagal)
    if (!gagal.length) ledgerClear && ledgerClear(chat)

    console.log(log('HAPUSCHAT', `Hapus ${ok} pesan bot di ${chat}${gagal.length ? ` (${gagal.length} gagal)` : ''}`, ok ? COLORS.success : COLORS.warn))

    try { await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }) } catch {}

    const ringkasan = gagal.length
        ? `\n\n⚠️ _${gagal.length} pesan gagal (biasanya karena sudah lewat batas waktu "hapus untuk semua orang" di WhatsApp). Pesan tadi disimpan, coba lagi beberapa saat!\n\n📌 Hapus ulang dengan:_\n- \`.hapuschat\` _untuk mencoba pesan yang gagal._`
        : ''
    try {
        await m.reply(`> *HAPUS SEMUA PESAN BOT*\n\n✅ Berhasil menghapus *${ok}* pesan bot di chat ini untuk semua orang.${ringkasan}\n\n_🔒 WhatsApp punya batas waktu "hapus untuk semua orang" — pesan yang sudah lewat batas hanya bisa dihapus di sisi bot (tidak untuk semua orang)._`)
    } catch {}
}

handler.command = ['hapuschat', 'delmsg', 'hapuspesan']
handler.owner = true

export default handler