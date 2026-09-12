import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text, command }) => {
    const apps = {
        kyzzprofile: () => kyzzApi.user.profile(),
        kyzzstats: () => kyzzApi.user.stats(),
        kyzzrenew: async () => {
            if (!m.isOwner) throw new Error('Perintah ini khusus owner.')
            const [role, days, coupon] = (text || '').split(/\s+/).filter(Boolean)
            if (!role || !days) throw new Error('Format: .kyzzrenew <role> <days> [couponCode]')
            return kyzzApi.user.renew({ role, days, couponCode: coupon })
        }
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `👑 *${command.toUpperCase()}* - KYZZ API`, mediaLimit: 1 })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = ['kyzzprofile', 'kyzzstats', 'kyzzrenew']
export default handler