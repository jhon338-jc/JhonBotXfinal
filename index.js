import fs from 'fs'
import readline from 'readline'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import {
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} from '@whiskeysockets/baileys'
import { smsg, makeWASocket, bind } from './lib/msg.js'
import handleMessage, { initPlugins } from './handler.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = text => new Promise(resolve => rl.question(text, resolve))

let socket
let reconnectTimer = null
let pluginsLoaded = false
let isConnecting = false

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

function restartBot(delay = 5000) {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
    }
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null
        start()
    }, delay)
}

// ========== FUNGSI BARU: Kirim daftar grup ke owner ==========
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

        let text = `╭─── *「 JHON338 - BOT 」* ───\n`
        text += `│\n`
        text += `│  ✅ *Bot Berhasil Tersambung!*\n`
        text += `│\n`
        text += `│  📊 *Total Grup:* ${groupList.length}\n`
        text += `│\n`
        text += `│  📋 *Daftar Grup:*\n`
        text += `│\n`

        groupList.forEach((group, index) => {
            const memberCount = group.participants?.length || 0
            text += `│  *${index + 1}.* ${group.subject}\n`
            text += `│      👥 ${memberCount} anggota\n`
            text += `│      🆔 ${group.id}\n`
            text += `│\n`
        })

        text += `│  ═══════════════════\n`
        text += `│\n`
        text += `│  🎯 *Pilih Grup untuk Dipantau:*\n`
        text += `│  Kirim nomor grup dengan format:\n`
        text += `│  *1,2,3,4,5*\n`
        text += `│  (Minimal 1, Maksimal 5 grup)\n`
        text += `│\n`
        text += `╰─── *「 Powered by JhonChenank 」* ───`

         // Cek apakah sudah ada grup yang dipilih sebelumnya
        const existingMonitor = JSON.parse(fs.readFileSync(MONITOR_FILE, 'utf-8'))
        
        if (existingMonitor.groups.length > 0 && !existingMonitor.waiting) {
            // Grup sudah dipilih sebelumnya, langsung pakai
            console.log(`[STARTUP] Menggunakan ${existingMonitor.groups.length} grup tersimpan`)
            console.log('[STARTUP] Kirim .sg ke bot untuk mengubah pilihan grup')
        } else {
            // Kirim daftar grup ke owner untuk pertama kali
            await conn.sendMessage(ownerJid, { text: text })

            // Simpan status menunggu pilihan
            const monitor = { groups: [], waiting: true }
            writeJSON(MONITOR_FILE, monitor)

            console.log('[STARTUP] Daftar grup terkirim ke owner')
            console.log('[STARTUP] Menunggu pilihan grup dari owner...')
        }
        
    } catch (err) {
        console.error('[STARTUP] Gagal kirim daftar grup:', err.message)
    }
}
// =============================================================

async function start() {
    if (isConnecting) return
    isConnecting = true

    try {
        if (socket) {
            socket.ev.removeAllListeners()
            socket.ws?.close?.()
        }

        const { state, saveCreds } = await useMultiFileAuthState('./auth')

        socket = makeWASocket({
            auth: state,
            browser: Browsers.ubuntu('Chrome'),
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            markOnlineOnConnect: true,
        })

        bind(socket)

        if (!state.creds.registered) {
            console.log('Masukkan nomor telepon (contoh: 628x)');
            const number = await question('Sending Code to : ');
            try {
                const code = await socket.requestPairingCode(number, 'JHON3382');
                console.log(`KODE PAIRING: ${code}`);
            } catch (err) {
                console.error('Gagal mengirim kode pairing:', err.message);
                process.exit(1);
            } finally {
                rl.close();
            }
        }

        socket.ev.on('creds.update', saveCreds)

        socket.ev.on('messages.upsert', async ({ messages }) => {
            if (messages.length === 0) return
            setImmediate(async () => {
                try {
                    let m = messages[0]
                    if (!m?.message || m.key.remoteJid === 'status@broadcast') return
                    m = await smsg(socket, m)
                    if (m) await handleMessage(socket, m)
                } catch (e) {}
            })
        })

        socket.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
            const statusCode = getStatusCode(lastDisconnect)
            const errorMessage = lastDisconnect?.error?.message || ''

            if (connection === 'open') {
                isConnecting = false
                if (reconnectTimer) {
                    clearTimeout(reconnectTimer)
                    reconnectTimer = null
                }
                if (!pluginsLoaded) {
                    await initPlugins()
                    pluginsLoaded = true
                }
                
                // ========== KIRIM DAFTAR GRUP KE OWNER ==========
                await sendGroupListToOwner(socket)
                // =================================================
                
                return
            }

            if (connection === 'close') {
                isConnecting = false
                if (statusCode === DisconnectReason.loggedOut) return
                let delay = 5000
                if (errorMessage.includes('Stream Errored')) {
                    delay = 15000
                } else if (statusCode === DisconnectReason.connectionLost || statusCode === 0) {
                    delay = 8000
                }
                restartBot(delay)
            }
        })
        
        setInterval(() => {
            if (socket?.user && socket?.ws?.readyState === 1) {
                socket.sendPresenceUpdate('available')
            }
        }, 60000)

    } catch (e) {
        isConnecting = false
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
    process.exit(0)
})

start()