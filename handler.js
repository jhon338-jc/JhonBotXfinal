import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { log, COLORS } from './lib/rgb.js'
import { runAntiSpam } from './lib/antispam.js'

// ============================================================
//  JHONBOT v3.3.8 - BRAIN (OTAK BOT)
//  Role: OWNER & USER SAJA (tidak ada admin)
// ============================================================

export const BOT_NAME = 'JhonBot'
export const BOT_VERSION = '3.3.8'

// Versi bot dari config.json (biar caption/keterangan tidak stale saat versi diganti)
export function getBotVersion() {
    try {
        const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'))
        return 'JhonBot v' + (cfg.version || BOT_VERSION)
    } catch {
        return 'JhonBot v' + BOT_VERSION
    }
}

// Tanggal & jam WIB real-time saat pesan diproses (bukan timestamp statis)
export function nowWIB(opt = {}) {
    try {
        return new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', ...opt })
    } catch {
        return new Date().toLocaleString('id-ID')
    }
}

// Command publik yang BOLEH dipakai di DM (selain itu DM tidak dilayani)
const DM_PUBLIC = new Set(['rvo', 'brat', 'img', 'toimg', 'iqc', 'lirik', 'donlodall', 'daftar'])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, 'plugins')

export const plugins = new Map()
const summary = { owner: [], user: [] }

const jsonCache = new Map()

// Jalur absolut DB — konsisten apa pun working directory proses
export const DB_FILES = {
    owner: path.join(__dirname, 'database', 'owner.json'),
    premium: path.join(__dirname, 'database', 'premium.json'),
    monitor: path.join(__dirname, 'database', 'monitor.json'),
    members: path.join(__dirname, 'database', 'member.json')
}

function readJSON(file) {
    try {
        const stat = fs.statSync(file)
        const hit = jsonCache.get(file)
        if (hit && hit.mtimeMs === stat.mtimeMs) return hit.data
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
        jsonCache.set(file, { mtimeMs: stat.mtimeMs, data })
        return data
    } catch {
        return null
    }
}

export function invalidateJSONCache(file) {
    if (file) jsonCache.delete(file)
    else jsonCache.clear()
}

const writeJSON = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    invalidateJSONCache(file)
}

// ==================== NORMALISASI NOMOR ====================
// Mendukung format 628xxx / 08xxx / +628xxx → 628xxx
export function normalizeNumber(raw = '') {
    let n = String(raw).replace(/[^\d]/g, '')
    if (n.startsWith('0')) n = '62' + n.slice(1)
    return n
}

export function loadOwners() {
    const db = readJSON(DB_FILES.owner)
    try {
        const list = (db?.owner || []).map(n => normalizeNumber(n))
        return [...new Set(list.filter(Boolean))]
    } catch {
        return []
    }
}

// ==================== PREMIUM ====================
// Schema premium.json:
//   { "premium": [ { "number": "628xxx", "tier": "premium1", "startDate": ms, "endDate": ms } ] }
// Legacy format lama (array string polos) tetap didukung saat load.
export const PREMIUM_TIERS = {
    premium1: { label: 'PREMIUM 1', price: 5000, days: 2 },
    premium2: { label: 'PREMIUM 2', price: 10000, days: 7 },
    premium3: { label: 'PREMIUM 3', price: 15000, days: 30 }
}
const TIER_ALIAS = {
    '1': 'premium1', 'premium1': 'premium1', 'prem1': 'premium1',
    '2': 'premium2', 'premium2': 'premium2', 'prem2': 'premium2',
    '3': 'premium3', 'premium3': 'premium3', 'prem3': 'premium3'
}
export function resolveTier(input = '') {
    return TIER_ALIAS[String(input).toLowerCase()] || null
}

