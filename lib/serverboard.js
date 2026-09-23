import fs from 'fs'
import path from 'path'

// ============================================================
//  SERVERBOARD — builder HTML dashboard AiRich (.server)
//  Tema: JHON338xDEVICES (dark tech, aksen biru #4bd5ff)
//  • Kartu system (RAM / CPU / UPTIME) + clock WIB live
//  • Bot status & system info (data asli dari database)
//  • Cuaca real (open-meteo), Log chat (card scroll), Music player
//  • Tombol: LINKTREE / VERSI / MODE PUTIH
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

// ==================== CUACA (kode WMO) ====================
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
        return '<div class="panel"><div class="sechead"><span>🌦️</span> CUACA</div>' +
            '<div class="mut" style="text-align:center;padding:10px">Data cuaca tidak tersedia saat ini (offline).</div></div>'
    }
    return '<div class="panel"><div class="sechead"><span>🌦️</span> CUACA · ' + esc(w.city) + '</div>' +
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
        return '<div class="panel"><div class="sechead"><span>📜</span> LOG CHAT</div>' +
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
    return '<div class="panel"><div class="sechead"><span>📜</span> LOG CHAT · ' + logs.length + ' TERBARU</div>' +
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
    return '<div class="panel"><div class="sechead"><span>🎵</span> MUSIC PLAYER</div>' + body + '</div>'
}

