import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import sharp from 'sharp'
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
    { name: 'ccn',   desc: 'Cecan random' },
    { name: 'donlodall', desc: 'Download video/foto (TikTok, IG, dll)' },
    { name: 'daftar', desc: 'Daftar jadi member bot (.daftar nama,umur,status)' }
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
    { name: 'ownlist', desc: 'Lihat daftar owner' },
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

async function getThumb() {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'menu.jpg')
        if (!fs.existsSync(imgPath)) return null
        return await sharp(imgPath).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer()
    } catch {
        return null
    }
}

async function getHeaderImage(conn) {
    let imgBuf = null
    try {
        const botJid = conn.user?.id
        if (botJid) {
            const url = await conn.profilePictureUrl(botJid, 'image')
            if (url) {
                const r = await fetch(url)
                if (r.ok) imgBuf = Buffer.from(await r.arrayBuffer())
            }
        }
    } catch {}
    if (!imgBuf?.length) imgBuf = await getThumb()
    if (!imgBuf?.length) return null
    try {
        const small = await sharp(imgBuf).resize({ width: 400 }).jpeg({ quality: 85 }).toBuffer()
        const media = await prepareWAMessageMedia({ image: small }, {
            upload: async (encFile, opts) => {
                const result = await conn.waUploadToServer(encFile, opts)
                return result
            }
        })
        if (!media?.imageMessage) return null
        return {
            hasMediaAttachment: true,
            imageMessage: media.imageMessage,
            title: '🤖 JhonBot v3.3.8'
        }
    } catch (e) {
        console.error(rgbTag('MENU', 'header image gagal: ' + (e?.message || e), COLORS.warn))
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
        singleSelect('BUKA MENU', sections),
        quickReply('👤 Profil', '.profil'),
        ctaUrl('🌐 Linktree', 'https://jhon338-jc.github.io/Linktree/')
    ]

    try {
        let header = await getHeaderImage(conn)
        if (!header) header = { title: '🤖 JhonBot v3.3.8', hasMediaAttachment: false }

        const interactiveMsg = {
            interactiveMessage: {
                header,
                body: { text: menuBox },
                footer: { text: 'Developer: Jhon338 • Powered by Baileys' },
                nativeFlowMessage: {
                    messageVersion: 1,
                    buttons: native
                }
            }
        }
        const msg = generateWAMessageFromContent(
            m.chat,
            interactiveMsg,
            { userJid: conn.user?.id || m.sender, quoted: m }
        )
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
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