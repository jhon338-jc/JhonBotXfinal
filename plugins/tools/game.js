import config from '../../config.json' with { type: 'json' }
import { rgbTag, COLORS } from '../../lib/rgb.js'

// ============================================================
//  .game  —  Game webview ala-Flows di dalam pesan WhatsApp
//  - Hosting HTML game di pastehtml.dev (tombol cta_url webview)
//  - Ketuk tombol -> webview terbuka di dalam WhatsApp
//  Game aktif: Tic-Tac-Toe (kamu X vs bot O, minimax)
// ============================================================

const GAME_URL = 'https://xo7m93hedk8fsz59u6h1aawjd1b7krjx.pastehtml.dev/'

function sendGame(conn, m) {
    return conn.sendMessage(m.chat, {
        interactiveButtons: [{
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: '🎮 BUKA GAME',
                url: GAME_URL,
                webview_interaction: 'initiated',
                webview_share: 'forwarded'
            })
        }],
        text: '🎮 *Jhon338 Tic-Tac-Toe*\n\n' +
            `Kamu = ✖  •  Bot = ◯\n` +
            `Bot pakai AI Minimax — dijamin nggak nyerah. 😄\n\n` +
            `Ketuk tombol di bawah, papan langsung terbuka di dalam WhatsApp (webview).`,
        footer: `${config.botName} • Kalah menang? Main ulang aja 😉`,
        contextInfo: {
            externalAdReply: {
                title: `${config.botName} • Game Webview`,
                body: 'Tic-Tac-Toe di dalam WhatsApp 🎮',
                mediaType: 1,
                mediaUrl: GAME_URL,
                sourceUrl: GAME_URL,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
        await sendGame(conn, m)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('GAME', e.message, COLORS.error))
        m.reply('❌ Gagal kirim game!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['game', 'tictactoe']
export default handler