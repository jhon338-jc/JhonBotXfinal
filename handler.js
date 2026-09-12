import { autoMod, linkDetector } from './lib/autoMod.js'
import { antiSpam } from './lib/antiSpam.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { sendNotification } from './lib/myFunction.js'
import { trackUser } from './lib/system.js'
import { rgbTag, COLORS } from './lib/rgb.js'

// ============================================================
//  JHON338 - BOT BRAIN (OTAK BOT)
//  DEVELOPER BY JHON338  |  VERSION 3.3.8
//  PC TERMINAL COMPATIBLE (Windows / Linux)
// ============================================================
export const DEVELOPER = 'Jhon338'
export const VERSION = '3.4.0'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, 'plugins')

export const plugins = new Map()
export const beforeHooks = new Map()

const pluginCache = new Map()
const watchers = new Map()
const pendingReloads = new Map()

const MONITOR_FILE = './database/monitor.json'

const readJSON = file => JSON.parse(fs.readFileSync(file))

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
        if (pluginCache.has(file)) {
            for (const key of pluginCache.get(file)) plugins.delete(key)
        }
        const keys = []
        if (handler.command && !(handler.command instanceof RegExp)) {
            const commands = Array.isArray(handler.command) ? handler.command : [handler.command]
            for (const cmd of commands) {
                const key = String(cmd).toLowerCase()
                plugins.set(key, handler)
                keys.push(key)
            }
        }
        if (handler.customPrefix) {
            const key = Symbol(file)
            plugins.set(key, handler)
            keys.push(key)
        }
        if (module.before) {
            beforeHooks.set(file, module.before)
        }
        pluginCache.set(file, keys)
        console.log(rgbTag('PLUGIN', 'Loaded ' + path.relative(pluginDir, file), COLORS.plugin))
    } catch (e) {
        console.error(rgbTag('PLUGIN', 'Failed ' + file, COLORS.error))
        console.error(rgbTag('PLUGIN', e?.message || e, COLORS.error))
    }
}

async function unloadPlugin(file) {
    if (!pluginCache.has(file)) return
    for (const key of pluginCache.get(file)) plugins.delete(key)
    pluginCache.delete(file)
    beforeHooks.delete(file)
    console.log(rgbTag('PLUGIN', 'Unloaded ' + path.relative(pluginDir, file), COLORS.warn))
}

export async function initPlugins() {
    console.log(rgbTag(`${DEVELOPER} v${VERSION}`, 'Memuat plugin...', COLORS.start))
    for (const file of getPluginFiles(pluginDir)) {
        await loadPlugin(file)
    }
    watch(pluginDir)
    console.log(rgbTag(`${DEVELOPER} v${VERSION}`, `Brain siap - Total ${plugins.size} command terdaftar`, COLORS.success))
}

function watch(dir) {
    if (watchers.has(dir)) return
    watchers.set(dir, fs.watch(dir, (_, filename) => {
        if (!filename || !filename.endsWith('.js')) return
        const file = path.join(dir, filename)
        if (pendingReloads.has(file)) clearTimeout(pendingReloads.get(file))
        pendingReloads.set(file, setTimeout(async () => {
            pendingReloads.delete(file)
            if (fs.existsSync(file)) await loadPlugin(file)
            else await unloadPlugin(file)
        }, 200))
    }))
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (item.isDirectory()) watch(path.join(dir, item.name))
    }
}

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
                if (inter.nativeFlowResponseMessage) {
                    const flow = inter.nativeFlowResponseMessage
                    if (flow.paramsJson) {
                        try {
                            const params = JSON.parse(flow.paramsJson)
                            body = params.id || params.buttonId || params.rowId || params.index || ''
                        } catch { body = flow.name || '' }
                    } else body = flow.name || ''
                    isButtonResponse = true
                } else if (inter.buttonReply) {
                    body = inter.buttonReply.selectedButtonId || ''
                    isButtonResponse = true
                } else if (inter.singleSelectReply) {
                    body = inter.singleSelectReply.selectedRowId || ''
                    isButtonResponse = true
                }
            } else if (m.message.templateButtonReplyMessage) {
                body = m.message.templateButtonReplyMessage.selectedId || ''
                isButtonResponse = true
            } else if (m.message.buttonsResponseMessage) {
                body = m.message.buttonsResponseMessage.selectedButtonId || ''
                isButtonResponse = true
            }
        }
    } catch (error) {
        console.error(rgbTag('PARSE', 'Error parsing message: ' + (error?.message || error), COLORS.error))
    }
    return { body, isButtonResponse }
}

