import fs from 'fs'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    let config = JSON.parse(fs.readFileSync('./config.json'))
    config.botMode = 'self'
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
    
    m.reply('✅ Bot sekarang mode *SELF*\n\nHanya Owner yang bisa menggunakan bot!')
}

handler.command = ['self']
handler.owner = true

export default handler