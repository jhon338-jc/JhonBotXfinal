import fs from 'fs'
import { DB_FILES, invalidateJSONCache } from '../../handler.js'

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    let groupList = []
    try {
        const groups = await conn.groupFetchAllParticipating()
        groupList = Object.values(groups || {})
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Gagal mengambil daftar grup: ' + (e?.message || e))
    }

    if (!groupList.length) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ Bot tidak ada di grup manapun!')
    }

    let text = `┌─────────────────────────────────────┐\n│  📋 *DAFTAR GRUP*\n│\n`
    text += `│  Total Grup: ${groupList.length}\n│\n`
    groupList.forEach((g, i) => {
        text += `│  ${i + 1}. ${g.subject}\n│     👥 ${g.participants?.length || 0} member\n│\n`
    })
    text += `│  💡 Balas dengan nomor grup\n│  Contoh: 2,5\n│  Maksimal 5 grup\n└─────────────────────────────────────┘`

    let monitor
    try {
        monitor = JSON.parse(fs.readFileSync(DB_FILES.monitor, 'utf-8'))
        if (!monitor || typeof monitor !== 'object') monitor = {}
    } catch {
        monitor = {}
    }
    monitor.groups ??= []
    monitor.waiting = true
    fs.writeFileSync(DB_FILES.monitor, JSON.stringify(monitor, null, 2))
    invalidateJSONCache(DB_FILES.monitor)

    await m.reply(text)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['grup', 'daftargrup']
handler.owner = true

export default handler