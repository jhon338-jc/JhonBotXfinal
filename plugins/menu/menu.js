import fs from 'fs'
import Jimp from 'jimp'
import config from '../../config.json' with { type: 'json' }
import { plugins } from '../../handler.js'
import { rgbTag, COLORS } from '../../lib/rgb.js'

// ============================================================
//  HYBRID MENU + SEMUA JENIS TOMBOL INTERAKTIF (JHON338)
//  Komponen native flow (interactiveButtons):
//    • single_select  ☰  dropdown utama navigasi kategori
//    • quick_reply    ⚡ tombol cepat (maks 3 per pesan)
//    • cta_url        🔗 buka link        → halaman Channel
//    • cta_call       📞 telepon Owner    → di submenu kategori
//    • cta_copy       📋 copy nomor Owner → di submenu kategori
//  Komponen legacy (fallback otomatis bila native ditolak):
//    • listMessage      → dropdown klasik (sections)
//    • templateButtons  → campuran hydrated button (mix)
//    • buttons          → tombol respons klasik
//    • plain text       → paling bontot bila semua gagal
//
//  Navigasi:
//    .menu                       → menu utama (dropdown ☰ + tombol cepat)
//    .menu <kategori>            → submenu command kategori tsb
//    .menu user | admin | owner  → halaman role cepat
// ============================================================

