import fs from 'fs'
import Jimp from 'jimp'
import config from '../../config.json' with { type: 'json' }
import { plugins } from '../../handler.js'

// ============================================================
//  HYBRID MENU + NATIVE FLOW BUTTON (JHON338)
//  Satu tombol ☰, sections dikelompokkan sesuai role user:
//    👤 USER  → kategori fitur grup (submenu .menu <key>)
//    🛡️ ADMIN → command khusus admin grup (langsung)
//    👑 OWNER → manajemen grup + settings owner (langsung)
//  Setiap command muncul di SATU kategori saja (no double).
//  Support teks : .menu / .help / .menu <kategori>
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

function exists(cmd) {
    return plugins.has(String(cmd).toLowerCase())
}

function getCat(cat) {
    return CATALOG.find(c => c.key === cat) || null
}

function catRows(cat) {
    return (cat.cmds || []).map(c => ({
        id: '.' + c.name,
        header: '',
        title: c.title,
        description: c.desc
    })).filter(row => exists(row.id.slice(1)))
}

function catTitle(cat) {
    return `${cat.emoji} ${cat.label}`
}

function textRows(cat) {
    return (cat.cmds || []).filter(c => exists(c.name)).map(c => `  ${c.title}\n  ${c.desc}`)
}

let handler = async (m, { conn, text, args }) => {
    const start = Date.now()
    const wanted = String(text || args?.[0] || '').trim().toLowerCase()
    const image = await Jimp.read(fs.readFileSync('./src/img/menu.jpg'))
    image.resize(640, 640)
    const thumb = await image.getBufferAsync(Jimp.MIME_JPEG)

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
        rows.push({ id: '.menu', header: '', title: '🔙 Kembali ke Menu Utama', description: '' })
        const sections = [{ title: catTitle(cat), highlight_label: '', rows }]
        const listText = textRows(cat).join('\n')
        return conn.sendMessage(m.chat, {
            interactiveButtons: [{
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: catTitle(cat),
                    sections
                })
            }],
            title: `${cat.emoji} MENU ${cat.label.toUpperCase()}`,
            text: `${listText}`,
            footer: `Ketik .menu untuk kembali • ${config.botName}`,
            contextInfo: {
                externalAdReply: {
                    title: `${config.botName} • ${config.version || ''}`,
                    body: `${cat.label}`,
                    mediaType: 1,
                    thumbnail: thumb
                }
            }
        }, { quoted: m })
    }

    // ==================== MENU UTAMA ====================
    const ping = Date.now() - start
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)
    const totalPlugins = [...new Set(plugins.values())].length
    const number = m.sender.split('@')[0]

    const isAdmin = m.isAdmin || m.isOwner

    const userCats = CATALOG.filter(c => c.role === 'user')
    const adminCat = CATALOG.filter(c => c.role === 'admin')
    const ownerCats = CATALOG.filter(c => c.role === 'owner')

    // Sections dalam satu tombol ☰ — dikelompokkan sesuai role
    const sections = []

    // 1) USER: kategori → submenu (navigasi)
    sections.push({
        title: '👤 MENU USER',
        highlight_label: '',
        rows: userCats.map(cat => ({
            id: '.menu ' + cat.key,
            header: '',
            title: catTitle(cat),
            description: `${catRows(cat).length} command`
        })).filter(r => Number(r.description.split(' ')[0]) > 0)
    })

    // 2) ADMIN: command khusus admin (langsung jalan)
    if (isAdmin) {
        const adminRows = adminCat.flatMap(cat => catRows(cat))
        if (adminRows.length) sections.push({
            title: '🛡️ MENU ADMIN',
            highlight_label: '',
            rows: adminRows
        })
    }

    // 3) OWNER: manajemen grup + settings (langsung jalan)
    if (m.isOwner) {
        for (const cat of ownerCats) {
            const rows = catRows(cat)
            if (rows.length) sections.push({ title: catTitle(cat), highlight_label: '', rows })
        }
    }

    const userList = userCats.map(cat => catTitle(cat)).join('\n')
    let ownerHint = ''
    if (m.isOwner) {
        ownerHint = '\n\n👑 *OWNER*:\n' + ownerCats.map(cat => catTitle(cat)).join('\n')
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
• Tap tombol *☰ BUKA MENU* di bawah
• Atau ketik *.menu <kategori>* — contoh : *.menu download*
• .menu owner / .menu admin / .menu user`

    await conn.sendMessage(m.chat, {
        interactiveButtons: [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: '☰ BUKA MENU',
                sections
            })
        }],
        title: `👋 Halo ${m.pushName || 'User'}!`,
        text: menuBox,
        footer: `🔗 ${config.channelLink}  •  💻 ${config.githubRepo}`,
        contextInfo: {
            externalAdReply: {
                title: `${config.botName} • v${config.version}`,
                body: `DEVELOPER BY ${config.developer || 'JHON338'}`,
                mediaType: 1,
                thumbnail: thumb,
                sourceUrl: 'https://jhon338-jc.github.io/Linktree/',
                mediaUrl: 'https://jhon338-jc.github.io/Linktree/',
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

handler.command = ['menu', 'help']
export default handler