import { getBalance, addMoney, takeItem, addItem, consumeLimit, getItems } from '../../lib/system.js'

const ITEMS = {
    jimat: { price: 500, desc: 'Jimat keberuntungan (boost RPG)' },
    kunci: { price: 1000, desc: 'Kunci harta karun (di RPG)' },
    tiket: { price: 2000, desc: 'Tiket masuk dungeon' },
    ruby: { price: 5000, desc: 'Batu ruby langka' }
}

let handler = async (m, { command, args }) => {
    const number = m.sender.split('@')[0]

    if (command === 'shop') {
        const list = Object.entries(ITEMS).map(([name, item]) => `• *${name}* — Rp${item.price.toLocaleString('id-ID')}\n  ${item.desc}`).join('\n')
        return m.reply(`🏪 *STORE*\n\n${list}\n\nCara beli:\n.buy <item> [jumlah]\nContoh : .buy jimat 2`)
    }

    if (command === 'buy') {
        const name = (args[0] || '').toLowerCase()
        const qty = Math.max(1, parseInt(args[1] || '1') || 1)
        if (!ITEMS[name]) return m.reply('Item tidak ada. Ketik *.shop* buat lihat daftar.')
        const { money } = getBalance(number)
        const cost = ITEMS[name].price * qty
        if (money < cost) return m.reply(`⚠️ Saldo tidak cukup. Butuh Rp${cost.toLocaleString('id-ID')}, kamu punya Rp${money.toLocaleString('id-ID')}.`)
        if (!consumeLimit(number)) return m.reply('🎟️ Limit habis! Ketik *.daily* buat reset.')
        addMoney(number, -cost)
        addItem(number, name, qty)
        return m.reply(`✅ *PEMBELIAN BERHASIL*\n\n${qty}x ${name} — Rp${cost.toLocaleString('id-ID')}\nGunakan di RPG: .inventory`)
    }

    if (command === 'inventory') {
        const items = getItems(number)
        if (Object.keys(items).length === 0) return m.reply('🎒 Inventory kosong. Belanja di *.shop*.')
        const list = Object.entries(items).map(([n, q]) => `• ${n} x${q}`).join('\n')
        return m.reply(`🎒 *INVENTORY*\n\n${list}`)
    }
}

handler.command = ['shop', 'buy', 'inventory']
handler.group = true

export default handler