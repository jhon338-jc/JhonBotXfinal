import fs from 'fs'

let handler = async (m, { conn }) => {
    const groups = await conn.groupFetchAllParticipating()
    const groupList = Object.values(groups)

    if (!groupList.length) return m.reply('❌ Bot tidak ada di grup manapun!')

    let text = `┌─────────────────────────────────────┐\n│  📋 *DAFTAR GRUP*\n│\n`
    text += `│  Total Grup: ${groupList.length}\n│\n`
    groupList.forEach((g, i) => {
        text += `│  ${i + 1}. ${g.subject}\n│     👥 ${g.participants?.length || 0} member\n│\n`
    })
    text += `│  💡 Balas dengan nomor grup\n│  Contoh: 2,5\n│  Maksimal 5 grup\n└─────────────────────────────────────┘`

    const monitor = JSON.parse(fs.readFileSync('./database/monitor.json', 'utf-8'))
    monitor.waiting = true
    fs.writeFileSync('./database/monitor.json', JSON.stringify(monitor, null, 2))

    await m.reply(text)
}

handler.command = ['grup', 'daftargrup']
handler.owner = true

export default handler