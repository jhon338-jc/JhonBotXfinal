import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply('❗ Reply pesan view-once!')

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        
        let buffer = await m.quoted.download()
        
        if (!buffer || !buffer.length) {
            return m.reply('❌ Gagal download! Media sudah expired.')
        }

        let msg = m.quoted.msg || m.quoted
        let mimetype = msg?.mimetype || 'image/jpeg'
        let caption = '🔓 *View Once Dibuka*'

        if (mimetype.startsWith('image/')) {
            await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
        }
        else if (mimetype.startsWith('video/')) {
            await conn.sendMessage(m.chat, { video: buffer, caption }, { quoted: m })
        }
        else if (mimetype.startsWith('audio/') || mimetype === 'audio/ogg' || mimetype === 'audio/mp4') {
            await conn.sendMessage(m.chat, { 
                audio: buffer, 
                mimetype: mimetype, 
                ptt: mimetype.includes('ogg') || msg?.ptt || false 
            }, { quoted: m })
        }
        else {
            await conn.sendMessage(m.chat, { 
                document: buffer, 
                mimetype: mimetype, 
                fileName: msg?.fileName || 'file' 
            }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('RVO', e?.message || e, COLORS.error))
        let errorMsg = '❌ Error! Reply pesan view-once.'
        
        if (e.message && e.message.includes('media key')) {
            errorMsg = '❌ View once sudah pernah dibuka atau expired!\nMedia key sudah dihapus server WhatsApp.'
        }
        
        m.reply(errorMsg)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['rvo', 'readvo', 'viewonce']

export default handler