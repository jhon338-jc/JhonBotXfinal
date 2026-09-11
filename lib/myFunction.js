export async function sendNotification(conn, m, title, body) {
    const textMessage = `*${title}*\n\n${body}`
    try {
        const quoted = m?.key && m?.message ? m : undefined
        await conn.sendMessage(m.chat, { text: textMessage }, quoted ? { quoted } : undefined)
    } catch {
        await conn.sendMessage(m.chat, { text: textMessage })
    }
}