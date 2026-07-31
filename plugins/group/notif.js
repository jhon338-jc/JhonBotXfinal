import fs from 'fs'

export async function before(m, { conn }) {
    if (!m.isGroup) return

    const monitorFile = './database/monitor.json'
    if (!fs.existsSync(monitorFile)) return

    const monitor = JSON.parse(fs.readFileSync(monitorFile))
    if (monitor.waiting) return
    if (!monitor.groups.includes(m.chat)) return

    if (m.messageStubType === 27) {
        const jid = m.messageStubParameters?.[0]
        if (!jid) return
        const user = jid.split('@')[0]
        const groupMeta = await conn.groupMetadata(m.chat)
        await conn.sendMessage(m.chat, {
            text: `✅ *User Masuk*\n\n👤 @${user}\n📌 Grup: ${groupMeta.subject}`,
            mentions: [jid]
        })
    }

    if (m.messageStubType === 28) {
        const jid = m.messageStubParameters?.[0]
        if (!jid) return
        const user = jid.split('@')[0]
        const groupMeta = await conn.groupMetadata(m.chat)
        await conn.sendMessage(m.chat, {
            text: `❌ *User Keluar*\n\n👤 @${user}\n📌 Grup: ${groupMeta.subject}`,
            mentions: [jid]
        })
    }

    return true
}