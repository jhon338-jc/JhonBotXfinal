import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text, command }) => {
    const apps = {
        asmaulhusna: async () => {
            const [nomor] = (text || '').split(/\s+/).filter(Boolean)
            return kyzzApi.islamic.asmaulHusna(nomor)
        },
        ayatkursi: () => kyzzApi.islamic.ayatKursi(),
        bacaansholat: () => kyzzApi.islamic.bacaanSholat(),
        jadwalsholat: async () => {
            if (!text) throw new Error('Format: .jadwalsholat <wilayah>')
            return kyzzApi.islamic.jadwalSholat(text.trim())
        },
        kisahnabi: async () => {
            if (!text) throw new Error('Format: .kisahnabi <nama nabi>')
            return kyzzApi.islamic.kisahNabi(text.trim())
        },
        niatsholat: async () => {
            if (!text) throw new Error('Format: .niatsholat <waktu>')
            return kyzzApi.islamic.niatSholat(text.trim())
        },
        tafsir: async () => {
            if (!text) throw new Error('Format: .tafsir <query>')
            return kyzzApi.islamic.tafsir(text.trim())
        }
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `🕌 *${command.toUpperCase()}* - KYZZ API`, mediaLimit: 1 })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = [
    'asmaulhusna', 'ayatkursi', 'bacaansholat', 'jadwalsholat',
    'kisahnabi', 'niatsholat', 'tafsir'
]
export default handler