import fs from 'fs'
import Jimp from 'jimp'
import config from '../../config.json' with { type: 'json' }
import { plugins } from '../../handler.js'
import os from 'os'

let handler = async (m, { conn }) => {
    const start = Date.now()

    const image = await Jimp.read(fs.readFileSync('./src/img/menu.jpg'))
    image.resize(300, 300)
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

    let menuText = `
乂 *BOT INFORMATION*

*Name* : ${config.botName}
*Type* : ESM - Plugin
*Dev*  : ${config.ownerName}
*Ping* : ${ping} ms
*RAM* : ${ramUsed}MB
*Status* : ${config.botMode.toUpperCase()}
*Total Plugin* : ${totalPlugin}
*Uptime* : ${days}d ${hours}h ${minutes}m ${seconds}s

乂 *USER INFORMATION*

*Name* : ${m.pushName || '-'}
*Number* : +${number}
*Status* : ${m.isOwner ? '👑 Owner' : '👤 User'}
`.trim()

    let listMenu = [
        { id: '.sg', title: '🔄 Pilih Grup', description: 'Pilih grup untuk dipantau' },
        { id: '.grouplist', title: '📊 Semua Grup', description: 'Lihat semua grup & anggota' },
        { id: '.mylist', title: '📋 Grup Dipantau', description: 'Lihat grup yang dipantau' },
        { id: '.kick', title: '👤 Kick User', description: '.kick @user' },
        { id: '.add', title: '➕ Add User', description: '.add 628xx' },
        { id: '.addadmin', title: '👑 Add Admin', description: '.addadmin @user' },
        { id: '.deladmin', title: '👑 Del Admin', description: '.deladmin @user' },
        { id: '.setname', title: '✏️ Ganti Nama Grup', description: '.setname Nama Baru' },
        { id: '.setdesc', title: '📝 Ganti Deskripsi', description: '.setdesc Deskripsi Baru' },
        { id: '.setpp', title: '🖼️ Ganti PP Grup', description: 'Reply gambar + .setpp' },
        { id: '.setppbot', title: '🤖 Ganti PP Bot', description: 'Reply gambar + .setppbot' },
        { id: '.setbio', title: '📝 Ganti Bio Bot', description: '.setbio Bio keren' },
        { id: '.setnamebot', title: '🏷️ Ganti Nama Bot', description: '.setnamebot Nama baru' },
        { id: '.totag', title: '📢 Tag All', description: 'Tag semua anggota' },
        { id: '.hidetag', title: '👻 Hide Tag', description: 'Tag semua (sembunyi)' },
        { id: '.leave', title: '🚪 Leave Grup', description: 'Bot keluar dari grup' },
        { id: '.addowner', title: '➕ Add Owner', description: '.addowner 628xx' },
        { id: '.delowner', title: '➖ Del Owner', description: '.delowner 628xx' },
        { id: '.stiker', title: '🎨 Stiker Brat', description: '.stiker teks' },
        { id: '.simg', title: '🖼️ Stiker Gambar', description: '.simg reply gambar' },
        { id: '.iqc', title: '🧠 IQ Checker', description: '.iqc - Cek IQ' },
        { id: '.fakedana', title: '💸 Fake Dana', description: '.fakedana jumlah' },
        { id: '.fakeff', title: '🎮 Fake FF', description: '.fakeff nama' },
        { id: '.tt', title: '🎵 TikTok DL', description: '.tt url tiktok' },
        { id: '.ig', title: '📷 Instagram DL', description: '.ig url instagram' },
        { id: '.rvo', title: '👁️ Read View Once', description: '.rvo - Reply pesan VO' },
        { id: '.ping', title: '🏓 Ping', description: 'Cek kecepatan bot' },
        { id: '.info', title: 'ℹ️ Info Bot', description: 'Info lengkap bot' }
    ]

    let listMenuUser = [
        { id: '.grouplist', title: '📊 Semua Grup', description: 'Lihat semua grup & anggota' },
        { id: '.mylist', title: '📋 Grup Dipantau', description: 'Lihat grup yang dipantau' },
        { id: '.stiker', title: '🎨 Stiker Brat', description: '.stiker teks' },
        { id: '.simg', title: '🖼️ Stiker Gambar', description: '.simg reply gambar' },
        { id: '.iqc', title: '🧠 IQ Checker', description: '.iqc - Cek IQ' },
        { id: '.fakedana', title: '💸 Fake Dana', description: '.fakedana jumlah' },
        { id: '.fakeff', title: '🎮 Fake FF', description: '.fakeff nama' },
        { id: '.tt', title: '🎵 TikTok DL', description: '.tt url tiktok' },
        { id: '.ig', title: '📷 Instagram DL', description: '.ig url instagram' },
        { id: '.rvo', title: '👁️ Read View Once', description: '.rvo - Reply pesan VO' },
        { id: '.ping', title: '🏓 Ping', description: 'Cek kecepatan bot' },
        { id: '.info', title: 'ℹ️ Info Bot', description: 'Info lengkap bot' }
    ]

    let finalList = m.isOwner ? listMenu : listMenuUser
    let sectionTitle = m.isOwner ? '👑 Menu Owner' : '📋 Menu User'

    await conn.sendMessage(m.chat, {
        buttonLocation: {
            latitude: 0, longitude: 0,
            name: config.botName, address: config.ownerName,
            jpegThumbnail: thumb, text: menuText,
            footer: config.ownerName,
            listButtonText: '☰ Menu',
            listSectionTitle: sectionTitle,
            listMenu: finalList
        }
    }, { quoted: m })
}

handler.command = ['menu', 'help']
export default handler
