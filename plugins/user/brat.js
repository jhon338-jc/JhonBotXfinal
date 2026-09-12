import { rgbTag, COLORS } from '../../lib/rgb.js'
import { makeSticker } from '../../lib/sticker.js'
import { saveSticker } from '../../lib/autosave.js'

let handler = async (m, { conn, text }) => {
    const teks = text || m.pushName || 'JhonBot'

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    try {
        const res = await fetch('https://api.azbry.com/api/maker/brat?text=' + encodeURIComponent(teks))
        if (!res.ok) throw new Error('API brat return ' + res.status)
        const buffer = Buffer.from(await res.arrayBuffer())
        const sticker = await makeSticker(buffer)
        await saveSticker(sticker)
        await conn.sendMessage(m.chat, { sticker }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('BRAT', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ Gagal membuat stiker BRAT!')
    }
}

handler.command = ['brat']
export default handler