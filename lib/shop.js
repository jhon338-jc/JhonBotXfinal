import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import sharp from 'sharp'
import { log, COLORS } from './rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const NEWS_FILE = path.join(ROOT, 'database', 'newsletter.json')

function loadConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function channelCode() {
    const url = loadConfig().channelUrl || ''
    const m = String(url).match(/channel\/([A-Za-z0-9_-]+)/)
    return m ? m[1] : ''
}

let newsCache = null
let newsLoading = false

export async function resolveNewsletter(conn, force = false) {
    if (newsCache && !force) return newsCache
    if (newsLoading || !conn?.newsletterMetadata) return newsCache
    const code = channelCode()
    if (!code) return newsCache
    newsLoading = true
    try {
        const meta = await conn.newsletterMetadata('invite', code)
        if (meta?.id) {
            newsCache = { jid: meta.id, name: meta.name || 'JHON338' }
            try {
                fs.writeFileSync(NEWS_FILE, JSON.stringify({ ...newsCache, updatedAt: Date.now() }))
            } catch {}
            console.log(log('NEWSLETTER', 'Resolved JID ' + newsCache.jid + ' (' + newsCache.name + ')', COLORS.success))
        }
    } catch (e) {
        console.log(log('NEWSLETTER', 'Gagal resolve: ' + (e?.message || e), COLORS.warn))
    } finally {
        newsLoading = false
    }
    return newsCache
}

function getNewsletter() {
    if (newsCache) return newsCache?.jid ? newsCache : null
    try {
        if (fs.existsSync(NEWS_FILE)) {
            const data = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'))
            if (data?.jid) newsCache = data
        }
    } catch {}
    return newsCache?.jid ? newsCache : null
}

const NEWSLETTER_KEYS = [
    'conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage',
    'audioMessage', 'documentMessage', 'documentWithCaptionMessage',
    'stickerMessage', 'contactMessage', 'locationMessage', 'liveLocationMessage',
    'buttonsMessage', 'listMessage', 'templateMessage',
    'productMessage', 'viewOnceMessage',
    'viewOnceMessageV2', 'viewOnceMessageV2Extension',
    'orderMessage', 'requestPaymentMessage', 'groupInviteMessage',
    'newsletterAdminInviteMessage'
]

function newsCtxInfo() {
    const n = getNewsletter()
    if (!n?.jid) return null
    return {
        isForwarded: true,
        forwardingScore: 9999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: n.jid,
            newsletterName: n.name || 'JHON338',
            serverMessageId: 100
        }
    }
}

function mergeCtx(content, info) {
    if (!content || typeof content !== 'object') return
    const old = (content.contextInfo && typeof content.contextInfo === 'object') ? content.contextInfo : {}
    content.contextInfo = { ...old, ...info }
}

export function stampNewsletter(message) {
    if (!message || typeof message !== 'object') return message
    const info = newsCtxInfo()
    if (!info) return message
    for (const key of NEWSLETTER_KEYS) {
        const content = message[key]
        if (!content || typeof content !== 'object') continue
        mergeCtx(content, info)
        if ((key === 'viewOnceMessage' || key === 'viewOnceMessageV2' || key === 'viewOnceMessageV2Extension') && content.message) {
            stampNewsletter(content.message)
        }
    }
    const im = message.interactiveMessage
    if (im && typeof im === 'object') {
        mergeCtx(im, info)
        const cards = im.carouselMessage?.cards
        if (Array.isArray(cards)) {
            for (const card of cards) if (card && typeof card === 'object') mergeCtx(card, info)
        }
    }
    return message
}

let troliCache = null
let troliPending = null

export async function getTroli(conn, chatJid) {
    if (troliCache) return troliCache
    if (troliPending) return troliPending
    troliPending = (async () => {
        try {
            const thumbPath = path.join(ROOT, 'src', 'img', 'foto_menu.png')
            let thumb = null
            if (fs.existsSync(thumbPath)) thumb = await sharp(thumbPath).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer()
            const order = {
                orderMessage: {
                    itemCount: 27948,
                    status: 1,
                    surface: 1,
                    orderTitle: 'JhonBotXfinal • Order',
                    message: 'Pengguna Bot',
                    privateAttributes: '',
                    ...(thumb ? { thumbnailJpeg: thumb } : {})
                }
            }
            const msg = generateWAMessageFromContent(chatJid || '0@s.whatsapp.net', order, { userJid: conn?.user?.id || '0@s.whatsapp.net' })
            troliCache = { key: msg.key, message: msg.message }
            return troliCache
        } catch {
            return null
        } finally {
            troliPending = null
        }
    })()
    return troliPending
}