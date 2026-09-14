import { log, COLORS } from '../../lib/rgb.js'

const WEBSITES = [
    {
        key: 'spotify',
        title: 'Spotify',
        body: 'Dengarkan musik, podcast, dan album favoritmu secara gratis.',
        sourceUrl: 'https://open.spotify.com',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg'
    },
    {
        key: 'github',
        title: 'GitHub',
        body: 'Platform kolaborasi kode terbesar untuk developer seluruh dunia.',
        sourceUrl: 'https://github.com',
        thumbnailUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    },
    {
        key: 'myweb',
        title: 'Jhon338 Linktree',
        body: 'Kumpulan link penting dari Jhon338 — bot, sosial media, dan proyek.',
        sourceUrl: 'https://jhon338-jc.github.io/Linktree/',
        thumbnailUrl: 'https://jhon338-jc.github.io/Linktree/favicon.ico'
    },
    {
        key: 'youtube',
        title: 'YouTube',
        body: 'Tonton video, musik, dan konten kreator favoritmu.',
        sourceUrl: 'https://youtube.com',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
    },
    {
        key: 'google',
        title: 'Google',
        body: 'Mesin pencari terbesar di dunia — cari apa saja dengan cepat.',
        sourceUrl: 'https://google.com',
        thumbnailUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    },
    {
        key: 'chatgpt',
        title: 'ChatGPT',
        body: 'Asisten AI dari OpenAI — tanya apa saja, dapatkan jawaban instan.',
        sourceUrl: 'https://chat.openai.com',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
    }
]

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
            `_Contoh: .airich spotify_`
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
        await conn.sendMessage(m.chat, {
            text: `*${site.title}*\n\n${site.body}`,
            contextInfo: {
                externalAdReply: {
                    title: site.title,
                    body: site.body,
                    sourceUrl: site.sourceUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: site.thumbnailUrl
                }
            }
        }, { quoted: m })

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['airich']
export default handler
