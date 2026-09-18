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
import { resolveNewsletter } from './lib/shop.js'
import handleMessage, { initPlugins, getPluginSummary, normalizeNumber, invalidateJSONCache } from './handler.js'
import { rgb, log, divider, timeWIB, COLORS } from './lib/rgb.js'
import { ensureTemp } from './lib/autosave.js'

process.on('uncaughtException', (err) => {
    console.error(log('FATAL', 'Uncaught Exception: ' + (err?.stack || err), COLORS.error))
    try {
        socket?.ev.removeAllListeners()
        socket?.ws?.close?.()
    } catch {}
    restartBot(10000)
})
process.on('unhandledRejection', (err) => {
    console.error(log('FATAL', 'Unhandled Rejection: ' + (err?.message || err), COLORS.error))
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MONITOR_FILE = path.join(__dirname, 'database', 'monitor.json')
const OWNER_FILE = path.join(__dirname, 'database', 'owner.json')
const PHOTO_IN = path.join(__dirname, 'src', 'img', 'masuk.png')
const PHOTO_OUT = path.join(__dirname, 'src', 'img', 'keluar.png')

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
let profileSynced = false
let rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const question = t => {
    if (rl && rl.closed) {
        rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    }
    return new Promise(r => rl.question(t, r))
}

let config = loadConfig()
let BOT_NAME = config.botName || 'JhonBotXfinal'
let VERSION = config.version || '3.3.8'
let PAIR_CODE = config.pairingCode || 'JHON3382'

// ==================== GAMBAR BOX LOG ====================
function drawBox(lines, width = 44) {
    const top = '╭' + '─'.repeat(width) + '╮'
    const bottom = '╰' + '─'.repeat(width) + '╯'
    const out = [top]
    for (const line of lines) {
        out.push('│  ' + line)
    }
    out.push(bottom)
    return out.join('\n')
}

function bannerStart() {
    const c = COLORS.start
    const box = drawBox([
        `    ${BOT_NAME} v${VERSION}`,
        `    ${timeWIB()} WIB`,
        '    Starting...',
        `    Pairing Code: ${PAIR_CODE}`,
        '    Waiting for connection...'
    ])
    return rgb(box, c.c1, c.c2)
}

function chunk(arr, size) {
    const out = []
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
    return out
}

function bannerConnected() {
    const sum = getPluginSummary()
    const order = ['owner', 'user', 'airich', 'maker', 'tools', 'download', 'asupan', 'group', 'premium']
    const lines = [
        '    CONNECTED',
        `    ${BOT_NAME} v${VERSION}`,
        '    Loaded Plugins:'
    ]
    for (const key of order) {
        const arr = sum[key] || []
        if (!arr.length) continue
        lines.push('', `    [${key.toUpperCase()}]`)
        for (const row of chunk(arr, 6)) lines.push('   ' + row.map(c => '.' + c).join(' '))
    }
    const c = COLORS.success
    return rgb(drawBox(lines), c.c1, c.c2)
}

// ==================== PROFIL BOT (foto, nama, bio) ====================
async function applyBotProfile(conn) {
    if (profileSynced) return
    profileSynced = true
    try {
        await conn.updateProfileName(`${BOT_NAME} v${VERSION}`)
    } catch {}
    try {
        const bio = '> ' + (config.botName || 'JhonBotXfinal') + ' BOT\n' +
            '> Aktif 24/7\n' +
            '> Owner: ' + (config.ownerName || 'Jhon338') + '\n' +
            '> Mau pakai bot? Daftar dulu: .daftar'
        await conn.updateProfileStatus(bio)
        console.log(log('PROFILE', 'Nama & bio bot diperbarui', COLORS.success))
    } catch {}
}

// ==================== PASTIKAN NOMOR BOT = OWNER ====================
function ensureBotIsOwner(conn) {
    try {
        const botJid = conn.decodeJid(conn.user?.id) || ''
        const botNum = normalizeNumber(String(botJid).split('@')[0])
        if (!botNum) return
        const db = readJSON(OWNER_FILE) || { owner: [] }
        db.owner ??= []
        db.owner = [...new Set(db.owner.map(n => normalizeNumber(n)).filter(Boolean))]
        if (!db.owner.includes(botNum)) {
            db.owner.push(botNum)
            writeJSON(OWNER_FILE, db)
            console.log(log('OWNER', `Nomor bot ${botNum} di-set sebagai OWNER`, COLORS.success))
        }
    } catch {}
}

// ==================== CATATAN STARTUP ====================
async function sendGroupListToOwner(conn) {
    try {
        const monitor = readJSON(MONITOR_FILE) || { off: [] }
        monitor.off = Array.isArray(monitor.off) ? monitor.off : []
        if (monitor.off.length > 0) {
            console.log(log('STARTUP', `${monitor.off.length} grup dimatikan (.on/.off untuk kelola)`, COLORS.info))
        } else {
            console.log(log('STARTUP', 'Bot aktif di semua grup. Kelola lewat .on/.off di grup', COLORS.success))
        }
    } catch (err) {
        console.error(log('STARTUP', 'Gagal baca monitor: ' + (err?.message || err), COLORS.error))
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
    console.log(log('RECONNECT', `Menyambung ulang dalam ${delay / 1000} detik...`, COLORS.warn))
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
        BOT_NAME = config.botName || 'JhonBotXfinal'
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
            console.log(divider(' PAIRING ', COLORS.start))
            console.log(log('PAIRING', 'Masukkan nomor pemilik', COLORS.start))
            console.log(log('PAIRING', 'Contoh: 628xxxxxxxxxx', COLORS.info))
            const number = await question(rgb('Nomor: ', [255, 170, 0], [255, 255, 120]))
            const cleanNumber = number.replace(/\D/g, '')
            if (!cleanNumber) {
                console.log(log('PAIRING', 'Nomor tidak valid. Ulangi...', COLORS.error))
                restartBot(3000)
                return
            }
            try {
                const code = await socket.requestPairingCode(cleanNumber, PAIR_CODE)
                console.log(divider(' KODE PAIRING ', COLORS.warn))
                console.log(log('PAIRING', `KODE: ${code}`, COLORS.success))
                console.log(divider(' CARA PAIRING ', COLORS.info))
                console.log(log('PAIRING', '1. Buka WhatsApp di HP nomor tersebut', COLORS.info))
                console.log(log('PAIRING', '2. Masuk ke Perangkat Tertaut', COLORS.info))
                console.log(log('PAIRING', '3. Pilih "Tautkan dengan nomor telepon"', COLORS.info))
                console.log(log('PAIRING', '4. Ketik nomor yang tadi dimasukkan', COLORS.info))
                console.log(log('PAIRING', '5. Masukkan kode pairing di atas', COLORS.info))
                console.log(divider('', COLORS.start))

                // Auto-set nomor pairing sebagai OWNER
                const ownerNum = normalizeNumber(cleanNumber)
                const db = readJSON(OWNER_FILE) || { owner: [] }
                db.owner ??= []
                db.owner = [...new Set(db.owner.map(n => normalizeNumber(n)).filter(Boolean))]
                if (!db.owner.includes(ownerNum)) db.owner.push(ownerNum)
                writeJSON(OWNER_FILE, db)
                console.log(log('PAIRING', `Nomor ${ownerNum} di-set sebagai OWNER`, COLORS.success))

                // Simpan nomor pairing ke config.json (creator), agar nomor bot tetap
                // tersimpan di config walau auth/database dihapus total.
                try {
                    const CONFIG_FILE = path.join(__dirname, 'config.json')
                    const cfg = readJSON(CONFIG_FILE)
                    cfg.creator = [...new Set([...(cfg.creator || []).map(n => normalizeNumber(n)), ownerNum])].filter(Boolean)
                    writeJSON(CONFIG_FILE, cfg)
                    console.log(log('PAIRING', `Nomor ${ownerNum} tersimpan di config.json`, COLORS.success))
                } catch (cfgErr) {
                    console.error(log('PAIRING', 'Gagal menulis config.json: ' + (cfgErr?.message || cfgErr), COLORS.error))
                }
            } catch (err) {
                console.error(log('PAIRING', 'Gagal mengirim kode pairing: ' + (err?.message || err), COLORS.error))
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
                        console.error(log('ERROR', e?.message || e, COLORS.error))
                    }
                })
            }
        })

        socket.ev.on('group-participants.update', async ({ id, participants, action }) => {
            try {
                if (!id || !id.endsWith('@g.us')) return
                const monitor = readJSON(MONITOR_FILE) || { off: [] }
                if ((monitor.off || []).includes(id)) return // bot aktif semua grup, tapi yang .off jangan kirim notif
                if (!participants?.length) return
                const botJid = socket.decodeJid(socket.user?.id) || ''
                for (const p of participants) {
                    if (!p) continue
                    if (botJid && socket.decodeJid(String(p)) === botJid) continue
                    const num = String(p).split('@')[0]
                    const subject = socket.chats?.[id]?.subject || 'grup ini'
                    if (action === 'add') {
                        await socket.sendMessage(id, { image: fs.readFileSync(PHOTO_IN), mimetype: 'image/png' })
                        await socket.sendMessage(id, {
                            text: `> *WELCOME MEMBER BARU*\n\n_Halo @${num}, selamat datang di grup_ *${subject}*\n\n_Mau pakai fitur bot? Daftar dulu:_\n- \`.daftar nama,umur,status\`\n\n_Semoga betah & ramaikan grup!_`,
                            mentions: [p]
                        })
                        console.log(log('NOTIF', 'Welcome @' + num + ' di ' + subject, COLORS.success))
                    } else if (action === 'remove') {
                        await socket.sendMessage(id, { image: fs.readFileSync(PHOTO_OUT), mimetype: 'image/png' })
                        await socket.sendMessage(id, {
                            text: `> *MEMBER KELUAR*\n\n@${num} _telah keluar / dikeluarkan dari grup_ *${subject}*\n\n_Terima kasih atas kebersamaannya, sampai jumpa!_`,
                            mentions: [p]
                        })
                        console.log(log('NOTIF', 'Bye @' + num + ' di ' + subject, COLORS.warn))
                    }
                }
            } catch (e) {
                console.error(log('NOTIF', 'Gagal notifikasi member: ' + (e?.message || e), COLORS.error))
            }
        })

        socket.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
            const statusCode = getStatusCode(lastDisconnect)
            const errorMessage = lastDisconnect?.error?.message || ''

            if (connection === 'open') {
                isConnecting = false
                reconnectAttempt = 0
                ensureBotIsOwner(socket)
                await applyBotProfile(socket)
                resolveNewsletter(socket).catch(() => {})
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
                    console.log(log('LOGOUT', 'Bot logout, hapus auth & restart...', COLORS.warn))
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

                console.log(log('DISCONNECT', `Status: ${statusCode} • Attempt: ${reconnectAttempt} • ${errorMessage}`, COLORS.warn))
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
        console.error(log('ERROR', e?.message || e, COLORS.error))
        if (!reconnectTimer) restartBot(10000)
    }
}

process.on('SIGINT', async () => {
    try {
        if (reconnectTimer) clearTimeout(reconnectTimer)
        socket?.ev.removeAllListeners()
        socket?.ws?.close?.()
    } catch {}
    console.log(log('EXIT', 'Bot dimatikan. Sampai jumpa!', COLORS.info))
    process.exit(0)
})

start()