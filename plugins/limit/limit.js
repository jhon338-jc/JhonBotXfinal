import { getUsers, getLimit, todayKey, saveUsers } from '../../lib/system.js'

let handler = async (m, { command }) => {
    const number = m.sender.split('@')[0]

    if (command === 'limit') {
        const limit = getLimit(number)
        return m.reply(`🎟️ *LIMIT*\n\nSisa limit kamu : ${limit}/25\n\nLimit direset otomatis tiap hari (ketik *.daily* buat reset manual + dapat uang).`)
    }

    if (command === 'dailylimit') {
        const users = getUsers()
        const u = users[number] || (users[number] = { xp: 0, level: 1, money: 0, daily: '', limit: 25, items: {} })
        u.limit = 25
        u.daily = todayKey()
        saveUsers(users)
        return m.reply('🎟️ Limit kamu direset ke 25!')
    }
}

handler.command = ['limit', 'dailylimit']
handler.group = true

export default handler