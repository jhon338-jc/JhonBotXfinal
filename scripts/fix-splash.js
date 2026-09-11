import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ============================================================
//  JHON338 - Hapus splash + branding pihak ketiga dari levvleys
//  DEVELOPER BY JHON338  |  VERSION 3.4.0
//  Dijalankan otomatis setiap `npm install` (postinstall)
// ============================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const base = path.join(__dirname, '..', 'node_modules', '@whiskeysockets', 'baileys', 'lib')

const rgb = (text, c1, c2) =>
    text
        .split('')
        .map((ch, i, arr) => {
            const t = i / (arr.length - 1 || 1)
            const r = Math.round(c1[0] + (c2[0] - c1[0]) * t)
            const g = Math.round(c1[1] + (c2[1] - c1[1]) * t)
            const b = Math.round(c1[2] + (c2[2] - c1[2]) * t)
            return `\x1b[38;2;${r};${g};${b}m${ch}`
        })
        .join('') + '\x1b[0m'

const rgbTag = (tag, text, color) =>
    rgb(`[${tag}]`, color.c1, color.c2) + ' ' + text

const COLORS = {
    success: { c1: [80, 255, 120], c2: [255, 210, 80] },
    info: { c1: [0, 200, 255], c2: [120, 255, 220] },
    warn: { c1: [255, 170, 0], c2: [255, 255, 120] }
}

const files = [
    'index.js',
    'Utils/messages.js'
]

let changed = false

for (const rel of files) {
    const target = path.join(base, rel)
    if (!fs.existsSync(target)) continue
    let src = fs.readFileSync(target, 'utf-8')
    let fileChanged = false

    if (rel === 'index.js') {
        // Blok splash mulai dari `const gradients = [` sampai penutup `\n`);`
        const splash = /const gradients\s*=\s*\[[\s\S]*?\n`\);\n/
        if (splash.test(src)) {
            src = src.replace(splash, '')
            fileChanged = true
        }
    }

    // Bersihkan branding pihak ketiga (biar tidak tampil di WhatsApp)
    const scrubList = [
        [/Powered by LevviCode/g, 'Powered by Jhon338'],
        [/(- LevviCode)/g, '- Jhon338'],
        [/provider: 'LevviCode'/g, "provider: 'Jhon338'"]
    ]
    for (const [pattern, replacement] of scrubList) {
        const before = src
        src = src.replace(pattern, replacement)
        if (src !== before) fileChanged = true
    }

    if (fileChanged) {
        fs.writeFileSync(target, src)
        changed = true
        console.log(rgbTag('FIX-SPLASH', 'Diperbaiki: ' + rel, COLORS.success))
    }
}

console.log(rgbTag('FIX-SPLASH',
    changed
        ? 'Splash & branding pihak ketiga berhasil dihapus.'
        : 'Tidak ada branding yang ditemukan, skip.',
    changed ? COLORS.success : COLORS.info))