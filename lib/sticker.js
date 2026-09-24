import sharp from 'sharp'

const STICKER_SIZE = 512

const PACK_ID = 'com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1f4-423e-8df5-13a3a4a9a3a2'
const PLAYSTORE_LINK = 'https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android'
const ITUNES_LINK = 'https://apps.apple.com/us/app/pubg-mobile-3rd-anniversary/id1339475532'

// Outline "JhonBot" (Poppins ExtraBold, letter-spacing 2px, ukuran font 46px,
// baseline y=0, dimulai x=0) — digenerate sekali pakai opentype.js,
// sumber: src/fonts/poppins/Poppins-ExtraBold.ttf (lisensi OFL).
const WATERMARK_TEXT_D = 'M15.04-32.43L24.06-32.43L24.06-10.95Q24.06-5.47 21.09-2.58Q18.12 0.32 12.93 0.32Q7.41 0.32 4.12-2.76Q0.83-5.84 0.83-11.64L9.75-11.64Q9.80-7.82 12.56-7.82Q15.04-7.82 15.04-10.95 M48.41-26.04Q52.83-26.04 55.43-23.07Q58.03-20.10 58.03-15.04L58.03 0L49.01 0L49.01-13.85Q49.01-16.05 47.86-17.32Q46.71-18.58 44.78-18.58Q42.76-18.58 41.61-17.32Q40.46-16.05 40.46-13.85L40.46 0L31.44 0L31.44-34.04L40.46-34.04L40.46-22.13Q41.65-23.87 43.70-24.95Q45.75-26.04 48.41-26.04 M77 0.32Q73.14 0.32 70.08-1.29Q67.02-2.90 65.27-5.89Q63.52-8.88 63.52-12.93Q63.52-16.93 65.30-19.92Q67.07-22.91 70.13-24.52Q73.18-26.13 77.05-26.13Q80.91-26.13 83.97-24.52Q87.03-22.91 88.80-19.92Q90.57-16.93 90.57-12.93Q90.57-8.92 88.80-5.91Q87.03-2.90 83.95-1.29Q80.87 0.32 77 0.32M77-7.50Q78.89-7.50 80.15-8.90Q81.42-10.30 81.42-12.93Q81.42-15.55 80.15-16.93Q78.89-18.31 77.05-18.31Q75.21-18.31 73.97-16.93Q72.72-15.55 72.72-12.93Q72.72-10.26 73.92-8.88Q75.12-7.50 77-7.50 M113.13-26.04Q117.60-26.04 120.22-23.07Q122.84-20.10 122.84-15.04L122.84 0L113.82 0L113.82-13.85Q113.82-16.05 112.67-17.32Q111.52-18.58 109.59-18.58Q107.57-18.58 106.42-17.32Q105.27-16.05 105.27-13.85L105.27 0L96.25 0L96.25-25.81L105.27-25.81L105.27-22.13Q106.46-23.87 108.49-24.95Q110.51-26.04 113.13-26.04 M150.51-16.65Q153.36-16.01 155.04-13.82Q156.72-11.64 156.72-8.83Q156.72-4.69 153.87-2.35Q151.01 0 145.86 0L129.81 0L129.81-32.43L145.36-32.43Q150.32-32.43 153.15-30.22Q155.98-28.01 155.98-24.01Q155.98-21.16 154.49-19.25Q152.99-17.34 150.51-16.65M138.82-25.25L138.82-19.55L143.38-19.55Q146.78-19.55 146.78-22.36Q146.78-25.25 143.38-25.25L138.82-25.25M144.07-7.27Q147.47-7.27 147.47-10.12Q147.47-11.59 146.57-12.37Q145.68-13.16 144.02-13.16L138.82-13.16L138.82-7.27 M174.68 0.32Q170.82 0.32 167.76-1.29Q164.70-2.90 162.95-5.89Q161.20-8.88 161.20-12.93Q161.20-16.93 162.97-19.92Q164.74-22.91 167.80-24.52Q170.86-26.13 174.73-26.13Q178.59-26.13 181.65-24.52Q184.71-22.91 186.48-19.92Q188.25-16.93 188.25-12.93Q188.25-8.92 186.48-5.91Q184.71-2.90 181.63-1.29Q178.54 0.32 174.68 0.32M174.68-7.50Q176.57-7.50 177.83-8.90Q179.10-10.30 179.10-12.93Q179.10-15.55 177.83-16.93Q176.57-18.31 174.73-18.31Q172.89-18.31 171.64-16.93Q170.40-15.55 170.40-12.93Q170.40-10.26 171.60-8.88Q172.79-7.50 174.68-7.50 M206.53-7.68L209.16-7.68L209.16 0L205.25 0Q195.36 0 195.36-9.80L195.36-18.31L192.18-18.31L192.18-25.81L195.36-25.81L195.36-32.06L204.42-32.06L204.42-25.81L209.11-25.81L209.11-18.31L204.42-18.31L204.42-9.66Q204.42-8.60 204.90-8.14Q205.38-7.68 206.53-7.68'
// Lebar visual "JhonBot" (termasuk letter-spacing antar glyph) pada ukuran font 46px.
const WATERMARK_TEXT_W = 210.72

export function watermarkSvg(size = STICKER_SIZE) {
    const k = size / 46
    const startX = (size - 20) - WATERMARK_TEXT_W * k
    const baseY = size - 28
    const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${size - 108}" width="${size}" height="108" fill="rgba(0,0,0,0.40)"/>
  <g transform="translate(${startX} ${baseY}) scale(${k})">
    <path d="${WATERMARK_TEXT_D}" fill="#ffffff"/>
  </g>
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