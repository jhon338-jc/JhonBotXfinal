import { randomUUID } from 'crypto'
import { log, COLORS } from '../../lib/rgb.js'

const CERT_CHAIN = [
    "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"
]

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

function buildPayload(site) {
    const id = randomUUID()
    return {
        response_id: id,
        sections: [
            {
                view_model: {
                    primitive: {
                        __typename: 'GenAIaeacdsnwHtmlPrimitive',
                        payload: buildCardHTML(site),
                        trusted_sources: ['jhon338.github.io']
                    },
                    __typename: 'GenAISingleLayoutViewModel'
                }
            }
        ]
    }
}

function buildMessagePayload(site) {
    const botResponseId = randomUUID()
    const payloadData = buildPayload(site)

    return {
        messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
            botMetadata: {
                messageDisclaimerText: '',
                botResponseId,
                verificationMetadata: {
                    proofs: [
                        {
                            version: 1,
                            useCase: 1,
                            signature: 'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
                            certificateChain: CERT_CHAIN
                        }
                    ]
                }
            }
        },
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: 1,
                    submessages: [
                        {
                            messageType: 2,
                            messageText: site.title
                        }
                    ],
                    unifiedResponse: {
                        data: Buffer.from(JSON.stringify(payloadData)).toString('base64')
                    },
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedAiBotMessageInfo: {
                            botJid: '867051314767696@bot'
                        },
                        forwardOrigin: 4
                    }
                }
            }
        }
    }
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
        const payload = buildMessagePayload(site)
        await conn.relayMessage(m.chat, payload, {})
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['airich']
export default handler
