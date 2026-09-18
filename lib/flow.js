import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

const CACHE_TTL = 30 * 60 * 1000

const mediaCache = new Map()

export function mediaCacheGet(chat, cmd) {
    const key = chat + '|' + cmd
    const v = mediaCache.get(key)
    if (!v) return null
    if (v.created < Date.now() - CACHE_TTL) {
        mediaCache.delete(key)
        return null
    }
    return v
}

export function mediaCacheSet(chat, cmd, data) {
    mediaCache.set(chat + '|' + cmd, { created: Date.now(), ...data })
}

const quickReply = (display_text, id) => ({
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({ display_text, id })
})

export function mediaButtons(cmd) {
    return [
        quickReply(' Acak Baru', `.${cmd}`)
    ]
}

export async function sendMediaFlow(conn, jid, { media, mimetype = '', caption = '', footer = '', buttons = [], quoted }) {
    const isVideo = /^video\//.test(mimetype)
    const content = isVideo ? { video: media, mimetype } : { image: media }
    const prepared = await prepareWAMessageMedia(content, { upload: conn.waUploadToServer })

    const header = isVideo
        ? { title: ' Asupan', hasMediaAttachment: true, videoMessage: prepared.videoMessage }
        : { title: ' Random', hasMediaAttachment: true, imageMessage: prepared.imageMessage }

    const interactiveMsg = {
        interactiveMessage: {
            header,
            body: { text: caption },
            footer: { text: footer },
            nativeFlowMessage: {
                messageVersion: 1,
                buttons
            }
        }
    }

    const msg = generateWAMessageFromContent(
        conn.decodeJid(jid),
        interactiveMsg,
        { userJid: conn.user?.id || jid, quoted }
    )
    await conn.relayMessage(jid, msg.message, { messageId: msg.key.id })
    return msg
}