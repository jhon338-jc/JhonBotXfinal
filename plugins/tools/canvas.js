import fs from 'fs'
import puppeteer from 'puppeteer-core'
import config from '../../config.json' with { type: 'json' }
import { rgbTag, COLORS } from '../../lib/rgb.js'

const CHROME_PATHS = [
    process.env.CHROME_PATH,
    config.chromePath,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
].filter(Boolean)

function findChrome() {
    for (const p of CHROME_PATHS) {
        try {
            if (fs.existsSync(p)) return p
        } catch {}
    }
    return null
}

function cleanHtml(raw) {
    let html = (raw || '').trim()
    html = html.replace(/^```(?:html|htm)?\s*\n?/i, '').replace(/\s*```\s*$/, '')
    if (!/<[a-zA-Z\/!]/i.test(html)) {
        html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div style="font-family:sans-serif;white-space:pre-wrap;padding:16px">${html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></body></html>`
    }
    return html
}

async function capture(html) {
    const chrome = findChrome()
    if (!chrome) throw new Error('Chrome/Chromium tidak ditemukan di sistem ini')

    const browser = await puppeteer.launch({
        executablePath: chrome,
        headless: 'new',
        args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--force-device-scale-factor=2']
    })
    try {
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 })
        try {
            await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><base href="https://jhon338-jc.github.io/Linktree/"></head><body>${html}</body></html>`, { waitUntil: 'load', timeout: 30000 })
            await new Promise(r => setTimeout(r, 1500))
        } catch {}
        return await page.screenshot({ type: 'png', fullPage: true, captureBeyondViewport: false })
    } finally {
        await browser.close()
    }
}

let handler = async (m, { conn, text }) => {
    const raw = text || m.quoted?.text
    if (!raw) {
        return m.reply('⚠️ *Cara pakai generate HTML:*\n\n1. Ketik kode langsung:\n   .canvas <html>...</html>\n\n2. Atau reply pesan berisi kode HTML:\n   .canvas\n\nFitur bisa render: `landing page`, `game JS`, `animasi CSS`, `video/audio embedded`, `gambar`.\n\nContoh mini:\n.canvas <h1 style="color:blue">Hello World</h1><p>Ini dihasilkan bot!</p>')
    }

    let html = cleanHtml(raw)
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    try {
        let png = await capture(html)
        await conn.sendMessage(m.chat, {
            image: png,
            caption: '✅ Hasil render HTML\n\n💡 Mau file .html? Gunakan .htmlfile\n🔗 ' + config.channelLink
        }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('CANVAS', e.message, COLORS.error))
        m.reply('❌ Gagal render HTML! Chrome/Chromium tidak ditemukan atau terjadi error.')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['canvas', 'html', 'render']

export default handler