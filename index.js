import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import {
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} from '@whiskeysockets/baileys'
import { makeWASocket, smsg, bind } from './lib/msg.js'
import handleMessage, { initPlugins, getPluginSummary, normalizeNumber, invalidateJSONCache } from './handler.js'
import { rgb, rgbTag, COLORS } from './lib/rgb.js'
import { ensureTemp } from './lib/autosave.js'

process.on('uncaughtException', (err) => {
    console.error(rgbTag('FATAL', 'Uncaught Exception: ' + (err?.stack || err), COLORS.error))
    try {
        socket?.ev.removeAllListeners()
        socket?.ws?.close?.()
    } catch {}
    restartBot(10000)
})
process.on('unhandledRejection', (err) => {
    console.error(rgbTag('FATAL', 'Unhandled Rejection: ' + (err?.message || err), COLORS.error))
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MONITOR_FILE = path.join(__dirname, 'database', 'monitor.json')
const OWNER_FILE = path.join(__dirname, 'database', 'owner.json')

const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf-8'))
const writeJSON = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    invalidateJSONCache(file)
}

function loadConfig() {
    try {
        return readJSON('./config.json')
    } catch {
        return {}
    }
}

let socket
let reconnectTimer = null
let reconnectAttempt = 0
let isConnecting = false
let pluginsLoaded = false
let keepAliveTimer = null
let rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const question = t => {
    if (rl && rl.closed) {
        rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    }
    return new Promise(r => rl.question(t, r))
}

let config = loadConfig()
let BOT_NAME = config.botName || 'JhonBot'
let VERSION = config.version || '3.3.8'
let PAIR_CODE = config.pairingCode || 'JHON3382'

// ==================== GAMBAR BOX LOG ====================
function drawBox(lines, width = 44) {
    const top = '╭' + '─'.repeat(width) + '╮'
    const bottom = '╰' + '─'.repeat(width) + '╯'
    const out = [top]
    for (const line of lines) {
        const inner = line.padEnd(width - 1)
        out.push('│' + inner + '│')
    }
    out.push(bottom)
    return out.join('\n')
}

function bannerStart() {
    const c = COLORS.start
    const box = drawBox([
        `   🤖 ${BOT_NAME} v${VERSION}`,
        '   ⚡ Starting...',
        `   📱 Pairing Code: ${PAIR_CODE}`,
        '   🔗 Waiting for connection...'
    ])
    return rgb(box, c.c1, c.c2)
}

function chunk(arr, size) {
    const out = []
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
    return out
}

function bannerConnected() {
    const { owner, user } = getPluginSummary()
    const lines = [
        '   ✅ CONNECTED',
        `   🤖 ${BOT_NAME} v${VERSION}`,
        '   📦 Loaded Plugins:',
        '',
        '   👑 OWNER:'
    ]
    for (const row of chunk(owner, 5)) lines.push('   • ' + row.map(c => '.' + c).join(' '))
    lines.push('', '   👤 USER:')
    for (const row of chunk(user, 5)) lines.push('   • ' + row.map(c => '.' + c).join(' '))
    const c = COLORS.success
    return rgb(drawBox(lines), c.c1, c.c2)
}

// ==================== KIRIM DAFTAR GRUP KE OWNER ====================
async function sendGroupListToOwner(conn) {
    try {
        const monitor = readJSON(MONITOR_FILE)
        monitor.groups ??= []
        if (!monitor.waiting && monitor.groups.length > 0) {
            console.log(rgbTag('STARTUP', `Menggunakan ${monitor.groups.length} grup tersimpan`, COLORS.info))
            console.log(rgbTag('STARTUP', 'Ketik .grup ke bot untuk mengganti pilihan grup', COLORS.info))
            return
        }

        const ownerNumber = config.creator?.[0] || loadOwnersFirst()
        if (!ownerNumber) return
        const ownerJid = ownerNumber + '@s.whatsapp.net'
        const groups = await conn.groupFetchAllParticipating()
        const groupList = Object.values(groups)

        if (!groupList.length) {
            await conn.sendMessage(ownerJid, { text: '❌ Bot tidak ada di grup manapun!' })
            console.log(rgbTag('STARTUP', 'Tidak ada grup ditemukan', COLORS.warn))
            return
        }

        let text = `┌─────────────────────────────────────┐\n│  📋 DAFTAR GRUP\n│\n`
        text += `│  Total Grup: ${groupList.length}\n│\n`
        groupList.forEach((g, i) => {
            text += `│  ${i + 1}. ${g.subject}\n│     👥 ${g.participants?.length || 0} member\n│\n`
        })
        text += `│  💡 Balas dengan nomor grup\n│  Contoh: 2,5\n│  Maksimal 5 grup\n└─────────────────────────────────────┘`

        monitor.waiting = true
        if (!monitor.groups.length) monitor.groups = []
        writeJSON(MONITOR_FILE, monitor)

        await conn.sendMessage(ownerJid, { text: text })
        console.log(rgbTag('STARTUP', 'Daftar grup terkirim ke owner', COLORS.success))
        console.log(rgbTag('STARTUP', 'Menunggu pilihan grup dari owner...', COLORS.warn))
    } catch (err) {
        console.error(rgbTag('STARTUP', 'Gagal kirim daftar grup: ' + (err?.message || err), COLORS.error))
    }
}

function loadOwnersFirst() {
    try {
        return readJSON(OWNER_FILE).owner?.[0] || null
    } catch {
        return null
    }
}

// ==================== RECONNECT ====================
function getStatusCode(lastDisconnect) {
    try {
        if (!lastDisconnect?.error) return 0
        return Boom.isBoom(lastDisconnect.error)
            ? lastDisconnect.error.output.statusCode
            : lastDisconnect.error?.output?.statusCode || 0
    } catch {
        return 0
    }
}

function restartBot(delay = 5000) {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    console.log(rgbTag('RECONNECT', `Menyambung ulang dalam ${delay / 1000} detik...`, COLORS.warn))
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null
        reconnectAttempt++
        start()
    }, delay)
}

