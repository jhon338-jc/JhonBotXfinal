import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { plugins } from '../../handler.js'
import { getPluginSummary, getCategoryLabels, getValidCategories } from '../../handler.js'
import { log, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadBotConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function drawBox(lines, width = 42) {
    const top = '+' + '-'.repeat(width) + '+'
    const bottom = '+' + '-'.repeat(width) + '+'
    const out = [top]
    for (const line of lines) {
        out.push('|  ' + line)
    }
    out.push(bottom)
    return out.join('\n')
}

let handler = async (m, { conn, args }) => {
    const input = (args?.[0] || '').trim().toLowerCase()
    const cfg = loadBotConfig()
    const botVersion = 'JhonXfinal v' + (cfg.version || '3.3.8')
    const developer = cfg.ownerName || 'Jhon338'
    const totalPlugins = [...new Set(plugins.values())].length
    const summary = getPluginSummary()
    const labels = getCategoryLabels()
    const cats = getValidCategories()

    // Submenu: .menu <kategori>
    if (input && cats.includes(input)) {
        const cmds = summary[input]
        const label = labels[input] || input.toUpperCase()
        const lines = [label + ' - Commands']
        if (input === 'airich') {
            lines.push('', `${cmds.length} commands tersedia`)
            lines.push('Ketik .<command> untuk menjalankan')
        } else if (cmds.length) {
            for (let i = 0; i < cmds.length; i += 3) {
                const row = cmds.slice(i, i + 3).map(c => '.' + c).join('  ')
                lines.push(row)
            }
        } else {
            lines.push('(kosong)')
        }
        lines.push('', 'Ketik .menu untuk kembali')
        return m.reply(drawBox(lines))
    }

    // Profil
    if (input === 'me' || m.command === 'profil') {
        let status = 'USER'
        if (m.isOwner) status = 'OWNER'
        else if (m.isAdmin) status = 'ADMIN'
        else if (m.isPremium) status = 'PREMIUM'
        const number = m.sender?.split('@')[0] || '?'
        const lines = [
            'PROFIL KAMU',
            '',
            'Nama   : ' + (m.pushName || '-'),
            'Nomor  : +' + number,
            'Status : ' + status,
            '',
            'Mau ganti akses? Hubungi owner.'
        ]
        return m.reply(drawBox(lines))
    }

    // Status premium
    if (input === 'premium') {
        const { loadPremiumList, formatPremiumEntry, normalizeNumber, PREMIUM_TIERS } = await import('../../handler.js')
        const list = loadPremiumList()
        const meNumber = normalizeNumber(m.sender?.split('@')[0] || '')
        const myFmt = formatPremiumEntry(list.find(e => e && normalizeNumber(e.number) === meNumber))
        let status
        if (m.isOwner) status = 'OWNER - akses penuh.'
        else if (m.isPremium && myFmt?.active) {
            const dEnd = myFmt.endDate ? new Date(myFmt.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'
            const dur = Math.max(0, Math.ceil((myFmt.endDate - Date.now()) / 86400000))
            status = 'PREMIUM ' + (PREMIUM_TIERS[myFmt.tier]?.label || '') + '\nAktif s/d: ' + dEnd + '\nSisa: ~' + dur + ' hari'
        } else status = 'USER - belum premium.\nKetik .premium untuk info langganan.'
        const lines = [
            'STATUS AKUN',
            '',
            'Nama  : ' + (m.pushName || '-'),
            'Nomor : +' + (meNumber || '?'),
            '',
            status
        ]
        return m.reply(drawBox(lines))
    }

    // Menu utama
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)

    let status = 'USER'
    if (m.isOwner) status = 'OWNER'
    else if (m.isAdmin) status = 'ADMIN'
    else if (m.isPremium) status = 'PREMIUM'

    const lines = [
        'CONNECTED',
        `${botVersion}`,
        '',
        'Nama   : ' + (m.pushName || '-').slice(0, 20),
        'Status : ' + status,
        'Uptime : ' + days + 'd ' + hours + 'j ' + minutes + 'm',
        'Plugin : ' + totalPlugins,
        'Node   : ' + (process.version || '-'),
        '',
        'Developer: ' + developer,
        '',
        'KETIK .menu <kategori>',
    ]

    // Tampilkan kategori yang punya command
    for (const cat of cats) {
        const cmds = summary[cat]
        if (!cmds.length) continue
        const label = labels[cat] || cat.toUpperCase()
        if (cat === 'airich') {
            lines.push('', label + ': ' + cmds.length + ' commands')
        } else {
            lines.push('', label + ':')
            lines.push(cmds.map(c => '.' + c).join(' '))
        }
    }

    lines.push('', 'Contoh: .menu airich')
    lines.push('Developer: ' + developer)

    return m.reply(drawBox(lines))
}

handler.command = ['menu', 'help', 'profil']
export default handler
