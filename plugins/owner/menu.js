import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import sharp from 'sharp'
import { plugins, canRunCommand, PREMIUM_TIERS } from '../../handler.js'
import { getTroli } from '../../lib/shop.js'
import { log, COLORS } from '../../lib/rgb.js'

// ============================================================
//  MENU JHONXFINAL — button-first
//  • Menu utama: gambar + info bot simpel + 4 tombol
//  • Tombol BUKA MENU (single_select): pilih kategori > pilih command langsung jalan
//  • Tombol LINKTREE (cta_url) & KONTAK OWNER (call)
//  • Sub-menu per kategori tetap jalan via `.menu <kategori>`
//  • Tanpa emoji
// ============================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function quickReply(display_text, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text, id }) }
}

function ctaUrl(display_text, url) {
    return { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text, url }) }
}

function ownerVCard(botCfg, ownerNumber) {
    const ownerName = botCfg.ownerName || 'Jhon338'
    const botName = botCfg.botName || 'JhonBot'
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
    return 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:' + ownerName + '\n' +
        'ORG:' + botName + ';\n' +
        'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' +
        'URL:' + channelLink + '\n' +
        'END:VCARD\n'
}

function singleSelect(title, sections) {
    return { name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections }) }
}

const CATS = {
    maker: { label: 'MAKER', cmds: [
        { name: 'brat', desc: 'Buat stiker BRAT dari teks' },
        { name: 'iqc', desc: 'Generate gambar IQC' },
        { name: 'img', desc: 'Jadikan stiker dari gambar/video' }
    ]},
    tools: { label: 'TOOLS', cmds: [
        { name: 'toimg', desc: 'Ubah stiker jadi gambar/video' },
        { name: 'rvo', desc: 'Buka pesan view once' },
        { name: 'lirik', desc: 'Cari lirik lagu' },
        { name: 'play', desc: 'Putar lagu YouTube + lirik' }
    ]},
    game: { label: 'GAME', cmds: [
        { name: 'dino', desc: 'Dino Runner (lompat kaktus)' },
        { name: 'flappy', desc: 'Flappy Bird' },
        { name: 'slot', desc: 'Fruit Slot (spin rejeki)' },
        { name: 'block', desc: 'Block Blast mini' },
        { name: 'gd', desc: 'Geometry Dash mini' },
        { name: 'tetris', desc: 'Tetris klasik' },
        { name: 'catur', desc: 'Catur lawan bot' },
        { name: 'dash', desc: 'Sonic Dash' },
        { name: 'pou', desc: 'Pou Sky Jump' }
    ]},
    download: { label: 'DOWNLOAD', cmds: [
        { name: 'donlodall', desc: 'Download TikTok, IG, dan lainnya' }
    ]},
    asupan: { label: 'ASUPAN (KUOTA HARIAN)', cmds: [
        { name: 'asp', desc: 'Asupan random' },
        { name: 'ccn', desc: 'Cecan random' },
        { name: 'pap', desc: 'PAP random' },
        { name: 'paptt', desc: 'PAP TT random' },
        { name: 'papmmk', desc: 'PAP MMK random' },
        { name: 'papbgl', desc: 'PAP BGL random' },
        { name: 'bule1', desc: 'Foto premium bule-1' },
        { name: 'bule2', desc: 'Foto premium bule-2' },
        { name: 'bule3', desc: 'Foto premium bule-3' },
        { name: 'bule4', desc: 'Foto premium bule-4' },
        { name: 'bule5', desc: 'Foto premium bule-5' },
        { name: 'bule6', desc: 'Foto premium bule-6' },
        { name: 'bule7', desc: 'Foto premium bule-7' },
        { name: 'cishani', desc: 'Foto premium ci-shani' },
        { name: 'freyajkt', desc: 'Foto premium freya-jkt' },
        { name: 'kitsune', desc: 'Foto premium kitsune' },
        { name: 'lesbi1', desc: 'Foto premium lesbi-1' },
        { name: 'livyrenata', desc: 'Foto premium livy-renata' },
        { name: 'onicvonzy', desc: 'Foto premium onic-vonzy' },
        { name: 'pink1', desc: 'Foto premium pink-1' },
        { name: 'pink2', desc: 'Foto premium pink-2' },
        { name: 'pink3', desc: 'Foto premium pink-3' },
        { name: 'pink4', desc: 'Foto premium pink-4' },
        { name: 'pink5', desc: 'Foto premium pink-5' },
        { name: 'pink6', desc: 'Foto premium pink-6' },
        { name: 'pink7', desc: 'Foto premium pink-7' },
        { name: 'pink8', desc: 'Foto premium pink-8' },
        { name: 'pink9', desc: 'Foto premium pink-9' },
        { name: 'pink10', desc: 'Foto premium pink-10' },
        { name: 'pink11', desc: 'Foto premium pink-11' },
        { name: 'sofifoxy', desc: 'Foto premium sofi-foxy' },
        { name: 'asian1', desc: 'Foto premium asian-1' },
        { name: 'china1', desc: 'Foto premium china-1' },
        { name: 'china2', desc: 'Foto premium china-2' },
        { name: 'china3', desc: 'Foto premium china-3' },
        { name: 'evaelfie', desc: 'Foto premium eva-elfie' },
        { name: 'group1', desc: 'Foto premium group-1' },
        { name: 'japan1', desc: 'Foto premium japan-1' },
        { name: 'korea1', desc: 'Foto premium korea-1' },
        { name: 'korea2', desc: 'Foto premium korea-2' },
        { name: 'korea3', desc: 'Foto premium korea-3' },
        { name: 'korea4', desc: 'Foto premium korea-4' },
        { name: 'melodymarks', desc: 'Foto premium melody-marks' },
        { name: 'perpect1', desc: 'Foto premium perpect-1' },
        { name: 'perpect2', desc: 'Foto premium perpect-2' },
        { name: 'perpect3', desc: 'Foto premium perpect-3' },
        { name: 'perpect4', desc: 'Foto premium perpect-4' },
        { name: 'perpect5', desc: 'Foto premium perpect-5' },
        { name: 'pregnant1', desc: 'Foto premium pregnant-1' },
        { name: 'teen1', desc: 'Foto premium teen-1' },
        { name: 'teen2', desc: 'Foto premium teen-2' },
        { name: 'teen3', desc: 'Foto premium teen-3' }
    ]},
    grup: { label: 'GRUP', cmds: [
        { name: 'poll', desc: 'Buat polling grup' },
        { name: 'daftar', desc: 'Daftar jadi member bot' }
    ]},
    premium: { label: 'PREMIUM', cmds: [
        { name: 'premium', desc: 'Lihat paket premium & cara bayar' }
    ]},
    airich: { label: 'AIRICH (OWNER + PREMIUM 2/3)', cmds: [
        { name: 'server', desc: 'Dashboard command center' },
        { name: 'musik', desc: 'Player musik transparan + playlist' }
    ]},
    admin: { label: 'ADMIN (KELOLA GRUP)', cmds: [
        { name: 'add', desc: 'Tambah member grup' },
        { name: 'kick', desc: 'Kick member grup' },
        { name: 'setpp', desc: 'Ganti foto profil grup' },
        { name: 'setnm', desc: 'Ganti nama grup' },
        { name: 'setds', desc: 'Ganti deskripsi grup' },
        { name: 'htg', desc: 'Hidetag semua member' }
    ]},
    creator: { label: 'CREATOR', cmds: [
        { name: 'ownadd', desc: 'Tambah owner baru' },
        { name: 'owndel', desc: 'Hapus owner' },
        { name: 'ownlist', desc: 'Daftar owner' }
    ]},
    owner: { label: 'OWNER', cmds: [
        { name: 'on', desc: 'Aktifkan bot di grup ini' },
        { name: 'off', desc: 'Matikan bot di grup ini' },
        { name: 'addprem', desc: 'Aktifkan member premium' },
        { name: 'delprem', desc: 'Hapus member premium' },
        { name: 'premlist', desc: 'Daftar premium' },
        { name: 'hapuschat', desc: 'Hapus pesan bot' },
        { name: 'ui', desc: 'Preview semua UI bot' },
        { name: 'ping', desc: 'Cek respon bot' },
        { name: 'info', desc: 'Info bot' }
    ]}
}

