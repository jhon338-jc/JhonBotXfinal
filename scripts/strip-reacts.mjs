import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// Remove ALL reaction-send lines (reactions are emoji-only; no emoji wanted)
const reactLineRegex = /^\s*await\s+conn\.sendMessage\([^\n]*react\s*:\s*\{[^\n]*\}\)[^\n]*\n?/gm

let totalFiles = 0
let totalLines = 0

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8')
        const matches = content.match(reactLineRegex)
        if (!matches) return
        const cleaned = content.replace(reactLineRegex, '')
        if (cleaned !== content) {
            fs.writeFileSync(filePath, cleaned)
            totalFiles++
            totalLines += matches.length
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

walkDir(path.join(root, 'plugins'))
// Also root files + lib
for (const f of ['handler.js', 'index.js']) {
    const p = path.join(root, f)
    if (fs.existsSync(p)) processFile(p)
}

console.log(`Reactions removed from ${totalFiles} files (${totalLines} lines)`)