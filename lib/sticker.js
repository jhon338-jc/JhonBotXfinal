import sharp from 'sharp'

const STICKER_SIZE = 512

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

export async function makeSticker(buffer) {
    return sharp(buffer)
        .resize(STICKER_SIZE, STICKER_SIZE, { fit: 'cover' })
        .composite([{ input: watermarkSvg(), top: 0, left: 0 }])
        .webp({ lossless: true })
        .toBuffer()
}

export function videoStickerArgs(mp4Path, wmPath, outputPath, size = STICKER_SIZE, opts = {}) {
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
        '-i', wmPath,
        '-filter_complex',
        `[0:v]fps=${fps},scale=${size}:${size}:force_original_aspect_ratio=increase,crop=${size}:${size}[v0];[v0][1:v]overlay=0:0[v]`,
        '-map', '[v]',
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