const STYLE =
    '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-webkit-touch-callout:none;user-select:none}' +
    ':root{--bg:#06090e;--card:#0f141d;--blue:#4bd5ff;--red:#ff3333;--green:#25D366;--yellow:#ff9500;--pink:#ec4899;--text:#ffffff;--sub:#8a93a6;--border:#2a4b6e}' +
    'body{margin:0;padding:14px;background:var(--bg);background-image:radial-gradient(circle at 50% 0%,rgba(42,75,110,.25),transparent 60%);background-attachment:fixed;color:var(--text);font-family:"Rajdhani",Arial,sans-serif;touch-action:manipulation}' +
    '.wrap{max-width:640px;margin:0 auto}' +
    '.banner{display:block;width:100%;height:auto;border-radius:20px;border:1px solid var(--border);margin-bottom:12px}' +
    '.hd{display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:12px 14px}' +
    '.lg{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(75,213,255,.1);border:1px solid var(--blue);flex:none}' +
    '.hd .t1{font-family:"Orbitron",Arial,sans-serif;font-size:14px;font-weight:800;color:#fff;line-height:1.25}' +
    '.hd .t1 .accent{color:var(--blue)}' +
    '.hd .t2{font-size:10px;letter-spacing:1.5px;color:var(--sub);margin-top:2px}' +
    '.led{width:9px;height:9px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:pl 1.4s infinite;margin-left:auto}' +
    '@keyframes pl{0%,100%{opacity:1}50%{opacity:.25}}' +
    '.clock{text-align:center;margin-top:12px;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:20px}' +
    '.clock b{font-family:"Orbitron",Arial,sans-serif;font-size:26px;color:var(--blue);letter-spacing:2px;display:block}' +
    '.clock .mut{margin-top:2px}' +
    '.panel{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:12px;margin-top:12px}' +
    '.sechead{display:flex;align-items:center;gap:8px;font-family:"Orbitron",Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#fff;margin-bottom:10px;text-transform:uppercase}' +
    '.sechead span{font-size:14px}' +
    '.mut{color:var(--sub);font-size:11px;line-height:1.5}' +
    '.cards{display:flex;gap:10px;margin-top:12px}' +
    '.card{flex:1;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:12px;text-align:center}' +
    '.card .clb{font-size:10px;letter-spacing:1px;color:var(--sub);text-transform:uppercase}' +
    '.card .cv{font-family:"Orbitron",Arial,sans-serif;font-size:19px;font-weight:800;color:#fff;margin:5px 0}' +
    '.card .cs{font-size:10px;color:var(--blue)}' +
    '.donut{width:62px;height:62px;border-radius:50%;margin:5px auto;display:flex;align-items:center;justify-content:center;font-family:"Orbitron",Arial,sans-serif;font-weight:800;font-size:14px;color:#fff;position:relative}' +
    '.donut::after{content:"";position:absolute;inset:8px;border-radius:50%;background:var(--card)}' +
    '.donut span{position:relative;z-index:1}' +
    '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
    '.cell{background:rgba(75,213,255,.05);border:1px solid var(--border);border-radius:14px;padding:9px}' +
    '.cell .cl{font-size:9px;letter-spacing:.5px;color:var(--sub);text-transform:uppercase}' +
    '.cell .cv{font-family:"Orbitron",Arial,sans-serif;font-size:17px;font-weight:800;color:var(--blue);margin-top:3px;word-break:break-word}' +
    '.bar{height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:6px}' +
    '.barin{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#1f6feb,#4bd5ff);transition:width 1s ease}' +
    '.txt2{margin-top:10px}' +
    '.ln{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:var(--sub);padding:6px 0;border-bottom:1px dashed rgba(42,75,110,.6)}' +
    '.ln:last-child{border-bottom:0}' +
    '.ln b{color:#fff;text-align:right}' +
    '.chip{background:rgba(75,213,255,.08);border:1px solid var(--border);border-radius:99px;padding:4px 10px;font-size:10px;color:#cfefff}' +
    '.wx{display:flex;align-items:center;gap:14px}' +
    '.wxicon{font-size:44px}' +
    '.wxtemp{font-family:"Orbitron",Arial,sans-serif;font-size:24px;font-weight:800;color:#fff}' +
    '.wxmeta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}' +
    '.log{display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-right:4px}' +
    '.log::-webkit-scrollbar{width:6px}' +
    '.log::-webkit-scrollbar-thumb{background:var(--border);border-radius:99px}' +
    '.li{display:flex;align-items:center;gap:6px;font-size:11px;background:rgba(75,213,255,.04);border:1px solid var(--border);border-radius:12px;padding:7px 8px;flex-wrap:wrap}' +
    '.lt{color:var(--blue);font-weight:700;white-space:nowrap;font-family:"Orbitron",Arial,sans-serif;font-size:9px}' +
    '.lchip{background:rgba(75,213,255,.12);border:1px solid var(--border);color:#cfefff;border-radius:99px;padding:1px 7px;font-size:10px}' +
    '.lname{color:#fff;font-weight:700}' +
    '.lchat{color:var(--sub);font-size:10px}' +
    '.lbody{flex:1 1 100%;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}' +
    '.eq{display:flex;align-items:flex-end;gap:4px;height:34px;margin:4px 0;justify-content:center}' +
    '.eq span{width:5px;background:linear-gradient(180deg,#1f6feb,#4bd5ff);border-radius:2px;animation:eq 1s ease-in-out infinite;animation-play-state:paused}' +
    '.eq.on span{animation-play-state:running}' +
    '.eq span:nth-child(1){height:26%}.eq span:nth-child(2){height:62%;animation-delay:.15s}' +
    '.eq span:nth-child(3){height:40%;animation-delay:.3s}.eq span:nth-child(4){height:74%;animation-delay:.45s}' +
    '.eq span:nth-child(5){height:30%;animation-delay:.6s}' +
    '@keyframes eq{0%,100%{height:20%}50%{height:85%}}' +
    '.song{text-align:center;font-size:13px;font-weight:700;color:#fff;margin:4px 0}' +
    '.mprog{height:6px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden;position:relative;cursor:pointer}' +
    '.mprogbar{height:100%;width:0;background:linear-gradient(90deg,#1f6feb,#4bd5ff);border-radius:99px}' +
    '.mtim{display:flex;justify-content:space-between;font-size:10px;color:var(--sub);margin-top:3px}' +
    '.mctl{display:flex;gap:8px;justify-content:center;margin-top:10px}' +
    '.mvol{display:flex;align-items:center;gap:8px;margin-top:8px}.mvol input{flex:1;accent-color:#4bd5ff}' +
    '.acts{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px}' +
    '.btn{border:0;border-radius:10px;color:#fff;font-size:12px;font-weight:800;padding:10px 14px;cursor:pointer;letter-spacing:.5px}' +
    '.b1{background:linear-gradient(135deg,#1f6feb,#4bd5ff);color:#02121c}' +
    '.b2{background:rgba(75,213,255,.1);border:1px solid var(--border);color:var(--blue)}' +
    '.b3{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}' +
    '.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#4bd5ff;color:#02121c;font-size:12px;font-weight:800;padding:9px 18px;border-radius:99px;opacity:0;pointer-events:none;transition:all .25s;box-shadow:0 8px 24px rgba(75,213,255,.4);z-index:99}' +
    '.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}' +
    '.ft{margin-top:16px;text-align:center;font-size:10px;color:var(--sub)}' +
    '.banner,.hd,.clock,.panel,.card,.li,.cell{animation:rise .55s cubic-bezier(.2,.7,.3,1) backwards}' +
    '@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
    '.banner{animation-delay:.02s}.hd{animation-delay:.06s}.clock{animation-delay:.1s}' +
    '.barin{position:relative;overflow:hidden}' +
    '.barin::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-120%);animation:sheen 2.4s linear infinite}' +
    '@keyframes sheen{to{transform:translateX(120%)}}' +
    '.led{animation:pl 1.4s infinite,ledpulse 2.4s ease-in-out infinite}' +
    '@keyframes ledpulse{0%,100%{box-shadow:0 0 6px var(--green)}50%{box-shadow:0 0 15px var(--green)}}' +
    '.cell,.btn,.chip,.ln{transition:transform .15s ease,background .2s ease,border-color .2s ease}' +
    '.cell:active,.btn:active,.chip:active{transform:scale(.96)}' +
    '.donut{transition:background .6s ease}' +
    '@media (prefers-reduced-motion:reduce){*{animation-duration:.001s!important;animation-iteration-count:1!important;transition:none!important}}' +
    'body.light{background:#eef2f7;background-image:none;color:#0f172a}' +
    'body.light .panel,body.light .hd,body.light .clock,body.light .card{background:#fff;border-color:#cbd5e1}' +
    'body.light .banner{border-color:#cbd5e1}' +
    'body.light .t1,body.light .ln b,body.light .card .cv,body.light .wxtemp,body.light .lname,body.light .sechead{color:#0f172a}' +
    'body.light .mut,body.light .ln,body.light .lbody,body.light .hd .t2,body.light .card .clb,body.light .cell .cl,body.light .lchat,body.light .mtim{color:#475569}' +
    'body.light .cell{background:#f1f5f9}' +
    'body.light .li{background:#f8fafc;border-color:#e2e8f0}' +
    'body.light .donut::after{background:#fff}' +
    'body.light .clock b{color:#1d4ed8}' +
    'body.light .chip{color:#0f172a}'

