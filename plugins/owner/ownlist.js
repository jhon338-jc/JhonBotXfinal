import { loadOwners } from '../../handler.js'

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } })
    const owners = loadOwners()
    if (!owners.length) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Belum ada owner terdaftar.')
    }

    let text = '> ***DAFTAR OWNER***\n> _Khusus 👑 Owner bot_\n\n'
    text += `***Total:*** ${owners.length}\n\n`
    owners.forEach((o, i) => {
        const rec = conn.contacts?.[o + '@s.whatsapp.net']
        const name = rec?.name || rec?.notify || ''
        text += `${i + 1}. ${name ? `***${name}***` : '_Member_'} — \`${o}\`\n`
    })
    text += '\n_Ketik_ \`.ownadd <nomor>\` _untuk menambah owner._'

    await m.reply(text)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['ownlist', 'daftarowner']
handler.owner = true

export default handler