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

    if (monitor.off.includes(m.chat)) {
        return m.reply('> *BOT SUDAH MATI*\n\n_Bot sudah tidak aktif di grup ini._\n_Ketik_ `.on` _untuk menyalakan kembali._')
    }

    monitor.off.push(m.chat)
    fs.writeFileSync(DB_FILES.monitor, JSON.stringify(monitor, null, 2))
    invalidateJSONCache(DB_FILES.monitor)

    const name = (await conn.groupMetadata(m.chat).catch(() => null))?.subject || 'grup ini'
    await m.reply(`> *BOT OFF*\n\n_Bot *${name}* sudah DIMATIKAN._\n_Bot tidak akan merespon apa pun di grup ini (kecuali_ \`.on\`/\`.off\`_)._\n_Ketik_ \`.on\` _untuk menyalakan kembali._`)
}

handler.command = ['off', 'mati']
handler.ownerOnly = true

export default handler
