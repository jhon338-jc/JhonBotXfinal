import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult, downloadQuotedMedia } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Format: .editimage <prompt>\nContoh: .editimage jadikan anime style\n\nReply ke gambar yang mau diedit!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const media = await downloadQuotedMedia(m)
        const result = await kyzzApi.ai.editImage(media, text.trim())
        await sendKyzzResult(conn, m, result, { caption: '🖌️ *Edit Image* - KYZZ API' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = ['editimage', 'aiimage']
export default handler