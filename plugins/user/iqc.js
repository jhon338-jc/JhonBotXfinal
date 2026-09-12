import { rgbTag, COLORS } from '../../lib/rgb.js'
import { saveImage } from '../../lib/autosave.js'

let handler = async (m, { conn, text }) => {
    const nama = text || m.pushName || 'User'

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })

    try {
        const res = await fetch('https://api.azbry.com/api/maker/iqc?text=' + encodeURIComponent(nama))
        if (!res.ok) throw new Error('API iqc return ' + res.status)
        const buffer = Buffer.from(await res.arrayBuffer())
        await saveImage(buffer)
        await conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('IQC', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['iqc', 'iq']
export default handler