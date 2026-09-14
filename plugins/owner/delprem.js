import { normalizeNumber, removePremium, getPremiumEntry } from '../../handler.js'

let handler = async (m, { conn, args }) => {
    const num = normalizeNumber(args?.[0])
    if (!num || !/^\d{8,15}$/.test(num)) {
        return m.reply(' Format salah!\n\nContoh: .delprem 628xxx')
    }
    const entry = getPremiumEntry(num)
    if (!entry) return m.reply(' Nomor *+' + num + '* tidak terdaftar sebagai Premium.')
    removePremium(num)
    m.reply('> ***PREMIUM DIHAPUS***\n\n Premium nomor *+' + num + '* telah dihapus.\n\n_ Akses premium tidak berlaku lagi. Nomor ini kembali menjadi member biasa._')
}

handler.command = ['delprem', 'removepremium']
handler.owner = true
handler.ownerOnly = true

export default handler