const CATALOG = [
    {
        key: 'group',
        emoji: '👥',
        label: 'Group & Admin',
        role: 'owner',
        cmds: [
            { name: 'add', title: '➕ Add User', desc: '.add 628xx' },
            { name: 'kick', title: '👢 Kick Member', desc: '.kick @user' },
            { name: 'setname', title: '✏️ Set Nama', desc: '.setname teks' },
            { name: 'setdesc', title: '📝 Set Deskripsi', desc: '.setdesc teks' },
            { name: 'setpp', title: '🖼️ Set PP Grup', desc: 'reply gambar + .setpp' },
            { name: 'totag', title: '📢 Tag All', desc: '.totag teks' },
            { name: 'hidetag', title: '👻 Hide Tag', desc: '.hidetag teks' },
            { name: 'leave', title: '🚪 Leave Grup', desc: '.leave' }
        ]
    },
    {
        key: 'owner',
        emoji: '👑',
        label: 'Owner / Settings',
        role: 'owner',
        cmds: [
            { name: 'selectgroup', title: '🔄 Pilih Grup', desc: '.sg' },
            { name: 'grouplist', title: '📊 Monitor Grup', desc: '.grouplist / .monitor' },
            { name: 'addowner', title: '➕ Add Owner', desc: '.addowner 628xx' },
            { name: 'delowner', title: '➖ Del Owner', desc: '.delowner 628xx' },
            { name: 'addpremium', title: '👑 Add Premium', desc: '.addpremium 628xx hari' },
            { name: 'delpremium', title: '📉 Del Premium', desc: '.delpremium 628xx' },
            { name: 'self', title: '🔒 Mode Self', desc: '.self' },
            { name: 'public', title: '🔓 Mode Self', desc: '.public' },
            { name: 'setbio', title: '📝 Set Bio', desc: '.setbio teks' },
            { name: 'setnamebot', title: '🏷️ Set Nama Bot', desc: '.setnamebot teks' },
            { name: 'widget', title: '🖥️ Widget', desc: '.widget' },
            { name: 'kyzzrenew', title: '♻️ Renew Kyzz', desc: '.kyzzrenew role hari' }
        ]
    },
    {
        key: 'admin',
        emoji: '🛡️',
        label: 'Khusus Admin',
        role: 'admin',
        cmds: [
            { name: 'addadmin', title: '👑 Promote Admin', desc: '.addadmin @user' },
            { name: 'deladmin', title: '⬇️ Demote Admin', desc: '.deladmin @user' }
        ]
    },
    {
        key: 'ai',
        emoji: '🤖',
        label: 'Artificial Intelligence',
        role: 'user',
        cmds: [
            { name: 'editimage', title: '🖌️ Edit Image', desc: 'reply gambar + .editimage prompt' },
            { name: 'aiimage', title: '🎨 Generate Image', desc: '.aiimage deskripsi' }
        ]
    },
    {
        key: 'download',
        emoji: '⬇️',
        label: 'Downloader',
        role: 'user',
        cmds: [
            { name: 'tt', title: '🎵 TikTok DL', desc: '.tt url' },
            { name: 'ig', title: '📷 Instagram DL', desc: '.ig url' },
            { name: 'fb', title: '📘 Facebook DL', desc: '.fb url' },
            { name: 'yt', title: '▶️ YouTube DL', desc: '.yt url' },
            { name: 'mp3', title: '🎶 YouTube MP3', desc: '.mp3 url' },
            { name: 'mediafie', title: '📦 MediaFire DL', desc: '.mediafie url' },
            { name: 'kyzzfb', title: '📘 Kyzz FB', desc: '.kyzzfb url' },
            { name: 'kyzzig', title: '📷 Kyzz IG', desc: '.kyzzig url' },
            { name: 'kyzztt', title: '🎵 Kyzz TikTok', desc: '.kyzztt url' },
            { name: 'kyzzgit', title: '🐙 Kyzz GitHub', desc: '.kyzzgit url' }
        ]
    },
    {
        key: 'tools',
        emoji: '🧰',
        label: 'Tools & Sticker',
        role: 'user',
        cmds: [
            { name: 'game', title: '🎮 Tic-Tac-Toe (di WA)', desc: '.game' },
            { name: 'web', title: '🌐 Web HTML (di WA)', desc: '.web kode html/url' },
            { name: 'stiker', title: '🎨 Stiker Teks', desc: '.stiker teks' },
            { name: 'simg', title: '🖼️ Stiker Gambar', desc: 'reply gambar + .simg' },
            { name: 'toimg', title: '🔄 Stiker ke Gambar', desc: 'reply stiker + .toimg' },
            { name: 'rvo', title: '👁️ Read View Once', desc: 'reply VO + .rvo' },
            { name: 'canvas', title: '🖼️ HTML Screenshot', desc: '.canvas kode html' },
            { name: 'htmlfile', title: '📄 HTML File', desc: '.htmlfile kode html' },
            { name: 'iqc', title: '🧠 IQ Check', desc: '.iqc' },
            { name: 'fakedana', title: '💸 Fake Dana', desc: '.fakedana jumlah' },
            { name: 'fakeff', title: '🎮 Fake FF', desc: '.fakeff nama' },
            { name: 'lirik', title: '🎼 Lirik', desc: '.lirik judul' },
            { name: 'detik', title: '📰 Detik News', desc: '.detik' },
            { name: 'ping', title: '🏓 Ping', desc: '.ping' }
        ]
    },
    {
        key: 'logo',
        emoji: '🎨',
        label: 'Logo & Canvas',
        role: 'user',
        cmds: [
            { name: 'ffduo', title: '🦅 FF Duo', desc: '.ffduo user1 user2' },
            { name: 'ffgirl', title: '🦅 FF Girl', desc: '.ffgirl username' },
            { name: 'fflobby', title: '🦅 FF Lobby', desc: '.fflobby username' },
            { name: 'fakeml', title: '🤖 Fake ML', desc: '.fakeml avatar user rank' },
            { name: 'fakengl', title: '💬 Fake NGL', desc: '.fakengl teks' },
            { name: 'gopay', title: '💸 Gopay', desc: '.gopay saldo [koin]' },
            { name: 'fakeovo', title: '💸 Fake OVO', desc: '.fakeovo saldo' },
            { name: 'ustadz', title: '🕌 Ustadz', desc: '.ustadz teks' },
            { name: 'goodbye', title: '👋 Goodbye Card', desc: '.goodbye nama | grup | member' },
            { name: 'qcwa', title: '💬 Quote WA', desc: '.qcwa teks' }
        ]
    },
    {
        key: 'anime',
        emoji: '🍭',
        label: 'Anime & Asupan',
        role: 'user',
        cmds: [
            { name: 'hanime', title: '🌸 Hanime', desc: '.hanime judul' },
            { name: 'hentaigenres', title: '🔞 Hentai Genres', desc: '.hentaigenres genre' },
            { name: 'hentaitrending', title: '🔥 Hentai Trending', desc: '.hentaitrending' },
            { name: 'asupanbocil', title: '🎀 Asupan Bocil', desc: '.asupanbocil' },
            { name: 'asupangheayubi', title: '🎀 Asupan Gheayubi', desc: '.asupangheayubi' },
            { name: 'asupankayes', title: '🎀 Asupan Kayes', desc: '.asupankayes' },
            { name: 'asupannotnot', title: '🎀 Asupan Notnot', desc: '.asupannotnot' },
            { name: 'asupantiktokgirl', title: '🎀 Asupan TikTok Girl', desc: '.asupantiktokgirl' }
        ]
    },
    {
        key: 'cecan',
        emoji: '📷',
        label: 'Cecan',
        role: 'user',
        cmds: [
            { name: 'cecanchina', title: '🇨🇳 China', desc: '.cecanchina' },
            { name: 'cecanhijaber', title: '🧕 Hijaber', desc: '.cecanhijaber' },
            { name: 'cecanindonesia', title: '🇮🇩 Indonesia', desc: '.cecanindonesia' },
            { name: 'cecanjapan', title: '🇯🇵 Japan', desc: '.cecanjapan' },
            { name: 'cecankorea', title: '🇰🇷 Korea', desc: '.cecankorea' },
            { name: 'cecanmalaysia', title: '🇲🇾 Malaysia', desc: '.cecanmalaysia' },
            { name: 'cecanthailand', title: '🇹🇭 Thailand', desc: '.cecanthailand' },
            { name: 'cecanvietnam', title: '🇻🇳 Vietnam', desc: '.cecanvietnam' }
        ]
    },
    {
        key: 'islamic',
        emoji: '🕌',
        label: 'Islamic',
        role: 'user',
        cmds: [
            { name: 'asmaulhusna', title: '📿 Asmaul Husna', desc: '.asmaulhusna [no]' },
            { name: 'ayatkursi', title: '🕋 Ayat Kursi', desc: '.ayatkursi' },
            { name: 'bacaansholat', title: '🕌 Bacaan Sholat', desc: '.bacaansholat' },
            { name: 'jadwalsholat', title: '🕐 Jadwal Sholat', desc: '.jadwalsholat wilayah' },
            { name: 'kisahnabi', title: '📖 Kisah Nabi', desc: '.kisahnabi nama' },
            { name: 'niatsholat', title: '🤲 Niat Sholat', desc: '.niatsholat waktu' },
            { name: 'tafsir', title: '📜 Tafsir', desc: '.tafsir query' }
        ]
    },
    {
        key: 'random',
        emoji: '🎲',
        label: 'Random',
        role: 'user',
        cmds: [
            { name: 'andin', title: '🎀 Andin', desc: '.andin' },
            { name: 'seegore', title: '🔞 See Gore', desc: '.seegore' },
            { name: 'tobrut', title: '🔥 Tobrut', desc: '.tobrut' }
        ]
    },
    {
        key: 'rpg',
        emoji: '🎮',
        label: 'Games / RPG',
        role: 'user',
        cmds: [
            { name: 'adventure', title: '⚔️ Adventure', desc: '.adventure' },
            { name: 'explore', title: '🗺️ Explore', desc: '.explore' },
            { name: 'hunt', title: '🏹 Hunt', desc: '.hunt' },
            { name: 'mine', title: '⛏️ Mine', desc: '.mine' },
            { name: 'sell', title: '💰 Jual Item', desc: '.sell' }
        ]
    },
    {
        key: 'economy',
        emoji: '💰',
        label: 'Economy & Store',
        role: 'user',
        cmds: [
            { name: 'balance', title: '💵 Balance', desc: '.balance' },
            { name: 'daily', title: '🎁 Hadiah Harian', desc: '.daily' },
            { name: 'transfer', title: '🔁 Transfer', desc: '.transfer 628xx jumlah' },
            { name: 'work', title: '💼 Kerja', desc: '.work' },
            { name: 'topmoney', title: '🏆 Top Terkaya', desc: '.topmoney' },
            { name: 'shop', title: '🏪 Store', desc: '.shop' },
            { name: 'buy', title: '🛒 Buy', desc: '.buy item [jumlah]' },
            { name: 'inventory', title: '🎒 Inventory', desc: '.inventory' }
        ]
    },
    {
        key: 'profile',
        emoji: '📊',
        label: 'XP & Level',
        role: 'user',
        cmds: [
            { name: 'profile', title: '🧑‍🚀 Profile', desc: '.profile' },
            { name: 'level', title: '🏅 Level & XP', desc: '.level' },
            { name: 'rank', title: '🏆 Top XP', desc: '.rank' },
            { name: 'limit', title: '🎟️ Cek Limit', desc: '.limit' },
            { name: 'dailylimit', title: '🔁 Reset Limit', desc: '.dailylimit' },
            { name: 'stats', title: '📊 Statistik', desc: '.stats' }
        ]
    },
    {
        key: 'premium',
        emoji: '👑',
        label: 'Premium',
        role: 'user',
        cmds: [
            { name: 'premium', title: '👑 Cek Premium', desc: '.premium' },
            { name: 'premiumcheck', title: '🔍 Cek Pengguna', desc: '.premiumcheck 628xx' }
        ]
    },
    {
        key: 'info',
        emoji: 'ℹ️',
        label: 'Info & Lainnya',
        role: 'user',
        cmds: [
            { name: 'info', title: 'ℹ️ Info Bot', desc: '.info' },
            { name: 'owner', title: '👤 Owner', desc: '.owner' },
            { name: 'kyzz', title: '🔑 Kyzz Help', desc: '.kyzz' },
            { name: 'kyzzprofile', title: '🪪 Profil Kyzz', desc: '.kyzzprofile' },
            { name: 'kyzzstats', title: '📊 Stats Kyzz', desc: '.kyzzstats' }
        ]
    }
]

