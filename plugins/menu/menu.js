import fs from 'fs'
import Jimp from 'jimp'
import config from '../../config.json' with { type: 'json' }
import { plugins } from '../../handler.js'

let handler = async (m, { conn, text }) => {
    const start = Date.now()

    const image = await Jimp.read(fs.readFileSync('./src/img/menu.jpg'))
    image.resize(640, 640)
    const thumb = await image.getBufferAsync(Jimp.MIME_JPEG)

    const ping = Date.now() - start
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const seconds = Math.floor(runtime % 60)
    const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)
    const totalPlugin = [...new Set(plugins.values())].length
    const number = m.sender.split('@')[0]

    let menuText = `╭───『 *${config.botName}* 』───⬣
│
│  🤖 *Bot Information*
│  ├ Nama : ${config.botName}
│  ├ Dev : ${config.developer || config.ownerName}
│  ├ Versi : ${config.version || '-'}
│  ├ Mode : ${config.botMode.toUpperCase()}
│  ├ Plugins : ${totalPlugin}
│  ├ Ping : ${ping}ms
│  ├ RAM : ${ramUsed}MB
│  └ Uptime : ${days}d ${hours}h ${minutes}m ${seconds}s
│
│  👤 *User Information*
│  ├ Nama : ${m.pushName || '-'}
│  ├ Nomor : +${number}
│  └ Status : ${m.isOwner ? '👑 Owner' : '👤 User'}
│
╰──────────────────⬣`

    let listMenu = [
        {
            title: '🔄 Pilih Grup', description: 'Pilih grup untuk dipantau', command: '.sg'
        },
        {
            title: '📊 Semua Grup', description: 'Lihat semua grup & anggota', command: '.grouplist'
        },
        {
            title: '👤 Kick', description: 'Keluarkan anggota .kick @user', command: '.kick'
        },
        {
            title: '➕ Add User', description: 'Tambah anggota .add 628xx', command: '.add'
        },
        {
            title: '👑 Add Admin', description: 'Jadikan admin .addadmin @user', command: '.addadmin'
        },
        {
            title: '👑 Del Admin', description: 'Copot admin .deladmin @user', command: '.deladmin'
        },
        {
            title: '✏️ Ganti Nama Grup', description: '.setname Nama Baru', command: '.setname'
        },
        {
            title: '📝 Ganti Deskripsi', description: '.setdesc Deskripsi Baru', command: '.setdesc'
        },
        {
            title: '🖼️ Ganti PP Grup', description: 'Reply gambar + .setpp', command: '.setpp'
        },
        {
            title: '📝 Ganti Bio Bot', description: '.setbio Bio keren', command: '.setbio'
        },
        {
            title: '🏷️ Ganti Nama Bot', description: '.setnamebot Nama baru', command: '.setnamebot'
        },
        {
            title: '📢 Tag All', description: 'Tag semua anggota', command: '.totag'
        },
        {
            title: '👻 Hide Tag', description: 'Tag semua (sembunyi)', command: '.hidetag'
        },
        {
            title: '🚪 Leave Grup', description: 'Bot keluar dari grup', command: '.leave'
        },
        {
            title: '➕ Add Owner', description: '.addowner 628xx', command: '.addowner'
        },
        {
            title: '➖ Del Owner', description: '.delowner 628xx', command: '.delowner'
        },
        {
            title: '🎨 Stiker Brat', description: '.stiker teks', command: '.stiker'
        },
        {
            title: '🖼️ Stiker Gambar', description: 'Reply gambar + .simg', command: '.simg'
        },
        {
            title: '🎬 Stiker Video', description: 'Reply video + .simg', command: '.simg'
        },
        {
            title: '🔄 Stiker ke Gambar', description: 'Reply stiker + .toimg', command: '.toimg'
        },
        {
            title: '🖼️ Generate HTML', description: 'Kode HTML jadi screenshot', command: '.canvas'
        },
        {
            title: '📄 File HTML', description: 'Kode HTML jadi file .html', command: '.htmlfile'
        },
        {
            title: '🧠 IQ Checker', description: '.iqc - Cek IQ', command: '.iqc'
        },
        {
            title: '💸 Fake Dana', description: '.fakedana jumlah', command: '.fakedana'
        },
        {
            title: '🎮 Fake FF', description: '.fakeff nama', command: '.fakeff'
        },
        {
            title: '🎵 TikTok DL', description: '.tt url tiktok', command: '.tt'
        },
        {
            title: '📷 Instagram DL', description: '.ig url instagram', command: '.ig'
        },
        {
            title: '📘 Facebook DL', description: '.fb url facebook', command: '.fb'
        },
        {
            title: '🎶 YouTube MP3', description: '.mp3 url youtube', command: '.mp3'
        },
        {
            title: '📦 MediaFire DL', description: '.mediafie url mediafire', command: '.mediafie'
        },
        {
            title: '📜 Lirik Lagu', description: '.lirik judul lagu', command: '.lirik'
        },
        {
            title: '📰 Berita Detik', description: '.detik - berita terbaru', command: '.detik'
        },
        {
            title: '👁️ Read View Once', description: 'Reply pesan VO + .rvo', command: '.rvo'
        },
        {
            title: '🏓 Ping', description: 'Cek kecepatan bot', command: '.ping'
        },
        {
            title: 'ℹ️ Info Bot', description: 'Info lengkap bot', command: '.info'
        }
    ]

    let listMenuUser = [
        {
            title: '🎨 Stiker Brat', description: '.stiker teks', command: '.stiker'
        },
        {
            title: '🖼️ Stiker Gambar', description: 'Reply gambar + .simg', command: '.simg'
        },
        {
            title: '🎬 Stiker Video', description: 'Reply video + .simg', command: '.simg'
        },
        {
            title: '🔄 Stiker ke Gambar', description: 'Reply stiker + .toimg', command: '.toimg'
        },
        {
            title: '🖼️ Generate HTML', description: 'Kode HTML jadi screenshot', command: '.canvas'
        },
        {
            title: '📄 File HTML', description: 'Kode HTML jadi file .html', command: '.htmlfile'
        },
        {
            title: '🎵 TikTok DL', description: '.tt url tiktok', command: '.tt'
        },
        {
            title: '📷 Instagram DL', description: '.ig url instagram', command: '.ig'
        },
        {
            title: '📘 Facebook DL', description: '.fb url facebook', command: '.fb'
        },
        {
            title: '🎶 YouTube MP3', description: '.mp3 url youtube', command: '.mp3'
        },
        {
            title: '📦 MediaFire DL', description: '.mediafie url mediafire', command: '.mediafie'
        },
        {
            title: '📜 Lirik Lagu', description: '.lirik judul lagu', command: '.lirik'
        },
        {
            title: '📰 Berita Detik', description: '.detik - berita terbaru', command: '.detik'
        },
        {
            title: '👁️ Read View Once', description: 'Reply pesan VO + .rvo', command: '.rvo'
        },
        {
            title: '🏓 Ping', description: 'Cek kecepatan bot', command: '.ping'
        },
        {
            title: 'ℹ️ Info Bot', description: 'Info lengkap bot', command: '.info'
        }
    ]

    let finalList = m.isOwner ? listMenu : listMenuUser
    let sectionTitle = m.isOwner ? '👑 Menu Owner' : '📋 Menu User'

    await conn.sendMessage(m.chat, {
        interactiveButtons: [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: '☰ BUKA MENU',
                sections: [
                    {
                        title: sectionTitle,
                        rows: finalList.map(item => ({
                            id: item.command,
                            title: item.title,
                            description: item.description
                        }))
                    }
                ]
            })
        }],
        title: `👋 Halo ${m.pushName || 'User'}!`,
        text: menuText,
        footer: `🔗 Linktree: ${config.channelLink}\n💻 GitHub: ${config.githubRepo}`,
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