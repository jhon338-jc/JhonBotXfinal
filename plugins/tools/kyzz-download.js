import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text, command }) => {
    const apps = {
        kyzzfb: async () => {
            if (!text) throw new Error('Format: .kyzzfb <url facebook>')
            return kyzzApi.download.facebook(text.trim())
        },
        kyzzig: async () => {
            if (!text) throw new Error('Format: .kyzzig <url instagram>')
            return kyzzApi.download.instagram(text.trim())
        },
        kyzztt: async () => {
            if (!text) throw new Error('Format: .kyzztt <url tiktok>')
            return kyzzApi.download.tiktok(text.trim())
        },
        kyzzgit: async () => {
            const [repo, ref] = (text || '').split(/\s+/).filter(Boolean)
            if (!repo) throw new Error('Format: .kyzzgit <repo> [ref]')
            return kyzzApi.download.github(repo, ref)
        }
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `⬇️ *${command.toUpperCase()}* - KYZZ API`, mediaLimit: 3 })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = ['kyzzfb', 'kyzzig', 'kyzztt', 'kyzzgit']
export default handler