// ==================== START ====================
async function start() {
    if (isConnecting) return
    isConnecting = true

    try {
        ensureTemp()
        config = loadConfig()
        BOT_NAME = config.botName || 'JhonBot'
        VERSION = config.version || '3.3.8'
        PAIR_CODE = config.pairingCode || 'JHON3382'
        console.log(bannerStart())

        if (keepAliveTimer) {
            clearInterval(keepAliveTimer)
            keepAliveTimer = null
        }
        if (socket) {
            socket.ev.removeAllListeners()
            socket.ws?.close?.()
        }

        const { state, saveCreds } = await useMultiFileAuthState('./auth')

        socket = makeWASocket({
            auth: state,
            browser: Browsers.windows('Chrome'),
            logger: pino({ level: 'fatal' }),
            printQRInTerminal: false,
            markOnlineOnConnect: true,
            connectTimeoutMs: 60000,
            keepAliveIntervalMs: 30000,
            retryRequestDelayMs: 10000
        })

        bind(socket)

        // ============ PAIRING ============
        if (!state.creds.registered) {
            console.log(rgb('─────────────────────────────────', COLORS.info.c1, COLORS.info.c2))
            console.log(rgb('MASUKKAN NOMOR PEMILIK', COLORS.start.c1, COLORS.start.c2))
            console.log(rgb('Contoh: 628xxxxxxxxxx', COLORS.info.c1, COLORS.info.c2))
            const number = await question(rgb('Nomor: ', [255, 170, 0], [255, 255, 120]))
            const cleanNumber = number.replace(/\D/g, '')
            if (!cleanNumber) {
                console.log(rgbTag('PAIRING', 'Nomor tidak valid. Ulangi...', COLORS.error))
                restartBot(3000)
                return
            }
            try {
                const code = await socket.requestPairingCode(cleanNumber, PAIR_CODE)
                console.log(rgbTag('PAIRING', `KODE PAIRING: ${code}`, COLORS.success))
                console.log(rgb('─────────────────────────────────', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('CARA PAIRING:', COLORS.start.c1, COLORS.start.c2))
                console.log(rgb('1. Buka WhatsApp di HP nomor tersebut', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('2. Masuk ke Perangkat Tertaut', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('3. Pilih "Tautkan dengan nomor telepon"', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('4. Ketik nomor yang tadi dimasukkan', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('5. Masukkan kode pairing di atas', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('─────────────────────────────────', COLORS.info.c1, COLORS.info.c2))

                // Auto-set nomor pairing sebagai OWNER
                const ownerNum = normalizeNumber(cleanNumber)
                const db = readJSON(OWNER_FILE)
                db.owner ??= []
                if (!db.owner.includes(ownerNum)) db.owner.push(ownerNum)
                writeJSON(OWNER_FILE, db)
                console.log(rgbTag('PAIRING', `Nomor ${ownerNum} di-set sebagai OWNER`, COLORS.success))
            } catch (err) {
                console.error(rgbTag('PAIRING', 'Gagal mengirim kode pairing: ' + (err?.message || err), COLORS.error))
                restartBot(5000)
                return
            } finally {
                rl.close()
            }
        } else {
            rl.close()
        }

        socket.ev.on('creds.update', saveCreds)

        socket.ev.on('messages.upsert', async ({ messages }) => {
            if (!messages.length) return
            for (const rawMsg of messages) {
                setImmediate(async () => {
                    try {
                        if (!rawMsg?.message) return
                        if (rawMsg.key?.remoteJid === 'status@broadcast') return
                        if (rawMsg.key?.remoteJid?.includes('@newsletter')) return
                        const m = await smsg(socket, rawMsg)
                        if (m) {
                            m.pushName = rawMsg.pushName || ''
                            await handleMessage(socket, m)
                        }
                    } catch (e) {
                        console.error(rgbTag('ERROR', e?.message || e, COLORS.error))
                    }
                })
            }
        })

        socket.ev.on('group-participants.update', async ({ id, participants, action }) => {
            try {
                if (!id || !id.endsWith('@g.us')) return
                const monitor = readJSON(MONITOR_FILE) || {}
                if (monitor.waiting || !Array.isArray(monitor.groups) || !monitor.groups.includes(id)) return
                if (!participants?.length) return
                const botJid = socket.decodeJid(socket.user?.id) || ''
                for (const p of participants) {
                    if (!p) continue
                    if (botJid && socket.decodeJid(String(p)) === botJid) continue
                    const num = String(p).split('@')[0]
                    const subject = socket.chats?.[id]?.subject || 'grup ini'
                    if (action === 'add') {
                        await socket.sendMessage(id, {
                            text: `👋 *WELCOME MEMBER BARU*\n\nHalo @${num}, selamat datang di grup *${subject}*! 🎉\n\nJangan lupa baca deskripsi grup ya. Kalau mau pakai bot, daftar dulu:\n\n\`.daftar nama,umur,status\`\n\nSemoga betah! 🙏`,
                            mentions: [p]
                        })
                        console.log(rgbTag('NOTIF', 'Welcome @' + num + ' di ' + subject, COLORS.success))
                    } else if (action === 'remove') {
                        await socket.sendMessage(id, {
                            text: `👋 *MEMBER KELUAR*\n\n@${num} telah keluar / dikeluarkan dari grup *${subject}*. 👋\n\nTerima kasih atas kebersamaannya, sampai jumpa!`,
                            mentions: [p]
                        })
                        console.log(rgbTag('NOTIF', 'Bye @' + num + ' di ' + subject, COLORS.warn))
                    }
                }
            } catch (e) {
                console.error(rgbTag('NOTIF', 'Gagal notifikasi member: ' + (e?.message || e), COLORS.error))
            }
        })

        socket.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
            const statusCode = getStatusCode(lastDisconnect)
            const errorMessage = lastDisconnect?.error?.message || ''

            if (connection === 'open') {
                isConnecting = false
                reconnectAttempt = 0
                if (reconnectTimer) {
                    clearTimeout(reconnectTimer)
                    reconnectTimer = null
                }
                if (!pluginsLoaded) {
                    await initPlugins()
                    pluginsLoaded = true
                }
                console.log(bannerConnected())
                await sendGroupListToOwner(socket)
                return
            }

            if (connection === 'close') {
                isConnecting = false

                if (statusCode === DisconnectReason.loggedOut) {
                    console.log(rgbTag('LOGOUT', 'Bot logout, hapus auth & restart...', COLORS.warn))
                    try { fs.rmSync('./auth', { recursive: true, force: true }) } catch {}
                    restartBot(3000)
                    return
                }

                let delay = 5000
                if (errorMessage.includes('Stream Errored')) delay = 15000
                else if (statusCode === DisconnectReason.connectionLost || statusCode === 0) delay = 8000
                else if (statusCode === DisconnectReason.connectionReplaced) delay = 30000
                else if (statusCode === DisconnectReason.timedOut) delay = 10000
                if (reconnectAttempt > 10) delay = 60000

                console.log(rgbTag('DISCONNECT', `Status: ${statusCode} • Attempt: ${reconnectAttempt} • ${errorMessage}`, COLORS.warn))
                restartBot(delay)
            }
        })

        // Keep alive
        keepAliveTimer = setInterval(() => {
            try {
                if (socket?.user && socket?.ws?.readyState === 1) {
                    socket.sendPresenceUpdate('available')
                }
            } catch {}
        }, 30000)
    } catch (e) {
        isConnecting = false
        console.error(rgbTag('ERROR', e?.message || e, COLORS.error))
        if (!reconnectTimer) restartBot(10000)
    }
}

process.on('SIGINT', async () => {
    try {
        if (reconnectTimer) clearTimeout(reconnectTimer)
        socket?.ev.removeAllListeners()
        socket?.ws?.close?.()
    } catch {}
    console.log(rgbTag('EXIT', 'Bot dimatikan. Sampai jumpa!', COLORS.info))
    process.exit(0)
})

start()