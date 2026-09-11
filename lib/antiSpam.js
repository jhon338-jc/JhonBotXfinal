const spamData = new Map()

export function antiSpam(m, limit = 5, cooldown = 10) {
    const sender = m.sender
    const now = Date.now()
    
    if (!spamData.has(sender)) {
        spamData.set(sender, { count: 1, lastReset: now })
        return false
    }
    
    const data = spamData.get(sender)
    
    if (now - data.lastReset > cooldown * 1000) {
        spamData.set(sender, { count: 1, lastReset: now })
        return false
    }
    
    data.count++
    
    if (data.count > limit) {
        return true
    }
    
    return false
}

export function getSpamData() {
    return spamData
}
