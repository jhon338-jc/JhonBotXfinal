import { getBalance, claimDaily, transferMoney, leaderboard, addMoney, consumeLimit } from '../../lib/system.js'

let handler = async (m, { command, args }) => {
    const number = m.sender.split('@')[0]

    if (command === 'balance' || command === 'bank') {
        const { money } = getBalance(number)
        return m.reply(`💰 *BALANCE*\n\n💵 Uang : Rp${money.toLocaleString('id-ID')}\n\nKetik *.daily* untuk klaim hadiah harian!`)
    }

    if (command === 'daily') {
        const res = claimDaily(number)
        if (!res.ok) return m.reply(`⚠️ ${res.reason}`)
        return m.reply(`🎉 *HADIAH HARIAN*\n\n💰 +Rp${(res.reward).toLocaleString('id-ID')}\n🎟️ Limit direset ke ${res.limit}\n\nBalik lagi besok ya!`)
    }

    if (command === 'transfer') {
        const to = (args[0] || '').replace(/\D/g, '')
        const amount = parseInt(args[1] || '0')
        if (!to || !amount || amount < 1) return m.reply('Contoh:\n.transfer 628xx 1000')
        if (to === number) return m.reply('Gak bisa transfer ke diri sendiri.')
        const res = transferMoney(number, to, amount)
        if (!res.ok) return m.reply(`⚠️ ${res.reason}`)
        return m.reply(`✅ *TRANSFER BERHASIL*\n\nKirim Rp${amount.toLocaleString('id-ID')} ke +${to}\nSisa saldo : Rp${res.balance.toLocaleString('id-ID')}`)
    }

    if (command === 'topmoney' || command === 'rich') {
        const top = leaderboard('money')
        if (top.length === 0) return m.reply('Belum ada data uang.')
        const text = top.map((u, i) => `${i + 1}. ${u.num} — Rp${(u.money || 0).toLocaleString('id-ID')}`).join('\n')
        return m.reply(`💰 *TOP 10 TERKAYA*\n\n${text}`)
    }

    if (command === 'work') {
        if (!consumeLimit(number)) return m.reply('🎟️ Limit habis! Ketik *.daily* buat reset.')
        const reward = 100 + Math.floor(Math.random() * 400)
        addMoney(number, reward)
        const still = getBalance(number)
        return m.reply(`💼 *KERJA SAMBILAN*\n\nKamu kerja dan dapat:\n💰 +Rp${reward.toLocaleString('id-ID')}\n💵 Saldo : Rp${still.money.toLocaleString('id-ID')}`)
    }
}

handler.command = ['balance', 'bank', 'daily', 'transfer', 'topmoney', 'rich', 'work']
handler.group = true

export default handler