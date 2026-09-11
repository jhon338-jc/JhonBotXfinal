import fs from 'fs'
import readline from 'readline'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import {
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} from '@whiskeysockets/baileys'
import { smsg, makeWASocket as makeLevvaSocket, bind } from './lib/msg.js'
import handleMessage, { initPlugins } from './handler.js'
import { rgb, rgbTag, COLORS } from './lib/rgb.js'

process.on('uncaughtException', () => {})
process.on('unhandledRejection', () => {})

const DEVELOPER = 'Jhon338'
const VERSION = '3.4.0'
const DEVICE = 'PC-TERMINAL'

// Banner RGB gradient - warna gonta-ganti tiap restart
const GRADIENTS = [
    { c1: [255, 80, 120], c2: [255, 180, 210] },
    { c1: [140, 90, 255], c2: [90, 200, 255] },
    { c1: [0, 200, 255], c2: [120, 255, 220] },
    { c1: [255, 170, 0], c2: [255, 255, 120] },
    { c1: [80, 255, 120], c2: [255, 210, 80] },
    { c1: [255, 60, 160], c2: [120, 60, 255] }
]
const MOTTOS = [
    'DEVELOPER BY JHON338',
    'Bot Pemantau & Multi Device WhatsApp',
    'Fast, Reliable, & Powerful',
    'PC Terminal Compatible - Tanpa Termux',
    'Otomatisasi handal dimulai di sini',
    'Ringan dan bertenaga',
    'Dibuat untuk pengalaman lebih baik',
    'Bot WhatsApp terpercaya Anda'
]

function rgbBanner() {
    const g = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
    const gradient = text =>
        text
            .split('')
            .map((ch, i, arr) => {
                const t = i / (arr.length - 1 || 1)
                const r = Math.round(g.c1[0] + (g.c2[0] - g.c1[0]) * t)
                const gg = Math.round(g.c1[1] + (g.c2[1] - g.c1[1]) * t)
                const b = Math.round(g.c1[2] + (g.c2[2] - g.c1[2]) * t)
                return `\x1b[38;2;${r};${gg};${b}m${ch}`
            })
            .join('') + '\x1b[0m'
    const motto = MOTTOS[Math.floor(Math.random() * MOTTOS.length)]
    const line = '━'.repeat(58)
    return `
${gradient('         JHON338 - WHATSAPP MULTI DEVICE BOT')}
${gradient(line)}
${gradient(`   Develop  : ${DEVELOPER.toUpperCase()}`)}
${gradient(`   Version  : ${VERSION}`)}
${gradient(`   Mode     : ${DEVICE} (Windows / Linux)`)}
${gradient(`   ${motto}`)}
${gradient(line)}`
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = text => new Promise(resolve => rl.question(text, resolve))

const log = (tag, msg, color) => console.log(rgbTag(tag, msg, color || COLORS.info))
const errlog = (tag, msg) => console.error(rgbTag(tag, msg, COLORS.error))

let socket
let reconnectTimer = null
let pluginsLoaded = false
let isConnecting = false
let reconnectAttempt = 0

const MONITOR_FILE = './database/monitor.json'
const CONFIG_FILE = './config.json'

function readJSON(file) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

const getStatusCode = lastDisconnect => {
    try {
        if (!lastDisconnect?.error) return 0
        return Boom.isBoom(lastDisconnect.error)
            ? lastDisconnect.error.output.statusCode
            : lastDisconnect.error?.output?.statusCode || 0
    } catch {
        return 0
    }
}

async function restartBot(delay = 5000) {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
    }
    console.log(rgbTag('RECONNECT', `Mencoba menyambung ulang dalam ${delay/1000} detik...`, COLORS.warn))
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null
        reconnectAttempt++
        start()
    }, delay)
}

