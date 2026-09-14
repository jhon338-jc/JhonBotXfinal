import { loadOwners } from '../../handler.js'

let handler = async (m, { conn }) => {    const owners = [...new Set(loadOwners().filter(Boolean))]
    if (!owners.length) {        return m.reply(' Belum ada owner terdaftar.')
    }

    const rows = []
    for (const o of owners) {
        const rec = conn.contacts?.[o + '@s.whatsapp.net']
        const name = (rec?.name || rec?.notify || '').trim()
        const pair = name ? `${name}|${o}` : o
        if (rows.some(r => r.pair === pair)) continue
        rows.push({ pair, o, name })
    }

    let text = '> *DAFTAR OWNER*\n> _Khusus  Owner bot_\n\n'
    text += `***Total:*** ${rows.length}\n\n`
    rows.forEach((r, i) => {
        text += `${i + 1}. ${r.name ? `*${r.name}*` : '_Member_'}  \`${r.o}\`\n`
    })
    text += '\n_Ketik_ \`.ownadd <nomor>\` _untuk menambah owner._'

    await m.reply(text)}

handler.command = ['ownlist', 'daftarowner']
handler.owner = true

export default handler