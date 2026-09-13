import { log, COLORS } from './rgb.js'

const WARN_AT = 8
const KICK_AT = 10
const PREMIUM_WARN_AT = 25
const PREMIUM_LIMIT = 30
const PRUNE_AT = 5000
const STALE_MS = 15 * 60 * 1000

const state = new Map()

function keyOf(groupJid, senderJid) {
    return String(groupJid) + '::' + String(senderJid)
}

function normalize(text = '') {
    return String(text).replace(/\s+/g, ' ').trim()
}

function dayKey(ts = Date.now()) {
    const d = new Date(ts)
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}

function pruneStale(now = Date.now()) {
    if (state.size < PRUNE_AT) return
    for (const [k, v] of state) {
        if (now - (v.lastAt || 0) > STALE_MS) state.delete(k)
    }
}

function contactName(conn, jid, m) {
    return conn?.contacts?.[jid]?.name || conn?.contacts?.[jid]?.notify || m?.pushName || m?.name || 'Member'
}

export async function runAntiSpam({ conn, m, body }) {
    if (!m?.isGroup || !m?.chat || !m?.sender) return false
    if (m.fromMe || m.isOwner || m.isAdmin) return false

    const norm = normalize(body)
    if (!norm) return false

    const now = Date.now()
    pruneStale(now)
    const key = keyOf(m.chat, m.sender)
    const prev = state.get(key)
    const today = dayKey(now)
    const isPrem = !!m.isPremium

    let rec
    if (prev && prev.text === norm && prev.day === today) {
        rec = { ...prev, count: prev.count + 1, lastAt: now }
    } else {
        rec = { text: norm, count: 1, warned: false, kicked: false, blocked: false, day: today, lastAt: now }
    }
    state.set(key, rec)

    if (rec.kicked) return true

    const name = contactName(conn, m.sender, m)

    // ============ PREMIUM: kuota 30 pesan sama per hari ============
    if (isPrem) {
        if (!rec.warned && rec.count >= PREMIUM_WARN_AT && rec.count <= PREMIUM_LIMIT) {
            rec.warned = true
            const left = PREMIUM_LIMIT - rec.count
            try {
                await conn.sendMessage(m.chat, {
                    text: `⚠️ *BATAS SPAM PREMIUM*\n\n@${m.sender.split('@')[0]} pesan yang sama terdeteksi *${rec.count}x*.\n\n⭐ Kuota premium kamu tinggal *${left}x* lagi hari ini (maks *${PREMIUM_LIMIT}x* per hari).\nSetelah mencapai batas, kamu tidak bisa mengirim pesan yang sama lagi.`,
                    mentions: [m.sender]
                }, { quoted: m })
            } catch (e) {
                console.error(log('ANTISPAM', 'Gagal kirim peringatan premium: ' + (e?.message || e), COLORS.error))
            }
            return false
        }
        if (rec.count > PREMIUM_LIMIT) {
            if (!rec.blocked) {
                rec.blocked = true
                try {
                    await conn.sendMessage(m.chat, {
                        text: `🚫 *BATAS SPAM PREMIUM TERCAPAI*\n\n@${m.sender.split('@')[0]} kamu sudah mengirim pesan yang sama *${rec.count}x*.\n\n⭐ Kuota harian *${PREMIUM_LIMIT}x* sudah habis, untuk pesan ini tidak bisa dikirim lagi hari ini.\n🔄 Kuota akan reset otomatis besok hari.`,
                        mentions: [m.sender]
                    }, { quoted: m })
                } catch (e) {
                    console.error(log('ANTISPAM', 'Gagal kirim notif batas premium: ' + (e?.message || e), COLORS.error))
                }
            }
            return true
        }
        return false
    }

    // ============ USER BIASA: peringatan 8x, kick 10x ============
    if (!rec.warned && rec.count >= WARN_AT && rec.count <= KICK_AT) {
        rec.warned = true
        const left = KICK_AT - rec.count
        try {
            await conn.sendMessage(m.chat, {
                text: `⚠️ *PERINGATAN ANTI-SPAM*\n\n@${m.sender.split('@')[0]} kamu mengirim pesan yang sama!\n\n✅ Pesan sama terdeteksi *${rec.count}x*.\n🚫 Sisa ${left}x sebelum kamu dikeluarkan dari grup.\n\nMohon jangan spam pesan yang sama. 🙏`,
                mentions: [m.sender]
            }, { quoted: m })
        } catch (e) {
            console.error(log('ANTISPAM', 'Gagal kirim peringatan: ' + (e?.message || e), COLORS.error))
        }
        return false
    }

    if (!rec.kicked && rec.count > KICK_AT) {
        rec.kicked = true
        try {
            if (m.isBotAdmin) {
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                await conn.sendMessage(m.chat, {
                    text: `🚫 *ANTI-SPAM*\n\n@${m.sender.split('@')[0]} *${name}* dikeluarkan dari grup karena spam pesan yang sama *${rec.count}x*.\n\nJaga etika ya, jangan spam. 🙏`,
                    mentions: [m.sender]
                })
            } else {
                await conn.sendMessage(m.chat, {
                    text: `🚫 *PERINGATAN ANTI-SPAM*\n\n@${m.sender.split('@')[0]} *${name}* spam pesan yang sama *${rec.count}x*.\n\n⚠️ Bot bukan admin, jadi tidak bisa kick otomatis.\n👑 Owner/Admin grup harap segera menindaklanjuti.`,
                    mentions: [m.sender]
                })
            }
        } catch (e) {
            console.error(log('ANTISPAM', 'Gagal kick ' + m.sender + ': ' + (e?.message || e), COLORS.error))
            if (m.isBotAdmin) {
                await conn.sendMessage(m.chat, {
                    text: `🚫 Ada spammer terdeteksi *${rec.count}x*.\n⚠️ Gagal kick otomatis, admin harap tindak lanjut.`
                }).catch(() => {})
            }
        }
        return true
    }

    return false
}

export function resetAntiSpam(group, sender = '') {
    if (sender) state.delete(keyOf(group, sender))
    else for (const k of [...state.keys()]) if (k.startsWith(String(group) + '::')) state.delete(k)
}