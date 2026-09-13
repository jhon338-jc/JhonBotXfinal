let handler = async (m, { conn, text }) => {
    const parts = String(text || '').split('|').map(s => s.trim())
    const name = parts[0]
    const options = parts.slice(1)
    if (!name || options.length < 2) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> ***GAGAL MEMBUAT POLL***\n\n_Gunakan format:_\n- `.poll Pertanyaan|Opsi1|Opsi2|...`\n\n_Contoh:_\n- `.poll Makan apa nanti malam?|Ayam Geprek|Mie Ayam|Nasi Goreng`\n\n_Maksimal 12 opsi._')
    }
    if (options.length > 12) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> ***MAKSIMAL 12 OPSI POLL!***\n\n_Kurangi jumlah opsinya lalu coba lagi._')
    }
    if (String(name).length > 1024 || options.some(o => String(o).length > 256)) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return m.reply('> ***TEXT POLL KEPANJANGAN***\n\n_Maksimal: judul 1024 karakter, tiap opsi 256 karakter._')
    }

    await conn.sendMessage(m.chat, {
        poll: { name, values: options, selectableCount: 1 }
    })
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.command = ['poll', 'jajakpendapat']
export default handler