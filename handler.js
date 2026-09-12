import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { rgbTag, COLORS } from './lib/rgb.js'

// ============================================================
//  JHONBOT v3.3.8 - BRAIN (OTAK BOT)
//  Role: OWNER & USER SAJA (tidak ada admin)
// ============================================================

export const BOT_NAME = 'JhonBot'
export const BOT_VERSION = '3.3.8'

// Command publik yang BOLEH dipakai di DM (selain itu DM tidak dilayani)
const DM_PUBLIC = new Set(['rvo', 'brat', 'img', 'toimg', 'iqc', 'lirik'])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, 'plugins')

export const plugins = new Map()
const summary = { owner: [], user: [] }

const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf-8'))
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2))

// ==================== NORMALISASI NOMOR ====================
// Mendukung format 628xxx / 08xxx / +628xxx → 628xxx
export function normalizeNumber(raw = '') {
    let n = String(raw).replace(/[^\d]/g, '')
    if (n.startsWith('0')) n = '62' + n.slice(1)
    return n
}

export function loadOwners() {
    try {
        return (readJSON('./database/owner.json').owner || []).map(n => normalizeNumber(n))
    } catch {
        return []
    }
}

export function loadPremium() {
    try {
        return (readJSON('./database/premium.json').premium || []).map(n => normalizeNumber(n))
    } catch {
        return []
    }
}

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
        console.log(rgbTag('PLUGIN', 'Loaded ' + path.relative(pluginDir, file), COLORS.plugin))
    } catch (e) {
        console.error(rgbTag('PLUGIN', 'Failed ' + file + ' : ' + (e?.message || e), COLORS.error))
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

// ==================== HANDLER UTAMA ====================
export default async function handleMessage(conn, m) {
    try {
        if (!m?.chat) return
        if (m.chat.includes('@newsletter') || m.chat === 'status@broadcast') return

        const { body, isButtonResponse } = extractCommandFromMessage(m)
        if (!body) return

        const monitor = readJSON('./database/monitor.json')
        const number = normalizeNumber(m.sender.split('@')[0])
        m.isOwner = loadOwners().includes(number)
        m.isPremium = m.isOwner || loadPremium().includes(number)

        // Parsing command
        const raw = isButtonResponse ? stripPrefix(body) : body.trim()
        const cleaned = stripPrefix(raw)
        if (!cleaned) return
        const args = cleaned.split(/\s+/)
        const command = args.shift().toLowerCase()
        m.command = command

        // ============ PEMILIHAN GRUP (balas nomor: "2,5") ============
        if (/^[\d,\s]+$/.test(cleaned) && !isButtonResponse) {
            if (!m.isGroup && m.isOwner && monitor.waiting) {
                const nums = cleaned.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                if (!nums.length || nums.length > 5) return
                const groups = await conn.groupFetchAllParticipating()
                const list = Object.values(groups)
                const selected = nums.map(n => list[n - 1]).filter(Boolean)
                if (!selected.length || selected.length > 5) return
                monitor.groups = selected.map(g => g.id)
                monitor.waiting = false
                writeJSON('./database/monitor.json', monitor)
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

        // ============ CARI PLUGIN ============
        const handler = plugins.get(command)
        if (!handler) return

        // ============ ACCESS CONTROL ============
        if (handler.owner && !m.isOwner) {
            return m.reply('❌ Fitur ini khusus 👑 *Owner*!')
        }
        if (handler.premium && !m.isPremium) {
            return m.reply('❌ Fitur ini khusus 👑 *Premium*!')
        }
        if (handler.group && !m.isGroup) {
            return m.reply('❌ Fitur ini hanya bisa dipakai di grup!')
        }
        if (handler.botAdmin && m.isGroup && !m.isBotAdmin) {
            return m.reply('❌ Bot harus menjadi *admin grup* untuk fitur ini!')
        }
        if (handler.admin && m.isGroup && !m.isAdmin && !m.isOwner) {
            return m.reply('❌ Fitur ini khusus *admin grup*!')
        }

        await handler(m, { conn, args, text: args.join(' '), command })
    } catch (e) {
        console.error(rgbTag('HANDLER', e?.message || e, COLORS.error))
    }
}