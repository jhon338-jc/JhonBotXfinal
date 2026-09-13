import { rgbTag, COLORS } from '../../lib/rgb.js'
import { saveImage, saveVideo } from '../../lib/autosave.js'

const MAX_MEDIA = 5

function pickUrl(text = '') {
    const m = String(text).match(/https?:\/\/[^\s]+/i)
    return m ? m[0].replace(/[)\]}]+$/, '') : ''
}

function extOf(url = '') {
    try {
        const ext = new URL(url).pathname.split('.').pop().toLowerCase()
        return ext === url ? '' : ext
    } catch {
        return ''
    }
}

function typeOf(item = {}) {
    const raw = [item.type, item.mime, item.mimeType, item.extension, item.file_type, item.format, extOf(item.url || item.link || item.download_url)]
        .filter(Boolean).join(' ').toLowerCase()
    if (/video|mp4|mov|webm|mkv|p120|avc/.test(raw)) return 'video'
    if (/image|jpe?g|png|webp|gif|heic/.test(raw)) return 'image'
    if (/audio|mp3|m4a|opus|wav|p140/.test(raw)) return 'audio'
    return 'unknown'
}

function collectMedia(json) {
    const candidates = []
    const add = (arr) => {
        if (Array.isArray(arr)) candidates.push(...arr)
    }
    add(json?.result?.medias)
    add(json?.result?.resource)
    add(json?.result?.links)
    add(json?.result?.media)
    add(json?.data?.medias)
    add(json?.medias)
    add(json?.links)

    const direct = json?.result?.download_url || json?.result?.url || json?.result?.link
    if (direct) candidates.push({ url: direct, type: json?.result?.file_type || json?.result?.type || json?.result?.extension || '' })

    const dedup = new Map()
    for (const c of candidates) {
        const u = c?.url || c?.link || c?.download_url
        if (!u || !/^https?:\/\//i.test(u)) continue
        if (!dedup.has(u)) dedup.set(u, c)
    }
    return [...dedup.values()]
}

let handler = async (m, { conn, text }) => {
    const url = pickUrl(text)
    if (!url) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ *Penggunaan:*\n\n`.donlodall <link>`\n\nContoh:\n`.donlodall https://www.tiktok.com/@user/video/123`\n\n✅ Bisa TikTok, Instagram, Facebook, X, Pinterest, dll.')
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        const res = await fetch('https://api.azbry.com/api/download/allinone?url=' + encodeURIComponent(url), {
            headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        })
        const json = await res.json().catch(() => null)

        if (!json || json.status === false || json.code === 403 || json.code === 500 || !json.result) {
            const err = json?.error || json?.message || 'Link tidak didukung atau gagal diproses server'
            if (!res.ok && !json) {
                await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
                return m.reply('❌ *Download gagal* (HTTP ' + res.status + ')\n\nCoba lagi nanti atau link lain.')
            }
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('❌ *Download gagal.*\n\n_' + err + '_')
        }

        const r = json.result || {}
        const medias = collectMedia(json)
        const items = medias
            .filter(it => typeOf(it) !== 'audio')
            .slice(0, MAX_MEDIA)

        if (!items.length) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('❌ *Tidak ada media yang bisa diunduh* dari link tersebut.')
        }

        const title = (r.title || r.judul || '').split('\n')[0].slice(0, 120)
        const source = r.source || r.hosting || r.platform || '-'
        const author = r.author || r.username || ''

        await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } })

        for (const [i, item] of items.entries()) {
            const u = item.url || item.link || item.download_url
            const type = typeOf(item)
            const kval = item.quality || item.resolution || item.quality_text || item.kualitas || ''
            const prefix = items.length > 1 ? (`📦 Media ${i + 1}/${items.length}\n`) : ''

            const dl = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } })
            if (!dl.ok) throw new Error('Gagal unduh media ' + i + 1 + ' (HTTP ' + dl.status + ')')
            const buffer = Buffer.from(await dl.arrayBuffer())
            if (!buffer.length) throw new Error('Media ' + i + 1 + ' kosong')

            const caption = `${prefix}*🎯 ALL IN ONE DOWNLOAD*\n\n▪️ *Judul:* ${title || '-'}\n▪️ *Source:* ${source}\n▪️ *Author:* ${author || '-'}\n▪️ *Kualitas:* ${kval || '-'}`
            if (type === 'video') {
                await saveVideo(buffer)
                await conn.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4', caption }, { quoted: m })
            } else if (type === 'image') {
                await saveImage(buffer)
                await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
            } else {
                await saveVideo(buffer)
                const fname = 'media_' + (i + 1) + (extOf(u) ? '.' + extOf(u) : '')
                await conn.sendMessage(m.chat, { document: buffer, mimetype: 'application/octet-stream', fileName: fname, caption }, { quoted: m })
            }
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('DONLODALL', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('❌ *Gagal memproses download.*\n\n_' + (e?.message || e) + '_')
    }
}

handler.command = ['donlodall', 'dlall']
export default handler