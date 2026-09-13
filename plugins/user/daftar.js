import { loadMembers, saveMember, isRegisteredMember, normalizeNumber, MEMBER_STATUS } from '../../handler.js'

let handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, { react: { text: '📋', key: m.key } })

    const raw = String(text || '').trim()
    if (!raw) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *_CARA DAFTAR:_*\n\n- \`\` .daftar nama,umur,status \`\`\n\n_Contoh:_\n- \`\` .daftar Jhon,20,pelajar \`\`\n\n_📋 Status yang tersedia:_\n- *_pelajar_* / *_mahasiswa_* / *_singgel_* / *_jomblo_* / *_kawin_*')
    }

    const parts = raw.split(',').map(s => s.trim())
    const [nama, umur, status] = parts
    if (nama === undefined || umur === undefined || status === undefined) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *_FORMAT SALAH!_*\n\n_Gunakan:_\n- \`\` .daftar nama,umur,status \`\`\n\n_Contoh:_\n- \`\` .daftar Jhon,20,pelajar \`\`')
    }

    if (!/^\d+$/.test(umur)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *_UMUR HARUS ANGKA!_*\n\n_Contoh:_ \`\` .daftar Jhon,20,pelajar \`\`')
    }

    const stMap = { single: 'singgel', lajang: 'singgel', singles: 'singgel' }
    const st = stMap[status.toLowerCase()] || status.toLowerCase()
    if (!MEMBER_STATUS.includes(st)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> *_STATUS TIDAK VALID!_*\n\n_Pilih salah satu:_\n- *_pelajar_*\n- *_mahasiswa_*\n- *_singgel_*\n- *_jomblo_*\n- *_kawin_*\n\n_Contoh:_ \`\` .daftar Jhon,20,pelajar \`\`')
    }

    const jid = m.sender || m.chat || ''
    const number = normalizeNumber(jid)

    if (isRegisteredMember(jid)) {
        const data = loadMembers().find(x => (x?.jid && x.jid === jid) || (number && x?.number === number))
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        return m.reply(`> *_KAMU SUDAH TERDAFTAR_*\n\n_📋 Data kamu:_\n- *_Nama_* : ${data?.name || '-'}\n- *_Umur_* : ${data?.umur || '-'}\n- *_Status_* : ${data?.status || '-'}`)
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
    return m.reply(`> *_PENDAFTARAN BERHASIL!_*\n\n_Selamat datang,_ *_${nama}_* 🎉\n\n_📋 Data yang terdaftar:_\n- *_Nama_* : ${nama}\n- *_Nomor_* : ${number.replace(/^62/, '+62')}\n- *_Umur_* : ${umur}\n- *_Status_* : ${st}\n\n_Sekarang kamu bisa pakai semua fitur bot. Ketik_ \`\` .menu \`\` _untuk melihat daftar perintah!_`)
}

handler.command = ['daftar', 'register', 'reg']
export default handler