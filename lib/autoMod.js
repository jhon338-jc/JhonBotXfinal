const spamTracker = new Map()
const linkTracker = new Map()

export function autoMod(conn, m) {
    if (!m.isGroup) return false
    
    const groupId = m.chat
    const sender = m.sender
    
    // Cek spam
    const key = groupId + '_' + sender
    const now = Date.now()
    
    if (!spamTracker.has(key)) {
        spamTracker.set(key, { count: 1, lastMsg: m.text, lastTime: now, warned: false })
        return false
    }
    
    const data = spamTracker.get(key)
    
    // Reset kalau pesan beda atau udah lewat 30 detik
    if (data.lastMsg !== m.text || now - data.lastTime > 30000) {
        spamTracker.set(key, { count: 1, lastMsg: m.text, lastTime: now, warned: data.warned })
        return false
    }
    
    data.count++
    data.lastTime = now
    
    if (data.count >= 10 && !data.warned) {
        data.warned = true
        data.count = 0
        return { type: 'warning', sender, groupId }
    }
    
    if (data.warned && data.count >= 3) {
        data.count = 0
        return { type: 'kick', sender, groupId }
    }
    
    return false
}

export function linkDetector(conn, m) {
    if (!m.isGroup) return false
    
    // Detect semua jenis link
    const linkPatterns = [
        /https?:\/\/[^\s]+/i,           // https://... atau http://...
        /www\.[^\s]+/i,                  // www....
        /[a-z0-9-]+(\.[a-z0-9-]+)+[^\s]*/i,  // domain.com atau sub.domain.com
        /wa\.me\/[^\s]+/i,               // wa.me/xxx
        /chat\.whatsapp\.com\/[^\s]+/i,  // chat.whatsapp.com/xxx
        /t\.me\/[^\s]+/i,                // t.me/xxx
        /instagram\.com\/[^\s]+/i,       // instagram.com/xxx
        /facebook\.com\/[^\s]+/i,        // facebook.com/xxx
        /youtube\.com\/[^\s]+/i,         // youtube.com/xxx
        /youtu\.be\/[^\s]+/i,            // youtu.be/xxx
        /tiktok\.com\/[^\s]+/i,          // tiktok.com/xxx
        /discord\.gg\/[^\s]+/i,          // discord.gg/xxx
        /telegram\.me\/[^\s]+/i          // telegram.me/xxx
    ]
    
    for (const pattern of linkPatterns) {
        if (pattern.test(m.text || '')) {
            return { type: 'link', sender: m.sender, groupId: m.chat }
        }
    }
    
    return false
}