const USER_CATS = CATALOG.filter(c => c.role === 'user')
const ADMIN_CATS = CATALOG.filter(c => c.role === 'admin')
const OWNER_CATS = CATALOG.filter(c => c.role === 'owner')

const ROLE_META = {
    user:  { emoji: '👤', title: 'Menu User',  label: 'Kategori untuk semua member' },
    admin: { emoji: '🛡️', title: 'Menu Admin', label: 'Khusus admin grup' },
    owner: { emoji: '👑', title: 'Menu Owner', label: 'Khusus owner / creator' }
}

const BUTTON_TEXT = '☰ BUKA MENU'
const OWNER_NUMBER = String(config.creator?.[0] || '').replace(/\D+/g, '')

// ==================== HELPERS ====================

function exists(cmd) {
    return plugins.has(String(cmd).toLowerCase())
}

function getCat(cat) {
    return CATALOG.find(c => c.key === cat) || null
}

function catTitle(cat) {
    return `${cat.emoji} ${cat.label}`
}

function catRows(cat) {
    return (cat.cmds || []).map(c => {
        const id = '.' + c.name
        return {
            id,
            rowId: id,
            header: '',
            title: c.title,
            description: c.desc
        }
    }).filter(row => exists(row.id.slice(1)))
}

function textRows(cat) {
    return (cat.cmds || []).filter(c => exists(c.name)).map(c => `  ${c.title}\n  ${c.desc}`)
}

