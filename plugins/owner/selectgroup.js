import fs from 'fs'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')

    const groups = await conn.groupFetchAllParticipating()
    const groupList = Object.values(groups)

    if (groupList.length === 0) {
        return m.reply('❌ Bot tidak ada di grup manapun!')
    }

    let text = `╭─── *「 PILIH GRUP 」* ───\n│\n│  📊 *Total Grup:* ${groupList.length}\n│\n`

    groupList.forEach((group, index) => {
        const memberCount = group.participants?.length || 0
        const monitor = JSON.parse(fs.readFileSync('./database/monitor.json'))
        const status = monitor.groups.includes(group.id) ? '🟢' : '⚪'
        text += `│  *${index + 1}.* ${status} ${group.subject}\n`
        text += `│      👥 ${memberCount} anggota\n│\n`
    })

    text += `│  ═══════════════════\n│\n│  🎯 *Pilih Grup Baru:*\n│  Kirim nomor grup:\n│  *1,2,3,4,5*\n│  (Min 1, Maks 5 grup)\n│\n╰─── *「 JHON338 - BOT 」* ───`

    const monitor = JSON.parse(fs.readFileSync('./database/monitor.json'))
    monitor.waiting = true
    fs.writeFileSync('./database/monitor.json', JSON.stringify(monitor, null, 2))

    await m.reply(text)
}

handler.command = ['selectgroup', 'sg', 'pilihgrup', 'pg']
handler.owner = true

export default handler