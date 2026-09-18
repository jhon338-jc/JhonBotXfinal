import fs from 'fs'
import path from 'path'

// ============================================================
//  SERVERBOARD — builder HTML dashboard AiRich (.server)
//  • Semua generate tampilan dashboard (tema hitam-putih-biru)
//  • Musik lokal di-embed jadi data URI (base64) → bisa diputar
//    offline tanpa jaringan
//  • Galeri gambar (tanpa video)
//  • Daftar perintah per kategori (satu baris per perintah)
//  • Tombol aksi yang berfungsi (buka/tutup/salin/tema)
// ============================================================

const esc = s => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export function fmtBytes(n) {
    const u = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    let v = Number(n) || 0
    while (v >= 1024 && i < u.length - 1) { v /= 1024; i++ }
    return (i === 0 ? Math.round(v) : v.toFixed(1)) + ' ' + u[i]
}

// ==================== MUSIK LOKAL (src/audio/*.mp3) ====================
const AUDIO_MAX_FILE = 4.5 * 1024 * 1024     // maks per lagu (raw bytes) — lewat ini dilewati
const AUDIO_MAX_TOTAL = 10 * 1024 * 1024     // budget total audio (base64 bytes)

export function loadSongs(dir, onLog) {
    const songs = []
    if (!dir) return songs
    let files = []
    try {
        files = fs.readdirSync(dir).filter(f => /\.mp3$/i.test(f)).sort()
    } catch {
        return songs
    }
    if (!files.length) return songs
    let budget = AUDIO_MAX_TOTAL
    for (const f of files) {
        const full = path.join(dir, f)
        let size = 0
        try { size = fs.statSync(full).size } catch { continue }
        if (size <= 0) continue
        if (size > AUDIO_MAX_FILE) {
            if (onLog) onLog('LEWATKAN "' + f + '" (' + fmtBytes(size) + ') — melebihi ' + fmtBytes(AUDIO_MAX_FILE) + ' per lagu', 'warn')
            continue
        }
        let b64 = ''
        try { b64 = fs.readFileSync(full).toString('base64') } catch { continue }
        if (b64.length > budget) {
            if (onLog) onLog('LEWATKAN "' + f + '" — melebihi budget total audio', 'warn')
            continue
        }
        budget -= b64.length
        songs.push({ title: f.replace(/\.mp3$/i, ''), url: 'data:audio/mpeg;base64,' + b64 })
        if (onLog) onLog('Musik dimuat: "' + f + '" (' + fmtBytes(size) + ')', 'info')
    }
    return songs
}

// ==================== SUMBER DATA ====================
const GALLERY = [
    { title: 'JhonBotXfinal Studio', url: 'https://picsum.photos/seed/jhonbot1/420/280' },
    { title: 'Neon City', url: 'https://picsum.photos/seed/jhonbot2/420/280' },
    { title: 'Blue Horizon', url: 'https://picsum.photos/seed/jhonbot3/420/280' }
]

const CATS_CMD = [
    { cat: 'OWNER', rows: [
        ['add', 'Tambah member grup'], ['addprem', 'Aktifkan premium'], ['delprem', 'Hapus premium'],
        ['premlist', 'Daftar premium'], ['on', 'Aktifkan bot di grup'], ['off', 'Matikan bot di grup'], ['hapuschat', 'Hapus pesan bot'],
        ['htg', 'Hidetag member'], ['info', 'Info bot & versi'], ['kick', 'Kick member grup'],
        ['menu', 'Menu utama'], ['ownadd', 'Tambah owner'], ['owndel', 'Hapus owner'],
        ['ownlist', 'Daftar owner'], ['ping', 'Cek respon bot'], ['setds', 'Ubah deskripsi grup'],
        ['setnm', 'Ubah nama grup'], ['setpp', 'Ubah foto grup'], ['ui', 'Preview semua UI']
    ]},
    { cat: 'AIRICH (PREMIUM)', rows: [
        ['server', 'Dashboard command center'], ['snake', 'Game snake interaktif']
    ]},
    { cat: 'PREMIUM', rows: [
        ['premium', 'Menu langganan premium']
    ]},
    { cat: 'GRUP', rows: [
        ['poll', 'Buat polling grup'], ['daftar', 'Daftar member bot']
    ]},
    { cat: 'MAKER', rows: [
        ['brat', 'Stiker BRAT dari teks'], ['iqc', 'Generate gambar IQC'], ['img', 'Stiker dari foto/video']
    ]},
    { cat: 'TOOLS', rows: [
        ['toimg', 'Stiker jadi gambar'], ['rvo', 'Buka pesan view once'], ['lirik', 'Cari lirik lagu']
    ]},
    { cat: 'DOWNLOAD', rows: [
        ['donlodall', 'Download TikTok, IG, dan lainnya']
    ]},
    { cat: 'ASUPAN (PREMIUM)', rows: [
        ['asp', 'Asupan random'], ['ccn', 'Cecan random'], ['pap', 'Pap random'],
        ['paptt', 'Pap TT random'], ['papmmk', 'Pap MMK random'], ['papbgl', 'Pap BGL random']
    ]},
    { cat: 'USER', rows: [
        ['daftar', 'Daftar jadi member bot'], ['premium', 'Cek & beli paket premium']
    ]}
]

