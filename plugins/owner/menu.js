import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { plugins } from '../../handler.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

// ============================================================
//  MENU — tampilan menu dengan tombol interaktif (native flow)
//  • single_select  ☰  dropdown navigasi kategori
//  • quick_reply    👤 profil
//  • cta_url        🌐 Linktree
// ============================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const USER_CMDS = [
    { name: 'brat',  desc: 'Buat stiker BRAT dari teks' },
    { name: 'iqc',   desc: 'Generate gambar IQC' },
    { name: 'img',   desc: 'Stiker dari gambar/video' },
    { name: 'toimg', desc: 'Konversi stiker → gambar/video' },
    { name: 'lirik', desc: 'Cari lirik lagu' },
    { name: 'rvo',   desc: 'Buka pesan view once' },
    { name: 'pap',   desc: 'PAP random' },
    { name: 'paptt', desc: 'PAP TT random' },
    { name: 'papmmk',desc: 'PAP MMK random' },
    { name: 'papbgl',desc: 'PAP BGL random' },
    { name: 'asp',   desc: 'Asupan random' },
    { name: 'ccn',   desc: 'Cecan random' }
]

const OWNER_CMDS = [
    { name: 'add',    desc: 'Tambah member grup (.add 628xxx)' },
    { name: 'kick',   desc: 'Kick member grup (.kick @user)' },
    { name: 'setpp',  desc: 'Ganti foto profil grup' },
    { name: 'setnm',  desc: 'Ganti nama grup' },
    { name: 'setds',  desc: 'Ganti deskripsi grup' },
    { name: 'htg',    desc: 'Hidetag semua member' },
    { name: 'grup',   desc: 'Daftar & pilih grup' },
    { name: 'ownadd', desc: 'Tambah owner baru' },
    { name: 'owndel', desc: 'Hapus owner' },
    { name: 'ping',   desc: 'Cek respon bot' },
    { name: 'info',   desc: 'Info bot' },
    { name: 'menu',   desc: 'Menu ini' }
]

function exists(cmd) { return plugins.has(String(cmd).toLowerCase()) }

function cmdRows(list) {
    return list.filter(c => exists(c.name)).map(c => ({
        id: '.' + c.name, rowId: '.' + c.name, header: '',
        title: '.' + c.name, description: c.desc
    }))
}

function section(title, rows) { return { title, highlight_label: '', rows } }

function singleSelect(title, sections) {
    return { name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections }) }
}

function quickReply(display_text, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text, id }) }
}

function ctaUrl(display_text, url) {
    return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text, url }) }
}

function adReply(thumb, title, body) {
    if (!thumb) return undefined
    return {
        externalAdReply: {
            title, body,
            mediaType: 1, thumbnail: thumb,
            sourceUrl: 'https://jhon338-jc.github.io/Linktree/',
            renderLargerThumbnail: true
        }
    }
}

function getThumb() {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'menu.jpg')
        if (!fs.existsSync(imgPath)) return null
        const buf = fs.readFileSync(imgPath)
        return buf
    } catch {
        return null
    }
}

// ==================== HANDLER ====================
let handler = async (m, { conn, args }) => {
    const input = (args?.[0] || '').trim().toLowerCase()
    const number = m.sender?.split('@')[0] || '?'

    // Profil view (quick_reply / .profil)
    if (input === 'me' || m.command === 'profil') {
        let status = '👤 User'
        if (m.isOwner) status = '👑 Owner'
        else if (m.isPremium) status = '👑 Premium'
        await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
        m.reply(`👤 *PROFIL KAMU*\n\n• Nama     : ${m.pushName || '-'}\n• Nomor    : +${number}\n• Status   : ${status}`)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return
    }

    await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })

    // ============ MENU UTAMA ============
    let thumb = getThumb()
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const totalPlugins = [...new Set(plugins.values())].length

    const menuBox = [
        `👋 Halo, ${m.pushName || 'User'}!`,
        '',
        '🤖 JhonBot v3.3.8',
        `⚡ Runtime: ${days}d ${hours}h ${minutes}m`,
        `📦 Plugins: ${totalPlugins}`,
        '',
        '💡 Tap tombol di bawah untuk akses cepat'
    ].join('\n')

    // Bangun sections
    const sections = []
    const userRows = cmdRows(USER_CMDS)
    if (userRows.length) sections.push(section('👤 USER', userRows))

    if (m.isOwner) {
        const ownerRows = cmdRows(OWNER_CMDS)
        if (ownerRows.length) sections.push(section('👑 OWNER', ownerRows))
    }

    const native = [
        singleSelect('☰ BUKA MENU', sections),
        quickReply('👤 Profil', '.profil'),
        ctaUrl('🌐 Linktree', 'https://jhon338-jc.github.io/Linktree/')
    ]

    try {
        await conn.sendMessage(m.chat, {
            interactiveButtons: native,
            text: menuBox,
            title: '🤖 JhonBot v3.3.8',
            footer: 'Developer: Jhon338 • Powered by Baileys',
            contextInfo: adReply(thumb, 'JhonBot v3.3.8', 'DEVELOPER BY JHON338')
        }, { quoted: m })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return
    } catch (e) {
        console.error(rgbTag('MENU', e?.message || e, COLORS.warn))
    }

    // Fallback: plain text
    let plainText = `╭───『 *JhonBot v3.3.8* 』───\n`
    plainText += `│\n│  👋 Halo, ${m.pushName || 'User'}!\n`
    plainText += `│  📦 Plugins: ${totalPlugins}\n│\n`
    plainText += `│  👤 *USER*\n`
    userRows.forEach(r => { plainText += `│    ${r.title} — ${r.description}\n` })
    if (m.isOwner) {
        plainText += `│\n│  👑 *OWNER*\n`
        cmdRows(OWNER_CMDS).forEach(r => { plainText += `│    ${r.title} — ${r.description}\n` })
    }
    plainText += `│\n╰──────────────────────────────`
    await m.reply(plainText)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['menu', 'help', 'profil']
export default handler