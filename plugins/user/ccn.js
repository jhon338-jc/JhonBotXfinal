import { log, COLORS } from '../../lib/rgb.js'
import {
    getCecanChina, getCecanHijaber, getCecanIndonesia,
    getCecanJapan, getCecanKorea,
    getCecanMalaysia, getCecanThailand, getCecanVietnam
} from '../../lib/kyzz/cecan.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { saveImage } from '../../lib/autosave.js'
import { sendMediaFlow, mediaCacheGet, mediaCacheSet, mediaButtons } from '../../lib/flow.js'

const SOURCES = {
    china: { fn: getCecanChina, label: 'China' },
    hijaber: { fn: getCecanHijaber, label: 'Hijaber' },
    indonesia: { fn: getCecanIndonesia, label: 'Indonesia' },
    japan: { fn: getCecanJapan, label: 'Japan' },
    korea: { fn: getCecanKorea, label: 'Korea' },
    malaysia: { fn: getCecanMalaysia, label: 'Malaysia' },
    thailand: { fn: getCecanThailand, label: 'Thailand' },
    vietnam: { fn: getCecanVietnam, label: 'Vietnam' }
}

let handler = async (m, { conn, args, command }) => {
    if (args?.[0] === 'ulang') {
        const last = mediaCacheGet(m.chat, command)
        if (!last) return m.reply('⚠️ Tidak ada media sebelumnya. Silakan pilih *🎲 Acak Baru*.')
        await conn.sendMessage(m.chat, { react: { text: '🔄', key: m.key } })
        await sendMediaFlow(conn, m.chat, { ...last, buttons: mediaButtons(command), quoted: m })
        return
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        requireKyzzKey()
        const keys = Object.keys(SOURCES)
        const name = keys[Math.floor(Math.random() * keys.length)]
        const src = SOURCES[name]

        const res = await src.fn()
        const buffer = Buffer.from(await res.arrayBuffer())
        if (!buffer.length) throw new Error('Respons kosong dari sumber cecan')
        await saveImage(buffer)

        const data = {
            media: buffer,
            mimetype: 'image/jpeg',
            caption: `📌 Cecan ${src.label} random • JhonBot v3.3.8`,
            footer: '👇 Tap tombol: kirim ulang atau acak baru'
        }
        mediaCacheSet(m.chat, command, data)
        await sendMediaFlow(conn, m.chat, { ...data, buttons: mediaButtons(command), quoted: m })

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('CCN', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['ccn', 'cecan']
handler.premium = true
handler.tags = ['premium']
export default handler