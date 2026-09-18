import { log, COLORS } from '../../lib/rgb.js'
import { makeSticker } from '../../lib/sticker.js'
import { saveSticker } from '../../lib/autosave.js'

import { fetchWithTimeout } from '../../lib/kyzz/client.js'

let handler = async (m, { conn, text }) => {
    const teks = text || m.pushName || 'JhonBotXfinal'


    try {
        const res = await fetchWithTimeout('https://api.azbry.com/api/maker/brat?text=' + encodeURIComponent(teks), {}, 20000)
        if (!res.ok) throw new Error('API brat return ' + res.status)
        const buffer = Buffer.from(await res.arrayBuffer())
        if (!buffer.length) throw new Error('Respons kosong dari API brat')
        const sticker = await makeSticker(buffer)
        await saveSticker(sticker)
        await conn.sendMessage(m.chat, { sticker }, { quoted: m })
    } catch (e) {
        console.error(log('BRAT', e?.message || e, COLORS.error))
    }
}

handler.command = ['brat']
export default handler