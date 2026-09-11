import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ============================================================
//  JHON338 - Patch bug fork levvleys: konstanta MexOperations
//  DEVELOPER BY JHON338  |  VERSION 3.4.0
//  Dijalankan otomatis setiap `npm install` (postinstall)
//  Memperbaiki "Cannot read properties of undefined (reading 'UPDATE')"
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

let changed = false

// Fix 1: Tambah konstanta MexOperations ke Types/MexUpdates.js
const mexFile = path.join(base, 'Types', 'MexUpdates.js')
if (fs.existsSync(mexFile)) {
    let src = fs.readFileSync(mexFile, 'utf-8')
    let before = src

    if (!src.includes('MexOperations')) {
        const block = `Object.defineProperty(exports, "__esModule", { value: true });`
        const mexOpBlock = `Object.defineProperty(exports, "__esModule", { value: true });\nconst MexOperations = {\n    PROMOTE: "NotificationNewsletterAdminPromote",\n    DEMOTE: "NotificationNewsletterAdminDemote",\n    UPDATE: "NotificationNewsletterUpdate",\n};`
        src = src.replace(block, mexOpBlock)
        src = src.replace(
            `module.exports = {\n    MexUpdatesOperations: MexUpdatesOperations,\n    XWAPathsMexUpdates: XWAPathsMexUpdates,\n};`,
            `module.exports = {\n    MexOperations: MexOperations,\n    MexUpdatesOperations: MexUpdatesOperations,\n    XWAPathsMexUpdates: XWAPathsMexUpdates,\n};`
        )
    }

    if (src !== before) {
        fs.writeFileSync(mexFile, src)
        changed = true
        console.log(rgbTag('FIX-MEX', 'Ditambahkan MexOperations di Types/MexUpdates.js', COLORS.success))
    }
}

// Fix 2: Tambah PROMOTE & METADATA_UPDATE ke XWAPaths (dipakai messages-recv.js)
const nlFile = path.join(base, 'Types', 'Newsletter.js')
if (fs.existsSync(nlFile)) {
    let src = fs.readFileSync(nlFile, 'utf-8')
    let before = src

    if (!src.includes('PROMOTE:')) {
        src = src.replace(
            `    DEMOTE: "xwa2_newsletter_demote",`,
            `    PROMOTE: "xwa2_notify_newsletter_admin_promote",\n    DEMOTE: "xwa2_newsletter_demote",\n    METADATA_UPDATE: "xwa2_notify_newsletter_on_metadata_update",`
        )
    }

    if (src !== before) {
        fs.writeFileSync(nlFile, src)
        changed = true
        console.log(rgbTag('FIX-MEX', 'Ditambahkan XWAPaths.PROMOTE & METADATA_UPDATE', COLORS.success))
    }
}

// Fix 3: Bungkus handleMexNotification dengan try/catch biar tidak crash
const recvFile = path.join(base, 'Socket', 'messages-recv.js')
if (fs.existsSync(recvFile)) {
    let src = fs.readFileSync(recvFile, 'utf-8')
    let before = src

    if (src.includes('handleMexNotification') && !src.includes('return;\n    }\n};\n    const processNotification')) {
        src = src.replace(
            '    const handleMexNotification = (id, node) => {',
            '    const handleMexNotification = (id, node) => {\n        try {'
        )
        const endAnchor = '        }\n    };\n    const processNotification'
        if (src.includes(endAnchor)) {
            src = src.replace(
                endAnchor,
                `        }\n    } catch (e) {\n        return;\n    }\n};\n    const processNotification`
            )
        }
    }

    if (src !== before) {
        fs.writeFileSync(recvFile, src)
        changed = true
        console.log(rgbTag('FIX-MEX', 'messages-recv.js: handleMexNotification diperkuat try/catch', COLORS.success))
    }
}

console.log(rgbTag('FIX-MEX',
    changed
        ? 'Bug MexOperations berhasil dipatch.'
        : 'Sudah terpatch sebelumnya, skip.',
    changed ? COLORS.success : COLORS.info))