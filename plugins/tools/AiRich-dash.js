import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendAiRich } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const HTML_PATH = path.join(ROOT, 'src', 'game', 'airich-dash.html')

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })
    try {
        let html
        try {
            html = fs.readFileSync(HTML_PATH, 'utf-8')
        } catch (e) {
            throw new Error('Game Sonic Dash tidak ditemukan (' + (e?.message || e) + ')')
        }
        await sendAiRich(conn, m.chat, html, { title: 'Sonic Dash' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        console.log(log('DASH', 'Game dikirim ke ' + m.chat + ' (' + html.length + ' byte)', COLORS.success))
    } catch (e) {
        console.error(log('DASH', e?.message || e, COLORS.error))
        try { await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) } catch {}
    }
}

handler.command = ['dash', 'sonic', 'speedy']

export default handler