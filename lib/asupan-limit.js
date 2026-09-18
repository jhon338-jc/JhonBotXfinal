import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const FILE = path.join(ROOT, 'database', 'asupan-limit.json')

const DAILY_LIMIT = 5

function todayKey() {
    try {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' })
    } catch {
        return new Date().toISOString().slice(0, 10)
    }
}

function read() {
    try {
        return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
    } catch {
        return {}
    }
}

function prune(db) {
    const keys = Object.keys(db).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort()
    while (keys.length > 7) delete db[keys.shift()]
}

function write(db) {
    try {
        fs.writeFileSync(FILE, JSON.stringify(db, null, 2))
    } catch {}
}

export function asupanQuotaUsed(number = '', command = '') {
    const num = String(number).replace(/\D/g, '')
    const cmd = String(command).toLowerCase()
    if (!num || !cmd) return 0
    const db = read()
    return (db[todayKey()] || {})[num + '|' + cmd] || 0
}

export function asupanQuotaLeft(number = '', command = '') {
    return Math.max(0, DAILY_LIMIT - asupanQuotaUsed(number, command))
}

export function consumeAsupanQuota(number = '', command = '') {
    const num = String(number).replace(/\D/g, '')
    const cmd = String(command).toLowerCase()
    if (!num || !cmd) return { ok: true, used: 0, left: DAILY_LIMIT }
    const key = num + '|' + cmd
    const db = read()
    const day = todayKey()
    const today = db[day] || {}
    const used = today[key] || 0
    if (used >= DAILY_LIMIT) return { ok: false, used, left: 0 }
    today[key] = used + 1
    db[day] = today
    prune(db)
    write(db)
    return { ok: true, used: used + 1, left: DAILY_LIMIT - (used + 1) }
}