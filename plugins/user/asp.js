import { rgbTag, COLORS } from '../../lib/rgb.js'
import {
    getAsupanBocil, getAsupanGheayubi, getAsupanKayes,
    getAsupanNotnot, getAsupanPanrika, getAsupanSantuy,
    getAsupanTiktokgirl, getAsupanUkhty
} from '../../lib/kyzz/asupan.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { saveVideo } from '../../lib/autosave.js'
import { sendMediaFlow, mediaCacheGet, mediaCacheSet, mediaButtons } from '../../lib/flow.js'

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
        if (!buffer.length) throw new Error('Respons kosong dari sumber asupan')
        await saveVideo(buffer)

        const data = {
            media: buffer,
            mimetype: 'video/mp4',
            caption: `📌 Asupan ${src.label} random • JhonBot v3.3.8`,
            footer: '👇 Tap tombol: kirim ulang atau acak baru'
        }
        mediaCacheSet(m.chat, command, data)
        await sendMediaFlow(conn, m.chat, { ...data, buttons: mediaButtons(command), quoted: m })

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('ASP', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['asp', 'asupan']
export default handler