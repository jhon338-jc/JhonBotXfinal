import fs from 'fs'
import { DB_FILES, invalidateJSONCache } from '../../handler.js'

let handler = async (m, { conn }) => {
    let groupList = []
    try {
        const groups = await conn.groupFetchAllParticipating()
        groupList = Object.values(groups || {})
    } catch (e) {
        return m.reply(' Gagal mengambil daftar grup: ' + (e?.message || e))
    }

    if (!groupList.length) {
        return m.reply(' Bot tidak ada di grup manapun!')
    }

    let text = `â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”‚   *DAFTAR GRUP*\nâ”‚\n`
    text += `â”‚  Total Grup: ${groupList.length}\nâ”‚\n`
    groupList.forEach((g, i) => {
        text += `â”‚  ${i + 1}. ${g.subject}\nâ”‚      ${g.participants?.length || 0} member\nâ”‚\n`
    })
    text += `â”‚   Balas dengan nomor grup\nâ”‚  Contoh: 2,5\nâ”‚  Maksimal 5 grup\nâ””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜`

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
}

handler.command = ['grup', 'daftargrup']
handler.owner = true
handler.ownerOnly = true

export default handler