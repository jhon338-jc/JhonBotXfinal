let handler = async (m, { conn }) => {
    const start = Date.now()
    const ping = Date.now() - start
    m.reply(` *Ping!*\n\n Speed: ${ping}ms`)
}

handler.command = ['ping']
handler.owner = true

export default handler