import { rgbTag, COLORS } from '../../lib/rgb.js'
import {
    getCecanChina, getCecanHijaber, getCecanIndonesia,
    getCecanJapan, getCecanJiso, getCecanJustinaxie,
    getCecanKorea, getCecanMalaysia, getCecanRose,
    getCecanRyujin, getCecanThailand, getCecanVietnam
} from '../../lib/kyzz/cecan.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { saveImage } from '../../lib/autosave.js'

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

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const keys = Object.keys(SOURCES)
        const name = keys[Math.floor(Math.random() * keys.length)]
        const src = SOURCES[name]

        const res = await src.fn()
        const buffer = Buffer.from(await res.arrayBuffer())
        await saveImage(buffer)

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: `📷 *CCN ${src.label.toUpperCase()}*`
        }, { quoted: m })

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('CCN', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Gagal mengambil cecan.'))
    }
}

handler.command = ['ccn', 'cecan']
export default handler