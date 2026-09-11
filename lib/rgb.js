const C1 = [140, 90, 255]
const C2 = [90, 200, 255]

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
        .join('') + '\x1b[0m'
}

export function rgbTag(tag, text, color) {
    const c1 = color?.c1 || color || C1
    const c2 = color?.c2 || C2
    return rgb(`[${tag}]`, c1, c2) + ' ' + text
}

export const COLORS = {
    info:    { c1: [0, 200, 255],    c2: [120, 255, 220] },
    success: { c1: [80, 255, 120],   c2: [255, 210, 80] },
    warn:    { c1: [255, 170, 0],    c2: [255, 255, 120] },
    error:   { c1: [255, 60, 80],    c2: [255, 120, 60] },
    plugin:  { c1: [140, 90, 255],   c2: [90, 200, 255] },
    start:   { c1: [255, 80, 120],   c2: [255, 180, 210] },
}
