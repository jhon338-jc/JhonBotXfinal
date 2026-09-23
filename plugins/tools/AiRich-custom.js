import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendAiRich } from '../../lib/airich.js'
import { parseCustom, buildCustom, GUIDE, listCustom, saveCustom, readCustom, deleteCustom, safeName } from '../../lib/airich-format.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')

function loadConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function prefixOf(cfg) {
    const p = cfg.prefix
    return (Array.isArray(p) ? p[0] : p) || '.'
}

// Ambil teks setelah nama command (newline dipertahankan)
function contentAfterCommand(raw, cmd) {
    let t = String(raw || '').replace(/\r\n?/g, '\n')
    const idx = t.toLowerCase().indexOf(String(cmd).toLowerCase())
    if (idx >= 0) t = t.slice(idx + String(cmd).length)
    return t.replace(/^[ \t\r\n]+/, '')
}

let handler = async (m, { conn }) => {
    const cfg = loadConfig()
    const bot = cfg.botName || 'JhonBotXfinal'
    const cmd = m.command || 'custom'
    const p = prefixOf(cfg)
    const ok = async () => { try { await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }) } catch {} }

    try {
        let content = contentAfterCommand(m.text || '', cmd)
        const quotedText = (m.quoted && typeof m.quoted.text === 'string') ? m.quoted.text : ''
        if (!content && quotedText) content = quotedText

        // Tanpa argumen → kirim panduan (contoh hidup)
        if (!content) {
            const parsed = parseCustom(GUIDE)
            await sendAiRich(conn, m.chat, buildCustom(parsed, { bot }), { title: 'Airich Custom' })
            await ok()
            return
        }

        const parts = content.split(/\s+/)
        const first = (parts[0] || '').toLowerCase()

        // .custom list
        if (first === 'list') {
            const items = listCustom()
            await m.reply(items.length
                ? '📦 *AIRICH CUSTOM TERSIMPAN*\n\n' + items.map((n, i) => (i + 1) + '. ' + n).join('\n') + '\n\n_Jalankan:_ ' + p + 'custom <nama>'
                : '📦 *AIRICH CUSTOM*\n\n_Belum ada custom tersimpan._\nSimpan dengan: ' + p + 'custom save <nama>')
            await ok()
            return
        }

        // .custom del <nama>
        if (first === 'del' || first === 'hapus' || first === 'delete') {
            const name = safeName(parts[1] || '')
            if (!name) { await m.reply('❌ Format: ' + p + 'custom del <nama>'); await ok(); return }
            const done = deleteCustom(name)
            await m.reply(done ? '🗑️ Custom *' + name + '* dihapus.' : '❌ Custom *' + name + '* tidak ditemukan.')
            await ok()
            return
        }

        // .custom save <nama>
        if (first === 'save' || first === 'simpan') {
            const name = safeName(parts[1] || '')
            if (!name) { await m.reply('❌ Format: ' + p + 'custom save <nama> <kode>'); await ok(); return }
            const rawName = parts[1] || ''
            const at = content.indexOf(rawName)
            let code = at >= 0 ? content.slice(at + rawName.length).replace(/^\s+/, '') : ''
            if (!code && quotedText) code = quotedText
            if (!code) { await m.reply('❌ Kode kosong. Kirim kode setelah nama, atau reply pesan berisi kode.'); await ok(); return }
            const parsed = parseCustom(code)
            if (parsed.errors.length) { await m.reply('❌ *CUSTOM GAGAL*\n\n- ' + parsed.errors.join('\n- ')); await ok(); return }
            const done = saveCustom(name, code)
            await m.reply(done ? '💾 Tersimpan sebagai *' + name + '*\n\n_Jalankan:_ ' + p + 'custom ' + name : '❌ Gagal menyimpan.')
            await ok()
            return
        }

        // .custom <nama> → jalankan custom tersimpan
        const bare = content.trim()
        if (/^[a-z0-9_-]+$/i.test(bare)) {
            const saved = readCustom(bare)
            if (saved) content = saved
        }

        // Render kode
        const parsed = parseCustom(content)
        if (parsed.errors.length) {
            await conn.sendMessage(m.chat, { text: '❌ *CUSTOM GAGAL*\n\n- ' + parsed.errors.join('\n- ') + '\n\n_Ketik ' + p + 'custom untuk lihat panduan._' }, { quoted: m })
            await ok()
            return
        }

        const html = buildCustom(parsed, { bot })
        await sendAiRich(conn, m.chat, html, { title: parsed.title || 'Airich Custom' })
        await ok()
        console.log(log('CUSTOM', 'Airich custom (' + parsed.mode + ', ' + html.length + ' byte) dari ' + m.chat, COLORS.success))
    } catch (e) {
        console.error(log('CUSTOM', e?.message || e, COLORS.error))
        try { await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) } catch {}
    }
}

handler.command = ['custom']

export default handler
