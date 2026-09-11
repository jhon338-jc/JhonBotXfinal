import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    if (!m.isOwner) return conn.sendMessage(m.chat, { text: '❌ Khusus Owner!' })
    
    try {
        let meta = await conn.groupMetadata(m.chat)
        let members = meta.participants || []
        let mentions = members.map(v => v.id)
        let teks = text || ' '
        
        await conn.sendMessage(m.chat, { text: teks, mentions })
    } catch (e) {
        console.error(rgbTag('TOTAG', e?.message || e, COLORS.error))
        conn.sendMessage(m.chat, { text: '❌ Gagal! Pastikan bot admin.' })
    }
}

handler.command = ['totag']
handler.owner = true

export default handler