async function sendGroupListToOwner(conn) {
    try {
        const config = readJSON(CONFIG_FILE)
        const ownerNumber = config.creator[0]
        const ownerJid = ownerNumber + '@s.whatsapp.net'

        const groups = await conn.groupFetchAllParticipating()
        const groupList = Object.values(groups)

        if (groupList.length === 0) {
            await conn.sendMessage(ownerJid, { text: '❌ Bot tidak ada di grup manapun!' })
            return
        }

        let text = `╭─── *「 JHON338 - BOT v${VERSION} 」* ───\n`
        text += `│\n│  ✅ *Bot Berhasil Tersambung!*\n│\n`
        text += `│  📊 *Total Grup:* ${groupList.length}\n│\n│  📋 *Daftar Grup:*\n│\n`

        groupList.forEach((group, index) => {
            const memberCount = group.participants?.length || 0
            text += `│  *${index + 1}.* ${group.subject}\n`
            text += `│      👥 ${memberCount} anggota\n│\n`
        })

        text += `│  ═══════════════════\n│\n│  🎯 *Pilih Grup:*\n│  *1,2,3,4,5*\n│  (Min 1, Maks 5)\n│\n│  ${DEVELOPER} v${VERSION}\n╰─── *「 JHON338 - BOT 」* ───`

        const existingMonitor = JSON.parse(fs.readFileSync(MONITOR_FILE, 'utf-8'))
        
        if (existingMonitor.groups.length > 0 && !existingMonitor.waiting) {
            console.log(rgbTag('STARTUP', `Menggunakan ${existingMonitor.groups.length} grup tersimpan`, COLORS.info))
            console.log(rgbTag('STARTUP', 'Kirim .sg ke bot untuk mengubah pilihan grup', COLORS.info))
        } else {
            await conn.sendMessage(ownerJid, { text: text })
            const monitor = { groups: [], waiting: true }
            writeJSON(MONITOR_FILE, monitor)
            console.log(rgbTag('STARTUP', 'Daftar grup terkirim ke owner', COLORS.success))
            console.log(rgbTag('STARTUP', 'Menunggu pilihan grup dari owner...', COLORS.warn))
        }

    } catch (err) {
        console.error(rgbTag('STARTUP', 'Gagal kirim daftar grup: ' + (err?.message || err), COLORS.error))
    }
}

