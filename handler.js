import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { log, COLORS } from './lib/rgb.js'
import { runAntiSpam } from './lib/antispam.js'
import { pushChatLog } from './lib/serverlog.js'
import { consumeAsupanQuota } from './lib/asupan-limit.js'

// ============================================================
//  JHONBOTXFINAL v3.3.8 - BRAIN (OTAK BOT)
//  Role: CREATOR > OWNER > ADMIN (kelola grup) / PREMIUM 1-2-3 / USER
// ============================================================

const BOT_NAME = 'JhonBotXfinal'
const BOT_VERSION = '3.3.8'

// Versi bot dari config.json (biar caption/keterangan tidak stale saat versi diganti)
function getBotVersion() {
    try {
        const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'))
        return BOT_NAME + ' v' + (cfg.version || BOT_VERSION)
    } catch {
        return BOT_NAME + ' v' + BOT_VERSION
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

// Command yang TIDAK butuh status terdaftar (menu = pintu masuk ke .daftar)
const PRE_REGISTER_FREE = new Set(['daftar', 'register', 'reg', 'menu', 'help', 'profil', 'premium', 'langganan'])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, 'plugins')

export const plugins = new Map()
const summary = {} // kategori dinamis: owner, user, airich, maker, tools, download, asupan, group, premium

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
        // Gabungkan creator dari config.json — nomor pairing bot selalu tersimpan
        // di config, jadi owner dikenali meski database/ dihapus total.
        const cfg = readJSON(path.join(__dirname, 'config.json'))
        if (cfg && Array.isArray(cfg.creator)) {
            list.push(...cfg.creator.map(n => normalizeNumber(n)))
        }
        return [...new Set(list.filter(Boolean))]
    } catch {
        return []
    }
}