const WMO = {
    0: { i: '☀️', t: 'Cerah' }, 1: { i: '🌤️', t: 'Cerah Berawan' }, 2: { i: '⛅', t: 'Sedikit Berawan' },
    3: { i: '☁️', t: 'Mendung' }, 45: { i: '🌫️', t: 'Berkabut' }, 48: { i: '🌫️', t: 'Kabut Beku' },
    51: { i: '🌦️', t: 'Gerimis' }, 53: { i: '🌦️', t: 'Gerimis' }, 55: { i: '🌧️', t: 'Gerimis' },
    56: { i: '🌧️', t: 'Gerimis Beku' }, 57: { i: '🌧️', t: 'Gerimis Beku' },
    61: { i: '🌧️', t: 'Hujan Ringan' }, 63: { i: '🌧️', t: 'Hujan' }, 65: { i: '⛈️', t: 'Hujan Lebat' },
    66: { i: '🌧️', t: 'Hujan Beku' }, 67: { i: '🌧️', t: 'Hujan Beku' },
    71: { i: '🌨️', t: 'Salju Ringan' }, 73: { i: '🌨️', t: 'Salju' }, 75: { i: '❄️', t: 'Salju Lebat' },
    77: { i: '❄️', t: 'Butiran Salju' },
    80: { i: '🌧️', t: 'Hujan Badai' }, 81: { i: '🌧️', t: 'Hujan Badai' }, 82: { i: '⛈️', t: 'Hujan Badai' },
    85: { i: '🌨️', t: 'Hujan Salju' }, 86: { i: '🌨️', t: 'Hujan Salju' },
    95: { i: '⛈️', t: 'Badai Petir' }, 96: { i: '⛈️', t: 'Badai + Hujan Es' }, 99: { i: '⛈️', t: 'Badai + Hujan Es' }
}

export function weatherInfo(code) {
    return WMO[code] || { i: '🌤️', t: 'Berawan' }
}

// ==================== RENDER SEKSI ====================
function weatherHTML(w) {
    if (!w) {
        return '<div class="panel sec open" id="secWea"><div class="sechead"><span>🌦️</span> CUACA</div>' +
            '<div class="mut" style="text-align:center;padding:10px">Data cuaca tidak tersedia saat ini (offline).</div></div>'
    }
    return '<div class="panel sec open" id="secWea"><div class="sechead"><span>🌦️</span> CUACA · ' + esc(w.city) + '</div>' +
        '<div class="wx"><div class="wxicon">' + w.icon + '</div>' +
        '<div class="wxn"><div class="wxtemp">' + w.temp + '°C</div>' +
        '<div class="mut">' + esc(w.cond) + ' · terasa ' + w.feel + '°C</div></div></div>' +
        '<div class="wxmeta">' +
        '<span class="chip">💧 Kelembapan ' + w.hum + '%</span>' +
        '<span class="chip">🌬️ Angin ' + w.wind + ' km/h</span>' +
        '<span class="chip">🕑 ' + esc(w.time) + '</span></div></div>'
}

function logHTML(logs) {
    if (!logs || !logs.length) {
        return '<div class="panel sec open" id="secLog"><div class="sechead"><span>📜</span> LOG CHAT</div>' +
            '<div class="mut" style="text-align:center;padding:10px">Belum ada aktivitas chat tercatat.</div></div>'
    }
    const items = logs.map(l => {
        const tag = l.isGroup ? '👥' : '💬'
        const who = esc(l.name || ('+' + l.sender))
        const chatId = l.isGroup ? '#' + String(l.chat).split('@')[0].slice(-5) : '+62'
        return '<div class="li"><span class="lt">' + esc(l.time) + '</span>' +
            '<span class="lchip">' + (l.isButton ? '🔘' : tag) + '</span>' +
            '<span class="lname">' + who + '</span>' +
            '<span class="lchat">' + chatId + '</span>' +
            '<span class="lbody">' + esc(l.body) + '</span></div>'
    }).join('')
    return '<div class="panel sec open" id="secLog"><div class="sechead"><span>📜</span> LOG CHAT · TERBARU</div>' +
        '<div class="log">' + items + '</div></div>'
}

