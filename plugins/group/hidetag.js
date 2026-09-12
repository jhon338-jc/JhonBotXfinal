import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return m.reply('❌ Khusus Owner!')
    
    try {
        let meta = await conn.groupMetadata(m.chat)
        let members = meta.participants || []
        let mentions = members.map(v => v.id)
        let teks = '\u200e' + (text || ' ')
        
        await conn.sendMessage(m.chat, { 
            text: teks, 
            mentions: mentions,
            edit: m.key 
        })
        
    } catch (e) {
        console.error(rgbTag('HIDETAG', e?.message || e, COLORS.error))
        m.reply('❌ Gagal! Pastikan bot admin.')
    }
}

handler.command = ['hidetag', 'ht']
handler.owner = true

export default handler