import { rgbTag, COLORS } from '../../lib/rgb.js'
import { saveImage, saveVideo } from '../../lib/autosave.js'

const API = 'https://api.azbry.com/api/download/allinonev2'
const MAX_IMAGES = 5
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const TIKTOK_RE = /(^|\.)tiktok\.com$/i

function formatCount(n) {
    const v = Number(n)
    if (!Number.isFinite(v)) return String(n)
    if (Math.abs(v) < 1000) return String(v)
    const d = v >= 1e9 ? 1e9 : v >= 1e6 ? 1e6 : 1e3
    return (v / d).toFixed(1).replace(/\.0$/, '') + (d >= 1e9 ? 'B' : d >= 1e6 ? 'M' : 'K')
}

function formatDuration(sec) {
    const s = Math.max(0, Math.round(Number(sec) || 0))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const ss = s % 60
    const pad = n => String(n).padStart(2, '0')
    return h ? `${h}:${pad(m)}:${pad(ss)}` : `${m}:${pad(ss)}`
}

function fmtDate(unixSec) {
    const d = new Date(Number(unixSec) * 1000)
    if (isNaN(d)) return ''
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

function tiktokHost(url = '') {
    try { return TIKTOK_RE.test(new URL(url).hostname) } catch { return false }
}

async function fetchTikTokMeta(inputUrl) {
    let u = inputUrl
    for (let i = 0; i < 6; i++) {
        const r = await fetch(u, { headers: { 'user-agent': UA }, redirect: 'manual', signal: AbortSignal.timeout(20000) })
        if (r.status >= 300 && r.status < 400) {
            const loc = r.headers.get('location')
            if (!loc) break
            u = new URL(loc, u).toString()
        } else break
    }
    if (!/tiktok\.com/.test(u)) return null
    const clean = new URL(u)
    clean.search = ''
    clean.hash = ''
    const r = await fetch(clean.toString(), { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(25000) })
    const html = await r.text()
    const m = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/)
    if (!m) return null
    return JSON.parse(m[1])?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct || null
}

function ttInfoBlock(t = {}) {
    const v = t.video || {}
    const m = t.music || {}
    const a = t.author || {}
    const s = t.stats || {}
    const aStats = t.authorStats || {}
    const lines = []
    const caption = String(t.desc || '').trim()
    if (caption) lines.push(`〽️ *Caption:* ${caption.slice(0, 600)}`)
    const tags = [...new Set([
        ...(Array.isArray(t.challenges) ? t.challenges.map(c => c.title) : []),
        ...(Array.isArray(t.channelTags) ? t.channelTags.map(c => c.title) : []),
        ...(Array.isArray(t.textExtra) ? t.textExtra.map(x => x.hashtagName).filter(Boolean) : [])
    ])].filter(Boolean)
    if (tags.length) lines.push(`🏷️ *Tag:* ${tags.map(h => '#' + h.replace(/^#/, '')).join(' ')}`)
    if (v.duration) lines.push(`⏱️ *Durasi:* ${formatDuration(v.duration)}`)
    if (m.title) {
        let mus = String(m.title)
        if (m.authorName && !mus.includes(m.authorName)) mus += ' — ' + m.authorName
        lines.push(`🎵 *Musik:* ${mus}`)
    }
    if (v.ratio) lines.push(`📐 *Kualitas:* ${v.ratio}` + (v.videoQuality && v.videoQuality !== 'normal' ? ' · ' + v.videoQuality : ''))
    const statsParts = []
    if (s.playCount) statsParts.push(`👁 ${formatCount(s.playCount)}`)
    if (s.diggCount) statsParts.push(`❤️ ${formatCount(s.diggCount)}`)
    if (s.commentCount) statsParts.push(`💬 ${formatCount(s.commentCount)}`)
    if (s.shareCount) statsParts.push(`↪️ ${formatCount(s.shareCount)}`)
    if (s.collectCount) statsParts.push(`🔖 ${formatCount(s.collectCount)}`)
    if (statsParts.length) lines.push(`📊 *Statistik:* ${statsParts.join(' · ')}`)
    if (a.nickname) lines.push(`👤 *Author:* ${a.nickname}` + (a.uniqueId ? ` (@${a.uniqueId})` : ''))
    if (aStats.followerCount) lines.push(`🙌 *Followers:* ${formatCount(aStats.followerCount)}`)
    if (t.createTime && fmtDate(t.createTime)) lines.push(`🗓️ *Posting:* ${fmtDate(t.createTime)}`)
    return lines.join('\n')
}

