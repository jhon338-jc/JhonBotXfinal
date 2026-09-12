import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, command }) => {
    const apps = {
        asupanbocil: () => kyzzApi.asupan.bocil(),
        asupangheayubi: () => kyzzApi.asupan.gheayubi(),
        asupankayes: () => kyzzApi.asupan.kayes(),
        asupannotnot: () => kyzzApi.asupan.notnot(),
        asupanpanrika: () => kyzzApi.asupan.panrika(),
        asupansantuy: () => kyzzApi.asupan.santuy(),
        asupantiktokgirl: () => kyzzApi.asupan.tiktokgirl(),
        asupanukhty: () => kyzzApi.asupan.ukhty()
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `👻 *${command.toUpperCase()}* - KYZZ API` })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = [
    'asupanbocil', 'asupangheayubi', 'asupankayes', 'asupannotnot',
    'asupanpanrika', 'asupansantuy', 'asupantiktokgirl', 'asupanukhty'
]
export default handler