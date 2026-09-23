import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src', 'img')

const fonts = 'C:\\Windows\\Fonts\\arialbd.ttf'
const fontsReg = 'C:\\Windows\\Fonts\\arial.ttf'

const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#0b1026"/>
    <stop offset="55%" stop-color="#1b2a6b"/>
    <stop offset="100%" stop-color="#0b1026"/>
  </linearGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22d3ee"/>
    <stop offset="100%" stop-color="#6366f1"/>
  </linearGradient>
</defs>`

function card(label) {
  return `<svg width="640" height="640" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect width="640" height="640" fill="url(#bg)"/>
<circle cx="560" cy="60" r="140" fill="#22d3ee" opacity="0.10"/>
<circle cx="70" cy="580" r="180" fill="#6366f1" opacity="0.12"/>
<rect x="40" y="40" width="560" height="560" rx="36" fill="none" stroke="#22d3ee" stroke-opacity="0.35" stroke-width="3"/>
<rect x="52" y="52" width="536" height="536" rx="28" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-width="2"/>
<text x="320" y="230" text-anchor="middle" font-family="Segoe UI, Arial" font-size="150" font-weight="bold" fill="#22d3ee" opacity="0.9">${label}</text>
<rect x="200" y="360" width="240" height="6" rx="3" fill="url(#accent)"/>
<text x="320" y="440" text-anchor="middle" font-family="Segoe UI, Arial" font-size="52" font-weight="bold" fill="#e2e8f0">JhonBotXfinal</text>
<text x="320" y="500" text-anchor="middle" font-family="Segoe UI, Arial" font-size="30" fill="#94a3b8">v3.3.8</text>
</svg>`
}

const images = {
  'menu.png': 'J',
  'premium.png': 'P',
  'welcome.png': '+',
  'goodbye.png': 'X',
  'dana.png': 'D',
}

for (const [name, label] of Object.entries(images)) {
  const svg = card(label)
  await sharp(Buffer.from(svg)).resize(640, 640).png().toFile(path.join(outDir, name))
  console.log(`OK ${name}`)
}
console.log('done')