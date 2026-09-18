function css() {
    return '<style>*{-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;box-sizing:border-box}' +
        'body{margin:0;background:linear-gradient(160deg,#0f1023,#1a1b2e 55%,#26264a);color:#eee;font-family:Arial,sans-serif;touch-action:manipulation;padding:14px}' +
        '.wrap{max-width:640px;margin:auto}' +
        '.hd{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px 14px;margin-bottom:12px}' +
        '.ic{font-size:26px}.ht1{font-size:16px;font-weight:bold;color:#fff}.ht2{font-size:10px;color:rgba(255,255,255,.5);letter-spacing:1.5px}' +
        '.stage{width:100%;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);display:block;touch-action:manipulation}' +
        '.btn{display:inline-block;margin:4px;padding:10px 18px;border:0;border-radius:10px;color:#fff;font-size:13px;font-weight:bold;cursor:pointer}' +
        '.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}' +
        '.stat{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}' +
        '.chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px 10px;font-size:11px}' +
        '.big{font-size:15px;font-weight:bold;color:#fff}' +
        '.muted{font-size:11px;color:rgba(255,255,255,.55)}' +
        '</style>'
}

export function shell({ title = 'AI Rich', tag = 'AI RICH', icon = '✨', html = '', script = '' } = {}) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">' +
        css() +
        '</head><body><div class="wrap">' +
        '<div class="hd"><div class="ic">' + icon + '</div><div><div class="ht1">' + title + '</div><div class="ht2">' + tag + '</div></div></div>' +
        html +
        '</div><script>' + script + '</script></body></html>'
}

export function stage(w, h) {
    return '<canvas id="game" class="stage" width="' + w + '" height="' + h + '" style="height:auto"></canvas>'
}

export async function sendAiRich(conn, jid, html, opts = {}) {
    const { title = 'AI Rich', resetChatSession = false } = opts
    const message = {
        richMessage: {
            title,
            html
        },
        ...(resetChatSession ? { ai: true } : {})
    }
    return conn.sendMessage(jid, message, {})
}