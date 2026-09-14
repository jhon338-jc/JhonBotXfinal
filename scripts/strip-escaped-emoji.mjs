import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, '..', 'plugins')

// JS source escaped emoji: \uD83C\uDFAE style - remove from source strings
// Only inside quoted strings. Simple approach: replace the literal sequences.
const escapedEmojiRegex = /(?:\\uD83C|\\uD83D|\\uD83E|\\uD83F|\\uD83A|\\uD83B|\\uD83D|\\uD83E|\\uD83F)[\\u][0-9a-fA-F]{4}/g
// Also single stray surrogate escapes used as icons
const singleSurrogate = /'(?:\\uD83C\\uDFAE|\\uD83D\\uDC[A-F0-9]{2}|\\uD83D\\uDD[A-F0-9]{2}|\\uD83C\\uDF[A-F0-9]{2}|\\u2764\\uFE0F|\\uFE0F)'/g

let totalCleaned = 0

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8')
        const original = content
        // Remove escaped emoji pairs -> empty string (keep quotes)
        content = content.replace(/\\uD83C\\uDF[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83D\\uDC[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83D\\uDD[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83D\\uDE[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83D\\uDF[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83E\\uDD[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83E\\uDD[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83F\\uDD[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83C\\uDD[A-F0-9]{2}/g, '')
        content = content.replace(/\\uD83C\\uDE[A-F0-9]{2}/g, '')
        content = content.replace(/\\d83c\\udfae/gi, '')
        content = content.replace(/\\d83d\\udc[0-9a-f]{2}/gi, '')
        content = content.replace(/\\d83d\\udd[0-9a-f]{2}/gi, '')
        content = content.replace(/\\d83d\\ude[0-9a-f]{2}/gi, '')
        content = content.replace(/\\d83d\\udf[0-9a-f]{2}/gi, '')
        content = content.replace(/\\d83e\\udd[0-9a-f]{2}/gi, '')
        content = content.replace(/\\u2764\\uFE0F/g, '')
        if (content !== original) {
            fs.writeFileSync(filePath, content)
            totalCleaned++
        }
    } catch (e) {
        console.error('Error processing ' + filePath + ': ' + e.message)
    }
}

function walkDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
        const full = path.join(dir, item.name)
        if (item.isDirectory()) {
            walkDir(full)
        } else if (item.name.endsWith('.js')) {
            processFile(full)
        }
    }
}

walkDir(pluginDir)
console.log(`Escaped emoji removed from ${totalCleaned} files`)