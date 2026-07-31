import fs from 'fs'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return conn.sendMessage(m.chat, { text: '❌ Khusus Owner!' })
    
    let config = JSON.parse(fs.readFileSync('./config.json'))
    config.botMode = 'self'
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
    
    conn.sendMessage(m.chat, { text: '✅ Bot sekarang mode *SELF*\n\nHanya Owner yang bisa menggunakan bot!' })
}

handler.command = ['self']
handler.owner = true

export default handler