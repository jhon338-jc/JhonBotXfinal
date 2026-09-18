import { log, COLORS } from '../../lib/rgb.js'
import { saveImage, saveVideo } from '../../lib/autosave.js'

const API_BASE = 'https://api.azbry.com/api/download/'
const ENDPOINTS = { tiktok: 'tiktok', instagram: 'instagram', facebook: 'facebook', youtube: 'ytmp4' }
const FALLBACK = 'allinonev2'
const MAX_MEDIA = 5
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

function qualityRank(label = '') {
    const l = String(label || '').toLowerCase()
    if (/4k|2160/.test(l)) return 0
    if (/1080|full hd|fhd/.test(l)) return 1
    if (/720|hd|high/.test(l)) return 2
    if (/480|sd/.test(l)) return 3
    if (/360/.test(l)) return 4
    return 5
}

function detectPlatform(url = '') {
    try {
        const host = new URL(url).hostname.toLowerCase()
        if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) return 'tiktok'
        if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram'
        if (host === 'facebook.com' || host.endsWith('.facebook.com') || host === 'fb.watch' || host === 'fb.com') return 'facebook'
        if (host === 'youtube.com' || host.endsWith('.youtube.com') || host === 'youtu.be') return 'youtube'
    } catch {}
    return 'other'
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

async function azfetch(ep, url) {
    const res = await fetch(API_BASE + ep + '?url=' + encodeURIComponent(url), {
        headers: { 'user-agent': UA },
        signal: AbortSignal.timeout(45000)
    })
    const json = await res.json().catch(() => null)
    return { res, json }
}

function isBad(json, platform) {
    if (!json || json.status === false || json.code === 403 || json.code === 500) return true
    const r = json.result || {}
    if (platform === 'tiktok') return !Array.isArray(r.links) || !r.links.length
    if (platform === 'instagram') return !json.videos?.length && !json.images?.length
    if (platform === 'facebook') return !Array.isArray(r.medias) || !r.medias.length
    if (platform === 'youtube') return !r.download
    return !json.result
}

async function azfetchAll(platform, url) {
    const attempts = []
    if (ENDPOINTS[platform]) attempts.push(ENDPOINTS[platform])
    attempts.push(FALLBACK)
    let lastErr = ''
    for (const ep of attempts) {
        const { res, json } = await azfetch(ep, url)
        if (!isBad(json, platform)) return { res, json }
        lastErr = json?.message || json?.error || (res.ok ? '' : ('HTTP ' + res.status))
    }
    return { res: null, json: null, lastErr }
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

function normalizeMedia(platform, json) {
    const media = []
    const pushUrl = (u, type, label = '') => {
        if (!u || !/^https?:\/\//i.test(String(u))) return
        media.push({ url: String(u), type, label: String(label || '').trim() })
    }
    const r = json?.result || {}
    if (platform === 'tiktok') {
        for (const l of r.links || []) pushUrl(l, 'video')
    } else if (platform === 'instagram') {
        for (const v of json.videos || []) pushUrl(typeof v === 'string' ? v : (v?.url || v?.download_url), 'video')
        for (const v of json.images || []) pushUrl(typeof v === 'string' ? v : (v?.url || v?.download_url), 'image')
    } else if (platform === 'facebook') {
        for (const m of r.medias || []) pushUrl(m?.url, 'video', m?.quality || '')
    } else if (platform === 'youtube') {
        if (r.download) pushUrl(r.download, 'video', '')
    } else if (platform === 'other') {
        for (const it of collectMedia(json)) {
            const u = it?.url || it?.link || it?.download_url
            const label = (it.label || it.kualitas || '').replace(/^download/i, '').replace(/[()]/g, '').trim()
            pushUrl(u, typeOf(it), label)
        }
    }
    const seen = new Set()
    return media.filter(m => {
        if (seen.has(m.url)) return false
        seen.add(m.url)
        return true
    })
}


let handler = async (m, { conn, text }) => {
    const url = pickUrl(text)
    if (!url) {
        return m.reply(' *Penggunaan:*\n\n`.donlodall <link>`\n\nContoh:\n`.donlodall https://vt.tiktok.com/ZSquqFFSh/`\n\n Support TikTok, Instagram, Facebook, YouTube, dan lainnya.')
    }

    try {
        const platform = detectPlatform(url)
        const clean = sanitizeUrl(url)
        let res, json, lastErr = ''
        for (const attempt of [url, clean].filter(Boolean)) {
            const got = await azfetchAll(platform, attempt)
            if (got.json && !isBad(got.json, platform)) { res = got.res; json = got.json; break }
            lastErr = got.json?.message || got.json?.error || got.lastErr || ''
            if (/rate limit/i.test(String(lastErr))) break
        }

        if (!json || isBad(json, platform)) {
            const msg = String(lastErr || '').toLowerCase()
            if (/rate limit/i.test(msg)) {
                return m.reply(' *API download sedang dibatasi (rate limit).*\n\nMohon tunggu beberapa menit lalu coba lagi.')
            }
            return m.reply(' *Download gagal.*\n\n_' + (lastErr || 'Tidak ditemukan media dari link tersebut.') + '_\n\nPastikan link valid & publik (video belum dihapus/private), lalu coba lagi.')
        }

        const media = normalizeMedia(platform, json)
        const vids = media.filter(m => m.type === 'video').sort((a, b) => qualityRank(a.label) - qualityRank(b.label))
        const imgs = media.filter(m => m.type === 'image')
        const chosen = vids.length ? vids.slice(0, 1) : imgs.slice(0, MAX_MEDIA)

        if (!chosen.length) {
            return m.reply(' *Tidak ada media yang bisa diunduh* dari link tersebut.')
        }

        const dlResults = await Promise.all(chosen.map(async (it) => {
            try {
                const dl = await fetch(it.url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(90000) })
                if (!dl.ok) throw new Error('Gagal unduh media (' + dl.status + ')')
                const buffer = Buffer.from(await dl.arrayBuffer())
                if (!buffer.length) throw new Error('Media kosong')
                if (buffer.length > 70 * 1024 * 1024) throw new Error('Media terlalu besar untuk WhatsApp (>70MB)')
                const type = sniff(buffer, dl.headers.get('content-type')).t
                return { ok: true, it, buffer, type }
            } catch (e) {
                return { ok: false, it, err: e?.message || e }
            }
        }))
        const okList = dlResults.filter(x => x.ok)
        if (!okList.length) {
            throw new Error('Semua media gagal diunduh: ' + dlResults.map(x => x.err || '').filter(Boolean).join('; '))
        }

        for (let idx = 0; idx < okList.length; idx++) {
            const { it, buffer, type } = okList[idx]
            const origIdx = chosen.indexOf(it)
            const caption = ''

            if (type === 'image') {
                await saveImage(buffer)
                await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
            } else if (type === 'audio') {
                await saveVideo(buffer)
                const aname = 'audio_' + (origIdx + 1) + '.mp3'
                await conn.sendMessage(m.chat, { document: buffer, mimetype: 'audio/mpeg', fileName: aname, caption }, { quoted: m })
            } else {
                await saveVideo(buffer)
                await conn.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4', caption }, { quoted: m })
            }
        }

    } catch (e) {
        console.error(log('DONLODALL', e?.message || e, COLORS.error))
        m.reply(' *Gagal memproses download.*\n\n_' + (e?.message || e) + '_')
    }
}

handler.command = ['donlodall', 'dlall']
export default handler