const SCRIPT =
    'var D=' + '__DATA__' + '||{};' +
    'var tz=D.tz||0;' +
    'function pad(n){return (n<10?"0":"")+n}' +
    'function wibD(now){return new Date(now+tz*1000)}' +
    'function tic(){var d=wibD(Date.now()),el=document.getElementById("tl");' +
    'var days=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];' +
    'var mon=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];' +
    'if(el)el.textContent=pad(d.getUTCHours())+":"+pad(d.getUTCMinutes())+":"+pad(d.getUTCSeconds());' +
    'var dt=document.getElementById("dt");' +
    'if(dt)dt.textContent=days[d.getUTCDay()]+", "+d.getUTCDate()+" "+mon[d.getUTCMonth()]+" "+d.getUTCFullYear()+" WIB";}' +
    'setInterval(tic,1000);tic();' +
    'function fmtUp(s){s=Math.floor(s||0);var d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60),c=s%60;return ((d>0)?(d+"d "):"")+pad(h)+":"+pad(m)+":"+pad(c)}' +
    'var up=D.uptime||0;' +
    'setInterval(function(){up++;var e=document.getElementById("upT");if(e)e.textContent=fmtUp(up)},1000);' +
    'function theme(){document.body.classList.toggle("light");var t=document.getElementById("thb");if(t)t.textContent=document.body.classList.contains("light")?"🌙 MODE GELAP":"🌗 MODE PUTIH"}' +
    'function toast(t){var e=document.getElementById("toast");if(!e)return;e.textContent=t;e.classList.add("show");setTimeout(function(){e.classList.remove("show")},1600)}' +
    'function cp(t){var ok=false;' +
    'if(navigator.clipboard&&navigator.clipboard.writeText){try{navigator.clipboard.writeText(t);ok=true}catch(e){}}' +
    'if(!ok){try{var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";' +
    'document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);}catch(e){}}}' +
    'var songs=D.songs||[],di=0,audio=document.getElementById("aud"),pb=document.getElementById("pb"),loopOn=false;' +
    'function songName(){var e=document.getElementById("songName");if(!e)return;if(!songs.length){e.textContent="Tidak ada lagu. Taruh MP3 di src/audio/";return}e.textContent=(di+1)+" / "+songs.length+" · "+(songs[di]&&songs[di].title||"--")}' +
    'function setSong(i){if(!songs.length){songName();return}di=((i%songs.length)+songs.length)%songs.length;audio.src=songs[di].url;songName();if(!audio.paused){var p=audio.play();if(p&&p.catch)p.catch(function(){})}}' +
    'function togglePlay(){if(!songs.length)return;if(audio.paused){var p=audio.play();if(p&&p.catch)p.catch(function(){})}else{audio.pause()}}' +
    'function prevSong(){setSong(di-1)}' +
    'function nextSong(){setSong(di+1)}' +
    'function loop(btn){loopOn=!loopOn;btn.style.opacity=loopOn?1:.4;audio.loop=loopOn}' +
    'function vol(v){audio.volume=(parseInt(v,10)||0)/100}' +
    'function fmtM(s){s=Math.floor(s||0);function p(n){return (n<10?"0":"")+n}return p(Math.floor(s/60))+":"+p(s%60)}' +
    'function eqOn(on){var e=document.getElementById("eqBox");if(e)e.className="eq"+(on?" on":"")}' +
    'if(audio&&pb){audio.addEventListener("play",function(){pb.textContent="⏸ JEDA";eqOn(true)});audio.addEventListener("pause",function(){pb.textContent="▶ PUTAR";eqOn(false)});' +
    'audio.addEventListener("ended",function(){if(!loopOn)setSong(di+1)});' +
    'audio.addEventListener("timeupdate",function(){' +
    'var e=document.getElementById("mprog");if(e&&audio.duration)e.style.width=(audio.currentTime/audio.duration*100)+"%";' +
    'var c=document.getElementById("mcur"),t=document.getElementById("mtot");if(c)c.textContent=fmtM(audio.currentTime);if(t)t.textContent=fmtM(audio.duration||0);});' +
    'var w=document.getElementById("mpw");if(w)w.addEventListener("click",function(e){if(!audio.duration)return;var r=w.getBoundingClientRect();if(!r.width)return;audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration});' +
    'setSong(0);eqOn(false);}' +
    'window.addEventListener("load",function(){' +
    'var rs=document.querySelectorAll(".panel,.card,.li,.cell");for(var i=0;i<rs.length;i++){rs[i].style.animationDelay=(0.05*i+0.1)+"s"}' +
    'var rb=document.getElementById("ramBar"),cb=document.getElementById("cpuBar");' +
    'setTimeout(function(){if(rb)rb.style.width=rb.getAttribute("data-w")+"%";if(cb)cb.style.width=cb.getAttribute("data-w")+"%"},120);' +
    '});'

