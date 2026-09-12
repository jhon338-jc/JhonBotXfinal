import { rgbTag, COLORS } from '../../lib/rgb.js'
import {
    getAsupanBocil, getAsupanGheayubi, getAsupanKayes,
    getAsupanNotnot, getAsupanPanrika, getAsupanSantuy,
    getAsupanTiktokgirl, getAsupanUkhty
} from '../../lib/kyzz/asupan.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { saveVideo } from '../../lib/autosave.js'

const SOURCES = {
    bocil: { fn: getAsupanBocil, label: 'Bocil' },
    gheayubi: { fn: getAsupanGheayubi, label: 'Gheayubi' },
    kayes: { fn: getAsupanKayes, label: 'Kayes' },
    notnot: { fn: getAsupanNotnot, label: 'Notnot' },
    panrika: { fn: getAsupanPanrika, label: 'Panrika' },
    santuy: { fn: getAsupanSantuy, label: 'Santuy' },
    tiktokgirl: { fn: getAsupanTiktokgirl, label: 'TikTok Girl' },
    ukhty: { fn: getAsupanUkhty, label: 'Ukhty' }
}

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        requireKyzzKey()
        const keys = Object.keys(SOURCES)
        const name = keys[Math.floor(Math.random() * keys.length)]
        const src = SOURCES[name]

        const res = await src.fn()
        const buffer = Buffer.from(await res.arrayBuffer())
        await saveVideo(buffer)

        await conn.sendMessage(m.chat, {
            video: buffer,
            mimetype: 'video/mp4'
        }, { quoted: m })

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('ASP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['asp', 'asupan']
export default handler