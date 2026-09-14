import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '..', 'src', 'img')
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true })

function svgBox(w, h, bg1, bg2, lines, sublines = []) {
    const textEls = lines.map((l, i) =>
        `<text x="${w / 2}" y="${180 + i * 60}" text-anchor="middle" fill="${l.color}" font-family="Arial,sans-serif" font-size="${l.size || 36}" font-weight="${l.bold ? 'bold' : 'normal'}">${esc(l.text)}</text>`
    ).join('\n    ')
    const subEls = sublines.map((l, i) =>
        `<text x="${w / 2}" y="${180 + lines.length * 60 + 40 + i * 38}" text-anchor="middle" fill="${l.color}" font-family="Arial,sans-serif" font-size="${l.size || 22}" font-weight="${l.bold ? 'bold' : 'normal'}">${esc(l.text)}</text>`
    ).join('\n    ')
    return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="20" y="20" width="${w - 40}" height="${h - 40}" rx="24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  ${textEls}
  ${subEls}
</svg>`
}

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

async function make(w, h, bg1, bg2, lines, sublines, file) {
    const svg = svgBox(w, h, bg1, bg2, lines, sublines)
    await sharp(Buffer.from(svg)).png().toFile(path.join(imgDir, file))
    console.log('Created ' + file)
}

// foto_menu.png - bot menu profile
await make(640, 640, '#1a1a2e', '#16213e', [
    { text: 'JHONXFINAL', size: 48, bold: true, color: '#e2e2e2' },
    { text: 'v3.3.8', size: 30, color: '#a0a0a0' },
    { text: 'BOT MULTIFUNGSI', size: 24, color: '#888' },
    { text: 'AKTIF 24/7', size: 22, color: '#6c5ce7' }
], [
    { text: 'Developer: Jhon338', size: 20, color: '#666' }
], 'foto_menu.png')

// premium.png - premium profile
await make(640, 640, '#1a0a2e', '#2d1b69', [
    { text: 'PREMIUM', size: 52, bold: true, color: '#f0c040' },
    { text: 'JHONXFINAL', size: 30, color: '#e0d080' },
    { text: 'LANGGANAN EKSKLUSIF', size: 22, color: '#a08030' }
], [
    { text: 'Ketik .premium', size: 20, color: '#807030' }
], 'premium.png')

// masuk.png - welcome image
await make(640, 640, '#0a2e1a', '#1b6945', [
    { text: 'WELCOME', size: 52, bold: true, color: '#e2e2e2' },
    { text: 'SELAMAT DATANG', size: 30, color: '#90d0a0' },
    { text: 'DI GRUP INI', size: 24, color: '#80b090' }
], [
    { text: 'JhonXfinal Bot', size: 20, color: '#609070' }
], 'masuk.png')

// keluar.png - leave image
await make(640, 640, '#2e1a1a', '#694545', [
    { text: 'GOODBYE', size: 52, bold: true, color: '#e2e2e2' },
    { text: 'SELAMAT JALAN', size: 30, color: '#d0a0a0' },
    { text: 'SAMPAI JUMPA', size: 24, color: '#b08080' }
], [
    { text: 'JhonXfinal Bot', size: 20, color: '#906060' }
], 'keluar.png')

console.log('All images generated.')