// ==================== BUILDER UTAMA ====================
export function buildServerHTML(ds) {
    const w = ds.weather
    const cpuPct = Math.max(0, Math.min(100, Math.round(ds.cpu || 0)))
    const cpuDonut = 'background:conic-gradient(#4bd5ff 0 ' + cpuPct + '%,rgba(75,213,255,.14) ' + cpuPct + '% 100%)'
    const ramPct = Math.min(100, ds.ram.pct)
    const songs = (ds.sdk && ds.sdk.songs) || ds.songs || []

    const sdk = Object.assign({}, ds.sdk || {}, { songs, tz: (ds.sdk && ds.sdk.tz) || 7 * 3600 })
    const script = SCRIPT.replace('__DATA__', JSON.stringify(sdk))

    return '<!DOCTYPE html>' +
        '<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">' +
        '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">' +
        '<style>' + STYLE + '</style></head>' +
        '<body><div class="wrap">' +

        (ds.photo ? '<img class="banner" src="' + ds.photo + '" alt="' + esc(ds.bot) + '">' : '') +

        '<div class="hd"><div class="lg">🤖</div>' +
        '<div style="flex:1"><div class="t1">' + esc(String(ds.bot).toUpperCase()) + '<span class="accent"> COMMAND CENTER</span></div>' +
        '<div class="t2">' + esc(String(ds.ver).toUpperCase()) + ' · AI RICH SERVER</div></div>' +
        '<span class="led"></span></div>' +

        '<div class="clock"><b id="tl">--:--:--</b><div class="mut" id="dt">Memuat tanggal…</div></div>' +

        '<div class="cards">' +
        '<div class="card"><div class="clb">RAM</div><div class="cv">' + ds.ram.pct + '%</div><div class="cs">' + ds.ram.usedFmt + ' / ' + ds.ram.totalFmt + '</div></div>' +
        '<div class="card"><div class="clb">CPU</div><div class="donut" style="' + cpuDonut + '"><span>' + cpuPct + '%</span></div><div class="cs">' + (ds.cpus || '-') + ' core</div></div>' +
        '<div class="card"><div class="clb">UPTIME</div><div class="cv" id="upT">' + ds.uptimeFmt + '</div><div class="cs">Sistem: ' + ds.sysUp + '</div></div>' +
        '</div>' +

        '<div class="panel"><div class="sechead"><span>📊</span> SYSTEM INFO</div>' +
        '<div class="mut">RAM</div><div class="bar"><div class="barin" id="ramBar" data-w="' + ramPct + '"></div></div>' +
        '<div class="txt2"><div class="mut">CPU</div><div class="bar"><div class="barin" id="cpuBar" data-w="' + cpuPct + '"></div></div></div>' +
        '<div class="txt2">' +
        '<div class="ln"><span>PEMAKAIAN RAM</span><b>' + ds.ram.usedFmt + ' / ' + ds.ram.totalFmt + ' (' + ds.ram.pct + '%)</b></div>' +
        '<div class="ln"><span>CPU USAGE</span><b>' + cpuPct + '% · ' + (ds.cpus || '-') + ' core</b></div>' +
        '<div class="ln"><span>NODE.JS</span><b>' + esc(ds.node) + '</b></div>' +
        '<div class="ln"><span>PLATFORM</span><b>' + esc(ds.plat) + '</b></div>' +
        '<div class="ln"><span>HOST</span><b>' + esc(ds.host) + '</b></div>' +
        '<div class="ln"><span>PROCESS ID</span><b>' + ds.pid + '</b></div>' +
        '</div></div>' +

        '<div class="panel"><div class="sechead"><span>🤖</span> BOT STATUS</div>' +
        '<div class="grid">' +
        '<div class="cell"><div class="cl">PLUGINS</div><div class="cv">' + ds.plugins + '</div></div>' +
        '<div class="cell"><div class="cl">GRUP OFF</div><div class="cv">' + ds.groupsOff + '</div></div>' +
        '<div class="cell"><div class="cl">TOTAL GRUP</div><div class="cv">' + ds.groupsTotal + '</div></div>' +
        '<div class="cell"><div class="cl">MEMBER</div><div class="cv">' + ds.members + '</div></div>' +
        '<div class="cell"><div class="cl">PREMIUM</div><div class="cv">' + ds.premium + '</div></div>' +
        '<div class="cell"><div class="cl">OWNER</div><div class="cv">' + ds.owners + '</div></div>' +
        '</div>' +
        '<div class="txt2">' +
        '<div class="ln"><span>BOT</span><b>' + esc(ds.bot) + ' ' + esc(ds.ver) + '</b></div>' +
        '<div class="ln"><span>OWNER</span><b>' + esc(ds.owner) + '</b></div>' +
        '<div class="ln"><span>MODE</span><b>' + esc(String(ds.mode).toUpperCase()) + '</b></div>' +
        '<div class="ln"><span>PREFIX</span><b>' + esc(ds.prefix) + '</b></div>' +
        '<div class="ln"><span>TOTAL LANGGANAN PREMIUM</span><b>' + ds.premiumTotal + '</b></div>' +
        '<div class="ln"><span>TANGGAL</span><b>' + esc(ds.created) + '</b></div>' +
        '</div></div>' +

        weatherHTML(w) + logHTML(ds.log) + musicHTML(songs) +

        '<div class="acts">' +
        '<button class="btn b2" onclick="cp(D.link);toast(\'Linktree tersalin ✓\')">🔗 LINKTREE</button>' +
        '<button class="btn b2" onclick="cp(D.ver);toast(\'Versi tersalin ✓\')">📋 VERSI</button>' +
        '<button class="btn b3" id="thb" onclick="theme()">🌗 MODE PUTIH</button>' +
        '</div>' +

        '<div class="ft">DEVELOPER BY ' + esc(String(ds.owner).toUpperCase()) + ' · POWERED BY BAILEYS · WIB</div>' +
        '</div>' +
        '<div class="toast" id="toast"></div>' +
        '<script>' + script + '</script>' +
        '</body></html>'
}
