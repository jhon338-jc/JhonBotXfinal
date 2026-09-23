import { normalizeNumber } from '../handler.js'

const lidBase = j => String(j || '').split('@')[0].split(':')[0]

function groupParticipants(conn, m) {
    const meta = conn?.chats?.[m.chat]?.metadata
    return meta?.participants || []
}

// Menentukan nomor owner yang dimaksud user dari 3 sumber, urut prioritas:
//   1. Angka yang diketik cocok dengan LID participant grup  → resolve ke nomor asli
//   2. Angka valid yang diketik langsung  → dipakai apa adanya (dinormalisasi)
//   3. Reply pesan target  → nomor pengirim pesan yang di-reply (sudah PN dari smsg)
export async function resolveOwnerInput({ conn, m, args = [] }) {
    const digits = String((args || []).join(' ') || '').replace(/[^\d]/g, '')
    const entered = (args || []).length > 0

    if (entered && digits) {
        const p = groupParticipants(conn, m).find(u => lidBase(u.lid) === digits)
        if (p) {
            const pn = normalizeNumber(lidBase(p.id))
            if (/^\d{8,15}$/.test(pn)) return { num: pn, via: 'LID participant' }
        }
    }

    if (entered && digits) {
        const pn = normalizeNumber(digits)
        if (/^\d{8,15}$/.test(pn)) return { num: pn, via: 'nomor' }
    }

    if (m.quoted?.sender) {
        const pn = normalizeNumber(lidBase(m.quoted.sender))
        if (/^\d{8,15}$/.test(pn)) return { num: pn, via: 'reply' }
    }

    return null
}