async function start() {
    if (isConnecting) return
    isConnecting = true

    try {
        console.log(rgbBanner())
        console.log(rgbTag('START', `Inisialisasi bot ${DEVELOPER} v${VERSION}...`, COLORS.start))

        if (socket) {
            socket.ev.removeAllListeners()
            socket.ws?.close?.()
        }

        const { state, saveCreds } = await useMultiFileAuthState('./auth')
        
        socket = makeLevvaSocket({
            auth: state,
            browser: Browsers.windows('Chrome'),
            logger: pino({ level: 'fatal' }),
            printQRInTerminal: false,
            markOnlineOnConnect: true,
            connectTimeoutMs: 60000,
            keepAliveIntervalMs: 30000,
            retryRequestDelayMs: 10000,
        })

        bind(socket)

        if (!state.creds.registered) {
            console.log(rgbTag('PAIRING', 'Masukkan nomor telepon (contoh: 628x)', COLORS.warn))
            const number = await question(rgb('Sending Code to : ', [255,170,0], [255,255,120]))
            try {
                const code = await socket.requestPairingCode(number, 'JHON3382')
                console.log(rgbTag('PAIRING', `KODE PAIRING: ${code}`, COLORS.success))
                console.log(rgb('─────────────────────────────────', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('CARA PAIRING:', COLORS.start.c1, COLORS.start.c2))
                console.log(rgb('1. Buka WhatsApp di HP nomor tersebut', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('2. Masuk ke Perangkat Tertaut', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('3. Pilih "Tautkan dengan nomor telepon"', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('4. Ketik nomor yang tadi dimasukkan', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('5. Masukkan kode pairing di atas', COLORS.info.c1, COLORS.info.c2))
                console.log(rgb('─────────────────────────────────', COLORS.info.c1, COLORS.info.c2))
                // Auto set nomor pairing sebagai Owner/Creator (database clean)
                const cleanNumber = number.replace(/\D/g, '')
                const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
                if (!config.creator.includes(cleanNumber)) {
                    config.creator.push(cleanNumber)
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                }
                const role = JSON.parse(fs.readFileSync('./database/role.json', 'utf-8'))
                role.owner ??= []
                if (!role.owner.includes(cleanNumber)) {
                    role.owner.push(cleanNumber)
                    fs.writeFileSync('./database/role.json', JSON.stringify(role, null, 2))
                }
                console.log(rgbTag('PAIRING', `Nomor ${cleanNumber} dijadikan Owner/Creator otomatis`, COLORS.success))
            } catch (err) {
                console.error(rgbTag('PAIRING', 'Gagal mengirim kode pairing: ' + (err?.message || err), COLORS.error))
                process.exit(1)
            } finally {
                rl.close()
            }
        } else {
            rl.close()
        }

        socket.ev.on('creds.update', saveCreds)

        socket.ev.on('messages.upsert', async ({ messages }) => {
            if (messages.length === 0) return
            setImmediate(async () => {
                try {
                    let m = messages[0]
                    if (!m?.message || m.key.remoteJid === 'status@broadcast') return
                    if (m.key.remoteJid?.includes('@newsletter')) return
                    m = await smsg(socket, m)
                    if (m) await handleMessage(socket, m)
                } catch (e) {
                    errlog('ERROR', e?.message || e)
                }
            })
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
                console.log(rgbTag('CONNECTION', `Bot tersambung! (${socket.user?.id || 'unknown'})`, COLORS.success))
                console.log(rgbTag('CONNECTION', `WEB - ${DEVELOPER} | VERSION ${VERSION} | ${DEVICE}`, COLORS.success))
                await sendGroupListToOwner(socket)
                return
            }

            if (connection === 'close') {
                isConnecting = false
                
                // LOGOUT = pairing ulang
                if (statusCode === DisconnectReason.loggedOut) {
                    console.log(rgbTag('LOGOUT', 'Bot logout, hapus auth & restart...', COLORS.warn))
                    fs.rmSync('./auth', { recursive: true, force: true })
                    restartBot(3000)
                    return
                }
                
                // RECONNECT
                let delay = 5000
                if (errorMessage.includes('Stream Errored')) {
                    delay = 15000
                } else if (statusCode === DisconnectReason.connectionLost || statusCode === 0) {
                    delay = 8000
                } else if (statusCode === DisconnectReason.connectionReplaced) {
                    delay = 30000
                } else if (statusCode === DisconnectReason.timedOut) {
                    delay = 10000
                }
                
                // Max reconnect 10x, setelah itu delay lebih lama
                if (reconnectAttempt > 10) {
                    delay = 60000
                }
                
                console.log(rgbTag('DISCONNECT', `Status: ${statusCode}, Attempt: ${reconnectAttempt} - ${errorMessage}`, COLORS.warn))
                restartBot(delay)
            }
        })

        // Keep alive setiap 30 detik
        setInterval(() => {
            if (socket?.user && socket?.ws?.readyState === 1) {
                socket.sendPresenceUpdate('available')
            }
        }, 30000)

    } catch (e) {
        isConnecting = false
        console.error(rgbTag('ERROR', e.message, COLORS.error))
        if (!reconnectTimer) {
            restartBot(10000)
        }
    }
}

process.on('SIGINT', async () => {
    try {
        if (reconnectTimer) clearTimeout(reconnectTimer)
        socket?.ev.removeAllListeners()
        socket?.ws?.close?.()
    } catch {}
    console.log(rgbTag('EXIT', `Bot dimatikan. Sampai jumpa ${DEVELOPER}!`, COLORS.info))
    process.exit(0)
})

start()