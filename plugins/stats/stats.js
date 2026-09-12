import { getUsers, leaderboard } from '../../lib/system.js'

let handler = async (m, { command, conn }) => {
    const number = m.sender.split('@')[0]

    if (command === 'stats' || command === 'mystats') {
        const u = getUsers()[number] || { xp: 0, level: 1, money: 0, limit: 25 }
        return m.reply(`📊 *STATISTIK KAMU*\n\n🏅 Level : ${u.level || 1}\n✨ XP : ${u.xp || 0}\n💰 Uang : Rp${(u.money || 0).toLocaleString('id-ID')}\n🎟️ Limit : ${u.limit || 25}`)
    }

    if (command === 'grupstats') {
        let subject = m.chat
        let members = 0
        try {
            const gm = await conn.groupMetadata(m.chat)
            if (gm) { subject = gm.subject || subject; members = gm.participants?.length || 0 }
        } catch (e) {}
        const top = leaderboard('money').slice(0, 5)
        const topText = top.map((u, i) => `${i + 1}. ${u.num} — Rp${(u.money || 0).toLocaleString('id-ID')}`).join('\n')
        return m.reply(`📊 *STATISTIK GRUP*\n\n👥 Grup : ${subject}\n🧑‍🤝‍🧑 Anggota : ${members}\n\n💰 *TOP TERKAYA*:\n${topText}`)
    }
}

handler.command = ['stats', 'mystats', 'grupstats']
handler.group = true

export default handler