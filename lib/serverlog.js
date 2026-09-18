// ============================================================
//  SERVERLOG — ring buffer aktivitas chat terbaru
//  • pushChatLog()  : catat tiap pesan yang lewat bot
//  • getChatLog()   : ambil entri terbaru → dipakai dashboard .server
//  Hanya in-memory (ring buffer 20 entri), tanpa file I/O.
// ============================================================

const MAX = 20
const entries = []

function clean(s, max = 80) {
    return String(s ?? '')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max)
}

function wibTime() {
    try {
        return new Date().toLocaleTimeString('id-ID', {
            timeZone: 'Asia/Jakarta',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    } catch {
        return new Date().toLocaleTimeString('id-ID', { hour12: false })
    }
}

export function pushChatLog(entry) {
    try {
        if (!entry) return
        const body = clean(entry.body)
        if (!body) return
        const rec = {
            t: Date.now(),
            time: wibTime(),
            chat: clean(entry.chat),
            sender: String(entry.sender || entry.participant || '').split('@')[0],
            name: clean(entry.pushName, 18),
            isGroup: !!entry.isGroup,
            body,
            isButton: !!entry.isButtonResponse
        }
        entries.push(rec)
        if (entries.length > MAX) entries.splice(0, entries.length - MAX)
    } catch {}
}

// Entri terbaru duluan (reverse)
export function getChatLog() {
    return [...entries].reverse()
}