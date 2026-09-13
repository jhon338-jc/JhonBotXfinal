import { loadMembers, saveMember, isRegisteredMember, normalizeNumber, MEMBER_STATUS } from '../../handler.js'

let handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, { react: { text: '📋', key: m.key } })

    const raw = String(text || '').trim()
    if (!raw) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *CARA DAFTAR:*\n\n- `.daftar nama,umur,status`\n\n_Contoh:_\n- `.daftar Jhon,20,pelajar`\n\n_📋 Status yang tersedia:_\n- *pelajar* / *mahasiswa* / *singgel* / *jomblo* / *kawin*')
    }

    const parts = raw.split(',').map(s => s.trim())
    const [nama, umur, status] = parts
    if (nama === undefined || umur === undefined || status === undefined) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *FORMAT SALAH!*\n\n_Gunakan:_\n- `.daftar nama,umur,status`\n\n_Contoh:_\n- `.daftar Jhon,20,pelajar`')
    }

    if (!/^\d+$/.test(umur)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *UMUR HARUS ANGKA!*\n\n_Contoh:_ `.daftar Jhon,20,pelajar`')
    }

    const stMap = { single: 'singgel', lajang: 'singgel', singles: 'singgel' }
    const st = stMap[status.toLowerCase()] || status.toLowerCase()
    if (!MEMBER_STATUS.includes(st)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *STATUS TIDAK VALID!*\n\n_Pilih salah satu:_\n- *pelajar*\n- *mahasiswa*\n- *singgel*\n- *jomblo*\n- *kawin*\n\n_Contoh:_ `.daftar Jhon,20,pelajar`')
    }

    const jid = m.sender || m.chat || ''
    const number = normalizeNumber(jid)

    if (isRegisteredMember(jid)) {
        const data = loadMembers().find(x => (x?.jid && x.jid === jid) || (number && x?.number === number))
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return m.reply(`> *KAMU SUDAH TERDAFTAR*\n\n_📋 Data kamu:_\n- *Nama* : ${data?.name || '-'}\n- *Umur* : ${data?.umur || '-'}\n- *Status* : ${data?.status || '-'}`)
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
    return m.reply(`> *PENDAFTARAN BERHASIL!*\n\n_Selamat datang,_ *${nama}* 🎉\n\n_📋 Data yang terdaftar:_\n- *Nama* : ${nama}\n- *Nomor* : ${number.replace(/^62/, '+62')}\n- *Umur* : ${umur}\n- *Status* : ${st}\n\n_Sekarang kamu bisa pakai semua fitur bot. Ketik_ \`.menu\` _untuk melihat daftar perintah!_`)
}

handler.command = ['daftar', 'register', 'reg']
export default handler