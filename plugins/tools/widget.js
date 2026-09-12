import config from '../../config.json' with { type: 'json' }
import { rgbTag, COLORS } from '../../lib/rgb.js'

let handler = async (m, { conn }) => {
    const {
        proto,
        generateWAMessageFromContent,
        generateMessageID
    } = await import('@whiskeysockets/baileys')

    const WS_URL = 'wss://theaters-screen-montana-workers.trycloudflare.com/test'

    const sources = [
        {
            source_type: 'THIRD_PARTY',
            source_display_name: 'LevviCode WebSocket',
            source_subtitle: 'Cloudflare Tunnel Realtime Test',
            source_url: WS_URL,
            favicon: {
                url: 'https://www.levvicode.cloud/levvi.jpg',
                mime_type: 'image/jpeg',
                width: 16,
                height: 16
            }
        }
    ]

    const html = `
<style>
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
}

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    background: transparent;
    font-family:
        "SFMono-Regular",
        "Cascadia Code",
        "Roboto Mono",
        Consolas,
        monospace;
}

body {
    padding: 10px;
}

.terminal {
    width: 100%;
    max-width: 680px;
    margin: auto;
    overflow: hidden;
    border-radius: 12px;
    background: #080b0e;
    border: 1px solid #20262c;
    box-shadow:
        0 12px 30px rgba(0,0,0,.45),
        inset 0 1px rgba(255,255,255,.025);
}

.header {
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: #101419;
    border-bottom: 1px solid #20262c;
}

.dots {
    display: flex;
    gap: 5px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #343c43;
}

.terminal-title {
    flex: 1;
    text-align: center;
    margin-right: 34px;
    color: #707a83;
    font-size: 9px;
}

.content {
    padding: 14px;
}

.command-line {
    font-size: 9px;
    line-height: 1.7;
    word-break: break-word;
}

.user {
    color: #5cff8d;
}

.host {
    color: #72b7ff;
}

.symbol {
    color: #626c74;
}

.command {
    color: #dce3e8;
    margin-left: 4px;
}

.title {
    margin-top: 8px;
    color: #edf1f3;
    font-size: 15px;
    font-weight: 700;
}

.subtitle {
    margin-top: 4px;
    color: #555f67;
    font-size: 7px;
    letter-spacing: 1px;
}

.status {
    margin-top: 13px;
    padding: 11px;
    border-radius: 8px;
    background: #0b0f12;
    border: 1px solid #1c242a;
}

.status-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-dot {
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #72b7ff;
    box-shadow: 0 0 8px rgba(114,183,255,.5);
}

.status-text {
    color: #aab3ba;
    font-size: 9px;
    font-weight: 700;
}

.status-detail {
    margin-top: 5px;
    padding-left: 15px;
    color: #505b63;
    font-size: 8px;
}

.endpoint {
    margin-top: 10px;
    padding: 10px 11px;
    border-radius: 8px;
    background: #050709;
    border: 1px solid #171d22;
}

.endpoint-label {
    color: #4e5961;
    font-size: 7px;
    letter-spacing: 1px;
}

.endpoint-value {
    margin-top: 5px;
    color: #72b7ff;
    font-size: 8px;
    line-height: 1.5;
    word-break: break-all;
}

.log {
    margin-top: 10px;
    padding: 10px 11px;
    min-height: 125px;
    max-height: 205px;
    overflow: hidden;
    border-radius: 8px;
    background: #050709;
    border: 1px solid #171d22;
    color: #737e86;
    font-size: 8px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
}

.log-info {
    color: #72b7ff;
}

.log-ok {
    color: #5cff8d;
}

.log-error {
    color: #ff6875;
}

.log-warning {
    color: #ffd166;
}

.footer {
    margin-top: 10px;
    padding-top: 9px;
    border-top: 1px solid #171d22;
    text-align: center;
    color: #3d464d;
    font-size: 7px;
    letter-spacing: .7px;
}
</style>

<div class="terminal">

    <div class="header">
        <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>

        <div class="terminal-title">
            levvicode@websocket ~ terminal
        </div>
    </div>

    <div class="content">

        <div class="command-line">
            <span class="user">levvicode</span>
            <span class="symbol">@</span>
            <span class="host">websocket</span>
            <span class="symbol">:~$</span>
            <span class="command">websocket-test</span>
        </div>

        <div class="title">
            WebSocket Tunnel Test
        </div>

        <div class="subtitle">
            CLOUDFLARE QUICK TUNNEL / REALTIME CONNECTION
        </div>

        <div class="status">
            <div class="status-row">
                <div
                    id="statusDot"
                    class="status-dot"
                ></div>

                <div
                    id="status"
                    class="status-text"
                >
                    CONNECTING...
                </div>
            </div>

            <div
                id="detail"
                class="status-detail"
            >
                Initializing WebSocket connection...
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-label">
                WSS ENDPOINT
            </div>

            <div
                id="endpoint"
                class="endpoint-value"
            ></div>
        </div>

        <div
            id="log"
            class="log"
        >[SYSTEM] Initializing WebSocket test...</div>

        <div class="footer">
            LEVVICODE • WEBSOCKET • CLOUDFLARE TUNNEL
        </div>

    </div>
</div>

<script>
(() => {

    const WS_URL = '${WS_URL}'

    const status =
        document.getElementById('status')

    const detail =
        document.getElementById('detail')

    const endpoint =
        document.getElementById('endpoint')

    const log =
        document.getElementById('log')

    const statusDot =
        document.getElementById('statusDot')

    endpoint.textContent = WS_URL

    const getTime = () => {
        return new Date().toLocaleTimeString(
            'en-US',
            {
                hour12: false
            }
        )
    }

    const addLog = (
        text,
        type = 'normal'
    ) => {
        const line =
            document.createElement('span')

        line.className =
            type === 'normal'
                ? ''
                : 'log-' + type

        line.textContent =
            '[' +
            getTime() +
            '] ' +
            text

        log.appendChild(
            document.createTextNode('\\n')
        )

        log.appendChild(line)

        log.scrollTop =
            log.scrollHeight
    }

    const setStatus = (
        title,
        description,
        type
    ) => {

        status.textContent =
            title

        detail.textContent =
            description

        if (type === 'success') {

            statusDot.style.background =
                '#5cff8d'

            statusDot.style.boxShadow =
                '0 0 8px rgba(92,255,141,.55)'

        } else if (type === 'error') {

            statusDot.style.background =
                '#ff6875'

            statusDot.style.boxShadow =
                '0 0 8px rgba(255,104,117,.55)'

        } else if (type === 'warning') {

            statusDot.style.background =
                '#ffd166'

            statusDot.style.boxShadow =
                '0 0 8px rgba(255,209,102,.55)'

        } else {

            statusDot.style.background =
                '#72b7ff'

            statusDot.style.boxShadow =
                '0 0 8px rgba(114,183,255,.55)'

        }
    }

    if (!window.WebSocket) {

        setStatus(
            'NOT SUPPORTED',
            'WebSocket API tidak tersedia',
            'error'
        )

        addLog(
            '[ERROR] WebSocket API unavailable',
            'error'
        )

        return
    }

    addLog(
        '[INFO] Starting WebSocket test',
        'info'
    )

    addLog(
        '[INFO] Protocol: WSS',
        'info'
    )

    addLog(
        '[INFO] Transport: Cloudflare Tunnel',
        'info'
    )

    addLog(
        '[CONNECT] ' + WS_URL,
        'info'
    )

    let ws

    try {

        ws =
            new WebSocket(
                WS_URL
            )

    } catch (error) {

        setStatus(
            'FAILED',
            error.message,
            'error'
        )

        addLog(
            '[ERROR] ' +
            error.message,
            'error'
        )

        return
    }

    ws.onopen = () => {

        setStatus(
            'CONNECTED',
            'WebSocket connection established',
            'success'
        )

        addLog(
            '[OK] WSS connection opened',
            'ok'
        )

        addLog(
            '[OK] Cloudflare Tunnel reachable',
            'ok'
        )

        addLog(
            '[OK] WebSocket connected',
            'ok'
        )

        const message = {
            event:
                'connection_test',

            sender:
                'AI_RICH',

            message:
                'HELLO_FROM_CLOUDFLARE_TUNNEL',

            time:
                Date.now()
        }

        try {

            ws.send(
                JSON.stringify(
                    message
                )
            )

            addLog(
                '[SEND] connection_test',
                'info'
            )

            addLog(
                '[SEND] HELLO_FROM_LEVVICODE',
                'info'
            )

        } catch (error) {

            addLog(
                '[ERROR] SEND: ' +
                error.message,
                'error'
            )

        }
    }

    ws.onmessage = event => {

        addLog(
            '[RECV] ' +
            event.data,
            'ok'
        )

        try {

            const data =
                JSON.parse(
                    event.data
                )

            if (
                data.event ===
                'connection'
            ) {

                addLog(
                    '[OK] CONNECTION CONFIRMED',
                    'ok'
                )

            }

            if (
                data.event ===
                'connection_test'
            ) {

                setStatus(
                    'SUCCESS',
                    'Realtime message received',
                    'success'
                )

                addLog(
                    '[OK] REALTIME MESSAGE RECEIVED',
                    'ok'
                )

                addLog(
                    '[OK] SERVER RESPONSE VALID',
                    'ok'
                )
            }

        } catch {

            addLog(
                '[OK] DATA RECEIVED',
                'ok'
            )

        }
    }

    ws.onerror = () => {

        setStatus(
            'ERROR',
            'WebSocket connection failed',
            'error'
        )

        addLog(
            '[ERROR] WebSocket error',
            'error'
        )
    }

    ws.onclose = event => {

        setStatus(
            'CLOSED',
            'WebSocket connection closed',
            'warning'
        )

        addLog(
            '[CLOSE] Connection closed',
            'warning'
        )

        addLog(
            '[CLOSE] Code: ' +
            event.code,
            'warning'
        )

        addLog(
            '[CLOSE] Reason: ' +
            (
                event.reason ||
                '-'
            ),
            'warning'
        )

    }

})()
</script>
`

    const richResponseMessage = {
        messageType: 1,

        submessages: [
            {
                messageType:
                    proto
                        .AIRichResponseSubMessageType
                        .AI_RICH_RESPONSE_TEXT,

                messageText:
                    'WebSocket Tunnel Test'
            }
        ],

        unifiedResponse: {
            data:
                Buffer.from(
                    JSON.stringify({
                        response_id:
                            generateMessageID(),

                        sections: [
                            {
                                view_model: {
                                    primitive: {
                                        __typename:
                                            'GenAIaeacdsnwHtmlPrimitive',

                                        payload:
                                            html,

                                        trusted_sources:
                                            sources.map(
                                                x =>
                                                    x.source_url
                                            )
                                    },

                                    __typename:
                                        'GenAISingleLayoutViewModel'
                                }
                            }
                        ]
                    })
                ).toString('base64')
        },

        contextInfo: {
            forwardingScore: 1,

            isForwarded: true,

            forwardedAiBotMessageInfo: {
                botJid: '0@bot'
            },

            forwardOrigin: 4
        }
    }

    const isi = {
        messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,

            botMetadata: {
                messageDisclaimerText:
                    'WebSocket Tunnel Test',

                richResponseSourcesMetadata: {
                    sources
                }
            }
        },

        botForwardedMessage: {
            message: {
                richResponseMessage
            }
        }
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        const msg =
            generateWAMessageFromContent(
                m.chat,
                isi,
                {
                    messageId:
                        generateMessageID()
                }
            )

        await conn.relayMessage(
            m.chat,
            msg.message,
            {
                messageId:
                    msg.key.id
            }
        )

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(rgbTag('WIDGET', e.message, COLORS.error))
        m.reply('❌ Gagal mengirim Widget Rich Preview!')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['widget', 'wstest']
handler.premium = false
export default handler