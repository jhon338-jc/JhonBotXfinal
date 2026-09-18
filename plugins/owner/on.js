import fs from 'fs'
import { DB_FILES, invalidateJSONCache } from '../../handler.js'

const readMonitor = () => {
    try {
        const db = JSON.parse(fs.readFileSync(DB_FILES.monitor, 'utf-8'))
        return (db && typeof db === 'object' ? db : {})
    } catch {
        return {}
    }
}

let handler = async (m, { conn }) => {
    const monitor = readMonitor()
    monitor.off = Array.isArray(monitor.off) ? monitor.off : []

    if (!monitor.off.includes(m.chat)) {
        return m.reply('> *BOT SUDAH AKTIF*\n\n_Bot sudah menyala di grup ini._\n_Ketik_ `.off` _untuk mematikan._')
    }

    monitor.off = monitor.off.filter(g => g !== m.chat)
    fs.writeFileSync(DB_FILES.monitor, JSON.stringify(monitor, null, 2))
    invalidateJSONCache(DB_FILES.monitor)

    const name = (await conn.groupMetadata(m.chat).catch(() => null))?.subject || 'grup ini'
    await m.reply(`> *BOT ON*\n\n_Bot *${name}* sudah AKTIF._\n_Semua fitur bot siap dipakai di grup ini._\n_Ketik_ \`.off\` _untuk mematikan bot di grup ini._`)
}

handler.command = ['on', 'aktif']
handler.ownerOnly = true

export default handler
