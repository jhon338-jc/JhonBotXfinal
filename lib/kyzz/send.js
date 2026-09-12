function collectMediaUrls(value, out = [], depth = 0) {
    if (!value || depth > 6 || out.length >= 5) return
    if (typeof value === 'string') {
        if (/^https?:\/\//i.test(value) && /\.(jpe?g|png|gif|webp|mp4|webm|m4a|mp3|ogg)$/i.test(value)) {
            out.push(value)
        }
        return
    }
    if (Array.isArray(value)) {
        for (const item of value) collectMediaUrls(item, out, depth + 1)
        return
    }
    if (typeof value === 'object') {
        for (const item of Object.values(value)) collectMediaUrls(item, out, depth + 1)
    }
}

export async function downloadQuotedMedia(m) {
    if (!m.quoted || typeof m.quoted.download !== 'function') {
        throw new Error('Reply ke gambar/video dulu!')
    }
    const media = await m.quoted.download()
    if (!Buffer.isBuffer(media) || media.length === 0) {
        throw new Error('Gagal mengambil media dari pesan yang di-reply.')
    }
    return media
}

function stringifyJson(value) {
    const raw = JSON.stringify(value, null, 2)
    return raw.length > 3500 ? raw.slice(0, 3500) + '\n...' : raw
}

export async function sendKyzzResult(conn, m, result, options = {}) {
    const caption = options.caption || ''

    if (result === undefined || result === null) {
        return m.reply('⚠️ API tidak mengembalikan data.')
    }

    if (Buffer.isBuffer(result)) {
        return conn.sendFile(m.chat, result, '', caption, m)
    }

    if (typeof result === 'string') {
        return m.reply(result)
    }

    if (!(result instanceof Response)) {
        return m.reply((caption ? `${caption}\n\n` : '') + stringifyJson(result))
    }

    const contentType = result.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
        const json = await result.json()
        await m.reply((caption ? `${caption}\n\n` : '') + stringifyJson(json))

        const urls = []
        collectMediaUrls(json, urls)
        for (const url of urls.slice(0, options.mediaLimit || 3)) {
            try {
                await conn.sendFile(m.chat, url, '', '', m)
            } catch {}
        }
        return
    }

    const arrayBuffer = await result.arrayBuffer()
    return conn.sendFile(m.chat, Buffer.from(arrayBuffer), '', caption, m)
}