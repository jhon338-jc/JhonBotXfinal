import { log, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    if (!m.quoted) {
        return m.reply(' Reply pesan view-once!')
    }

    try {
        const buffer = await m.quoted.download()
        if (!buffer || !buffer.length) {
            return m.reply(' Gagal mengunduh! Media sudah expired / pernah dibuka.')
        }

        const msg = m.quoted.msg || m.quoted
        const mimetype = msg?.mimetype || 'image/jpeg'

        if (mimetype.startsWith('image/')) {
            await conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
        } else if (mimetype.startsWith('video/')) {
            await conn.sendMessage(m.chat, { video: buffer }, { quoted: m })
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

    } catch (e) {
        console.error(log('RVO', e?.message || e, COLORS.error))
    }
}

handler.command = ['rvo', 'readvo', 'viewonce']
export default handler