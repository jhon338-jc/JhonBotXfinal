import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply('❗ Reply pesan view-once!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        const buffer = await m.quoted.download()
        if (!buffer || !buffer.length) {
            return m.reply('❌ Gagal mengunduh! Media sudah expired / pernah dibuka.')
        }

        const msg = m.quoted.msg || m.quoted
        const mimetype = msg?.mimetype || 'image/jpeg'
        const caption = '🔓 *View Once Dibuka*'

        if (mimetype.startsWith('image/')) {
            await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
        } else if (mimetype.startsWith('video/')) {
            await conn.sendMessage(m.chat, { video: buffer, caption }, { quoted: m })
        } else if (mimetype.startsWith('audio/')) {
            await conn.sendMessage(m.chat, {
                audio: buffer,
                mimetype,
                ptt: mimetype.includes('ogg') || msg?.ptt || false
            }, { quoted: m })
        } else {
            await conn.sendMessage(m.chat, {
                document: buffer,
                mimetype,
                fileName: msg?.fileName || 'file_' + Date.now()
            }, { quoted: m })
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('RVO', e?.message || e, COLORS.error))
        let errorMsg = '❌ Error! Reply pesan view-once.'
        if (e.message && e.message.includes('media key')) {
            errorMsg = '❌ View once sudah pernah dibuka / expired!\nMedia key sudah dihapus server WhatsApp.'
        }
        m.reply(errorMsg)
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['rvo', 'readvo', 'viewonce']
export default handler