function musicHTML(songs) {
    let body
    if (!songs || !songs.length) {
        body = '<div class="mut" style="text-align:center;padding:12px">Belum ada lagu.<br>' +
            'Taruh file <b>MP3</b> di folder <b>src/audio/</b> lalu jalankan <b>.server</b> lagi.</div>'
    } else {
        body = '<div class="eq" id="eqBox"><span></span><span></span><span></span><span></span><span></span></div>' +
            '<div id="songName" class="song">Memuat…</div>' +
            '<audio id="aud" preload="none"></audio>' +
            '<div class="mprog" id="mpw"><div class="mprogbar" id="mprog"></div></div>' +
            '<div class="mtim"><span id="mcur">0:00</span><span id="mtot">0:00</span></div>' +
            '<div class="mctl">' +
            '<button class="btn b2" onclick="prevSong()">⏮</button>' +
            '<button class="btn b1" id="pb" onclick="togglePlay()">▶ PUTAR</button>' +
            '<button class="btn b2" onclick="nextSong()">⏭</button>' +
            '<button class="btn b3" onclick="loop(this)">🔁 ULANG</button>' +
            '</div>' +
            '<div class="mvol"><span>🔊</span><input id="mvol" type="range" min="0" max="100" value="80" oninput="vol(this.value)"></div>' +
            '<div class="mut" style="text-align:center;margin-top:6px">' + songs.length + ' lagu dari src/audio/ · ketuk ▶ untuk memutar</div>'
    }
    return '<div class="panel sec open" id="secMus"><div class="sechead"><span>🎵</span> MUSIC PLAYER</div>' + body + '</div>'
}

function galleryHTML() {
    const imgs = GALLERY.map(g =>
        '<figure class="gal"><span class="ph">🖼️</span><img src="' + esc(g.url) + '" alt="' + esc(g.title) + '" loading="lazy" onerror="this.style.display=\'none\'"><figcaption>' + esc(g.title) + '</figcaption></figure>'
    ).join('')
    return '<div class="panel sec open" id="secGal"><div class="sechead"><span>🖼️</span> GALERI MEDIA</div>' +
        '<div class="galrow">' + imgs + '</div>' +
        '<div class="mut" style="text-align:center">Geser galeri untuk melihat gambar lain</div></div>'
}

function cmdsHTML() {
    let out = '<div class="panel" id="cmdB"><div class="sechead"><span>🧩</span> DAFTAR PERINTAH · ' +
        CATS_CMD.reduce((a, c) => a + c.rows.length, 0) + ' PERINTAH · KETUK UNTUK SALIN</div>'
    for (const c of CATS_CMD) {
        out += '<div class="cat">' + esc(c.cat) + '</div>'
        for (const [cmd, desc] of c.rows) {
            out += '<div class="cmd" data-c=".' + cmd + '"><b>.' + cmd + '</b>' +
                '<span class="cdesc">– ' + esc(desc) + '</span><span class="cmdcp">📋</span></div>'
        }
    }
    return out + '</div>'
}