function catSection(cat) {
    return {
        title: catTitle(cat),
        highlight_label: '',
        rows: catRows(cat)
    }
}

// Bangun komponen native flow (interactiveButtons)
function btn(name, params) {
    return { name, buttonParamsJson: JSON.stringify(params) }
}
const single_select = (title, sections) => btn('single_select', { title, sections })
const quick_reply = (display_text, id) => btn('quick_reply', { display_text, id })
const cta_url = (display_text, url) => btn('cta_url', { display_text, url })
const cta_call = (display_text, phone_number) => btn('cta_call', { display_text, phone_number })
const cta_copy = (display_text, copy_code) => btn('cta_copy', { display_text, copy_code })

function backRow() {
    return { id: '.menu', rowId: '.menu', header: '', title: '🔙 Kembali ke Menu Utama', description: '' }
}

function defaultTemplate() {
    return [
        { index: 1, quickReplyButton: { displayText: '👤 Menu User', id: '.menu user' } },
        { index: 2, quickReplyButton: { displayText: '👑 Menu Owner', id: '.menu owner' } },
        { index: 3, urlButton: { displayText: '🔗 Channel', url: config.channelLink } }
    ]
}

function defaultLegacy() {
    return [
        { buttonId: '.menu user', buttonText: { displayText: '👤 Menu User' }, type: 1 },
        { buttonId: '.menu owner', buttonText: { displayText: '👑 Menu Owner' }, type: 1 },
        { buttonId: '.menu', buttonText: { displayText: '🔙 Menu Utama' }, type: 1 }
    ]
}