function exists(cmd) { return plugins.has(String(cmd).toLowerCase()) }

function rowsOf(cat, m) {
    return cat.cmds.filter(cmd => exists(cmd.name) && canRunCommand(m, cmd.name))
}

// Section dropdown (single_select) — BADGE DI JUDUL KATEGORI:
// Satu section per kategori. Judul section = JUDUL KATEGORI + badge hijau/putih
// "PILIH" (highlight_label → badge muncul di samping judul kategori).
// Di bawahnya, command-command jadi row polos (tanpa badge) — tap langsung jalan.
// Hasil: ADA judul kategori sebagai pembatas (dengan badge), di bawahnya command-nya.
function catSections(cat, m) {
    const rows = rowsOf(cat, m)
    if (!rows.length) return []
    return [{
        title: ' ' + cat.label,
        highlight_label: 'PILIH',
        rows: rows.map(r => ({
            title: `.${r.name}`,
            rowId: `.${r.name}`,
            description: cat.label + ' • ' + r.desc,
            id: `.${r.name}`
        }))
    }]
}

function loadBotConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

function botVersion() {
    return 'JhonBot v' + (loadBotConfig().version || '3.8')
}

function userStatus(m) {
    if (m.isCreator) return 'Creator'
    if (m.isOwner) return 'Owner'
    if (m.isAdmin) return 'Admin'
    if (m.isPremium) {
        return m.premiumTier && PREMIUM_TIERS[m.premiumTier] ? PREMIUM_TIERS[m.premiumTier].label : 'Premium'
    }
    return 'Member'
}

function infoBlock(m, totalPlugins) {
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    return [
        '> *' + botVersion() + '*',
        '> _Bot multifungsi, aktif 24/7_',
        '',
        'Nama   : ' + (m.pushName || '-'),
        'Status : ' + userStatus(m),
        'Uptime : ' + days + 'd ' + hours + 'j ' + minutes + 'm',
        'Plugin : ' + totalPlugins,
        'Node   : ' + (process.version || '-') + ' / ' + String(process.platform || '-').toUpperCase(),
        '',
        '_Klik tombol *BUKA MENU* untuk pilih kategori & command._'
    ].join('\n')
}

