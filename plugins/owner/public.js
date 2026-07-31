import fs from 'fs'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return conn.sendMessage(m.chat, { text: '❌ Khusus Owner!' })
    
    let config = JSON.parse(fs.readFileSync('./config.json'))
    config.botMode = 'public'
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
    
    conn.sendMessage(m.chat, { text: '✅ Bot sekarang mode *PUBLIC*\n\nSemua user bisa menggunakan bot!' })
}

handler.command = ['public']
handler.owner = true

export default handler