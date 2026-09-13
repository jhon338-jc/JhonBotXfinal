import sharp from 'sharp'

const STICKER_SIZE = 512

const PACK_ID = 'com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1f4-423e-8df5-13a3a4a9a3a2'
const PLAYSTORE_LINK = 'https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android'
const ITUNES_LINK = 'https://apps.apple.com/us/app/pubg-mobile-3rd-anniversary/id1339475532'

export function watermarkSvg(size = STICKER_SIZE) {
    const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${size - 108}" width="${size}" height="108" fill="rgba(0,0,0,0.40)"/>
  <text x="${size - 20}" y="${size - 28}" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="end">JHON338</text>
</svg>`
    return Buffer.from(svg.trim())
}

export async function makeWatermarkPng(size = STICKER_SIZE) {
    return sharp(watermarkSvg(size)).png().toBuffer()
}

function createExif({ pack = 'JhonBot', author = 'JHON338' } = {}) {
    const json = JSON.stringify({
        'sticker-pack-id': PACK_ID,
        'sticker-pack-name': pack,
        'sticker-pack-publisher': author,
        'android-app-store-link': PLAYSTORE_LINK,
        'ios-app-store-link': ITUNES_LINK
    })
    const len = json.length
    const header = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x41, 0x57, 0x07, 0x00
    ])
    const count = Buffer.alloc(4)
    count.writeUInt32LE(len, 0)
    const offset = Buffer.from([0x16, 0x00, 0x00, 0x00])
    return Buffer.concat([header, count, offset, Buffer.from(json)])
}

function u32le(n) {
    const b = Buffer.alloc(4)
    b.writeUInt32LE(n, 0)
    return b
}

function injectExif(webp, exifChunk) {
    let offset = 12
    const chunks = []
    while (offset + 8 <= webp.length) {
        const fourcc = webp.toString('latin1', offset, offset + 4)
        const size = webp.readUInt32LE(offset + 4)
        const dataStart = offset + 8
        chunks.push({ fourcc, size, dataStart })
        offset = dataStart + size + (size % 2)
        if (offset > webp.length) break
    }
    if (!chunks.length) return webp

    let canvasW = STICKER_SIZE
    let canvasH = STICKER_SIZE
    let hasAlpha = false

    const bit = chunks.find(c => c.fourcc === 'VP8L' || c.fourcc === 'VP8 ')
    if (bit) {
        if (bit.fourcc === 'VP8L' && bit.size >= 5) {
            const v = webp.readUInt32LE(bit.dataStart + 1)
            canvasW = (v & 0x3fff) + 1
            canvasH = ((v >> 14) & 0x3fff) + 1
            hasAlpha = ((v >> 28) & 0x1) === 1
        } else if (bit.fourcc === 'VP8 ' && bit.size >= 10) {
            canvasW = webp.readUInt16LE(bit.dataStart + 6)
            canvasH = webp.readUInt16LE(bit.dataStart + 8)
        }
    }

    const out = [Buffer.from('RIFF'), u32le(0), Buffer.from('WEBP')]
    const vp8x = chunks.find(c => c.fourcc === 'VP8X')
    if (vp8x && vp8x.size >= 10) {
        canvasW = webp.readUIntLE(vp8x.dataStart + 4, 3) + 1
        canvasH = webp.readUIntLE(vp8x.dataStart + 7, 3) + 1
        hasAlpha = hasAlpha || ((webp[vp8x.dataStart] & 0x04) === 0x04)
        const data = Buffer.from(webp.subarray(vp8x.dataStart, vp8x.dataStart + vp8x.size))
        data[0] |= 0x08
        if (hasAlpha) data[0] |= 0x04
        out.push(Buffer.from('VP8X'), u32le(data.length), data)
        if (data.length % 2) out.push(Buffer.from([0]))
    } else {
        const flags = 0x08 | (hasAlpha ? 0x04 : 0)
        const data = Buffer.from([
            flags, 0, 0, 0,
            (canvasW - 1) & 0xff, ((canvasW - 1) >> 8) & 0xff, ((canvasW - 1) >> 16) & 0xff,
            (canvasH - 1) & 0xff, ((canvasH - 1) >> 8) & 0xff, ((canvasH - 1) >> 16) & 0xff
        ])
        out.push(Buffer.from('VP8X'), u32le(data.length), data)
    }

    out.push(Buffer.from('EXIF'), u32le(exifChunk.length), exifChunk)
    if (exifChunk.length % 2) out.push(Buffer.from([0]))

    for (const c of chunks) {
        if (c.fourcc === 'VP8X') continue
        out.push(Buffer.from(c.fourcc), u32le(c.size), Buffer.from(webp.subarray(c.dataStart, c.dataStart + c.size)))
        if (c.size % 2) out.push(Buffer.from([0]))
    }

    const body = Buffer.concat(out)
    body.writeUInt32LE(body.length - 8, 4)
    return body
}

export function addStickerMetadata(webp, { pack = 'JhonBot', author = 'JHON338' } = {}) {
    if (!Buffer.isBuffer(webp) || webp.length < 12) return webp
    if (webp.toString('latin1', 0, 4) !== 'RIFF' || webp.toString('latin1', 8, 12) !== 'WEBP') return webp
    const exifChunk = Buffer.concat([Buffer.from('Exif\0\0', 'utf8'), createExif({ pack, author })])
    return injectExif(webp, exifChunk)
}

export async function makeSticker(buffer) {
    const webp = await sharp(buffer)
        .resize(STICKER_SIZE, STICKER_SIZE, { fit: 'cover' })
        .webp({ lossless: true })
        .toBuffer()
    return addStickerMetadata(webp)
}

export function videoStickerArgs(mp4Path, outputPath, size = STICKER_SIZE, opts = {}) {
    const { fps, bitrate, maxrate, bufsize, duration } = {
        fps: 10,
        bitrate: '350k',
        maxrate: '450k',
        bufsize: '800k',
        duration: 10,
        ...opts
    }
    return [
        '-i', mp4Path,
        '-vf',
        `fps=${fps},scale=${size}:${size}:force_original_aspect_ratio=increase,crop=${size}:${size}`,
        '-t', String(duration),
        '-an',
        '-c:v', 'libwebp',
        '-lossless', '0',
        '-preset', 'default',
        '-loop', '0',
        '-b:v', bitrate,
        '-maxrate', maxrate,
        '-bufsize', bufsize,
        outputPath
    ]
}