async function getMenuImage(conn) {
    // Menu SELALU dapat gambar: menangani menu.png, premium.png, dana.png,
    // lalu file lain apa pun di src/img — selama satu masih ada, gambar muncul.
    try {
        const imgDir = path.join(__dirname, '..', '..', 'src', 'img')
        const candidates = ['menu.png', 'premium.png', 'dana.png']
        const others = fs.existsSync(imgDir)
            ? fs.readdirSync(imgDir).filter(f => /\.(png|jpe?g|webp)$/i.test(f)).sort()
            : []
        for (const name of [...candidates, ...others]) {
            const p = path.join(imgDir, name)
            if (!fs.existsSync(p)) continue
            try {
                const buff = await sharp(p).resize({ width: 640 }).jpeg({ quality: 78 }).toBuffer()
                return await prepareWAMessageMedia({ image: buff }, { upload: conn.waUploadToServer })
            } catch {}
        }
    } catch {}
    return null
}

async function sendInteractive(conn, m, title, bodyText, buttons) {
    const media = await getMenuImage(conn).catch(() => null)
    const header = {
        title: ' ' + title,
        ...(media ? { ...media, hasMediaAttachment: true } : { hasMediaAttachment: false })
    }
    const body = {
        interactiveMessage: {
            header,
            body: { text: bodyText },
            footer: { text: 'Developer: Jhon338 • Powered by Baileys' },
            nativeFlowMessage: { messageVersion: 1, buttons }
        }
    }
    try {
        const troli = await getTroli(conn, m.chat)
        const msg = generateWAMessageFromContent(
            m.chat,
            body,
            { userJid: conn.user?.id || m.sender, quoted: troli || m }
        )
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        return true
    } catch (e) {
        console.error(log('MENU', e?.message || e, COLORS.warn))
        return false
    }
}

// ==================== HANDLER ====================
let handler = async (m, { conn, args }) => {
    const input = (args?.[0] || '').trim().toLowerCase()
    const botCfg = loadBotConfig()
    const ownerNumber = (botCfg.creator?.[0] || '6285602288269').replace(/\D/g, '')
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
    const totalPlugins = [...new Set(plugins.values())].length

    // Kartu kontak owner (.menu kontak)
    if (input === 'kontak') {
        const vcard = ownerVCard(botCfg, ownerNumber)
        try {
            await conn.sendMessage(m.chat, {
                contacts: {
                    displayName: botCfg.ownerName || 'Jhon338',
                    contacts: [{ displayName: botCfg.ownerName || 'Jhon338', vcard }]
                }
            })
        } catch (e) {
            await m.reply(' _Gagal kirim kartu kontak: ' + (e?.message || e) + '_')
        }
        return
    }

    // Profil view (.menu me / .profil)
    if (input === 'me' || m.command === 'profil') {
        const status = userStatus(m)
        const number = m.sender?.split('@')[0] || '?'
        m.reply(`> *PROFIL KAMU*\n\n- *Nama* : ${m.pushName || '-'}\n- *Nomor* : +${number}\n- *Status* : ${status}\n\n_Mau ganti akses? Hubungi owner._`)
        return
    }

    const text = infoBlock(m, totalPlugins)
    const cats = Object.entries(CATS)
    const sections = cats
        .flatMap(([k, c]) => catSections(c, m))

    // Sub-menu kategori (.menu maker / asupan / dll.)
    if (CATS[input]) {
        const sub = catSections(CATS[input], m)
        const ok = await sendInteractive(conn, m, ' ' + CATS[input].label, ' _Pilih command di bawah, langsung jalan._', [
            singleSelect(' PILIH COMMAND ', sub),
            quickReply(' KEMBALI', '.menu')
        ])
        if (!ok) {
            const list = rowsOf(CATS[input], m).map(r => '- `.' + r.name + '` - ' + r.desc).join('\n')
            await m.reply('> *' + CATS[input].label + '*\n\n' + list + '\n\n_Ketik perintah langsung._')
        }
        return
    }

    // ===== Menu utama =====
    const buttons = [
        singleSelect(' BUKA MENU', sections),
        quickReply(' PROFIL SAYA', '.menu me'),
        ctaUrl(' LINKTREE', channelLink),
        quickReply(' KONTAK OWNER', '.menu kontak')
    ]
    const ok = await sendInteractive(conn, m, botVersion(), text, buttons)
    if (!ok) {
        const list = cats
            .map(([k, c]) => {
                const rows = rowsOf(c, m)
                if (!rows.length) return ''
                return '* ' + c.label + '*\n' + rows.map(r => '- `.' + r.name + '` - ' + r.desc).join('\n')
            })
            .filter(Boolean)
            .join('\n\n')
        await m.reply(text + '\n' + list + '\n\n_Ketik perintah langsung._')
    }
}

handler.command = ['menu', 'help', 'profil']
export default handler