function adReply(thumb, title, body) {
    if (!thumb) return null
    return {
        externalAdReply: {
            title,
            body,
            mediaType: 1,
            thumbnail: thumb,
            sourceUrl: config.channelLink,
            mediaUrl: config.channelLink,
            renderLargerThumbnail: true
        }
    }
}

// ==================== PENGIRIM GANDA (MODERN + LEGACY FALLBACK) ====================
// 1) interactiveButtons → native flow (single_select + quick_reply + cta_*)
// 2) sections           → listMessage (dropdown legacy)
// 3) templateButtons    → templateMessage hydrated (campuran)
// 4) buttons            → buttonsMessage (tombol respons klasik)
// 5) text               → paling bontot
async function sendMenu(conn, m, o) {
    const opts = { quoted: m }
    const modern = {
        interactiveButtons: o.native,
        text: o.text,
        ...(o.title && { title: o.title }),
        ...(o.footer && { footer: o.footer }),
        ...(o.contextInfo && { contextInfo: o.contextInfo })
    }
    try {
        return await conn.sendMessage(m.chat, modern, opts)
    } catch (e) {
        console.error(rgbTag('MENU', `[${o.title}] native: ${e?.message || e}`, COLORS.warn))
    }

    try {
        return await conn.sendMessage(m.chat, {
            title: o.title || 'MENU',
            text: o.text,
            ...(o.footer && { footer: o.footer }),
            buttonText: BUTTON_TEXT,
            sections: o.sections,
            ...(o.contextInfo && { contextInfo: o.contextInfo })
        }, opts)
    } catch (e) {
        console.error(rgbTag('MENU', `[${o.title}] listMessage: ${e?.message || e}`, COLORS.warn))
    }

    try {
        return await conn.sendMessage(m.chat, {
            text: o.text,
            ...(o.footer && { footer: o.footer }),
            templateButtons: o.template
        }, opts)
    } catch (e) {
        console.error(rgbTag('MENU', `[${o.title}] templateButtons: ${e?.message || e}`, COLORS.warn))
    }

    try {
        return await conn.sendMessage(m.chat, {
            text: o.text,
            ...(o.footer && { footer: o.footer }),
            buttons: o.legacy
        }, opts)
    } catch (e) {
        console.error(rgbTag('MENU', `[${o.title}] buttons: ${e?.message || e}`, COLORS.warn))
    }

    return conn.sendMessage(m.chat, { text: o.text }, opts)
}

