import fs from 'fs'

export const KYZZ_BASE_URL = 'https://api.kyzzz.xyz'
const DEFAULT_TIMEOUT = 30000
const MAX_RETRY_429 = 1

function loadEnv(file = './.env') {
    try {
        if (!fs.existsSync(file)) return
        const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/)
        for (const raw of lines) {
            const line = raw.trim()
            if (!line || line.startsWith('#')) continue
            const idx = line.indexOf('=')
            if (idx === -1) continue
            const key = line.slice(0, idx).trim()
            let value = line.slice(idx + 1).trim()
            if (!key) continue
            if (process.env[key] !== undefined && process.env[key] !== '') continue
            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1)
            }
            process.env[key] = value
        }
    } catch {}
}

loadEnv()

export function getKyzzHeaders() {
    const headers = {}
    if (process.env.KYZZ_API_KEY) headers['x-api-key'] = process.env.KYZZ_API_KEY
    return headers
}

export function requireKyzzKey() {
    if (!process.env.KYZZ_API_KEY) {
        throw new Error('KYZZ_API_KEY belum diset. Tambahkan di file .env')
    }
}

export async function fetchWithTimeout(url, options = {}, timeout = DEFAULT_TIMEOUT) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal
        })
    } finally {
        clearTimeout(timer)
    }
}

function describeStatus(status) {
    const map = {
        400: 'Bad Request - parameter salah',
        401: 'Unauthorized - API key tidak valid',
        403: 'Forbidden - akses ditolak / membership tidak aktif',
        404: 'Not Found - endpoint tidak ditemukan',
        429: 'Too Many Requests - limit request tercapai',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable'
    }
    return map[status] || 'Error'
}

async function kyzzFetch(method, endpoint, { params = {}, json, form, timeout } = {}, retries = MAX_RETRY_429) {
    const url = new URL(KYZZ_BASE_URL + endpoint)

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value)
        }
    }

    const options = {
        method,
        headers: getKyzzHeaders()
    }

    if (json !== undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(json)
    }

    if (form !== undefined) {
        options.body = form
    }

    let attempt = 0
    const canRetry = options.body === undefined || typeof options.body === 'string'
    while (true) {
        const response = await fetchWithTimeout(url, options, timeout)

        if (response.status === 429 && attempt < retries && canRetry) {
            attempt++
            await new Promise(r => setTimeout(r, 1000 * attempt))
            continue
        }

        if (!response.ok) {
            throw new Error(
                `KYZZ API request failed: HTTP ${response.status} ${describeStatus(response.status)}`
            )
        }

        return response
    }
}

export async function kyzzGet(endpoint, params = {}, options = {}) {
    return kyzzFetch('GET', endpoint, { params, ...options })
}

export async function kyzzGetJson(endpoint, params = {}, options = {}) {
    const response = await kyzzGet(endpoint, params, options)
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
        throw new Error(`KYZZ API response bukan JSON: ${contentType}`)
    }
    return response.json()
}

export async function kyzzGetBuffer(endpoint, params = {}, options = {}) {
    const response = await kyzzGet(endpoint, params, options)
    const arrayBuffer = await response.arrayBuffer()
    return {
        buffer: Buffer.from(arrayBuffer),
        contentType: response.headers.get('content-type') || 'application/octet-stream'
    }
}

export async function kyzzPostJson(endpoint, body = {}, options = {}) {
    return kyzzFetch('POST', endpoint, { json: body, ...options })
}

export async function kyzzPostMultipart(endpoint, formData, options = {}) {
    return kyzzFetch('POST', endpoint, { form: formData, ...options })
}

export function appendMedia(form, field, value, options = {}) {
    if (value === undefined || value === null || value === '') return
    if (Buffer.isBuffer(value)) {
        const type = options.type || 'application/octet-stream'
        form.append(field, new Blob([value], { type }), options.filename || `media_${Date.now()}.bin`)
    } else if (typeof Blob !== 'undefined' && value instanceof Blob) {
        form.append(field, value, options.filename || 'media.bin')
    } else {
        form.append(field, value)
    }
}