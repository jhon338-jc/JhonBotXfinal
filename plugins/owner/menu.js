import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import sharp from 'sharp'
import { plugins } from '../../handler.js'
import { log, COLORS } from '../../lib/rgb.js'

// ============================================================
//  MENU JHONXFINAL — tampilan menu dengan tombol interaktif
//  • External Ad Reply di bagian atas (card)
//  • Interactive List popup (single_select / sections)
//  • Nested Sub-Menu: klik kategori -> subkonten perintah
//  Tanpa emoji, tanpa caption berlebihan
// ============================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Kategori & perintah (Airich TIDAK dimasukkan ke menu)
const CATS = {
    maker: { label: 'MAKER', desc: 'Buat gambar / stiker', cmds: [
        { name: 'brat', desc: 'Buat stiker BRAT dari teks' },
        { name: 'iqc', desc: 'Generate gambar IQC' },
        { name: 'img', desc: 'Jadikan stiker dari gambar/video' }
    ]},
    tools: { label: 'TOOLS', desc: 'Tool umum', cmds: [
        { name: 'toimg', desc: 'Ubah stiker jadi gambar/video' },
        { name: 'rvo', desc: 'Buka pesan view once' },
        { name: 'lirik', desc: 'Cari lirik lagu' }
    ]},
    download: { label: 'DOWNLOAD', desc: 'Download media', cmds: [
        { name: 'donlodall', desc: 'Download TikTok, IG, dan lainnya' }
    ]},
    asupan: { label: 'ASUPAN (PREMIUM)', desc: 'Asupan & pap (khusus premium)', cmds: [
        { name: 'asp', desc: 'Asupan random' },
        { name: 'ccn', desc: 'Cecan random' },
        { name: 'pap', desc: 'PAP random' },
        { name: 'paptt', desc: 'PAP TT random' },
        { name: 'papmmk', desc: 'PAP MMK random' },
        { name: 'papbgl', desc: 'PAP BGL random' }
    ]},
    grup: { label: 'GRUP', desc: 'Fitur grup', cmds: [
        { name: 'poll', desc: 'Buat polling grup' },
        { name: 'daftar', desc: 'Daftar jadi member bot (nama,umur,status)' }
    ]},
    premium: { label: 'PREMIUM', desc: 'Paket & langganan', cmds: [
        { name: 'premium', desc: 'Lihat paket premium & cara bayar' }
    ]},
    airich: { label: 'AIRICH (PREMIUM)', desc: 'Khusus premium & owner', cmds: [] },
    owner: { label: 'OWNER', desc: 'Khusus owner / admin grup', ownerOnly: true, cmds: [
        { name: 'add', desc: 'Tambah member grup' },
        { name: 'kick', desc: 'Kick member grup' },
        { name: 'setpp', desc: 'Ganti foto profil grup' },
        { name: 'setnm', desc: 'Ganti nama grup' },
        { name: 'setds', desc: 'Ganti deskripsi grup' },
        { name: 'htg', desc: 'Hidetag semua member' },
        { name: 'grup', desc: 'Daftar & pilih grup' },
        { name: 'ownadd', desc: 'Tambah owner baru' },
        { name: 'owndel', desc: 'Hapus owner' },
        { name: 'ownlist', desc: 'Daftar owner' },
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

function usableCats(m) {
    return Object.entries(CATS).filter(([key, c]) => {
        if (c.ownerOnly) return m.isOwner || m.hasFull
        return true
    })
}

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

function botVersion() {
    return 'JhonXfinal v' + (loadBotConfig().version || '3.3.8')
}

async function getThumb() {
    try {
        const imgPath = path.join(__dirname, '..', '..', 'src', 'img', 'foto_menu.png')
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
            title: ' ' + botVersion()
        }
    } catch (e) {
        console.error(log('MENU', 'header image gagal: ' + (e?.message || e), COLORS.warn))
        return null
    }
}

// Card External Ad Reply di bagian atas pesan
function adReply(thumb) {
    return {
        title: '*JHONXFINAL*',
        body: 'JhonXfinal v3.3.8 - Aktif 24/7',
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnail: thumb || null,
        sourceUrl: loadBotConfig().channelLink || 'https://jhon338-jc.github.io/Linktree/'
    }
}

// Box kecil untuk teks menu
function boxTxt(lines) {
    return lines.join('\n')
}

// Status akses user
function userStatus(m) {
    if (m.isOwner) return 'Owner'
    if (m.isAdmin) return 'Admin'
    if (m.isPremium) return 'Premium'
    return 'Member'
}

// ===== FAKE TROLI (QUOTE) =====
async function getFakeTroli(conn, chatJid, senderJid) {
    try {
        const thumb = await getThumb()
        const order = {
            orderMessage: {
                itemCount: 27948,
                status: 1,
                surface: 1,
                orderTitle: 'JhonXfinal • Order',
                message: 'Pengguna Bot',
                privateAttributes: '',
                ...(thumb ? { thumbnailJpeg: thumb } : {})
            }
        }
        const msg = generateWAMessageFromContent(chatJid || '0@s.whatsapp.net', order, { userJid: senderJid || '0@s.whatsapp.net' })
        return { key: msg.key, message: msg.message }
    } catch (e) {
        console.error(log('MENU', 'troli gagal: ' + (e?.message || e), COLORS.warn))
        return null
    }
}

async function sendMenu(conn, m, bodyText, sections, native) {
    try {
        let header = await getHeaderImage(conn)
        if (!header) header = { title: ' ' + botVersion(), hasMediaAttachment: false }
        const thumb = await getThumb()

        const interactiveMsg = {
            interactiveMessage: {
                header,
                body: { text: bodyText },
                footer: { text: 'Developer: Jhon338 • Powered by Baileys' },
                contextInfo: { externalAdReply: adReply(thumb) },
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
        return true
    } catch (e) {
        console.error(log('MENU', e?.message || e, COLORS.warn))
        return false
    }
}

// ==================== HANDLER ====================
let handler = async (m, { conn, args }) => {
    const input = (args?.[0] || '').trim().toLowerCase()
    const number = m.sender?.split('@')[0] || '?'

    // Profil view (.menu me / .profil)
    if (input === 'me' || m.command === 'profil') {
        const status = userStatus(m)
        m.reply(`> *PROFIL KAMU*\n\n- *Nama* : ${m.pushName || '-'}\n- *Nomor* : +${number}\n- *Status* : ${status}\n\n_Mau ganti akses? Hubungi owner._`)
        return
    }

    // ============ SUB-MENU KATEGORI (.menu maker / dl) ============
    if (input && CATS[input]) {
        const cat = CATS[input]
        if (cat.ownerOnly) {
            const ok = (m.isOwner || m.hasFull)
            if (!ok) return m.reply('> *OWNER ONLY*\n\n_Fitur kategori OWNER khusus owner / admin grup._')
        }

        const botCfg = loadBotConfig()
        const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
        const ownerNumber = botCfg.creator?.[0] || ''

        let bodyText
        let rows = []
        let label

        if (input === 'airich') {
            label = 'AIRICH'
            bodyText = boxTxt([
                '> *' + botVersion() + '*',
                '> _Kategori: AIRICH_',
                '',
                'Fitur Airich (website & game) khusus Premium & Owner.',
                'Ketik .airich untuk membuka daftar. Tersedia 100+ fitur.',
                '',
                'Mau jadi premium? Ketik .premium'
            ])
        } else {
            label = cat.label
            const listRows = cat.cmds.filter(c => exists(c.name))
                .map(c => '- `.' + c.name + '` - ' + c.desc)
            bodyText = boxTxt([
                '> *' + botVersion() + '*',
                '> _Kategori: ' + cat.label + '_',
                '',
                'List perintah di kategori ini  ' + cat.desc + ':',
                '',
                ...(listRows.length ? listRows : ['- (kosong)']),
                '',
                'Ketik langsung, atau pilih dari tombol PILIH COMAND.'
            ])
            rows = cat.cmds.filter(c => exists(c.name)).map(c => ({
                id: '.' + c.name, rowId: '.' + c.name, header: '',
                title: '.' + c.name, description: c.desc
            }))
        }

        const sections = [{ title: label + ' - PILIH PERINTAH', highlight_label: '', rows }]
        if (input !== 'airich') sections[0].rows = [ ...rows, { id: '.menu', rowId: '.menu', header: '', title: 'Kembali', description: 'Kembali ke menu utama' } ]
        else sections[0].rows = [ { id: '.menu', rowId: '.menu', header: '', title: 'Kembali', description: 'Kembali ke menu utama' } ]

        const native = [singleSelect('PILIH COMAND', sections)]
        native.push(quickReply('Profil', '.profil'))
        native.push(ctaUrl('Linktree', channelLink))
        if (ownerNumber) native.push(callBtn('Call Owner', '+' + ownerNumber))
        native.push(copyCode('Salin Versi', botVersion()))

        const ok = await sendMenu(conn, m, bodyText, sections, native)
        if (!ok) await m.reply(bodyText)
        return
    }

    // ============ MENU UTAMA ============
    const runtime = process.uptime()
    const days = Math.floor(runtime / 86400)
    const hours = Math.floor((runtime % 86400) / 3600)
    const minutes = Math.floor((runtime % 3600) / 60)
    const totalPlugins = [...new Set(plugins.values())].length
    const status = userStatus(m)

    const menuBox = boxTxt([
        '> *' + botVersion() + '*',
        '> _Bot multifungsi, cepat, aktif 24/7_',
        '',
        'Nama   : ' + (m.pushName || '-').slice(0, 20),
        'Status : ' + status,
        'Uptime : ' + days + 'd ' + hours + 'j ' + minutes + 'm',
        'Plugin : ' + totalPlugins,
        'Node   : ' + (process.version || '-') + ' / ' + String(process.platform || '-').toUpperCase(),
        '',
        'Pilih kategori lewat tombol BUKA MENU.',
        'Klik kategori, lalu pilih perintahnya.'
    ])

    // Sections navigasi kategori (row mengarah ke sub-menu)
    const catRows = usableCats(m).map(([key, c]) => {
        const preview = (c.cmds.length ? c.cmds.slice(0, 4).map(x => x.name).join(', ') : (key === 'airich' ? 'Premium & Owner' : ''))
        return { id: '.menu ' + key, rowId: '.menu ' + key, header: '', title: c.label, description: preview }
    })
    const sections = [{
        title: 'NAVIGASI MENU',
        highlight_label: '',
        rows: [ ...catRows, { id: '.profil', rowId: '.profil', header: '', title: 'Profil', description: 'Lihat status akses kamu' } ]
    }]

    const botCfg = loadBotConfig()
    const channelLink = botCfg.channelLink || 'https://jhon338-jc.github.io/Linktree/'
    const ownerNumber = botCfg.creator?.[0] || ''

    const native = [singleSelect('BUKA MENU', sections)]
    native.push(quickReply('Profil', '.profil'))
    if (m.isOwner || m.hasFull) native.push(quickReply('Daftar Owner', '.ownlist'))
    native.push(ctaUrl('Linktree', channelLink))
    if (ownerNumber) native.push(callBtn('Call Owner', '+' + ownerNumber))
    native.push(copyCode('Salin Versi', botVersion()))

    const ok = await sendMenu(conn, m, menuBox, sections, native)
    if (ok) return

    // Fallback: plain text
    let plainText = `> *${botVersion().toUpperCase()}*\n> _Aktif 24/7_\n\n`
    plainText += `Halo, *${m.pushName || 'User'}*\nTotal Plugin: *${totalPlugins}*\n\n`
    for (const [key, c] of usableCats(m)) {
        if (key === 'airich') {
            plainText += `- *AIRICH (PREMIUM)* - khusus premium & owner\n`
            continue
        }
        plainText += `*${c.label.toUpperCase()}*\n`
        c.cmds.filter(x => exists(x.name)).forEach(x => { plainText += `- \`.${x.name}\` - ${x.desc}\n` })
        plainText += '\n'
    }
    plainText += `\n_Ketik perintah sesuai contoh. Semoga bermanfaat!`
    await m.reply(plainText)
}

handler.command = ['menu', 'help', 'profil']
export default handler