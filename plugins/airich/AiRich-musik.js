import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendAiRich } from '../../lib/airich.js'
import { loadSongs } from '../../lib/serverboard.js'
import { buildMusicHTML } from '../../lib/musicboard.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const AUDIO_DIR = path.join(ROOT, 'src', 'audio')

function loadConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } })
    try {
        const cfg = loadConfig()
        const songs = loadSongs(AUDIO_DIR, (msg, lvl) =>
            console.log(log('MUSIK', msg, lvl === 'warn' ? COLORS.warn : COLORS.info)))

        const html = buildMusicHTML({
            bot: (cfg.botName || 'JhonBot') + ' v' + (cfg.version || '3.8'),
            owner: cfg.ownerName || 'Jhon338',
            link: cfg.channelLink || '',
            songs
        })

        await sendAiRich(conn, m.chat, html, { title: 'JHON338x MUSIK' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        console.log(log('MUSIK', 'Player dikirim ke ' + m.chat + ' (' + html.length + ' byte, ' + songs.length + ' lagu)', COLORS.success))
    } catch (e) {
        console.error(log('MUSIK', e?.message || e, COLORS.error))
        try { await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) } catch {}
    }
}

handler.command = ['musik', 'music']

export default handler
