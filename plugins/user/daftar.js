import { loadMembers, saveMember, isRegisteredMember, normalizeNumber, MEMBER_STATUS } from '../../handler.js'

let handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, { react: { text: '📋', key: m.key } })

    const raw = String(text || '').trim()
    if (!raw) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ *Cara Daftar:*\n\n`.daftar nama,umur,status`\n\nContoh:\n`+ .daftar Jhon,20,pelajar`\n\n📋 *Status:* pelajar / mahasiswa / singgel / jomblo / kawin')
    }

    const parts = raw.split(',').map(s => s.trim())
    const [nama, umur, status] = parts
    if (nama === undefined || umur === undefined || status === undefined) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('⚠️ Format salah!\n\nGunakan:\n`.daftar nama,umur,status`\n\nContoh:\n`.daftar Jhon,20,pelajar`')
    }

    if (!/^\d+$/.test(umur)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ *Umur harus berupa angka* (contoh: 20).\n\nCoba lagi: `.daftar nama,umur,status`')
    }

    const stMap = { single: 'singgel', lajang: 'singgel', singles: 'singgel' }
    const st = stMap[status.toLowerCase()] || status.toLowerCase()
    if (!MEMBER_STATUS.includes(st)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('❌ *Status tidak valid!*\n\nPilih salah satu:\npelajar / mahasiswa / singgel / jomblo / kawin\n\nContoh: `.daftar Jhon,20,pelajar`')
    }

    const jid = m.sender || m.chat || ''
    const number = normalizeNumber(jid)

    if (isRegisteredMember(jid)) {
        const data = loadMembers().find(x => (x?.jid && x.jid === jid) || (number && x?.number === number))
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return m.reply('ℹ️ *Kamu sudah terdaftar* sebagai member bot.\n\n📋 *Data kamu:*\n• Nama   : ' + (data?.name || '-') + '\n• Umur   : ' + (data?.umur || '-') + '\n• Status : ' + (data?.status || '-'))
    }

    const contact = m.pushName || conn.contacts?.[jid]?.name || conn.contacts?.[jid]?.notify || ''
    const entry = {
        jid,
        number,
        name: nama,
        contact,
        umur: umur,
        status: st,
        tanggal: new Date().toISOString()
    }
    saveMember(entry)

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    return m.reply(`✅ *PENDAFTARAN BERHASIL!*\n\nSelamat datang, *${nama}*! 🎉\n\n📋 *Data terdaftar:*\n• Nama    : ${nama}\n• Nomor   : ${number.replace(/^62/, '+62')}\n• Umur    : ${umur}\n• Status  : ${st}\n\nSekarang kamu sudah bisa pakai semua fitur bot. Ketik *.menu* untuk lihat daftar perintah!`)
}

handler.command = ['daftar', 'register', 'reg']
export default handler