export function loadPremium() {
    const db = readJSON(DB_FILES.premium)
    try {
        const list = Array.isArray(db?.premium) ? db.premium : []
        const now = Date.now()
        const active = []
        for (const e of list) {
            // Legacy: string polos → dianggap aktif tanpa batas waktu
            if (typeof e === 'string' || typeof e === 'number') {
                active.push(normalizeNumber(e))
                continue
            }
            if (!e || !e.number) continue
            const end = Number(e.endDate || 0)
            const num = normalizeNumber(e.number)
            if (!num) continue
            if (!end || end > now) active.push(num)
        }
        return active
    } catch {
        return []
    }
}

// ==================== PENYIMPANAN DATABASE PREMIUM ====================
export function loadPremiumList() {
    const db = readJSON(DB_FILES.premium)
    return Array.isArray(db?.premium) ? db.premium : []
}

export function savePremiumList(list) {
    const db = readJSON(DB_FILES.premium) || {}
    db.premium = list
    writeJSON(DB_FILES.premium, db)
}

export function isPremiumActive(number = '') {
    const num = normalizeNumber(number)
    if (!num) return false
    return loadPremium().includes(num)
}

// Durasi dihitung dari langganan pertama (startDate dipertahankan).
// - User baru         → startDate = sekarang, endDate = startDate + durasi
// - User sudah aktif  → startDate tetap, endDate ditambah durasi dari startDate
// - User sudah habis  → dimulai ulang dari sekarang (langganan pertama baru)
export function addPremium(number = '', tier = 'premium2', { extend = true } = {}) {
    const num = normalizeNumber(number)
    const T = PREMIUM_TIERS[tier] || PREMIUM_TIERS.premium2
    if (!num) return null
    const now = Date.now()
    const duration = T.days * 24 * 60 * 60 * 1000
    const list = loadPremiumList()
    const existing = list.find(e => e && normalizeNumber(e.number) === num)
    if (existing) {
        const startDate = Number(existing.startDate) || now
        if (Number(existing.endDate) > now && extend) {
            // masih aktif → endDate ditambah durasi paket baru (menumpuk dari tanggal habis sekarang)
            existing.endDate = Math.max(now, Number(existing.endDate) || now) + duration
        } else {
            // sudah habis → mulai dari sekarang
            existing.startDate = now
            existing.endDate = now + duration
        }
        existing.tier = tier
        existing.number = num
        savePremiumList(list)
        return existing
    }
    const entry = { number: num, tier, startDate: now, endDate: now + duration }
    list.push(entry)
    savePremiumList(list)
    return entry
}

export function removePremium(number = '') {
    const num = normalizeNumber(number)
    if (!num) return false
    const list = loadPremiumList().filter(e => {
        if (typeof e === 'string' || typeof e === 'number') return normalizeNumber(e) !== num
        return e && normalizeNumber(e.number) !== num
    })
    savePremiumList(list)
    return true
}

export function getPremiumEntry(number = '') {
    const num = normalizeNumber(number)
    if (!num) return null
    const list = loadPremiumList()
    return list.find(e => e && normalizeNumber(e.number) === num) || null
}

export function formatPremiumEntry(entry) {
    if (!entry) return null
    if (typeof entry === 'string' || typeof entry === 'number') {
        return { number: normalizeNumber(entry), tier: 'premium2', startDate: 0, endDate: 0, active: true, remainingMs: null, legacy: true }
    }
    const num = normalizeNumber(entry.number)
    const end = Number(entry.endDate || 0)
    const tier = PREMIUM_TIERS[entry.tier] ? entry.tier : 'premium2'
    return {
        number: num,
        tier,
        startDate: Number(entry.startDate || 0),
        endDate: end,
        active: !end || end > Date.now(),
        remainingMs: end ? end - Date.now() : null
    }
}

// ==================== MEMBER BOT (wajib daftar) ====================
export function loadMembers() {
    const db = readJSON(DB_FILES.members)
    return Array.isArray(db?.members) ? db.members : []
}

export function isRegisteredMember(sender = '') {
    const jid = String(sender || '')
    const num = normalizeNumber(jid)
    if (!jid && !num) return false
    return loadMembers().some(x => (x?.jid && x.jid === jid) || (num && x?.number && x.number === num))
}

