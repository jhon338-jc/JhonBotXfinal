import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, command }) => {
    const apps = {
        cecanchina: () => kyzzApi.cecan.China(),
        cecanhijaber: () => kyzzApi.cecan.Hijaber(),
        cecanindonesia: () => kyzzApi.cecan.Indonesia(),
        cecanjapan: () => kyzzApi.cecan.Japan(),
        cecanjiso: () => kyzzApi.cecan.Jiso(),
        cecanjustinaxie: () => kyzzApi.cecan.Justinaxie(),
        cecankorea: () => kyzzApi.cecan.Korea(),
        cecanmalaysia: () => kyzzApi.cecan.Malaysia(),
        cecanrose: () => kyzzApi.cecan.Rose(),
        cecanryujin: () => kyzzApi.cecan.Ryujin(),
        cecanthailand: () => kyzzApi.cecan.Thailand(),
        cecanvietnam: () => kyzzApi.cecan.Vietnam()
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `📷 *${command.toUpperCase()}* - KYZZ API` })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = [
    'cecanchina', 'cecanhijaber', 'cecanindonesia', 'cecanjapan',
    'cecanjiso', 'cecanjustinaxie', 'cecankorea', 'cecanmalaysia',
    'cecanrose', 'cecanryujin', 'cecanthailand', 'cecanvietnam'
]
export default handler