function pickUrl(text = '') {
    const m = String(text).match(/https?:\/\/[^\s]+/i)
    return m ? m[0].replace(/[)\]}>]+$/, '') : ''
}

function sanitizeUrl(url = '') {
    try {
        const u = new URL(url)
        u.search = ''
        u.hash = ''
        return u.toString().replace(/\/$/, '')
    } catch {
        return ''
    }
}

async function fetchAzbry(url) {
    const res = await fetch(API + '?url=' + encodeURIComponent(url) + '&format=.mp4', {
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(30000)
    })
    const json = await res.json().catch(() => null)
    return { res, json }
}

function labelOf(item = {}) {
    return String(item?.label || '').toLowerCase() + ' ' + String(item?.name || '').toLowerCase()
}

function typeOf(item = {}) {
    const raw = [item.type, item.mime, item.mimeType, item.extension, item.file_type, item.format, labelOf(item), item.url].filter(Boolean).join(' ').toLowerCase()
    if (/audio|mp3|m4a|opus|wav|sp3|sp5/.test(raw) && !/video/.test(raw)) return 'audio'
    if (/image|jpe?g|png|webp|gif|heic/.test(raw) && !/video/.test(raw)) return 'image'
    return 'video'
}

function sniff(buffer, contentType = '') {
    const magic = buffer.subarray(0, 12)
    if (magic.length > 10 && magic.subarray(4, 8).toString('latin1') === 'ftyp') return { t: 'video', mime: 'video/mp4' }
    if (magic[0] === 0xff && magic[1] === 0xd8 && magic[2] === 0xff) return { t: 'image', mime: 'image/jpeg' }
    if (magic.subarray(0, 4).toString('latin1') === '\x89PNG') return { t: 'image', mime: 'image/png' }
    if (magic.subarray(0, 4).toString('latin1') === 'RIFF' && magic.subarray(8, 12).toString('latin1') === 'WEBP') return { t: 'image', mime: 'image/webp' }
    const ct = String(contentType || '').toLowerCase()
    if (/image\//.test(ct)) return { t: 'image', mime: ct }
    if (/video\//.test(ct)) return { t: 'video', mime: ct }
    if (/audio\//.test(ct)) return { t: 'audio', mime: ct }
    return { t: 'video', mime: 'video/mp4' }
}

function score(item = {}) {
    const l = labelOf(item)
    let s = 0
    if (/hd|4k|1080|720|high/.test(l)) s += 3
    if (/no[_-]?watermark/.test(l)) s += 2
    if (/wartermark|watermark/.test(l) && !/no_?watermark/.test(l)) s -= 2
    if (/thumb/.test(l)) s -= 5
    return s
}

function collectMedia(json) {
    const candidates = []
    const add = (arr) => { if (Array.isArray(arr)) candidates.push(...arr) }
    add(json?.result?.downloads)
    add(json?.result?.medias)
    add(json?.result?.resource)
    add(json?.result?.links)
    add(json?.result?.media)
    add(json?.data?.medias)
    add(json?.medias)
    add(json?.links)

    const direct = json?.result?.download_url || json?.result?.url || json?.result?.link
    if (direct) candidates.push({ url: direct, type: json?.result?.file_type || json?.result?.type || '' })

    const seen = new Map()
    for (const c of candidates) {
        const u = c?.url || c?.link || c?.download_url
        if (!u || !/^https?:\/\//i.test(u)) continue
        if (typeOf(c) === 'audio') continue
        if (!seen.has(u)) seen.set(u, c)
    }
    const arr = [...seen.values()]
    arr.sort((a, b) => score(b) - score(a))
    return arr
}

let handler = async (m, { conn, text }) => {
    const url = pickUrl(text)
    if (!url) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ *Penggunaan:*\n\n`.donlodall <link>`\n\nContoh:\n`.donlodall https://vt.tiktok.com/ZSquqFFSh/`\n\n✅ Bisa TikTok, Instagram, Facebook, X, Pinterest, dll.')
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    try {
        const clean = sanitizeUrl(url)
        let res, json, lastErr = ''
        for (const attempt of [url, clean].filter(Boolean)) {
            ;({ res, json } = await fetchAzbry(attempt))
            const bad = !json || json.status === false || json.code === 403 || json.code === 500 || !json.result
            if (!bad) break
            lastErr = json?.error || json?.message || (res.ok ? '' : ('HTTP ' + res.status))
        }

        if (!json || json.status === false || json.code === 403 || json.code === 500 || !json.result) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('❌ *Download gagal.*\n\n_' + (lastErr || 'Unknown error') + '_\n\nPastikan link valid (video belum dihapus/private). Kalau masih gagal, coba link TikTok lain.')
        }

        const r = json.result || {}
        const items = collectMedia(json)
        const vids = items.filter(it => typeOf(it) === 'video')
        const imgs = items.filter(it => typeOf(it) === 'image')
        const chosen = vids.length ? vids.slice(0, 1) : imgs.slice(0, MAX_IMAGES)
        const multi = chosen.length > 1

        if (!chosen.length) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
            return m.reply('❌ *Tidak ada media yang bisa diunduh* dari link tersebut.')
        }

        const title = (r.title || r.judul || '').split('\n')[0].slice(0, 120)
        const author = r.owner || r.author || r.username || ''

        let ttMeta = null
        if (tiktokHost(url)) {
            try { ttMeta = await fetchTikTokMeta(url) } catch { ttMeta = null }
        }

        if (!multi) {
            await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } })
        }

        for (const [i, item] of chosen.entries()) {
            const u = item.url || item.link || item.download_url
            const label = (item.label || item.kualitas || '').replace(/^download/i, '').replace(/[()]/g, '').trim()
            let cap = (multi ? `📦 Media ${i + 1}/${chosen.length}\n\n` : '') +
                `*🎯 ALL IN ONE DOWNLOAD*\n\n`
            if (ttMeta) {
                cap += ttInfoBlock(ttMeta)
                if (label) cap += `\n▪️ *Tipe:* ${label}`
            } else {
                cap += `▪️ *Judul:* ${title || '-'}\n▪️ *Author:* ${author || '-'}`
                if (label) cap += `\n▪️ *Tipe:* ${label}`
            }
            const caption = cap

            const dl = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, signal: AbortSignal.timeout(90000) })
            if (!dl.ok) throw new Error('Gagal unduh media (' + dl.status + ')')
            const buffer = Buffer.from(await dl.arrayBuffer())
            if (!buffer.length) throw new Error('Media kosong')
            if (buffer.length > 70 * 1024 * 1024) throw new Error('Media terlalu besar untuk WhatsApp (>70MB)')

            const type = sniff(buffer, dl.headers.get('content-type')).t
            if (type === 'image') {
                await saveImage(buffer)
                await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
            } else if (type === 'audio') {
                await saveVideo(buffer)
                const aname = 'audio_' + (i + 1) + '.mp3'
                await conn.sendMessage(m.chat, { document: buffer, mimetype: 'audio/mpeg', fileName: aname, caption }, { quoted: m })
            } else {
                await saveVideo(buffer)
                await conn.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4', caption }, { quoted: m })
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