export function saveMember(entry) {
    const db = readJSON(DB_FILES.members) || {}
    const arr = Array.isArray(db.members) ? db.members : []
    const num = entry?.number || ''
    const jid = entry?.jid || ''
    if (!arr.some(x => (jid && x?.jid === jid) || (num && x?.number === num))) arr.push(entry)
    db.members = arr
    writeJSON(DB_FILES.members, db)
    return arr
}

export const MEMBER_STATUS = ['pelajar', 'mahasiswa', 'singgel', 'jomblo', 'kawin']

// ==================== LOAD PLUGIN ====================
function getPluginFiles(dir) {
    let files = []
    if (!fs.existsSync(dir)) return files
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, item.name)
        if (item.isDirectory()) files.push(...getPluginFiles(full))
        else if (item.isFile() && item.name.endsWith('.js')) files.push(full)
    }
    return files
}

async function loadPlugin(file) {
    try {
        const module = await import(`${pathToFileURL(file).href}?update=${Date.now()}`)
        const handler = module.default
        if (!handler) return
        const category = path.relative(pluginDir, file).split(path.sep)[0]
        if (category !== 'owner' && category !== 'user') return

        const cmds = Array.isArray(handler.command) ? handler.command : handler.command ? [handler.command] : []
        for (const cmd of cmds) {
            const key = String(cmd).toLowerCase()
            plugins.set(key, handler)
            if (!summary[category].includes(key)) summary[category].push(key)
        }
        console.log(log('PLUGIN', 'Loaded ' + path.relative(pluginDir, file), COLORS.plugin))
    } catch (e) {
        console.error(log('PLUGIN', 'Failed ' + file + ' : ' + (e?.message || e), COLORS.error))
    }
}

export async function initPlugins() {
    for (const file of getPluginFiles(pluginDir)) {
        await loadPlugin(file)
    }
    return plugins.size
}

export function getPluginSummary() {
    return {
        owner: [...summary.owner].sort(),
        user: [...summary.user].sort()
    }
}

// ==================== PARSE PESAN (TEKS + BUTTON) ====================
function extractCommandFromMessage(m) {
    let body = ''
    let isButtonResponse = false
    try {
        if (m.message) {
            if (m.message.conversation) body = m.message.conversation
            else if (m.message.extendedTextMessage?.text) body = m.message.extendedTextMessage.text
            else if (m.message.imageMessage?.caption) body = m.message.imageMessage.caption
            else if (m.message.videoMessage?.caption) body = m.message.videoMessage.caption
            else if (m.message.documentMessage?.caption) body = m.message.documentMessage.caption
            else if (m.message.interactiveResponseMessage) {
                const inter = m.message.interactiveResponseMessage
                if (inter.nativeFlowResponseMessage?.paramsJson) {
                    try {
                        const params = JSON.parse(inter.nativeFlowResponseMessage.paramsJson)
                        body = params.id || params.buttonId || params.rowId || ''
                    } catch {
                        body = inter.nativeFlowResponseMessage.name || ''
                    }
                } else if (inter.buttonReply) {
                    body = inter.buttonReply.selectedButtonId || ''
                } else if (inter.singleSelectReply) {
                    body = inter.singleSelectReply.selectedRowId || ''
                }
                isButtonResponse = true
            } else if (m.message.templateButtonReplyMessage) {
                body = m.message.templateButtonReplyMessage.selectedId || ''
                isButtonResponse = true
            } else if (m.message.buttonsResponseMessage) {
                body = m.message.buttonsResponseMessage.selectedButtonId || ''
                isButtonResponse = true
            } else if (m.message.listResponseMessage) {
                body = m.message.listResponseMessage.title || m.message.listResponseMessage.description || ''
                isButtonResponse = true
            }
        }
    } catch {}
    return { body, isButtonResponse }
}

function stripPrefix(txt) {
    for (const p of ['.', '#', '!', '/', '\\']) {
        if (txt.startsWith(p)) return txt.slice(p.length)
    }
    return txt
}

