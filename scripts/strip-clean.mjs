import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// Jangan sentuh folder airich (perintah user)
const targets = [
  'index.js', 'handler.js',
  'lib/flow.js', 'lib/antispam.js', 'lib/msg.js',
  'plugins/owner', 'plugins/user', 'plugins/maker',
  'plugins/tools', 'plugins/download', 'plugins/asupan',
  'plugins/group', 'plugins/premium'
]

function walk(dir) {
  let out = []
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name)
    if (item.isDirectory()) out.push(...walk(full))
    else if (item.isFile() && item.name.endsWith('.js')) out.push(full)
  }
  return out
}

function collect() {
  const files = []
  for (const t of targets) {
    const p = path.join(root, t)
    if (fs.existsSync(p)) {
      if (fs.statSync(p).isDirectory()) files.push(...walk(p))
      else files.push(p)
    }
  }
  return files
}

// Rentang emoji (tanpa box-drawing \u2500-\u257F)
const emojiRe = new RegExp(
  '[\u00A9\u00AE\u203C\u2049\u2122\u2139\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u2600-\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\u200D\u20E3\uFE0F\\u{1F000}-\\u{1FAFF}\\u{1F1E6}-\\u{1F1FF}]',
  'gu'
)

const reactLineRe = /react:\s*\{/

let changed = 0
for (const file of collect()) {
  let src = fs.readFileSync(file, 'utf-8')
  const before = src
  src = src
    .split(/\r?\n/)
    .filter(line => !reactLineRe.test(line))
    .join('\n')
  src = src.replace(emojiRe, '')
  if (src !== before) {
    fs.writeFileSync(file, src)
    changed++
    console.log('strip ' + path.relative(root, file))
  }
}
console.log('done: ' + changed + ' files')