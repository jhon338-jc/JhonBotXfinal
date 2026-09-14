import { log, COLORS } from '../../lib/rgb.js'
import { saveImage } from '../../lib/autosave.js'

import { fetchWithTimeout } from '../../lib/kyzz/client.js'

let handler = async (m, { conn, text }) => {
    const nama = text || m.pushName || 'User'


    try {
        const res = await fetchWithTimeout('https://api.azbry.com/api/maker/iqc?text=' + encodeURIComponent(nama), {}, 20000)
        if (!res.ok) throw new Error('API iqc return ' + res.status)
        const buffer = Buffer.from(await res.arrayBuffer())
        if (!buffer.length) throw new Error('Respons kosong dari API iqc')
        await saveImage(buffer)
        await conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
    } catch (e) {
        console.error(log('IQC', e?.message || e, COLORS.error))
    }
}

handler.command = ['iqc', 'iq']
export default handler