async function resolveSenderNumbers(conn, m) {
    const nums = []
    const addJid = (jid) => {
        if (!jid) return
        const user = String(jid).split('@')[0]
        if (user && /^\d+$/.test(user)) nums.push(normalizeNumber(user))
    }
    addJid(m.sender)
    addJid(m.participant)
    addJid(m.key?.participant)
    addJid(m.key?.participantAlt)
    addJid(m.key?.remoteJidAlt)

    // Di chat pribadi, lawan bicara = pengirim (biar owner tetap dikenali
    // meskipun field sender/participant kosong atau berupa LID)
    if (!m.isGroup) {
        addJid(m.chat)
        addJid(m.key?.remoteJid)
        addJid(m.key?.remoteJidAlt)
    }

    const lidBase = j => String(j).split('@')[0].split(':')[0]
    const senderLid = [m.sender, m.participant, m.key?.participant].find(j => j && /@lid$/i.test(String(j)))
    if (senderLid) {
        try {
            const pn = await conn.signalRepository?.lidMapping?.getPNForLID(senderLid)
            if (pn) addJid(pn)
        } catch {}
        if (m.isGroup) {
            try {
                const meta = conn.chats?.[m.chat]?.metadata || await conn.groupMetadata(m.chat).catch(() => null)
                const p = (meta?.participants || []).find(u => u.lid && lidBase(u.lid) === lidBase(senderLid))
                if (p) addJid(p.id)
            } catch {}
        }
        try {
            for (const c of Object.values(conn.contacts || {})) {
                if (c?.lid && lidBase(c.lid) === lidBase(senderLid)) addJid(c.id)
            }
        } catch {}
    }

    return [...new Set(nums)]
}

