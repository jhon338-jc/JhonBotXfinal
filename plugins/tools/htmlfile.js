import fs from 'fs'
import path from 'path'
import config from '../../config.json' with { type: 'json' }
import { rgbTag, COLORS } from '../../lib/rgb.js'

const TMP_DIR = './tmp'

function cleanHtml(raw) {
    let html = (raw || '').trim()
    html = html.replace(/^```(?:html|htm)?\s*\n?/i, '').replace(/\s*```\s*$/, '')
    if (!/<[a-zA-Z\/!]/i.test(html)) {
        html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div style="font-family:sans-serif;white-space:pre-wrap;padding:16px">${html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></body></html>`
    }
    return html
}

let handler = async (m, { conn, text }) => {
    const raw = text || m.quoted?.text
    if (!raw) {
        return m.reply('⚠️ *Cara pakai .htmlfile:*\n\nKetik kode HTML langsung, atau reply pesan berisi kode:\n\n.htmlfile <html>...</html>')
    }

    const html = cleanHtml(raw)
    if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })
    const file = path.join(TMP_DIR, `canvas_${Date.now()}_${Math.floor(Math.random() * 999)}.html`)
    fs.writeFileSync(file, html)

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    try {
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(file),
            mimetype: 'text/html',
            fileName: `jhon338_${Date.now()}.html`,
            caption: '✅ File HTML Jhon338\n🔗 ' + config.channelLink
        }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('HTMLFILE', e.message, COLORS.error))
        m.reply('❌ Gagal mengirim file HTML!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    } finally {
        try { fs.unlinkSync(file) } catch {}
    }
}

handler.command = ['htmlfile', 'htmls']
export default handler