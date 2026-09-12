import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { rgbTag, COLORS } from '../../lib/rgb.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rolePath = path.join(__dirname, '../../database/role.json')

const readRole = () => JSON.parse(fs.readFileSync(rolePath, 'utf8'))
const writeRole = role => fs.writeFileSync(rolePath, JSON.stringify(role, null, 2))

const daysMs = days => days * 24 * 60 * 60 * 1000

let handler = async (m, { command, args, notifReply }) => {
    const number = m.sender.split('@')[0]
    const role = readRole()

    if (command === 'premium') {
        const myPremium = role.premium?.includes(number) || m.isPremium
        const status = myPremium
            ? '✅ Kamu *Premium aktif*! Semua fitur terbuka.'
            : '❌ Kamu belum Premium.\n\nHubungi owner untuk info upgrade.'
        return m.reply(`👑 *PREMIUM*\n\n${status}`)
    }

    if (command === 'addpremium') {
        if (!m.isCreator) return notifReply('❌ Khusus Creator!', 'Access Denied')
        const target = (args[0] || '').replace(/\D/g, '')
        const days = parseInt(args[1] || '30')
        if (!target) return notifReply('Contoh:\n.addpremium 628xx 30', 'Add Premium')
        role.premium ??= []
        if (role.premium.includes(target)) return notifReply('Nomor sudah Premium.', 'Add Premium')
        role.premium.push(target)
        writeRole(role)
        console.log(rgbTag('PREMIUM', `${target} jadi Premium ${days} hari`, COLORS.success))
        return notifReply(`✅ ${target} sekarang *Premium* (${days} hari).`, 'Add Premium')
    }

    if (command === 'delpremium') {
        if (!m.isCreator) return notifReply('❌ Khusus Creator!', 'Access Denied')
        const target = (args[0] || '').replace(/\D/g, '')
        if (!target) return notifReply('Contoh:\n.delpremium 628xx', 'Del Premium')
        role.premium ??= []
        role.premium = role.premium.filter(n => n !== target)
        writeRole(role)
        return notifReply(`✅ ${target} Premium dicabut.`, 'Del Premium')
    }

    if (command === 'premiumcheck') {
        const q = (args[0] || number).replace(/\D/g, '')
        const isP = role.premium?.includes(q)
        return m.reply(`🔍 *CEK PREMIUM*\n\n+${q}\nStatus : ${isP ? '👑 Premium' : '❌ Bukan Premium'}`)
    }

    void daysMs
}

handler.command = ['premium', 'addpremium', 'delpremium', 'premiumcheck']

export default handler