// ==================== HANDLER UTAMA ====================
export default async function handleMessage(conn, m) {
    try {
        if (!m?.chat) return
        if (m.chat.includes('@newsletter') || m.chat === 'status@broadcast') return
        // Hanya abaikan pesan yang DIBUAT bot sendiri (id Baileys BAE5).
        // Pesan owner di chat pribadi/self-chat tetap fromMe=true karena bot
        // ter-pairing di nomor owner, tapi id-nya bukan BAE5 → tetap dilayani.
        if (m.fromMe && m.isBaileys) return

        const { body, isButtonResponse } = extractCommandFromMessage(m)
        if (!body) return

        const monitor = readJSON(DB_FILES.monitor) || { groups: [], waiting: false }
        const owners = loadOwners()
        const premium = loadPremium()
        const nums = await resolveSenderNumbers(conn, m)
        m.isOwner = nums.some(n => owners.includes(n))
        m.isPremium = m.isOwner || nums.some(n => premium.includes(n))

        // Parsing command (stripPrefix hanya SEKALI)
        const raw = isButtonResponse ? body : body.trim()
        const cleaned = stripPrefix(raw)
        if (!cleaned) return
        const args = cleaned.split(/\s+/)
        const command = args.shift().toLowerCase()
        m.command = command

        // Cache untuk plugin lain
        if (!conn.__data) conn.__data = {}
        conn.__data.owners = owners

        // ============ PEMILIHAN GRUP (balas nomor: "2,5") ============
        if (/^[\d,\s]+$/.test(cleaned) && !isButtonResponse) {
            if (!m.isGroup && m.isOwner && monitor.waiting) {
                const picked = cleaned.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                const nums = [...new Set(picked)]
                if (!nums.length || nums.length > 5) return
                let groups = []
                try {
                    const fetched = await conn.groupFetchAllParticipating()
                    groups = Object.values(fetched || {})
                } catch (e) {
                    console.error(log('HANDLER', 'Gagal ambil daftar grup: ' + (e?.message || e), COLORS.error))
                    return
                }
                const outOfRange = nums.filter(n => n < 1 || n > groups.length)
                if (outOfRange.length) {
                    return m.reply(`> *NOMOR TIDAK VALID*\n\n_Nomor_\n- \`${outOfRange.join(', ')}\`\n\n_tidak ada di daftar grup. Balas nomor_ \`1-${groups.length}\`_._`)
                }
                const selected = nums.map(n => groups[n - 1]).filter(Boolean)
                if (!selected.length) return
                monitor.groups = selected.map(g => g.id)
                monitor.waiting = false
                writeJSON(DB_FILES.monitor, monitor)
                let txt = '✅ *GRUP TERPILIH:*\n\n'
                txt += selected.map((g, i) => `${i + 1}. ${g.subject}\n   👥 ${g.participants?.length || 0} member`).join('\n\n')
                return await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
            }
            return
        }

        // ============ ATURAN DM ============
        // DM: owner bebas, USER hanya fitur publik tertentu
        if (!m.isGroup && !m.isOwner) {
            if (!DM_PUBLIC.has(command)) return
        }

        // ============ ATURAN GRUP (monitor) ============
        if (m.isGroup) {
            if (monitor.waiting) {
                if (!m.isOwner) return
            } else if (!monitor.groups.includes(m.chat)) {
                return
            }
        }

        // ============ ANTI-SPAM (hanya grup yang dipantau) ============
        if (m.isGroup) {
            const blocked = await runAntiSpam({ conn, m, body })
            if (blocked) return
        }

        // ============ CARI PLUGIN ============
        const handler = plugins.get(command)
        if (!handler) return

        // ============ DIAGNOSTIK OWNER ============
        if (['menu', 'profil', 'help'].includes(command) || (handler.owner && m.isOwner)) {
            const who = m.pushName ? `${m.pushName} (+${m.sender?.split('@')[0] || '?'})` : `+${m.sender?.split('@')[0] || '?'}`
            console.log(log('CMD', `.${command} ← ${who}`, m.isOwner ? COLORS.success : COLORS.info))
        }

        // ============ ACCESS CONTROL ============
        if (handler.owner && !m.isOwner) {
            return m.reply('> *OWNER ONLY*\n\n_❌ Fitur ini khusus 👑 **Owner**._\n\n_Kamu bukan owner. Mau jadi owner? Hubungi kreator Jhon338._')
        }
        if (handler.premium && !m.isPremium) {
            return m.reply('> *PREMIUM ONLY*\n\n_❌ Fitur ini khusus ⭐ **member premium**._\n\n_Mau jadi member premium? Ketik:_\n- `.premium`\n\n_👑 Atau hubungi owner untuk aktivasi._')
        }
        if (handler.group && !m.isGroup) {
            return m.reply('> *GROUP ONLY*\n\n_❌ Fitur ini hanya bisa dipakai di grup._')
        }
        if (handler.botAdmin && m.isGroup && !m.isBotAdmin) {
            return m.reply('> *BOT ADMIN REQUIRED*\n\n_❌ Bot harus menjadi **admin grup** untuk fitur ini._')
        }
        if (handler.admin && m.isGroup && !m.isAdmin && !m.isOwner) {
            return m.reply('> *ADMIN ONLY*\n\n_❌ Fitur ini khusus **admin grup**._')
        }

        // ============ WAJIB DAFTAR MEMBER ============
        if (!m.isOwner && !m.isPremium && !['daftar', 'register', 'reg'].includes(command) && !isRegisteredMember(m.sender || m.chat)) {
            return m.reply('> *TERDAFTAR DULU YUK*\n\n_Untuk memakai fitur bot ini, kamu harus daftar sebagai member dulu:_\n- `.daftar nama,umur,status`\n\n_Contoh:_\n- `.daftar Jhon,20,pelajar`\n\n_📋 Status yang tersedia:_\n- *pelajar*\n- *mahasiswa*\n- *singgel*\n- *jomblo*\n- *kawin*')
        }

        await handler(m, { conn, args, text: args.join(' '), command })
    } catch (e) {
        console.error(log('HANDLER', e?.message || e, COLORS.error))
        try {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        } catch {}
    }
}