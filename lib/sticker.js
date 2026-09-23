import sharp from 'sharp'

const STICKER_SIZE = 512

const PACK_ID = 'com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1f4-423e-8df5-13a3a4a9a3a2'
const PLAYSTORE_LINK = 'https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android'
const ITUNES_LINK = 'https://apps.apple.com/us/app/pubg-mobile-3rd-anniversary/id1339475532'

// Outline "JHON338" (Poppins ExtraBold, letter-spacing 2px, ukuran font 46px,
// baseline y=0, dimulai x=0) — digenerate sekali pakai opentype.js,
// sumber: src/fonts/poppins/Poppins-ExtraBold.ttf (lisensi OFL).
const WATERMARK_TEXT_D = 'M15.04-32.43L24.06-32.43L24.06-10.95Q24.06-5.47 21.09-2.58Q18.12 0.32 12.93 0.32Q7.41 0.32 4.12-2.76Q0.83-5.84 0.83-11.64L9.75-11.64Q9.80-7.82 12.56-7.82Q15.04-7.82 15.04-10.95 M51.45-32.43L60.47-32.43L60.47 0L51.45 0L51.45-13.02L40.46-13.02L40.46 0L31.44 0L31.44-32.43L40.46-32.43L40.46-20.24L51.45-20.24 M83.17 0.32Q78.61 0.32 74.79-1.82Q70.98-3.96 68.75-7.75Q66.51-11.55 66.51-16.33Q66.51-21.11 68.75-24.91Q70.98-28.70 74.79-30.82Q78.61-32.94 83.17-32.94Q87.77-32.94 91.56-30.82Q95.36-28.70 97.56-24.91Q99.77-21.11 99.77-16.33Q99.77-11.55 97.56-7.75Q95.36-3.96 91.54-1.82Q87.72 0.32 83.17 0.32M83.17-8.05Q86.62-8.05 88.62-10.30Q90.62-12.56 90.62-16.33Q90.62-20.19 88.62-22.43Q86.62-24.66 83.17-24.66Q79.67-24.66 77.69-22.43Q75.71-20.19 75.71-16.33Q75.71-12.51 77.69-10.28Q79.67-8.05 83.17-8.05 M135.86-32.43L135.86 0L126.84 0L114.84-18.12L114.84 0L105.82 0L105.82-32.43L114.84-32.43L126.84-14.08L126.84-32.43 M142.64-23.60Q142.83-28.80 145.86-31.58Q148.90-34.36 154.33-34.36Q157.87-34.36 160.38-33.14Q162.88-31.92 164.17-29.83Q165.46-27.74 165.46-25.12Q165.46-21.99 163.94-20.12Q162.42-18.26 160.49-17.62L160.49-17.43Q166.06-15.36 166.06-9.52Q166.06-6.62 164.72-4.42Q163.39-2.21 160.86-0.97Q158.33 0.28 154.83 0.28Q149.08 0.28 145.75-2.51Q142.41-5.29 142.27-11.04L151.06-11.04Q150.97-9.20 151.84-8.19Q152.72-7.18 154.46-7.18Q155.80-7.18 156.56-8Q157.32-8.83 157.32-10.21Q157.32-11.96 156.19-12.79Q155.06-13.62 152.53-13.62L150.92-13.62L150.92-20.93L152.49-20.93Q154.23-20.88 155.45-21.50Q156.67-22.13 156.67-24.01Q156.67-25.44 155.98-26.15Q155.29-26.86 154.10-26.86Q152.76-26.86 152.14-25.92Q151.52-24.98 151.43-23.60 M172.70-23.60Q172.89-28.80 175.92-31.58Q178.96-34.36 184.39-34.36Q187.93-34.36 190.44-33.14Q192.94-31.92 194.23-29.83Q195.52-27.74 195.52-25.12Q195.52-21.99 194-20.12Q192.48-18.26 190.55-17.62L190.55-17.43Q196.12-15.36 196.12-9.52Q196.12-6.62 194.78-4.42Q193.45-2.21 190.92-0.97Q188.39 0.28 184.89 0.28Q179.14 0.28 175.81-2.51Q172.47-5.29 172.33-11.04L181.12-11.04Q181.03-9.20 181.90-8.19Q182.78-7.18 184.52-7.18Q185.86-7.18 186.62-8Q187.38-8.83 187.38-10.21Q187.38-11.96 186.25-12.79Q185.12-13.62 182.59-13.62L180.98-13.62L180.98-20.93L182.55-20.93Q184.29-20.88 185.51-21.50Q186.73-22.13 186.73-24.01Q186.73-25.44 186.04-26.15Q185.35-26.86 184.16-26.86Q182.82-26.86 182.20-25.92Q181.58-24.98 181.49-23.60 M207.78-18.26Q203.68-20.52 203.68-25.30Q203.68-27.78 204.99-29.83Q206.30-31.88 208.97-33.10Q211.64-34.32 215.55-34.32Q219.46-34.32 222.13-33.10Q224.80-31.88 226.11-29.83Q227.42-27.78 227.42-25.30Q227.42-22.86 226.34-21.09Q225.26-19.32 223.32-18.26Q225.72-17.02 226.96-14.95Q228.20-12.88 228.20-10.07Q228.20-6.72 226.50-4.30Q224.80-1.89 221.92-0.64Q219.05 0.60 215.55 0.60Q212.05 0.60 209.18-0.64Q206.30-1.89 204.60-4.30Q202.90-6.72 202.90-10.07Q202.90-12.88 204.14-14.95Q205.38-17.02 207.78-18.26M218.59-23.87Q218.59-25.48 217.76-26.38Q216.93-27.28 215.55-27.28Q214.22-27.28 213.37-26.36Q212.51-25.44 212.51-23.87Q212.51-22.31 213.37-21.44Q214.22-20.56 215.55-20.56Q216.88-20.56 217.74-21.44Q218.59-22.31 218.59-23.87M215.55-14.40Q213.80-14.40 212.72-13.36Q211.64-12.33 211.64-10.58Q211.64-8.92 212.70-7.87Q213.76-6.81 215.55-6.81Q217.34-6.81 218.38-7.87Q219.41-8.92 219.41-10.58Q219.41-12.33 218.36-13.36Q217.30-14.40 215.55-14.40'
// Lebar visual "JHON338" (termasuk letter-spacing antar glyph) pada ukuran font 46px.
const WATERMARK_TEXT_W = 230.59

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

function createExif({ pack = 'JhonBotXfinal', author = 'JHON338' } = {}) {
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

export function addStickerMetadata(webp, { pack = 'JhonBotXfinal', author = 'JHON338' } = {}) {
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