import { addXp, addMoney, addItem, getItems, takeItem, consumeLimit } from '../../lib/system.js'

let handler = async (m, { command }) => {
    const number = m.sender.split('@')[0]

    if (command === 'adventure' || command === 'explore') {
        if (!consumeLimit(number)) return m.reply('🎟️ Limit habis! Ketik *.daily* buat reset.')
        const roll = Math.random()
        if (roll < 0.3) {
            const xp = 20 + Math.floor(Math.random() * 30)
            addXp(number, xp)
            return m.reply(`⚔️ *ADVENTURE*\n\nKamoe menjelajah hutan dan mendapat:\n✨ +${xp} XP\n\nSayang tidak ada harta karun.`)
        }
        if (roll < 0.5) {
            const money = 500 + Math.floor(Math.random() * 500)
            addMoney(number, money)
            return m.reply(`💰 *ADVENTURE*\n\nKamu menemukan koin emas!\n💰 +Rp${money.toLocaleString('id-ID')}`)
        }
        addItem(number, 'jimat', 1)
        const xp = 30 + Math.floor(Math.random() * 20)
        addXp(number, xp)
        return m.reply(`🍀 *ADVENTURE*\n\nKamu menemukan *Jimat Keberuntungan*!\n🎁 +1 jimat\n✨ +${xp} XP\n\nJimat bisa dijual di RPG!`)
    }

    if (command === 'hunt') {
        if (!consumeLimit(number)) return m.reply('🎟️ Limit habis! Ketik *.daily* buat reset.')
        const beasts = ['🐗 Babi Hutan', '🦌 Rusa', '🐊 Buaya', '🦅 Elang', '🐍 Ular']
        const beast = beasts[Math.floor(Math.random() * beasts.length)]
        const xp = 15 + Math.floor(Math.random() * 25)
        addXp(number, xp)
        const meat = Math.floor(Math.random() * 3) + 1
        addItem(number, 'daging', meat)
        return m.reply(`🏹 *HUNT*\n\nBerhasil menangkap ${beast}!\n✨ +${xp} XP\n🥩 +${meat} daging`)
    }

    if (command === 'mine') {
        if (!consumeLimit(number)) return m.reply('🎟️ Limit habis! Ketik *.daily* buat reset.')
        const ores = ['⛏️ Batu Biasa', '🪨 Batu Besi', '🟤 Urinium', '💎 Iritium']
        const ore = ores[Math.floor(Math.random() * ores.length)]
        const xp = 10 + Math.floor(Math.random() * 20)
        addXp(number, xp)
        addItem(number, 'bijih', 1)
        return m.reply(`⛏️ *MINE*\n\nMenambang selesai!\n📦 Dapat : ${ore} x1\n✨ +${xp} XP`)
    }

    if (command === 'sell') {
        const items = getItems(number)
        const sellPrice = { jimat: 400, daging: 100, bijih: 150, kunci: 800, tiket: 1500, ruby: 4000 }
        if (Object.keys(items).length === 0) return m.reply('Tidak ada item untuk dijual.')
        let total = 0
        for (const [name, qty] of Object.entries(items)) {
            const price = sellPrice[name] || 0
            if (price > 0 && takeItem(number, name, qty)) {
                addMoney(number, price * qty)
                total += price * qty
            }
        }
        if (total === 0) return m.reply('Tidak ada item yang bisa dijual.')
        return m.reply(`💰 *JUAL ITEM*\n\nTotal : Rp${total.toLocaleString('id-ID')} masuk ke saldo!`)
    }
}

handler.command = ['adventure', 'explore', 'hunt', 'mine', 'sell']
handler.group = true

export default handler