export function buildServerHTML(ds) {
    const w = ds.weather
    const cpuDonut = 'background:conic-gradient(#3b82f6 0 ' + ds.cpu + '%,rgba(255,255,255,.08) ' + ds.cpu + '% 100%)'
    const ramPct = Math.min(100, ds.ram.pct)
    const loadPct = Math.min(100, Math.round((ds.load / (ds.cpuCount || 1)) * 100))
    const songs = ds.sdk.songs || []

    return '<!DOCTYPE html>' +
        '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">' +
        '<style>' +
        '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-webkit-touch-callout:none;user-select:none}' +
        'body{margin:0;padding:14px;background:linear-gradient(160deg,#0a0a0f,#111827 55%,#1e293b);background-attachment:fixed;font-family:Arial,Helvetica,sans-serif;touch-action:manipulation}' +
        'body.light{background:linear-gradient(160deg,#f8fafc,#e2e8f0 55%,#cbd5e1)}' +
        '.wrap{max-width:640px;margin:0 auto}' +
        '.panel{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;margin-top:12px}' +
        'body.light .panel{background:rgba(255,255,255,.8);border-color:rgba(15,23,42,.15)}' +
        '.hd{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px 14px}' +
        'body.light .hd{background:#fff;border-color:rgba(15,23,42,.15)}' +
        '.lg{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;flex:none}' +
        '.hd .t1{font-size:15px;font-weight:800;color:#fff;line-height:1.2}.hd .t2{font-size:10px;letter-spacing:1.5px;color:rgba(255,255,255,.5)}' +
        'body.light .hd .t1{color:#0f172a}body.light .hd .t2{color:#475569}' +
        '.led{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;animation:pl 1.4s infinite}' +
        '@keyframes pl{0%,100%{opacity:1}50%{opacity:.25}}' +
        '.clock{text-align:center;margin-top:12px;padding:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px}' +
        '.clock b{font-size:26px;color:#fff;letter-spacing:2px}body.light .clock b{color:#0f172a}' +
        '.mut{color:rgba(255,255,255,.55);font-size:11px;line-height:1.5}body.light .mut{color:#475569}' +
        '.cards{display:flex;gap:10px;margin-top:12px}' +
        '.card{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;text-align:center}' +
        'body.light .card{background:#fff;border-color:rgba(15,23,42,.15)}' +
        '.card .clb{font-size:10px;letter-spacing:1px;color:rgba(255,255,255,.5)}body.light .card .clb{color:#475569}' +
        '.card .cv{font-size:22px;font-weight:800;color:#fff;margin:4px 0}body.light .card .cv{color:#0f172a}' +
        '.card .cs{font-size:10px;color:#60a5fa}' +
        '.donut{width:64px;height:64px;border-radius:50%;margin:4px auto;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff}' +
        'body.light .donut{color:#0f172a}' +
        '.sechead{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:800;letter-spacing:1px;color:#fff;margin-bottom:10px}' +
        'body.light .sechead{color:#0f172a}' +
        '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
        '.cell{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px}' +
        'body.light .cell{background:#fff;border-color:rgba(15,23,42,.12)}' +
        '.cell .cl{font-size:10px;color:rgba(255,255,255,.5)}body.light .cell .cl{color:#475569}' +
        '.cell .cv{font-size:18px;font-weight:800;color:#3b82f6}' +
        '.bar{height:8px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden;margin-top:6px;position:relative}' +
        'body.light .bar{background:rgba(15,23,42,.1)}' +
        '.barin{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#2563eb,#60a5fa);transition:width 1s ease}' +
        '.txt2{margin-top:10px}' +
        '.ln{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:rgba(255,255,255,.75);padding:5px 0;border-bottom:1px dashed rgba(255,255,255,.08)}' +
        'body.light .ln{color:#334155;border-color:rgba(15,23,42,.1)}.ln b{color:#fff}body.light .ln b{color:#0f172a}' +
        '.cat{font-size:10px;font-weight:800;letter-spacing:1px;color:#60a5fa;margin:12px 0 4px;text-transform:uppercase}' +
        'body.light .cat{color:#1d4ed8}' +
        '.cmd{display:flex;align-items:center;gap:8px;font-size:12px;padding:8px 10px;border-radius:8px;cursor:pointer;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);margin-top:4px}' +
        'body.light .cmd{background:#fff;border-color:rgba(15,23,42,.12)}' +
        '.cmd b{color:#fff}body.light .cmd b{color:#0f172a}' +
        '.cdesc{flex:1;color:rgba(255,255,255,.55);font-size:11px}body.light .cdesc{color:#475569}' +
        '.cmdcp{color:rgba(255,255,255,.4);font-size:11px}body.light .cmdcp{color:#94a3b8}' +
        '.wx{display:flex;align-items:center;gap:12px}.wxicon{font-size:44px}' +
        '.wxtemp{font-size:26px;font-weight:800;color:#fff}body.light .wxtemp{color:#0f172a}' +
        '.wxmeta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}' +
        '.chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:4px 10px;font-size:11px;color:rgba(255,255,255,.8)}' +
        'body.light .chip{background:#fff;border-color:rgba(15,23,42,.12);color:#334155}' +
        '.log{display:flex;flex-direction:column;gap:6px;max-height:280px;overflow:auto}' +
        '.li{display:flex;align-items:center;gap:6px;font-size:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:6px 8px;flex-wrap:wrap}' +
        'body.light .li{background:#fff;border-color:rgba(15,23,42,.1)}' +
        '.lt{color:#60a5fa;font-weight:700;white-space:nowrap}' +
        '.lchip{background:rgba(59,130,246,.18);border:1px solid rgba(59,130,246,.35);color:#93c5fd;border-radius:99px;padding:1px 7px;font-size:10px}' +
        'body.light .lchip{color:#1d4ed8}' +
        '.lname{color:#fff;font-weight:700}body.light .lname{color:#0f172a}' +
        '.lchat{color:rgba(255,255,255,.4);font-size:10px}body.light .lchat{color:#64748b}' +
        '.lbody{flex:1 1 100%;color:rgba(255,255,255,.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}' +
        'body.light .lbody{color:#475569}' +
        '.eq{display:flex;align-items:flex-end;gap:4px;height:34px;margin:4px 0;justify-content:center}' +
        '.eq span{width:5px;background:linear-gradient(180deg,#3b82f6,#60a5fa);border-radius:2px;animation:eq 1s ease-in-out infinite;animation-play-state:paused}' +
        '.eq.on span{animation-play-state:running}' +
        '.eq span:nth-child(1){height:26%}.eq span:nth-child(2){height:62%;animation-delay:.15s}' +
        '.eq span:nth-child(3){height:40%;animation-delay:.3s}.eq span:nth-child(4){height:74%;animation-delay:.45s}' +
        '.eq span:nth-child(5){height:30%;animation-delay:.6s}' +
        '@keyframes eq{0%,100%{height:20%}50%{height:85%}}' +
        '.song{text-align:center;font-size:13px;font-weight:700;color:#fff;margin:4px 0}body.light .song{color:#0f172a}' +
        '.mprog{height:6px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden;position:relative;cursor:pointer}' +
        'body.light .mprog{background:rgba(15,23,42,.12)}' +
        '.mprogbar{height:100%;width:0;background:linear-gradient(90deg,#2563eb,#60a5fa);border-radius:99px}' +
        '.mtim{display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.5);margin-top:3px}' +
        'body.light .mtim{color:#64748b}' +
        '.mctl{display:flex;gap:8px;justify-content:center;margin-top:10px}' +
        '.mvol{display:flex;align-items:center;gap:8px;margin-top:8px}.mvol input{flex:1;accent-color:#3b82f6}' +
        '.galrow{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}' +
        '.gal{position:relative;flex:none;width:150px;height:112px;border-radius:10px;overflow:hidden;margin:0;border:1px solid rgba(255,255,255,.12)}' +
        '.ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;background:rgba(255,255,255,.05)}' +
        '.gal img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;display:block;border-radius:10px}' +
        '.gal figcaption{position:absolute;left:0;right:0;bottom:0;z-index:2;font-size:9px;padding:3px 6px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.7));text-align:center}' +
        '.acts{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px}' +
        '.btn{border:0;border-radius:10px;color:#fff;font-size:12px;font-weight:800;padding:10px 14px;cursor:pointer;letter-spacing:.5px}' +
        '.b1{background:linear-gradient(135deg,#2563eb,#3b82f6)}' +
        '.b2{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2)}body.light .b2{background:#e2e8f0;color:#0f172a}' +
        '.b3{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}body.light .b3{background:#fff;color:#0f172a;border-color:rgba(15,23,42,.15)}' +
        '.sec{display:none}.sec.open{display:block}' +
        '.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#2563eb;color:#fff;font-size:12px;font-weight:700;padding:9px 18px;border-radius:99px;opacity:0;pointer-events:none;transition:all .25s;box-shadow:0 8px 24px rgba(37,99,235,.4);z-index:99}' +
        '.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}' +
        '.ft{margin-top:16px;text-align:center;font-size:10px;color:rgba(255,255,255,.35)}body.light .ft{color:#64748b}' +
        '</style></head>' +
        '<body><div class="wrap">'

        // Build: I'll return a chained string in one concat expression below.
        + '<div class="hd"><div class="lg">🤖</div>' +
        '<div style="flex:1"><div class="t1">JHONXFINAL COMMAND CENTER</div><div class="t2">' + esc(ds.ver.toUpperCase()) + ' · AI RICH SERVER</div></div>' +
        '<span class="led"></span></div>' +
        '<div class="clock"><div id="tl"><b>--:--:--</b></div><div class="mut" id="dt"></div></div>' +
        '<div class="cards">' +
        '<div class="card"><div class="clb">RAM</div><div class="cv">' + ds.ram.pct + '%</div><div class="cs">' + ds.ram.usedFmt + ' / ' + ds.ram.totalFmt + '</div></div>' +
        '<div class="card"><div class="clb">CPU</div><div class="donut" style="' + cpuDonut + '">' + ds.cpu + '%</div></div>' +
        '<div class="card"><div class="clb">UPTIME</div><div class="cv" id="upT">' + ds.uptimeFmt + '</div><div class="cs">Sistem: ' + ds.sysUp + '</div></div>' +
        '</div>' +

        '<div class="panel sec open" id="secInfo">' +
        '<div class="sechead"><span>📊</span> SYSTEM &amp; BOT INFO</div>' +
        '<div class="mut">RAM</div>' +
        '<div class="bar"><div class="barin" id="ramBar" data-w="' + ramPct + '"></div></div>' +
        '<div class="txt2"><div class="mut">CPU · beban rata-rata (load avg 1 menit)</div>' +
        '<div class="bar"><div class="barin" id="cpuBar" data-w="' + loadPct + '"></div></div></div>' +
        '<div class="txt2">' +
        '<div class="ln"><span>PEMAKAIAN RAM</span><b>' + ds.ram.usedFmt + ' / ' + ds.ram.totalFmt + ' (' + ds.ram.pct + '%)</b></div>' +
        '<div class="ln"><span>NODE.JS</span><b>' + esc(ds.node) + '</b></div>' +
        '<div class="ln"><span>PLATFORM</span><b>' + esc(ds.plat) + '</b></div>' +
        '<div class="ln"><span>HOST</span><b>' + esc(ds.host) + '</b></div>' +
        '<div class="ln"><span>PROCESS ID</span><b>' + ds.pid + '</b></div>' +
        '</div></div>' +

        '<div class="panel sec open" id="secBot">' +
        '<div class="sechead"><span>🤖</span> BOT STATUS</div>' +
        '<div class="grid">' +
        '<div class="cell"><div class="cl">PLUGINS</div><div class="cv">' + ds.plugins + '</div></div>' +
        '<div class="cell"><div class="cl">GRUP OFF</div><div class="cv">' + ds.groups + '</div></div>' +
        '<div class="cell"><div class="cl">MEMBER</div><div class="cv">' + ds.members + '</div></div>' +
        '<div class="cell"><div class="cl">PREMIUM AKTIF</div><div class="cv">' + ds.premium + '</div></div>' +
        '<div class="cell"><div class="cl">OWNER</div><div class="cv">' + ds.owners + '</div></div>' +
        '<div class="cell"><div class="cl">MODE</div><div class="cv">' + esc(ds.mode.toUpperCase()) + '</div></div>' +
        '</div>' +
        '<div class="txt2">' +
        '<div class="ln"><span>BOT</span><b>' + esc(ds.bot) + ' ' + esc(ds.ver) + '</b></div>' +
        '<div class="ln"><span>OWNER</span><b>' + esc(ds.owner) + '</b></div>' +
        '<div class="ln"><span>PREFIX</span><b>' + esc(ds.prefix) + '</b></div>' +
        '<div class="ln"><span>TOTAL LANGGANAN PREMIUM</span><b>' + ds.premiumTotal + '</b></div>' +
        '<div class="ln"><span>TANGGAL</span><b>' + esc(ds.created) + '</b></div>' +
        '</div></div>' +

        weatherHTML(w) + logHTML(ds.log) + musicHTML(songs) + galleryHTML() + cmdsHTML() +

        '<div class="acts">' +
        '<button class="btn b1" id="ib" data-on="📊 TUTUP INFO" data-off="📊 BUKA INFO" onclick="tog(\'secInfo\',\'ib\')">📊 INFO</button>' +
        '<button class="btn b1" id="bb" data-on="🤖 TUTUP BOT" data-off="🤖 BUKA BOT" onclick="tog(\'secBot\',\'bb\')">🤖 BOT</button>' +
        '<button class="btn b1" id="wb" data-on="🌦️ TUTUP CUACA" data-off="🌦️ BUKA CUACA" onclick="tog(\'secWea\',\'wb\')">🌦️ CUACA</button>' +
        '<button class="btn b1" id="lb" data-on="📜 TUTUP LOG" data-off="📜 BUKA LOG" onclick="tog(\'secLog\',\'lb\')">📜 LOG</button>' +
        '<button class="btn b1" id="mb" data-on="🎵 TUTUP MUSIK" data-off="🎵 BUKA MUSIK" onclick="tog(\'secMus\',\'mb\')">🎵 MUSIK</button>' +
        '<button class="btn b1" id="gb" data-on="🖼️ TUTUP GALERI" data-off="🖼️ BUKA GALERI" onclick="tog(\'secGal\',\'gb\')">🖼️ GALERI</button>' +
        '</div>' +
        '<div class="acts" style="margin-top:8px">' +
        '<button class="btn b2" onclick="cp(D.link);toast(\'Linktree tersalin ✓\')">🔗 LINKTREE</button>' +
        '<button class="btn b2" onclick="cp(D.ver);toast(\'Versi tersalin ✓\')">📋 VERSI</button>' +
        '<button class="btn b3" id="thb" onclick="theme()">🌗 MODE PUTIH</button>' +
        '<button class="btn b3" id="selAll" onclick="allTog()">⬇ TUTUP SEMUA</button>' +
        '</div>' +

        '<div class="ft">DEVELOPER BY ' + esc(ds.owner.toUpperCase()) + ' · POWERED BY BAILEYS · WIB</div>' +
        '</div>' +
        '<div class="toast" id="toast"></div>' +
        '<script>' +
        'var D=' + JSON.stringify(ds.sdk) + '||{};' +
        'var tz=D.tz||0;' +
        'function pad(n){return (n<10?\'0\':\'\')+n}' +
        'function wibD(now){return new Date(now+tz*1000)}' +
        'function tic(){' +
        'var d=wibD(Date.now()),el=document.getElementById(\'tl\');' +
        'var days=[\'Minggu\',\'Senin\',\'Selasa\',\'Rabu\',\'Kamis\',\'Jumat\',\'Sabtu\'];' +
        'var mon=[\'Januari\',\'Februari\',\'Maret\',\'April\',\'Mei\',\'Juni\',\'Juli\',\'Agustus\',\'September\',\'Oktober\',\'November\',\'Desember\'];' +
        'if(el)el.innerHTML=\'<b>\'+pad(d.getUTCHours())+\':\'+pad(d.getUTCMinutes())+\':\'+pad(d.getUTCSeconds())+\'</b>\';' +
        'var dt=document.getElementById(\'dt\');' +
        'if(dt)dt.textContent=days[d.getUTCDay()]+\', \'+d.getUTCDate()+\' \'+mon[d.getUTCMonth()]+\' \'+d.getUTCFullYear()+\' WIB\';' +
        '}' +
        'setInterval(tic,1000);tic();' +
        'function fmtUp(s){s=Math.floor(s||0);var d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60),c=s%60;return ((d>0)?(d+\'d \'):\'\')+pad(h)+\':\'+pad(m)+\':\'+pad(c)}' +
        'var up=D.uptime||0;' +
        'setInterval(function(){up++;var e=document.getElementById(\'upT\');if(e)e.textContent=fmtUp(up)},1000);' +
        'function tog(id,btn){' +
        'var el=document.getElementById(id);if(!el)return;' +
        'var open=!el.classList.contains(\'open\');' +
        'el.classList.toggle(\'open\');' +
        'if(open&&el.scrollIntoView){try{el.scrollIntoView({behavior:\'smooth\',block:\'start\'})}catch(e){}}' +
        'var b=document.getElementById(btn);' +
        'if(b)b.textContent=open?b.getAttribute(\'data-on\'):b.getAttribute(\'data-off\');' +
        '}' +
        'function syncBtns(){' +
        'var map=[[\'secInfo\',\'ib\'],[\'secBot\',\'bb\'],[\'secWea\',\'wb\'],[\'secLog\',\'lb\'],[\'secMus\',\'mb\'],[\'secGal\',\'gb\']];' +
        'for(var i=0;i<map.length;i++){' +
        'var el=document.getElementById(map[i][0]),b=document.getElementById(map[i][1]);' +
        'if(el&&b)b.textContent=el.classList.contains(\'open\')?b.getAttribute(\'data-on\'):b.getAttribute(\'data-off\');' +
        '}' +
        '}' +
        'function allTog(){' +
        'var all=document.querySelectorAll(\'.sec\'),anyOpen=false;' +
        'for(var i=0;i<all.length;i++){if(all[i].classList.contains(\'open\')){anyOpen=true;break}}' +
        'for(var j=0;j<all.length;j++){if(anyOpen)all[j].classList.remove(\'open\');else all[j].classList.add(\'open\')}' +
        'syncBtns();' +
        'var s=document.getElementById(\'selAll\');if(s)s.textContent=anyOpen?\'⬆ BUKA SEMUA\':\'⬇ TUTUP SEMUA\';' +
        '}' +
        'function theme(){document.body.classList.toggle(\'light\');var t=document.getElementById(\'thb\');if(t)t.textContent=document.body.classList.contains(\'light\')?\'🌙 MODE GELAP\':\'🌗 MODE PUTIH\'}' +
        'function toast(t){var e=document.getElementById(\'toast\');if(!e)return;e.textContent=t;e.classList.add(\'show\');setTimeout(function(){e.classList.remove(\'show\')},1600)}' +
        'function cp(t){' +
        'var ok=false;' +
        'if(navigator.clipboard&&navigator.clipboard.writeText){try{navigator.clipboard.writeText(t);ok=true}catch(e){}}' +
        'if(!ok){try{' +
        'var ta=document.createElement(\'textarea\');ta.value=t;ta.style.position=\'fixed\';ta.style.opacity=\'0\';' +
        'document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand(\'copy\')}catch(e){}' +
        'document.body.removeChild(ta);}catch(e){}}' +
        '}' +
        'document.addEventListener(\'click\',function(e){' +
        'var r=e.target&&e.target.closest?e.target.closest(\'.cmd\'):null;' +
        'if(!r)return;var c=r.getAttribute(\'data-c\');if(!c)return;cp(c);toast(c+\' tersalin ✓\');' +
        '});' +
        'var songs=D.songs||[],di=0,audio=document.getElementById(\'aud\'),pb=document.getElementById(\'pb\'),loopOn=false;' +
        'function songName(){var e=document.getElementById(\'songName\');if(!songs.length){if(e)e.textContent=\'Tidak ada lagu. Taruh MP3 di src/audio/\';return}if(e)e.textContent=(di+1)+\' / \'+songs.length+\' · \'+(songs[di]&&songs[di].title||\'--\')}' +
        'function setSong(i){if(!songs.length){songName();return}di=((i%songs.length)+songs.length)%songs.length;audio.src=songs[di].url;songName();if(!audio.paused){var p=audio.play();if(p&&p.catch)p.catch(function(){})}}' +
        'function togglePlay(){if(!songs.length)return;if(audio.paused){var p=audio.play();if(p&&p.catch)p.catch(function(){})}else{audio.pause()}}' +
        'function prevSong(){setSong(di-1)}' +
        'function nextSong(){setSong(di+1)}' +
        'function loop(btn){loopOn=!loopOn;btn.style.opacity=loopOn?1:.4;audio.loop=loopOn}' +
        'function vol(v){audio.volume=(parseInt(v,10)||0)/100}' +
        'function fmtM(s){s=Math.floor(s||0);function p(n){return (n<10?\'0\':\'\')+n}return p(Math.floor(s/60))+\':\'+p(s%60)}' +
        'function eqOn(on){var e=document.getElementById(\'eqBox\');if(e)e.className=\'eq\'+(on?\' on\':\'\')}' +
        'if(pb){audio.addEventListener(\'play\',function(){pb.textContent=\'⏸ JEDA\';eqOn(true)});audio.addEventListener(\'pause\',function(){pb.textContent=\'▶ PUTAR\';eqOn(false)})}' +
        'audio.addEventListener(\'ended\',function(){if(!loopOn)setSong(di+1)});' +
        'audio.addEventListener(\'timeupdate\',function(){' +
        'var e=document.getElementById(\'mprog\');if(e&&audio.duration)e.style.width=(audio.currentTime/audio.duration*100)+\'%\';' +
        'var c=document.getElementById(\'mcur\'),t=document.getElementById(\'mtot\');if(c)c.textContent=fmtM(audio.currentTime);if(t)t.textContent=fmtM(audio.duration||0);' +
        '});' +
        '(function(){var w=document.getElementById(\'mpw\');if(!w)return;w.addEventListener(\'click\',function(e){if(!audio.duration)return;var r=w.getBoundingClientRect();if(!r.width)return;audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration})})();' +
        'if(audio)setSong(0);' +
        'eqOn(false);' +
        'window.addEventListener(\'load\',function(){' +
        'var rb=document.getElementById(\'ramBar\'),cb=document.getElementById(\'cpuBar\');syncBtns();' +
        'setTimeout(function(){if(rb)rb.style.width=rb.getAttribute(\'data-w\')+\'%\';if(cb)cb.style.width=cb.getAttribute(\'data-w\')+\'%\'},120);' +
        '});' +
        '</script>' +
        '</body></html>'
}