// ==================== HALAMAN ROLE (.menu user|admin|owner) ====================
async function sendRoleMenu(conn, m, role, thumb) {
    const meta = ROLE_META[role]
    if (role === 'owner' && !m.isOwner) return m.reply('❌ Menu ini khusus 👑 *Owner*.')
    if (role === 'admin' && !m.isAdmin && !m.isOwner) return m.reply('❌ Menu ini khusus 🛡️ *Admin* grup.')

    let rows = []
    if (role === 'user') {
        rows = USER_CATS.map(cat => {
            const id = '.menu ' + cat.key
            return { id, rowId: id, header: '', title: catTitle(cat), description: `${catRows(cat).length} perintah` }
        }).filter(r => Number(r.description.split(' ')[0]) > 0)
    } else {
        const cats = role === 'admin' ? ADMIN_CATS : OWNER_CATS
        rows = cats.flatMap(catRows)
    }
    if (!rows.length) return m.reply(`❌ Belum ada fitur untuk role *${meta.title}*.`)
    rows.push(backRow())

    const sections = [{ title: meta.title, highlight_label: '', rows }]
    const native = [
        single_select(meta.title, sections),
        quick_reply('🔙 Menu Utama', '.menu'),
        cta_url('🔗 Channel', config.channelLink)
    ]
    const listText = rows.slice(0, -1).map(r => `  ${r.title}\n  ${r.description || ''}`).join('\n')

    return sendMenu(conn, m, {
        title: meta.title,
        text: `${meta.emoji} MENU *${meta.title.toUpperCase()}*\n\n${listText}`,
        footer: `Ketik .menu untuk kembali • ${config.botName}`,
        contextInfo: adReply(thumb, `${config.botName} • ${meta.title}`, meta.label),
        sections,
        native,
        template: defaultTemplate(),
        legacy: defaultLegacy()
    })
}

