import { kyzzApi } from '../../lib/kyzz/index.js'
import { sendKyzzResult, downloadQuotedMedia } from '../../lib/kyzz/send.js'
import { requireKyzzKey } from '../../lib/kyzz/client.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn, text, command }) => {
    const apps = {
        ffduo: async () => {
            const [u1, u2, tpl] = (text || '').split(/\s+/).filter(Boolean)
            if (!u1 || !u2) throw new Error('Format: .ffduo <user1> <user2> [template]')
            return kyzzApi.canvas.ffduo(u1, u2, tpl)
        },
        ffgirl: async () => {
            const [u, tpl] = (text || '').split(/\s+/).filter(Boolean)
            if (!u) throw new Error('Format: .ffgirl <username> [template]')
            return kyzzApi.canvas.ffgirl(u, tpl)
        },
        fflobby: async () => {
            const [u, lobby] = (text || '').split(/\s+/).filter(Boolean)
            if (!u) throw new Error('Format: .fflobby <username> [lobby]')
            return kyzzApi.canvas.fakeFf(u, lobby)
        },
        gopay: async () => {
            const [saldo, koin, terpakai, bulan] = (text || '').split(/\s+/).filter(Boolean)
            if (!saldo) throw new Error('Format: .gopay <saldo> [koin terpakai bulan]')
            return kyzzApi.canvas.fakeGopay({ saldo, koin, terpakai, bulan })
        },
        fakeml: async () => {
            const [avatar, username, rank, border] = (text || '').split(/\s+/).filter(Boolean)
            return kyzzApi.canvas.fakeMl({ avatar, username, rank, border })
        },
        fakengl: async () => {
            if (!text) throw new Error('Format: .fakengl <teks>')
            return kyzzApi.canvas.fakeNgl(text)
        },
        fakeovo: async () => {
            const [saldo] = (text || '').split(/\s+/).filter(Boolean)
            if (!saldo) throw new Error('Format: .fakeovo <saldo>')
            return kyzzApi.canvas.fakeOvo(saldo)
        },
        ustadz: async () => {
            if (!text) throw new Error('Format: .ustadz <teks>')
            return kyzzApi.canvas.pakUstadz(text)
        },
        goodbye: async () => {
            const media = await downloadQuotedMedia(m)
            const [name, group, member] = (text || '').split('|').map(x => x.trim())
            return kyzzApi.canvas.goodbye({ media, name, group, member })
        },
        qcwa: async () => {
            const media = await downloadQuotedMedia(m)
            const [username, phone, tag, mode] = (text || '').split(/\s+/).filter(Boolean)
            return kyzzApi.canvas.qcwa({ avatar: media, text, username, phone, tag, mode })
        }
    }

    const job = apps[command]
    if (!job) return m.reply('❌ Perintah tidak dikenal!')

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        requireKyzzKey()
        const result = await job()
        await sendKyzzResult(conn, m, result, { caption: `✅ *${command.toUpperCase()}* - KYZZ API`, mediaLimit: 2 })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('KYZZ', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ ' + (e?.message || 'Error'))
    }
}

handler.command = ['ffduo', 'ffgirl', 'fflobby', 'gopay', 'fakeml', 'fakengl', 'fakeovo', 'ustadz', 'goodbye', 'qcwa']
export default handler