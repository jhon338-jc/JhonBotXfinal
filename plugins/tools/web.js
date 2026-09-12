import fs from 'fs'
import path from 'path'
import config from '../../config.json' with { type: 'json' }
import { rgbTag, COLORS } from '../../lib/rgb.js'

// ============================================================
//  .web / .webview  —  Web HTML di dalam pesan WhatsApp
//  - Paste kode HTML  -> upload ke pastehtml.dev -> live URL
//  - Atau kasih URL    -> langsung dipakai
//  - Kirim tombol cta_url dengan webview_interaction, sehingga
//    halaman dibuka di webview internal WhatsApp.
// ============================================================

const TMP_DIR = './tmp'

function cleanHtml(raw) {
    let html = (raw || '').trim()
    html = html.replace(/^```(?:html|htm)?\s*\n?/i, '').replace(/\s*```\s*$/, '')
    if (!/<[a-zA-Z\/!]/i.test(html)) {
        html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div style="font-family:sans-serif;white-space:pre-wrap;padding:16px">${html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></body></html>`
    }
    return html
}

function isUrl(text) {
    return /^https?:\/\/[^\s"]+$/i.test(text.trim())
}

async function uploadHtml(html) {
    const res = await fetch('https://pastehtml.dev/api/pastes?filename=jhon338.html', {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: html
    })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    return data?.live_url || data?.url || null
}

function sendWeb(conn, m, url, label) {
    return conn.sendMessage(m.chat, {
        interactiveButtons: [{
            name: 'open_webview',
            buttonParamsJson: JSON.stringify({
                title: '🌐 Jhon338 Web',
                link: {
                    in_app_webview: true,
                    url
                }
            })
        }],
        text: `${label}\n\n` +
            `🖥️ *Halaman sudah live:*\n${url}\n\n` +
            `Ketuk untuk membuka web langsung di dalam WhatsApp (tidak pergi ke browser).`,
        footer: `${config.botName} • ${config.channelLink}`,
        contextInfo: {
            externalAdReply: {
                title: `${config.botName} • Web HTML`,
                body: 'Buka web di dalam WhatsApp 👆',
                mediaType: 1,
                mediaUrl: url,
                sourceUrl: url,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

let handler = async (m, { conn, text }) => {
    const direct = (text || '').trim()

    if (!direct && !m.quoted?.text) {
        return m.reply('⚠️ *Cara pakai .web:*\n\n1. Ketik kode HTML langsung:\n   .web <html>...</html>\n\n2. Reply pesan berisi kode HTML:\n   .web\n\n3. Atau kasih URL website:\n   .web https://contoh.com\n\nHasilnya: halaman dihosting & tombol *🔗 BUKA WEB* muncul di dalam WhatsApp.\n\nContoh:\n.web <h1>Halo Dunia</h1>')
    }

    // Mode URL: hanya langsung (bukan dari reply) supaya tak ambigu
    if (direct && isUrl(direct)) {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        try {
            await sendWeb(conn, m, direct, '🌐 *Kirim web langsung:*')
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } catch (e) {
            console.error(rgbTag('WEB', e.message, COLORS.error))
            m.reply('❌ Gagal mengirim web!')
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        }
        return
    }

    // Mode HTML: text langsung atau reply
    const html = cleanHtml(direct || m.quoted.text)
    if (!/<[a-zA-Z\/!]/i.test(html)) {
        return m.reply('❌ Tidak ada kode HTML ditemukan. Kirim kode HTML atau reply pesan berisi kode.\n\nContoh: `.web <h1>Halo Dunia</h1>`')
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })
    const file = path.join(TMP_DIR, `web_${Date.now()}_${Math.floor(Math.random() * 999)}.html`)
    fs.writeFileSync(file, html)

    let url = null
    try {
        url = await uploadHtml(html)
    } catch (e) {
        console.error(rgbTag('WEB', 'upload gagal: ' + e.message, COLORS.warn))
    }

    try {
        if (url) {
            await sendWeb(conn, m, url, '🎨 *Berhasil hosting HTML!*')
        } else {
            await conn.sendMessage(m.chat, {
                document: fs.readFileSync(file),
                mimetype: 'text/html',
                fileName: `jhon338_${Date.now()}.html`,
                caption: '❌ Gagal hosting ke server publik.\n\nKamu tetap bisa simpan file HTML ini (buka di browser), atau pakai `.canvas` untuk render jadi gambar.'
            }, { quoted: m })
        }
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('WEB', e.message, COLORS.error))
        m.reply('❌ Gagal mengirim!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    } finally {
        try { fs.unlinkSync(file) } catch {}
    }
}

handler.command = ['web', 'webview', 'webhtml']
export default handler