import fs from 'fs'
import { rgbTag, COLORS } from './rgb.js'

export const USERS_FILE = './database/users.json'

const xpTrack = new Map()

function read(file, fallback) {
    try {
        if (!fs.existsSync(file)) return fallback
        return JSON.parse(fs.readFileSync(file, 'utf-8'))
    } catch {
        return fallback
    }
}

function write(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2))
        return true
    } catch (e) {
        console.error(rgbTag('SYS', e?.message || e, COLORS.error))
        return false
    }
}

export function getUsers() {
    return read(USERS_FILE, {})
}

export function saveUsers(users) {
    return write(USERS_FILE, users)
}

function freshUser() {
    return { xp: 0, level: 1, money: 0, bank: 0, daily: '', limit: 25, items: {} }
}

export function ensureUser(number) {
    const users = getUsers()
    if (!users[number]) users[number] = freshUser()
    saveUsers(users)
    return users[number]
}

export function xpForLevel(level) {
    return 50 * level * level
}

export function levelFromXp(xp) {
    let l = 1
    while (xp >= xpForLevel(l + 1)) l++
    return l
}

export function addXp(number, amount) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    u.xp = (u.xp || 0) + amount
    const newLevel = levelFromXp(u.xp)
    const leveledUp = newLevel > (u.level || 1)
    u.level = newLevel
    saveUsers(users)
    return { leveledUp, level: u.level, xp: u.xp }
}

export function getBalance(number) {
    const u = ensureUser(number)
    return { money: u.money || 0, bank: u.bank || 0 }
}

export function addMoney(number, amount) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    u.money = (u.money || 0) + amount
    saveUsers(users)
    return u.money
}

export function transferMoney(from, to, amount) {
    const users = getUsers()
    const a = users[from] || (users[from] = freshUser())
    const b = users[to] || (users[to] = freshUser())
    if ((a.money || 0) < amount) return { ok: false, reason: 'Saldo tidak cukup' }
    a.money -= amount
    b.money = (b.money || 0) + amount
    saveUsers(users)
    return { ok: true, balance: a.money }
}

export function todayKey() {
    return new Date().toISOString().slice(0, 10)
}

export function claimDaily(number) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    const today = todayKey()
    if (u.daily === today) return { ok: false, reason: 'Hadiah harian sudah diklaim hari ini' }
    const reward = 100 + (u.level || 1) * 50
    u.daily = today
    u.money = (u.money || 0) + reward
    u.limit = 25
    saveUsers(users)
    return { ok: true, reward, limit: u.limit }
}

export function getLimit(number) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    if (u.daily !== todayKey()) {
        u.limit = 25
        saveUsers(users)
    }
    return u.limit
}

export function consumeLimit(number) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    if (u.daily !== todayKey()) u.limit = 25
    if (u.limit <= 0) return false
    u.limit--
    saveUsers(users)
    return true
}

export function getItems(number) {
    const u = ensureUser(number)
    return u.items || {}
}

export function addItem(number, name, qty = 1) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    u.items = u.items || {}
    u.items[name] = (u.items[name] || 0) + qty
    saveUsers(users)
}

export function takeItem(number, name, qty = 1) {
    const users = getUsers()
    const u = users[number] || (users[number] = freshUser())
    u.items = u.items || {}
    if ((u.items[name] || 0) < qty) return false
    u.items[name] -= qty
    if (u.items[name] <= 0) delete u.items[name]
    saveUsers(users)
    return true
}

export function leaderboard(sortBy = 'xp') {
    const users = getUsers()
    return Object.entries(users)
        .map(([num, u]) => ({ num, ...u }))
        .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))
        .slice(0, 10)
}

export function trackUser(conn, m) {
    if (!m?.sender || m.isOwner) return null
    const number = m.sender.split('@')[0]
    const now = Date.now()
    const last = xpTrack.get(number) || 0
    if (now - last < 30000) return null
    xpTrack.set(number, now)

    const gain = 5 + Math.floor(Math.random() * 10)
    const res = addXp(number, gain)
    if (Math.random() < 0.2) addMoney(number, 1 + Math.floor(Math.random() * 5))
    return res
}