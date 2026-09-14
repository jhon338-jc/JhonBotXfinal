import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pluginDir = path.join(root, 'plugins')

// Emoji regex - matches most emoji characters
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2702}-\u{27B0}\u{200D}\u{FE0F}\u{20E3}\u{E0020}-\u{E007F}\u{1F000}-\u{1FFFF}\u{2000}-\u{206F}\u{2100}-\u{214F}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}-\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}-\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{00A9}\u{00AE}\u{203C}\u{2049}\u{2122}\u{2139}\u{2194}-\u{21AA}]/gu

let totalCleaned = 0

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8')
        const cleaned = content.replace(emojiRegex, '')
        if (cleaned !== content) {
            fs.writeFileSync(filePath, cleaned)
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

// Also clean root-level js files and lib/
for (const f of ['handler.js', 'index.js']) {
    const p = path.join(root, f)
    if (fs.existsSync(p)) processFile(p)
}
for (const f of ['rgb.js', 'msg.js', 'airich.js', 'autosave.js', 'antispam.js']) {
    const p = path.join(root, 'lib', f)
    if (fs.existsSync(p)) processFile(p)
}

console.log(`Emoji removed from ${totalCleaned} files`)
