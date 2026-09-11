import fs from 'fs'

let handler = async (m, { conn, args, command, notifReply }) => {
    if (!m.isGroup) return m.reply('❌ Fitur ini khusus grup!')
    const monitorFile = './database/monitor.json'
    let monitor = JSON.parse(fs.readFileSync(monitorFile))

    // .grouplist - Lihat semua grup
    if (command === 'grouplist' || command === 'gl') {
        const groups = await conn.groupFetchAllParticipating()
        if (!groups || Object.keys(groups).length === 0) {
            return notifReply('❌ Bot tidak ada di grup manapun!', 'Group List')
        }

        let text = `乂 *DAFTAR GRUP*\n\n`
        text += `📊 Total Grup: ${Object.keys(groups).length}\n`
        text += `━━━━━━━━━━━━━━━━━━\n\n`

        let no = 1
        for (const [jid, group] of Object.entries(groups)) {
            const memberCount = group.participants?.length || 0
            const isMonitored = monitor.groups.includes(jid) ? '🟢' : '⚪'
            text += `${no}. ${isMonitored} *${group.subject}*\n`
            text += `   📎 ID: ${jid}\n`
            text += `   👥 Anggota: ${memberCount}\n\n`
            no++
        }

        text += `━━━━━━━━━━━━━━━━━━\n`
        text += `ℹ️ Gunakan *.monitor <jumlah>* untuk memilih grup\n`
        text += `ℹ️ Minimal 5 grup`

        return m.reply(text)
    }

    // .monitor - Pilih grup yang dipantau
    if (command === 'monitor') {
        if (!m.isOwner) return notifReply('❌ Khusus Owner!', 'Access Denied')

        const amount = parseInt(args[0])
        if (!amount || amount < 5) {
            return notifReply('⚠️ Minimal pilih 5 grup!\n\nContoh: *.monitor 5*', 'Monitor')
        }

        const groups = await conn.groupFetchAllParticipating()
        const groupList = Object.values(groups)

        if (groupList.length < amount) {
            return notifReply(`❌ Bot hanya ada di ${groupList.length} grup!`, 'Monitor')
        }

        const selected = groupList.slice(0, amount)
        monitor.groups = selected.map(g => g.id)

        fs.writeFileSync(monitorFile, JSON.stringify(monitor, null, 2))

        let text = `✅ *${amount} Grup Dipilih untuk Dipantau:*\n\n`
        selected.forEach((g, i) => {
            text += `${i + 1}. ${g.subject}\n`
            text += `   👥 ${g.participants?.length || 0} anggota\n\n`
        })

        return notifReply(text, 'Monitor Active')
    }

    // .mylist - Lihat grup yang dipantau
    if (command === 'mylist') {
        if (monitor.groups.length === 0) {
            return notifReply('⚠️ Belum ada grup yang dipantau!\n\nGunakan *.monitor <jumlah>*', 'Monitor')
        }

        let text = `🟢 *GRUP YANG DIPANTAU:*\n\n`
        text += `📊 Total: ${monitor.groups.length} grup\n`
        text += `━━━━━━━━━━━━━━━━━━\n\n`

        for (let i = 0; i < monitor.groups.length; i++) {
            try {
                const meta = await conn.groupMetadata(monitor.groups[i])
                text += `${i + 1}. ${meta.subject}\n`
                text += `   👥 ${meta.participants?.length || 0} anggota\n\n`
            } catch {
                text += `${i + 1}. ❌ Grup tidak ditemukan\n\n`
            }
        }

        return m.reply(text)
    }
}

handler.command = ['grouplist', 'gl', 'monitor', 'mylist']
handler.owner = ['monitor']

export default handler