// CREATOR = nomor di config.json `creator` (paling tinggi, bisa ubah owner list).
export function loadCreators() {
    const cfg = readJSON(path.join(__dirname, 'config.json'))
    if (!cfg || !Array.isArray(cfg.creator)) return []
    return [...new Set(cfg.creator.map(n => normalizeNumber(n)).filter(Boolean))]
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

// ==================== FITUR PER PAKET PREMIUM ====================
// premium1 → list dasar.   premium2 → premium1 + daftar tambahan.
// premium3 → SEMUA fitur premium (termasuk fitur baru yang muncul nanti,
//            karena command premium yang tidak terdaftar di bawah dianggap premium3).
export const PREMIUM_TIER_CMDS = {
    premium1: ['asp', 'asupan', 'ccn', 'cecan', 'pap', 'paptt', 'papmmk', 'foto'],
    premium2: ['papbgl', 'kitsune', 'freyajkt', 'cishani', 'livyrenata', 'onicvonzy']
}
const TIER_RANK = { premium1: 1, premium2: 2, premium3: 3 }
const TIER_BY_RANK = ['', 'premium1', 'premium2', 'premium3']
const CMD_REQUIRED_RANK = {}
for (const [tier, cmds] of Object.entries(PREMIUM_TIER_CMDS)) {
    for (const cmd of cmds) CMD_REQUIRED_RANK[String(cmd).toLowerCase()] = TIER_RANK[tier]
}

// Rank minimum yang dibutuhkan sebuah command premium.
// Command premium yang tidak terdaftar → premium3 (semua fitur).
export function premiumCmdRank(cmd = '') {
    return CMD_REQUIRED_RANK[String(cmd).toLowerCase()] || 3
}
export function tierOfRank(rank) {
    return TIER_BY_RANK[rank] || 'premium3'
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
        if (!category || category === 'node_modules') return
        if (!summary[category]) summary[category] = []
        // Paket fitur Airich khusus OWNER + PREMIUM 2/3 (file Airich tidak diubah).
        // Kategori airich (AiRich-server/musik) + semua file AiRich-*.js di tools.
        const fileBase = path.basename(file)
        if (category === 'airich' || fileBase.startsWith('AiRich-')) handler.airich = true
        // Kategori asupan: BUKAN hard premium — semua member terdaftar boleh pakai,
        // dibatasi kuota harian per role (USER 5 · PREM1 50 · PREM2 100 · PREM3 150).
        // Kategori plugin (dipakai enforce kuota harian asupan)
        handler.category = category

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
    const out = {}
    for (const cat of Object.keys(summary)) {
        out[cat] = [...summary[cat]].sort()
    }
    return out
}

// Satu sumber kebenaran: bisakah role `m` menjalankan command ini?
// Dipakai menu untuk menampilkan fitur sesuai role user.
export function canRunCommand(m, command = '') {
    try {
        const handler = plugins.get(String(command).toLowerCase())
        if (!handler || typeof handler !== 'function') return false
        if (handler.creatorOnly && !m.isCreator) return false
        if (handler.ownerOnly && !m.isOwner) return false
        if (handler.owner && !m.isOwner) return false
        if (handler.airich && !m.isOwner && (m.premiumRank || 0) < 2) return false
        if (handler.premium && !m.isPremium) return false
        if (handler.premium && m.isPremium && !m.isOwner && !m.isAdmin) {
            if ((m.premiumRank || 2) < premiumCmdRank(command)) return false
        }
        if (handler.group && !m.isGroup) return false
        if (handler.admin && m.isGroup && !m.isAdmin && !m.isOwner) return false
        if (!m.isCreator && !PRE_REGISTER_FREE.has(String(command).toLowerCase()) && !isRegisteredMember(m.sender)) return false
        return true
    } catch {
        return true
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
                const lr = m.message.listResponseMessage
                body = lr.singleSelectReply?.selectedRowId || lr.title || lr.description || ''
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
    // Helper: react emoji ke pesan user — function-scoped, bisa dipakai di try & catch
    function reactText(text) {
        conn.sendMessage(m.chat, { react: { text, key: m.key } }).catch(() => {})
    }
    // Helper: react ❌ + reply pesan penolakan
    function deny(text) {
        reactText('❌')
        return m.reply(text)
    }

    try {
        if (!m?.chat) return
        if (m.chat.includes('@newsletter') || m.chat === 'status@broadcast') return
        // Hanya abaikan pesan yang DIBUAT bot sendiri (id Baileys BAE5).
        // Pesan owner di chat pribadi/self-chat tetap fromMe=true karena bot
        // ter-pairing di nomor owner, tapi id-nya bukan BAE5 → tetap dilayani.
        if (m.fromMe && m.isBaileys) return

        const { body, isButtonResponse } = extractCommandFromMessage(m)
        if (!body) return

        // Catat aktivitas chat terbaru untuk dashboard .server (AiRich)
        try {
            pushChatLog({
                chat: m.chat,
                sender: m.sender,
                participant: m.participant,
                pushName: m.pushName,
                isGroup: m.isGroup,
                body,
                isButtonResponse
            })
        } catch {}

        const monitor = readJSON(DB_FILES.monitor) || { off: [] }
        const owners = new Set(loadOwners())
        // Nomor bot sendiri (nomor yang dipakai pairing) selalu dianggap OWNER,
        // supaya fitur owner tetap jalan meski owner.json sengaja/terhapus.
        const botNum = normalizeNumber(String(conn.decodeJid?.(conn.user?.id) || '').split('@')[0])
        if (botNum) owners.add(botNum)

        // ============ AUTO-HEAL OWNER (LID → KOMOR ASLI) ============
        // Kalau ada entry owner yang ternyata berupa LID (Linked ID, bukan nomor
        // telepon — misal tertulis "167143685496949" dari hasil salin profil),
        // cocokkan dengan participant di grup & resolve otomatis ke nomor asli.
        if (m.isGroup && m.chat) {
            try {
                const meta = conn.chats?.[m.chat]?.metadata || await conn.groupMetadata(m.chat).catch(() => null)
                const parts = meta?.participants || []
                if (parts.length) {
                    let changed = false
                    const db = readJSON(DB_FILES.owner) || { owner: [] }
                    const list = Array.isArray(db.owner) ? db.owner : []
                    for (const p of parts) {
                        const lid = normalizeNumber(String(p?.lid || '').split('@')[0].split(':')[0])
                        if (!lid || !owners.has(lid)) continue
                        const pn = normalizeNumber(String(p?.id || '').split('@')[0].split(':')[0])
                        if (pn && pn !== lid) {
                            owners.add(pn)
                            const idx = list.indexOf(lid)
                            if (idx >= 0) list[idx] = pn
                            changed = true
                        }
                    }
                    if (changed) {
                        db.owner = [...new Set(list.filter(Boolean))]
                        writeJSON(DB_FILES.owner, db)
                    }
                }
            } catch {}
        }

        const premium = loadPremium()
        const nums = await resolveSenderNumbers(conn, m)
        const creators = new Set(loadCreators())
        m.isOwner = nums.some(n => owners.has(n))
        // CREATOR = nomor di config.json `creator` (paling tinggi semua fitur)
        m.isCreator = nums.some(n => creators.has(n))
        // OWNER = akses PENUH. Admin GRUP hanya punya fitur kelola grup (BUKAN owner fitur).
        m.hasFull = m.isOwner
        // Admin grup: akses konten premium gratis (tanpa harus langganan),
        // tapi TIDAK mendapat fitur Airich (itu khusus premium 2/3).
        m.isPremium = m.hasFull || (m.isGroup && m.isAdmin) || nums.some(n => premium.includes(n))
        // Rank tier premium user (0 = bukan premium) — dipakai gerbang tier & Airich
        const senderNum = String(m.sender || '').split('@')[0]
        const premiumEntry = formatPremiumEntry(getPremiumEntry(senderNum))
        m.premiumTier = premiumEntry?.tier || (nums.some(n => premium.includes(n)) ? 'premium2' : '')
        m.premiumRank = m.premiumTier ? (TIER_RANK[m.premiumTier] || 2) : 0

        // Parsing command (stripPrefix hanya SEKALI)
        const raw = isButtonResponse ? body : body.trim()
        const cleaned = stripPrefix(raw)
        if (!cleaned) return
        const args = cleaned.split(/\s+/)
        const command = args.shift().toLowerCase()
        m.command = command

        // Cache untuk plugin lain
        if (!conn.__data) conn.__data = {}
        conn.__data.owners = [...owners]

        // ============ ATURAN DM ============
        // Bot TIDAK merespon sama sekali di DM pribadi (mati total)
        if (!m.isGroup) return

        // ============ ATURAN GRUP (monitor) ============
        // .on / .off selalu bisa dipakai owner meski grup sedang dimatikan
        if (command === 'on' || command === 'off') {
            if (!m.isOwner) return
        } else if ((monitor.off || []).includes(m.chat)) {
            return // Bot di-.off di grup ini → silent total
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
        if (['menu', 'profil', 'help'].includes(command) || (handler.owner && m.isOwner) || (handler.ownerOnly && m.isOwner)) {
            const who = m.pushName ? `${m.pushName} (+${m.sender?.split('@')[0] || '?'})` : `+${m.sender?.split('@')[0] || '?'}`
            console.log(log('CMD', `.${command} < ${who} [owner=${m.isOwner} full=${m.hasFull}]`, m.isOwner ? COLORS.success : COLORS.info))
        }

        // ============ ACCESS CONTROL ============
        // creatorOnly: hanya CREATOR (nomor di config.json `creator`)
        if (handler.creatorOnly && !m.isCreator) {
            return deny('> *CREATOR ONLY*\n\n_Fitur ini khusus Creator bot._')
        }
        // ownerOnly: hanya owner asli (tanpa admin grup)
        if (handler.ownerOnly && !m.isOwner) {
            return deny('> *OWNER ONLY*\n\n_Fitur ini khusus Owner._\n_Kamu bukan owner. Hubungi: ' + BOT_NAME + '._')
        }
        // owner: hanya OWNER (admin grup TIDAK mendapat fitur owner)
        if (handler.owner && !m.isOwner) {
            return deny('> *OWNER ONLY*\n\n_Fitur ini khusus Owner._\n_Admin grup hanya bisa fitur kelola grup: .add .kick .htg .setnm .setds .setpp_')
        }
        if (handler.premium && !m.isPremium) {
            return deny('> *PREMIUM ONLY*\n\n_Fitur ini khusus member premium._\n_Mau jadi member premium? Ketik:_\n- `.premium`')
        }
        // Airich: OWNER + PREMIUM 2/3 saja (admin grup & premium1 TIDAK dapat)
        if (handler.airich && !m.isOwner && m.premiumRank < 2) {
            return deny('> *AIRICH PACK*\n\n_Fitur game Airich hanya untuk *Owner* & *Premium 2/3*._\n_Upgrade paket dulu yuk, ketik:_\n- `.premium`')
        }
        // Gerbang TIER premium: owner & admin grup bebas semua konten premium.
        if (handler.premium && m.isPremium && !m.isOwner && !m.isAdmin) {
            const requiredRank = premiumCmdRank(command)
            const myTier = m.premiumTier || 'premium2'
            const myRank = m.premiumRank || 2
            if (myRank < requiredRank) {
                const needTier = tierOfRank(requiredRank)
                const needLabel = PREMIUM_TIERS[needTier]?.label || needTier
                return deny(`> *BUTUH TIER LEBIH TINGGI*\n\n_Fitur *\`.${command}\`* termasuk paket *${needLabel}*._\n_Paket kamu: *${PREMIUM_TIERS[myTier]?.label || myTier}*_\n\n_Upgrade paket dulu yuk, ketik:_\n- \`.premium\``)
            }
        }
        // ============ KUOTA HARIAN ASUPAN (per role, reset WIB) ============
        // USER 5 · PREM1 50 · PREM2 100 · PREM3 150 · CREATOR/OWNER/ADMIN bebas.
        if (handler.category === 'asupan' && !m.isOwner && !m.isAdmin) {
            const num = String(m.sender || '').split('@')[0]
            if (num) {
                const quotaLimit = m.premiumRank === 3 ? 150 : m.premiumRank === 2 ? 100 : m.premiumRank === 1 ? 50 : 5
                const res = consumeAsupanQuota(num, command, quotaLimit)
                if (!res.ok) {
                    const roleLabel = m.premiumRank ? (PREMIUM_TIERS[m.premiumTier]?.label || 'PREMIUM') : 'USER'
                    const upgradeTip = m.premiumRank ? '' : '\n\n_Mau kuota lebih besar? Upgrade jadi premium:_\n- `.premium`'
                    return deny(`> *KUOTA ASUPAN HABIS*\n\n_Fitur *.\`${command}\`* dibatasi *${quotaLimit}x per hari per command* (${roleLabel} = ${quotaLimit}x/hari)._`
                        + upgradeTip
                        + '\n\n_Owner & admin grup bebas tanpa batas._')
                }
            }
        }
        if (handler.group && !m.isGroup) {
            return deny('> *GROUP ONLY*\n\n_Fitur ini hanya bisa dipakai di grup._')
        }
        if (handler.botAdmin && m.isGroup && !m.isBotAdmin) {
            return deny('> *BOT ADMIN REQUIRED*\n\n_Bot harus jadi admin grup untuk fitur ini._')
        }
        if (handler.admin && m.isGroup && !m.isAdmin && !m.isOwner) {
            return deny('> *ADMIN ONLY*\n\n_Fitur ini khusus admin grup._')
        }

        // ============ WAJIB DAFTAR MEMBER ============
        // SEMUA (owner/admin/premium/user) wajib .daftar — hanya CREATOR & nomor bot yang bebas.
        if (!m.isCreator && !PRE_REGISTER_FREE.has(command) && !isRegisteredMember(m.sender)) {
            return deny('> *TERDAFTAR DULU*\n\n_Untuk memakai fitur bot ini, daftar sebagai member dulu:_\n- `.daftar nama,umur,status`\n\n_Status: pelajar / mahasiswa / singgel / jomblo / kawin_')
        }

        reactText('⚙️')
        await handler(m, { conn, args, text: args.join(' '), command })
        reactText('✅')
    } catch (e) {
        reactText('❌')
        console.error(log('HANDLER', e?.message || e, COLORS.error))
    }
}