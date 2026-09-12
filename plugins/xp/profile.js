import { getUsers, levelFromXp, xpForLevel, leaderboard } from '../../lib/system.js'

let handler = async (m, { command }) => {
    const number = m.sender.split('@')[0]

    if (command === 'profile') {
        const users = getUsers()
        const u = users[number] || { xp: 0, level: 1, money: 0, limit: 25, items: {} }
        const curXp = u.xp || 0
        const next = xpForLevel((u.level || 1) + 1)
        const items = Object.entries(u.items || {}).map(([n, q]) => `${n} x${q}`).join(', ') || '-'
        return m.reply(`🧑‍🚀 *PROFILE*\n\n👤 Nama : ${m.pushName || '-'}\n📞 Nomor : +${number}\n📊 Level : ${u.level || 1} (${curXp}/${next} XP)\n💰 Uang : Rp${(u.money || 0).toLocaleString('id-ID')}\n🎟️ Limit : ${u.limit || 25}\n🎒 Item : ${items}`)
    }

    if (command === 'level' || command === 'xp') {
        const users = getUsers()
        const u = users[number] || { xp: 0, level: 1 }
        const curXp = u.xp || 0
        const next = xpForLevel((u.level || 1) + 1)
        const pct = Math.min(100, Math.floor((curXp / next) * 100))
        const bar = '▓'.repeat(Math.floor(pct / 10)) + '░'.repeat(10 - Math.floor(pct / 10))
        return m.reply(`📊 *LEVEL & XP*\n\n${bar} ${pct}%\n\n🏅 Level : ${u.level || 1}\n✨ XP : ${curXp}/${next}\n💬 Ketik terus biar naik level!`)
    }

    if (command === 'rank' || command === 'top') {
        const top = leaderboard('xp')
        if (top.length === 0) return m.reply('Belum ada data XP.')
        const text = top.map((u, i) => `${i + 1}. ${u.num} — Level ${u.level || 1} (${u.xp || 0} XP)`).join('\n')
        return m.reply(`🏆 *TOP 10 XP*\n\n${text}`)
    }
}

handler.command = ['profile', 'level', 'xp', 'rank', 'top']
handler.group = true

export default handler