// ============================================================
//  RGB — Terminal color system (gradient RGB) + neat logger
//  • rgb()    : gradient text
//  • log()    : unified log line  [HH:MM:SS] [TAG       ] msg
//  • divider(): colored section separator
//  • COLORS   : level color presets
// ============================================================

const C1 = [140, 90, 255]
const C2 = [90, 200, 255]

const DIM = '\x1b[90m'
const RESET = '\x1b[0m'

export function rgb(text, c1 = C1, c2 = C2) {
    return text
        .split('')
        .map((ch, i, arr) => {
            const t = i / (arr.length - 1 || 1)
            const r = Math.round(c1[0] + (c2[0] - c1[0]) * t)
            const g = Math.round(c1[1] + (c2[1] - c1[1]) * t)
            const b = Math.round(c1[2] + (c2[2] - c1[2]) * t)
            return `\x1b[38;2;${r};${g};${b}m${ch}`
        })
        .join('') + RESET
}

export function timeWIB() {
    try {
        return new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false })
    } catch {
        return new Date().toLocaleTimeString('id-ID', { hour12: false })
    }
}

export const COLORS = {
    info:    { c1: [0, 200, 255],    c2: [120, 255, 220] },
    success: { c1: [80, 255, 120],   c2: [255, 210, 80] },
    warn:    { c1: [255, 170, 0],    c2: [255, 255, 120] },
    error:   { c1: [255, 60, 80],    c2: [255, 120, 60] },
    plugin:  { c1: [140, 90, 255],   c2: [90, 200, 255] },
    start:   { c1: [255, 80, 120],   c2: [255, 180, 210] },
}

// Dukung warna: { c1, c2 } | [r,g,b] | undef
function pick(color) {
    if (color && Array.isArray(color.c1)) return { c1: color.c1, c2: color.c2 || C2 }
    if (Array.isArray(color)) return { c1: color, c2: C2 }
    return { c1: C1, c2: C2 }
}

// ==================== LOG UTAMA (rapih & seragam) ====================
// Output: 14:03:22 [PLUGIN      ] Loaded plugins/user/brat.js
export function log(tag, text, color) {
    const { c1, c2 } = pick(color)
    const t = String(tag).toUpperCase().padEnd(12, ' ')
    return `${DIM}${timeWIB()}${RESET} ${rgb(`[${t}]`, c1, c2)} ${text}`
}

// ==================== PEMISAH BAGIAN ====================
export function divider(title = '', color) {
    const { c1, c2 } = pick(color)
    const t = title ? `  ${title}  ` : ''
    const fill = '─'.repeat(Math.max(0, 48 - t.length))
    return rgb('─' + t + fill, c1, c2)
}