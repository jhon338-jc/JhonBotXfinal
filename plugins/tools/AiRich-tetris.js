import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendAiRich } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const HTML_PATH = path.join(ROOT, 'src', 'game', 'airich-tetris.html')

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })
    try {
        let html
        try {
            html = fs.readFileSync(HTML_PATH, 'utf-8')
        } catch (e) {
            throw new Error('Game Tetris tidak ditemukan (' + (e?.message || e) + ')')
        }
        await sendAiRich(conn, m.chat, html, { title: 'Tetris' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        console.log(log('TETRIS', 'Game dikirim ke ' + m.chat + ' (' + html.length + ' byte)', COLORS.success))
    } catch (e) {
        console.error(log('TETRIS', e?.message || e, COLORS.error))
        try { await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) } catch {}
    }
}

handler.command = ['tetris']

export default handler