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
    { name: 'daftar', desc: 'Daftar jadi member bot (.daftar nama,umur,status)' },
    { name: 'poll', desc: 'Buat polling grup (.poll soal|a|b|c)' },
    { name: 'premium', desc: 'Lihat paket & langganan premium' }
]

const OWNER_CMDS = [
    { name: 'add',    desc: 'Tambah member grup (.add 628xxx)' },
    { name: 'kick',   desc: 'Kick member grup (.kick @user)' },
    { name: 'setpp',  desc: 'Ganti foto profil grup' },
    { name: 'setnm',  desc: 'Ganti nama grup' },
    { name: 'setds',  desc: 'Ganti deskripsi grup' },
    { name: 'htg',    desc: 'Hidetag semua member' },
    { name: 'grup',   desc: 'Daftar & pilih grup' },
    { name: 'ownadd', desc: 'Tambah owner baru (asli, permanen)' },
    { name: 'owndel', desc: 'Hapus owner' },
    { name: 'ownlist', desc: 'Lihat daftar owner' },
    { name: 'addprem', desc: 'Aktifkan member premium (.addprem no tier)' },
    { name: 'delprem', desc: 'Hapus member premium' },
    { name: 'premlist', desc: 'Lihat daftar premium' },
    { name: 'hapuschat', desc: 'Hapus semua pesan bot <24 jam' },
    { name: 'ui', desc: 'Preview semua UI & tombol bot' },
    { name: 'ping', desc: 'Cek respon bot' },
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

function callBtn(display_text, phone_number) {
    return { name: 'call', buttonParamsJson: JSON.stringify({ display_text, phone_number }) }
}

function copyCode(display_text, copy_code) {
    return { name: 'copy_code', buttonParamsJson: JSON.stringify({ display_text, copy_code }) }
}

function loadBotConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json'), 'utf-8'))
    } catch {
        return {}
    }
}

async function getThumb() {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'menu.png')
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
            title: '🤖 JhonBot v' + (loadBotConfig().version || '3.3.8')
        }
    } catch (e) {
        console.error(rgbTag('MENU', 'header image gagal: ' + (e?.message || e), COLORS.warn))
        return null
    }
}

// ===== FAKE TROLI (ORDER SAMPAH) =====
async function getFakeTroli(conn, chatJid, senderJid) {
    try {
        const thumb = await getThumb()
        const order = {
            orderMessage: {
                itemCount: 0,
                status: 1,
                surface: 1,
                orderTitle: 'JhonBot • Order',
                message: 'ORDER SAMPAH',
                privateAttributes: '',
                ...(thumb ? { thumbnailJpeg: thumb } : {})
            }
        }
        const msg = generateWAMessageFromContent(chatJid || '0@s.whatsapp.net', order, { userJid: senderJid || '0@s.whatsapp.net' })
        return { key: msg.key, message: msg.message }
    } catch (e) {
        console.error(rgbTag('MENU', 'troli gagal: ' + (e?.message || e), COLORS.warn))
        return null
    }
}

// ==================== HANDLER ====================
let handler = async (m, { conn, args }) => {
    const input = (args?.[0] || '').trim().toLowerCase()
    const number = m.sender?.split('@')[0] || '?'

    // Profil view (quick_reply / .profil)
    if (input === 'me' || m.command === 'profil') {
        let status = '👤 ***User***'
        if (m.isOwner) status = '👑 ***Owner***'
        else if (m.isPremium) status = '👑 ***Premium***'
        await conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key } })
        m.reply(`> ***PROFIL KAMU***\n\n- ***Nama*** : ${m.pushName || '-'}\n- ***Nomor*** : +${number}\n- ***Status*** : ${status}\n\n_Mau ganti akses? Hubungi owner._`)
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

    let status = '👤 *MEMBER*'
    if (m.isOwner) status = '👑 *OWNER*'
    else if (m.isPremium) status = '⭐ *PREMIUM*'

    const boxW = 42
    const top = '┌' + '─'.repeat(boxW) + '┐'
    const mid = '├' + '─'.repeat(boxW) + '┤'
    const bot = '└' + '─'.repeat(boxW) + '┘'
    const line = (txt = '') => '│' + String(txt).padEnd(boxW) + '│'
    const mkRow = (k, v) => line(` ${k.padEnd(6)}: ${v}`)

    const menuBox = [
        top,
        line('   ✦   *J H O N B O T*   ✦'),
        line('   🤖 _Aktif 24/7 Tanpa Henti_'),
        mid,
        mkRow('👤', (m.pushName || '-').slice(0, 24)),
        mkRow('📱', '+' + number),
        mkRow('🏷️', status),
        mid,
        mkRow('⚡', days + 'd ' + hours + 'j ' + minutes + 'm'),
        mkRow('📦', String(totalPlugins) + ' plugin'),
        mkRow('🖥️', process.version || '-'),
        mkRow('🌐', String(process.platform || '-').toUpperCase()),
        bot,
        '',
        '💡 _Ketuk tombol di bawah untuk akses cepat_'
    ].join('\n')

    // Bangun sections
    const sections = []
    const userRows = cmdRows(USER_CMDS)
    if (userRows.length) sections.push(section('👤 USER', userRows))

    if (m.isOwner) {
        const ownerRows = cmdRows(OWNER_CMDS)
        if (ownerRows.length) sections.push(section('👑 OWNER', ownerRows))
    }

    const botCfg = loadBotConfig()
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
    const ownerNumber = botCfg.creator?.[0] || ''

    // Maksimal 6 tombol native flow
    const botVersion = 'JhonBot v' + (botCfg.version || '3.3.8')
    const native = [singleSelect('BUKA MENU 📋', sections)]
    native.push(quickReply('👤 Profil', '.profil'))
    if (m.isOwner) native.push(quickReply('👑 Daftar Owner', '.ownlist'))
    native.push(ctaUrl('🌐 Linktree', channelLink))
    if (ownerNumber) native.push(callBtn('📞 Call Owner', '+' + ownerNumber))
    native.push(copyCode('🔑 Salin Versi', botVersion))

    try {
        let header = await getHeaderImage(conn)
        if (!header) header = { title: '🤖 ' + botVersion, hasMediaAttachment: false }

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
            { userJid: conn.user?.id || m.sender, quoted: (await getFakeTroli(conn, m.chat, m.sender)) || m }
        )
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return
    } catch (e) {
        console.error(rgbTag('MENU', e?.message || e, COLORS.warn))
    }

    // Fallback: plain text (pakai kombinasi format)
    let plainText = `> ***${botVersion.toUpperCase()}***\n> _Aktif 24/7 Tanpa Henti_\n\n`
    plainText += `👋 _Halo,_ ***${m.pushName || 'User'}***\n📦 _Total Plugin:_ ***${totalPlugins}***\n\n`
    plainText += `***1. 👤 MENU USER***\n`
    userRows.forEach(r => { plainText += `- \`${r.title}\` — _${r.description}_\n` })
    if (m.isOwner) {
        plainText += `\n***2. 👑 MENU OWNER***\n`
        cmdRows(OWNER_CMDS).forEach(r => { plainText += `- \`${r.title}\` — _${r.description}_\n` })
    }
    plainText += `\n_Ketik perintah seperti contoh di atas. Semoga bermanfaat! 🙏`
    await m.reply(plainText)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['menu', 'help', 'profil']
export default handler