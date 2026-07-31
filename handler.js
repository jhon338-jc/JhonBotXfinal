import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { sendNotification } from './lib/myFunction.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginDir = path.join(__dirname, 'plugins')

export const plugins = new Map()

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
        pluginCache.set(file, keys)
        console.log(`[PLUGIN] Loaded ${path.relative(pluginDir, file)}`)
    } catch (e) {
        console.error(`[PLUGIN] Failed ${file}`)
        console.error(e)
    }
}

async function unloadPlugin(file) {
    if (!pluginCache.has(file)) return
    for (const key of pluginCache.get(file)) plugins.delete(key)
    pluginCache.delete(file)
    console.log(`[PLUGIN] Unloaded ${path.relative(pluginDir, file)}`)
}

export async function initPlugins() {
    for (const file of getPluginFiles(pluginDir)) {
        await loadPlugin(file)
    }
    watch(pluginDir)
    const monitorFile = './database/monitor.json'
    if (fs.existsSync(monitorFile)) {
        const monitor = JSON.parse(fs.readFileSync(monitorFile))
        if (monitor.groups.length > 0) {
            console.log(`[MONITOR] Memantau ${monitor.groups.length} grup`)
        }
    }
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
            } else if (m.message?.stickerMessage) {
                body = '__MENU_STICKER__'
            }
        }
    } catch (error) {
        console.error('Error parsing message:', error)
    }
    return { body, isButtonResponse }
}

export default async function handleMessage(conn, m) {
    try {
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

        if (config.botMode === 'self' && !m.isOwner) return

        if (!m.isGroup && m.isOwner) {
            const rawInput = body.trim()
            if (/^[\d,\s]+$/.test(rawInput)) {
                const numbers = rawInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                if (numbers.length < 1 || numbers.length > 5) {
                    return await conn.sendMessage(m.chat, { text: '⚠️ Pilih minimal 1, maksimal 5 grup!\n\nFormat: *1,2,3,4,5*' })
                }
                const groups = await conn.groupFetchAllParticipating()
                const groupList = Object.values(groups)
                const invalidNumbers = numbers.filter(n => n < 1 || n > groupList.length)
                if (invalidNumbers.length > 0) {
                    return await conn.sendMessage(m.chat, { text: `❌ Nomor grup tidak valid: ${invalidNumbers.join(', ')}\n\nGrup tersedia: 1 - ${groupList.length}` })
                }
                const selectedGroups = numbers.map(n => groupList[n - 1])
                const monitor = JSON.parse(fs.readFileSync(MONITOR_FILE))
                monitor.groups = selectedGroups.map(g => g.id)
                monitor.waiting = false
                fs.writeFileSync(MONITOR_FILE, JSON.stringify(monitor, null, 2))
                let confirmText = `✅ *${selectedGroups.length} Grup Dipilih*\n\n`
                selectedGroups.forEach((g, i) => {
                    confirmText += `${i + 1}. ${g.subject}\n   👥 ${g.participants?.length || 0} anggota\n\n`
                })
                confirmText += `🤖 Bot hanya aktif di grup yang dipilih!`
                await conn.sendMessage(m.chat, { text: confirmText })
                return
            }
        }

        if (m.isGroup) {
            const monitor = JSON.parse(fs.readFileSync(MONITOR_FILE))
            if (monitor.waiting && !m.isOwner) return
            if (!monitor.waiting && !monitor.groups.includes(m.chat)) return
        } else {
            const allowedCommands = ['rvo', 'readvo', 'viewonce']
            const cmd = body.trim().split(' ')[0].replace(/^[.#!/]/, '').toLowerCase()
            if (!m.isOwner && !allowedCommands.includes(cmd)) return
        }

        const notifReply = async (text, title = 'Notification') => {
            await sendNotification(conn, m, title, text)
        }
        const checkAccess = handler => {
            if (handler.owner && !m.isOwner) {
                notifReply(config.accessDenied.owner, 'Access Denied')
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
        console.error(e)
    }
}
