let handler = async (m, { conn }) => {
    const start = Date.now()
    try {
        await conn.query({ tag: 'iq', attrs: { id: 'ping-' + Date.now(), to: 's.whatsapp.net', type: 'get', xmlns: 'w:p' } })
    } catch {}
    const ping = Date.now() - start
    m.reply(`*Ping!*\n\nSpeed: ${ping}ms`)
}

handler.command = ['ping']
handler.owner = true

export default handler