// ==================== HANDLER ====================
let handler = async (m, { conn, text, args }) => {
    const start = Date.now()
    const wanted = String(text || args?.[0] || '').trim().toLowerCase()
    const number = m.sender.split('@')[0]
    const isAdmin = m.isAdmin || m.isOwner

    let thumb = null
    try {
        const image = await Jimp.read(fs.readFileSync('./src/img/menu.jpg'))
        image.resize(640, 640)
        thumb = await image.getBufferAsync(Jimp.MIME_JPEG)
    } catch (e) {
        console.error(rgbTag('MENU', 'Thumb gagal dimuat: ' + (e?.message || e), COLORS.warn))
    }

    // Halaman role cepat (quick reply → virtual category)
    if (['user', 'admin', 'owner'].includes(wanted)) {
        return sendRoleMenu(conn, m, wanted, thumb)
    }

    let cat = wanted ? getCat(wanted) || null : null

    if (wanted && !cat) {
        const list = CATALOG.map(c => `${catTitle(c)} → .menu ${c.key}`).join('\n')
        return conn.sendMessage(m.chat, {
            text: `❌ Kategori *"${wanted}"* tidak ditemukan.\n\nKategori tersedia:\n${list}`
        }, { quoted: m })
    }

    // ==================== SUBMENU KATEGORI ====================
    if (cat) {
        const denied = (cat.role === 'owner' && !m.isOwner) || (cat.role === 'admin' && !m.isAdmin && !m.isOwner)
        if (denied) return m.reply('❌ Kategori ini khusus role di atas kamu.')
        const rows = catRows(cat)
        if (rows.length === 0) return m.reply(`❌ Kategori *${cat.label}* belum punya command aktif.`)
        rows.push(backRow())

        const sections = [{ title: catTitle(cat), highlight_label: '', rows }]
        const native = [
            single_select(catTitle(cat), sections),
            cta_url('🔗 Channel', config.channelLink),
            cta_call('📞 Call Owner', OWNER_NUMBER),
            cta_copy('📋 Copy Nomor', OWNER_NUMBER)
        ]
        const listText = textRows(cat).join('\n')

        return sendMenu(conn, m, {
            title: catTitle(cat),
            text: `${cat.emoji} MENU *${cat.label.toUpperCase()}*\n\n${listText}`,
            footer: `Ketik .menu untuk kembali • ${config.botName}`,
            contextInfo: adReply(thumb, `${config.botName} • ${cat.label}`, `Submenu ${cat.label}`),
            sections,
            native,
            template: defaultTemplate(),
            legacy: defaultLegacy()
        })
    }

    // ==================== MENU UTAMA ====================
    const ping = Date.now() - start
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)
    const totalPlugins = [...new Set(plugins.values())].length

    // Sections dalam satu dropdown ☰ — dikelompokkan sesuai role
    const sections = []

    const userRows = USER_CATS.map(cat => {
        const id = '.menu ' + cat.key
        return { id, rowId: id, header: '', title: catTitle(cat), description: `${catRows(cat).length} perintah` }
    }).filter(r => Number(r.description.split(' ')[0]) > 0)
    if (userRows.length) {
        sections.push({ title: '👤 MENU USER', highlight_label: '', rows: userRows })
    }

    if (isAdmin) {
        const adminRows = ADMIN_CATS.flatMap(catRows)
        if (adminRows.length) {
            sections.push({ title: '🛡️ MENU ADMIN', highlight_label: '', rows: adminRows })
        }
    }

    if (m.isOwner) {
        for (const cat of OWNER_CATS) {
            const rows = catRows(cat)
            if (rows.length) sections.push({ title: catTitle(cat), highlight_label: '', rows })
        }
    }

    // Tombol cepat (quick_reply) — max 3 action button bersama dropdown
    const quick = [quick_reply('👤 Menu User', '.menu user')]
    if (m.isOwner) quick.push(quick_reply('👑 Menu Owner', '.menu owner'))
    else if (isAdmin) quick.push(quick_reply('🛡️ Menu Admin', '.menu admin'))
    else quick.push(quick_reply('🧰 Tools', '.menu tools'))

    const native = [
        single_select('☰ BUKA MENU', sections),
        ...quick,
        cta_url('🔗 Channel', config.channelLink)
    ]

    const userList = USER_CATS.map(cat => catTitle(cat)).join('\n')
    let ownerHint = ''
    if (m.isOwner) {
        ownerHint = '\n\n👑 *OWNER*:\n' + OWNER_CATS.map(cat => catTitle(cat)).join('\n')
    }

    const menuBox = `╭───『 *${config.botName}* 』───⬣
│  🤖 *Bot Information*
│  • Nama         : ${config.botName}
│  • Developer    : ${config.developer || config.ownerName}
│  • Versi        : ${config.version || '-'}
│  • Mode         : ${config.botMode.toUpperCase()}
│  • Plugins      : ${totalPlugins}
│  • Ping         : ${ping}ms
│  • RAM          : ${ramUsed}MB
│  • Uptime       : ${days}d ${hours}h ${minutes}m
│
│  👤 *User Information*
│  • Nama         : ${m.pushName || '-'}
│  • Nomor        : +${number}
│  • Status       : ${m.isOwner ? '👑 Owner' : m.isPremium ? '👑 Premium' : m.isAdmin ? '🛡️ Admin' : '👤 User'}
╰════════════════════⬣

🗂️ *MENU USER*:
${userList}${ownerHint}

💡 *Cara pakai*:
• Tap tombol *☰ BUKA MENU* di bawah untuk pilih kategori
• Atau ketik *.menu <kategori>* — contoh : *.menu download*
• *.menu user* / *.menu admin* / *.menu owner*`

    return sendMenu(conn, m, {
        title: `👋 Halo ${m.pushName || 'User'}!`,
        text: menuBox,
        footer: `🔗 ${config.channelLink}  •  💻 ${config.githubRepo}`,
        contextInfo: adReply(thumb, `${config.botName} • v${config.version}`, `DEVELOPER BY ${config.developer || 'JHON338'}`),
        sections,
        native,
        template: defaultTemplate(),
        legacy: defaultLegacy()
    })
}

handler.command = ['menu', 'help']
export default handler