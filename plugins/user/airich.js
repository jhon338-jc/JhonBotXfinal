import { sendAiRich } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const WEBSITES = [
    {
        key: 'spotify',
        title: 'Spotify',
        body: 'Dengarkan musik, podcast, dan album favoritmu secara gratis.',
        sourceUrl: 'https://open.spotify.com',
        color: '#1DB954',
        icon: '🎵'
    },
    {
        key: 'github',
        title: 'GitHub',
        body: 'Platform kolaborasi kode terbesar untuk developer seluruh dunia.',
        sourceUrl: 'https://github.com',
        color: '#8b5cf6',
        icon: '💻'
    },
    {
        key: 'myweb',
        title: 'Jhon338 Linktree',
        body: 'Kumpulan link penting dari Jhon338 — bot, sosial media, dan proyek.',
        sourceUrl: 'https://jhon338-jc.github.io/Linktree/',
        color: '#06b6d4',
        icon: '🔗'
    },
    {
        key: 'youtube',
        title: 'YouTube',
        body: 'Tonton video, musik, dan konten kreator favoritmu.',
        sourceUrl: 'https://youtube.com',
        color: '#ef4444',
        icon: '▶️'
    },
    {
        key: 'google',
        title: 'Google',
        body: 'Mesin pencari terbesar di dunia — cari apa saja dengan cepat.',
        sourceUrl: 'https://google.com',
        color: '#4285f4',
        icon: '🔍'
    },
    {
        key: 'chatgpt',
        title: 'ChatGPT',
        body: 'Asisten AI dari OpenAI — tanya apa saja, dapatkan jawaban instan.',
        sourceUrl: 'https://chat.openai.com',
        color: '#10a37f',
        icon: '🤖'
    }
]

function buildCardHTML(site) {
    return `<style>*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}a{color:inherit;text-decoration:none}</style>
<body style="margin:0;background:transparent;font-family:Arial,sans-serif;color:#eee;touch-action:manipulation">
<div style="width:100%;max-width:620px;margin:auto;padding:16px;box-sizing:border-box">
<div style="background:rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.15);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)">
<div style="padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center">
<div><div style="font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.45)">AI RICH</div><div style="font-size:21px;font-weight:bold;color:#fff">${site.icon} ${site.title}</div></div>
<div style="text-align:right"><div style="font-size:10px;color:rgba(255,255,255,.4)">LINK PREVIEW</div></div>
</div>
<div style="padding:20px">
<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:20px;text-align:center">
<div style="font-size:48px;margin-bottom:12px">${site.icon}</div>
<div style="font-size:18px;font-weight:bold;color:#fff;margin-bottom:8px">${site.title}</div>
<div style="font-size:13px;color:rgba(255,255,255,.6);line-height:1.5;margin-bottom:16px">${site.body}</div>
<a href="${site.sourceUrl}" target="_blank" style="display:inline-block;padding:10px 28px;background:${site.color};color:#fff;font-size:14px;font-weight:bold;border-radius:10px;text-decoration:none;box-shadow:0 4px 16px ${site.color}44">Buka Website →</a>
</div>
<div style="text-align:center;margin-top:12px;font-size:10px;color:rgba(255,255,255,.3)">Powered by JhonBot AI Rich</div>
</div></div></div></body>`
}

let handler = async (m, { conn, args }) => {
    const key = (args?.[0] || '').trim().toLowerCase()

    if (!key) {
        const list = WEBSITES.map((w, i) => `${i + 1}. *${w.key}* — ${w.title}`).join('\n')
        const caption = [
            '*🌐 AI RICH — Daftar Website*',
            '',
            'Ketik *.airich <key>* untuk mengirim Rich Card.',
            '',
            list,
            '',
            '_Contoh: .airich spotify_'
        ].join('\n')
        await m.reply(caption)
        return
    }

    const site = WEBSITES.find(w => w.key === key)
    if (!site) {
        const available = WEBSITES.map(w => w.key).join(', ')
        return m.reply(`> *KEY TIDAK DITEMUKAN*\n\n_Key yang kamu masukkan:_ \`${key}\`\n\n_Key tersedia:_\n${available}`)
    }

    await conn.sendMessage(m.chat, { react: { text: '🌐', key: m.key } })

    try {
        await sendAiRich(conn, m.chat, buildCardHTML(site), { title: site.title })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['airich']
export default handler