import os from 'os'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { plugins, loadOwners, loadPremium, loadMembers, loadPremiumList } from '../../handler.js'
import { sendAiRich } from '../../lib/airich.js'
import { getChatLog } from '../../lib/serverlog.js'
import { buildServerHTML, loadSongs, fmtBytes } from '../../lib/serverboard.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const AUDIO_DIR = path.join(ROOT, 'src', 'audio')

const CITY = { name: 'Jakarta', lat: '-6.200000', lon: '106.816666' }

const WMO = {
    0: { i: '☀️', t: 'Cerah' }, 1: { i: '🌤️', t: 'Cerah Berawan' }, 2: { i: '⛅', t: 'Sedikit Berawan' },
    3: { i: '☁️', t: 'Mendung' }, 45: { i: '🌫️', t: 'Berkabut' }, 48: { i: '🌫️', t: 'Kabut Beku' },
    51: { i: '🌦️', t: 'Gerimis' }, 53: { i: '🌦️', t: 'Gerimis' }, 55: { i: '🌧️', t: 'Gerimis' },
    56: { i: '🌧️', t: 'Gerimis Beku' }, 57: { i: '🌧️', t: 'Gerimis Beku' },
    61: { i: '🌧️', t: 'Hujan Ringan' }, 63: { i: '🌧️', t: 'Hujan' }, 65: { i: '⛈️', t: 'Hujan Lebat' },
    66: { i: '🌧️', t: 'Hujan Beku' }, 67: { i: '🌧️', t: 'Hujan Beku' },
    71: { i: '🌨️', t: 'Salju Ringan' }, 73: { i: '🌨️', t: 'Salju' }, 75: { i: '❄️', t: 'Salju Lebat' },
    77: { i: '❄️', t: 'Butiran Salju' },
    80: { i: '🌧️', t: 'Hujan Badai' }, 81: { i: '🌧️', t: 'Hujan Badai' }, 82: { i: '⛈️', t: 'Hujan Badai' },
    85: { i: '🌨️', t: 'Hujan Salju' }, 86: { i: '🌨️', t: 'Hujan Salju' },
    95: { i: '⛈️', t: 'Badai Petir' }, 96: { i: '⛈️', t: 'Badai + Hujan Es' }, 99: { i: '⛈️', t: 'Badai + Hujan Es' }
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

function fmtDur(sec) {
    sec = Math.max(0, Math.floor(Number(sec) || 0))
    const d = Math.floor(sec / 86400)
    const h = Math.floor((sec % 86400) / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    const p = n => (n < 10 ? '0' : '') + n
    return (d > 0 ? d + 'd ' : '') + p(h) + ':' + p(m) + ':' + p(s)
}

function loadConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function readDB(name) {
    try {
        return JSON.parse(fs.readFileSync(path.join(ROOT, 'database', name), 'utf-8'))
    } catch {
        return null
    }
}

function dateStr() {
    try {
        return new Date().toLocaleDateString('id-ID', {
            timeZone: 'Asia/Jakarta',
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })
    } catch {
        return new Date().toLocaleDateString('id-ID')
    }
}

function cpuTimes() {
    const cpus = os.cpus()
    let idle = 0, total = 0
    for (const c of cpus) {
        total += (c.times.user || 0) + (c.times.nice || 0) + (c.times.sys || 0) + (c.times.idle || 0) + (c.times.irq || 0)
        idle += c.times.idle || 0
    }
    return { idle, total }
}

async function sampleCpu() {
    const a = cpuTimes()
    await sleep(400)
    const b = cpuTimes()
    const dt = Math.max(1, b.total - a.total)
    const di = Math.max(0, b.idle - a.idle)
    return Math.max(0, Math.min(100, Math.round((1 - di / dt) * 100)))
}

async function fetchWeather() {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + CITY.lat +
        '&longitude=' + CITY.lon +
        '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day' +
        '&timezone=Asia%2FJakarta&forecast_days=1'
    const ctrl = new AbortController()
    const tm = setTimeout(() => ctrl.abort(), 6000)
    try {
        const r = await fetch(url, { signal: ctrl.signal })
        if (!r.ok) return null
        const j = await r.json()
        const c = j?.current
        if (!c) return null
        const wmo = WMO[c.weather_code] || { i: '🌤️', t: 'Berawan' }
        return {
            city: CITY.name,
            temp: Math.round(c.temperature_2m ?? 0),
            feel: Math.round(c.apparent_temperature ?? c.temperature_2m ?? 0),
            hum: Math.round(c.relative_humidity_2m ?? 0),
            wind: Math.round(c.wind_speed_10m ?? 0),
            icon: wmo.i,
            cond: wmo.t,
            isDay: !!c.is_day,
            time: String(c.time || '').replace('T', ' ').slice(0, 16)
        }
    } catch {
        return null
    } finally {
        clearTimeout(tm)
    }
}

// Foto menu (banner landscape) → data URI kecil untuk dashboard
async function loadPhoto() {
    try {
        const p = path.join(ROOT, 'src', 'img', 'menu.png')
        if (!fs.existsSync(p)) return ''
        const buf = await sharp(p).resize({ width: 600 }).jpeg({ quality: 78 }).toBuffer()
        return 'data:image/jpeg;base64,' + buf.toString('base64')
    } catch {
        return ''
    }
}

// Total grup yang benar-benar diikuti bot (real dari WhatsApp)
async function fetchGroupTotal(conn) {
    try {
        const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))
        const res = await Promise.race([conn.groupFetchAllParticipating(), timeout])
        return Object.keys(res || {}).length
    } catch {
        return '-'
    }
}

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
    try {
        const cfg = loadConfig()
        const monitor = readDB('monitor.json') || { off: [] }
        const groupsOff = Array.isArray(monitor.off) ? monitor.off.length : 0
        const members = loadMembers().length
        const premiumList = loadPremiumList()
        const premium = loadPremium().length
        const premiumTotal = Array.isArray(premiumList) ? premiumList.length : 0
        const owners = loadOwners().length

        const totalMem = os.totalmem()
        const freeMem = os.freemem()
        const usedMem = Math.max(0, totalMem - freeMem)
        const ramPct = Math.min(100, Math.round((usedMem / (totalMem || 1)) * 100))

        const [cpuPct, weather, songs, groupsTotal, photo] = await Promise.all([
            sampleCpu(),
            fetchWeather(),
            Promise.resolve(loadSongs(AUDIO_DIR, (msg, lvl) =>
                console.log(log('SERVER', msg, lvl === 'warn' ? COLORS.warn : COLORS.info)))),
            fetchGroupTotal(conn),
            loadPhoto()
        ])

        const botName = cfg.botName || 'JhonBot'
        const ver = (botName + ' v' + (cfg.version || '3.8'))
        const uptime = Math.floor(process.uptime())

        const ds = {
            bot: botName,
            ver,
            mode: cfg.botMode || 'public',
            prefix: (Array.isArray(cfg.prefix) && cfg.prefix[0]) || '.',
            owner: cfg.ownerName || 'Jhon338',
            created: dateStr(),
            plugins: plugins.size,
            groupsOff,
            groupsTotal,
            members,
            premium,
            premiumTotal,
            owners,
            ram: {
                used: usedMem,
                total: totalMem,
                pct: ramPct,
                usedFmt: fmtBytes(usedMem),
                totalFmt: fmtBytes(totalMem)
            },
            cpu: cpuPct,
            cpus: (os.cpus() || []).length,
            uptime,
            uptimeFmt: fmtDur(uptime),
            sysUp: fmtDur(os.uptime()),
            node: process.version,
            plat: (os.platform() + ' ' + process.arch).toUpperCase(),
            host: os.hostname(),
            pid: process.pid,
            weather,
            photo,
            sdk: {
                tz: 7 * 3600,
                uptime,
                songs,
                link: cfg.channelLink || '',
                ver
            },
            log: getChatLog().slice(0, 20)
        }

        const html = buildServerHTML(ds)
        await sendAiRich(conn, m.chat, html, { title: 'Command Center' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        console.log(log('SERVER', 'Dashboard .server dikirim ke ' + m.chat + ' (' + html.length + ' byte, ' + songs.length + ' lagu)', COLORS.success))
    } catch (e) {
        console.error(log('SERVER', e?.message || e, COLORS.error))
        try { await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) } catch {}
    }
}

handler.command = ['server']

export default handler