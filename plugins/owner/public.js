import fs from 'fs'

let handler = async (m, { conn }) => {
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    let config = JSON.parse(fs.readFileSync('./config.json'))
    config.botMode = 'public'
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
    
    m.reply('✅ Bot sekarang mode *PUBLIC*\n\nSemua user bisa menggunakan bot!')
}

handler.command = ['public']
handler.owner = true

export default handler