export default async function handleMessage(conn, m) {
    try {
        if (m.chat?.includes('@newsletter')) return
        if (m.sender?.includes('@newsletter')) return

        if (m.isGroup && m.messageStubType !== undefined && beforeHooks.size > 0) {
            for (const before of beforeHooks.values()) {
                try {
                    await before(m, { conn })
                } catch (e) {
                    console.error(rgbTag('BEFORE', e?.message || e, COLORS.error))
                }
            }
        }

        const { body, isButtonResponse } = extractCommandFromMessage(m)
        if (!body) return
        m.text = body
        m.isButtonResponse = isButtonResponse

        const config = readJSON('./config.json')
        const role = readJSON('./database/role.json')
        const number = m.sender.split('@')[0]
        m.isCreator = config.creator.includes(number)
        m.isOwner = m.isCreator || role.owner.includes(number)
        m.isPremium = m.isOwner || role.premium.includes(number)

        // Cek grup monitor dulu
        if (m.isGroup) {
            const monitor = JSON.parse(fs.readFileSync(MONITOR_FILE))
            if (monitor.waiting && !m.isOwner) return
            if (!monitor.waiting && !monitor.groups.includes(m.chat)) return
        }


// Auto Mod - Spam & Anti-Link (anti-link hanya jika AKTIF di grup itu, default OFF)
if (m.isGroup && !m.isOwner) {

    const spamCheck = autoMod(conn, m)
            if (spamCheck) {
                if (spamCheck.type === 'warning') {
                    await conn.sendMessage(m.chat, { text: `⚠️ *PERINGATAN SPAM*\n\n@${spamCheck.sender.split('@')[0]} jangan spam pesan yang sama!\n\nBot bakal kick kalau spam lagi.` }, { quoted: m, mentions: [spamCheck.sender] })
                } else if (spamCheck.type === 'kick') {
                    try {
                        await conn.groupParticipantsUpdate(m.chat, [spamCheck.sender], 'remove')
                        await conn.sendMessage(m.chat, { text: `👢 *USER DIKICK*\n\n@${spamCheck.sender.split('@')[0]} dikick karena spam!` }, { quoted: m, mentions: [spamCheck.sender] })
                    } catch (e) {}
                }
                return
            }

            const isCommandMsg = (config.prefix || ['.']).some(p => m.text.startsWith(p))
            let settings = { antiLink: {} }
            try { settings = JSON.parse(fs.readFileSync('./database/settings.json')) } catch (e) {}
            const antiLinkOn = (settings.antiLink || {})[m.chat] === true

            if (antiLinkOn && !isCommandMsg) {
                const linkCheck = linkDetector(conn, m)
                if (linkCheck) {
                    try {
                        await conn.sendMessage(m.chat, { delete: m.key })
                        await conn.sendMessage(m.chat, { text: `🔒 *LINK DIHAPUS*\n\n@${linkCheck.sender.split('@')[0]} jangan kirim link di grup!`, mentions: [linkCheck.sender] })
                    } catch (e) {}
                    return
                }
            }
        }

        // Anti-spam command
        if (!m.isOwner && antiSpam(m, 5, 10)) {
            return await conn.sendMessage(m.chat, { text: '⚠️ *Anti-Spam*\n\nLu kebanyakan command! Tunggu 10 detik.' })
        }

        if (config.botMode === 'self' && !m.isOwner) return

        if (!m.isGroup && m.isOwner) {
            const rawInput = body.trim()
            if (/^[\d,\s]+$/.test(rawInput)) {
                const numbers = rawInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                if (numbers.length < 1 || numbers.length > 5) return
                const groups = await conn.groupFetchAllParticipating()
                const groupList = Object.values(groups)
                const invalidNumbers = numbers.filter(n => n < 1 || n > groupList.length)
                if (invalidNumbers.length > 0) return
                const selectedGroups = numbers.map(n => groupList[n - 1])
                const monitor = JSON.parse(fs.readFileSync(MONITOR_FILE))
                monitor.groups = selectedGroups.map(g => g.id)
                monitor.waiting = false
                fs.writeFileSync(MONITOR_FILE, JSON.stringify(monitor, null, 2))
                console.log(rgbTag('MONITOR', `${selectedGroups.length} grup terpilih di DM: ${selectedGroups.map(g => g.subject).join(', ')}`, COLORS.success))
                return
            }
        }

        // DM: hanya owner yang boleh pakai command lain, non-owner tetap sepi
        if (!m.isGroup && !m.isOwner) return

        if (m.isGroup) {
            const monitor = JSON.parse(fs.readFileSync(MONITOR_FILE))
            if (monitor.waiting && !m.isOwner) return
            if (!monitor.waiting && !monitor.groups.includes(m.chat)) return
        }

        // Sistem user (XP) - murni tambahan, tidak mengubah logic existing
        if (m.isGroup && !m.isOwner) {
            try {
                const res = trackUser(conn, m)
                if (res?.leveledUp) {
                    await conn.sendMessage(m.chat, { text: `🎉 *LEVEL UP!*\n\n@${m.sender.split('@')[0]} naik ke level *${res.level}*`, mentions: [m.sender] })
                }
            } catch (e) {}
        }

        const notifReply = async (text, title = 'Notification') => {
            await sendNotification(conn, m, title, text)
        }
        const checkAccess = handler => {
            if (handler.creator && !m.isCreator) {
                notifReply('❌ Khusus Creator!', 'Access Denied')
                return true
            }
            if (handler.owner && !m.isOwner) {
                notifReply(config.accessDenied.owner, 'Access Denied')
                return true
            }
            if (handler.premium && !m.isPremium) {
                notifReply(config.accessDenied.premium || 'Fitur ini khusus Premium.', 'Access Denied')
                return true
            }
            if (handler.group && !m.isGroup) {
                notifReply('❌ Fitur ini khusus grup!', 'Access Denied')
                return true
            }
            if (handler.admin && m.isGroup && !m.isAdmin) {
                notifReply('❌ Fitur ini khusus Admin Grup!', 'Access Denied')
                return true
            }
            if (handler.botAdmin && m.isGroup && !m.isBotAdmin) {
                notifReply('❌ Bot harus menjadi Admin Grup!', 'Access Denied')
                return true
            }
            return false
        }

        if (isButtonResponse) {
            let bodyText = body
            const prefixes = config.prefix || ['.']
            for (const p of prefixes) {
                if (bodyText.startsWith(p)) { bodyText = bodyText.slice(p.length); break }
            }
            const args = bodyText.trim().split(/\s+/)
            const command = args.shift().toLowerCase()
            const handler = plugins.get(command)
            if (!handler) return
            const denied = checkAccess(handler)
            if (denied) return
            return await handler(m, { conn, args, text: args.join(' '), command, prefix: '', notifReply })
        }

        for (const handler of plugins.values()) {
            if (!handler.customPrefix) continue
            if (!handler.customPrefix.test(m.text)) continue
            const denied = checkAccess(handler)
            if (denied) return
            const text = m.text.replace(handler.customPrefix, '').trim()
            return await handler(m, { conn, args: text ? text.split(/\s+/) : [], text, command: '', prefix: '', notifReply })
        }

        const prefix = (config.prefix || ['.']).find(p => m.text.startsWith(p))
        if (!prefix) return
        const body2 = m.text.slice(prefix.length).trim()
        if (!body2) return
        const args = body2.split(/\s+/)
        const command = args.shift().toLowerCase()
        const handler = plugins.get(command)
        if (!handler) return
        const denied = checkAccess(handler)
        if (denied) return
        await handler(m, { conn, args, text: args.join(' '), command, prefix, notifReply })
    } catch (e) {
        console.error(rgbTag('HANDLER', e?.message || e, COLORS.error))
    }
}
