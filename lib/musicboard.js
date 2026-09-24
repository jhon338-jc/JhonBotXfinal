// ============================================================
//  MUSICBOARD — builder HTML player AiRich (.musik)
//  Tema: glassmorphism gelap + aksen biru JHON338xDEVICES
//  • Latar aurora bergerak + piringan vinyl CSS berputar
//  • Equalizer, progress shimmer, playlist tap-to-play
//  • Animasi hanya transform/opacity (ringan), pause saat tidak play
// ============================================================

const esc = s => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const STYLE =
    '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-webkit-touch-callout:none;user-select:none}' +
    ':root{--glass:rgba(255,255,255,.06);--line:rgba(75,213,255,.25);--blue:#4bd5ff;--blue2:#1f6feb;--sub:#8fb3c9}' +
    'body{margin:0;min-height:100vh;padding:14px;overflow-x:hidden;color:#eaf6ff;font-family:"Rajdhani",Arial,sans-serif;touch-action:manipulation;' +
    'background:linear-gradient(160deg,#04070c,#081120 45%,#061019);background-attachment:fixed}' +
    '.aurora{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}' +
    '.aurora span{position:absolute;width:62vw;height:62vw;max-width:420px;max-height:420px;border-radius:50%;opacity:.55;will-change:transform}' +
    '.b1{top:-12%;left:-10%;background:radial-gradient(circle at 50% 50%,rgba(75,213,255,.5),transparent 70%);animation:drift1 18s ease-in-out infinite alternate}' +
    '.b2{bottom:-15%;right:-12%;background:radial-gradient(circle at 50% 50%,rgba(31,111,235,.45),transparent 70%);animation:drift2 22s ease-in-out infinite alternate}' +
    '.b3{top:35%;left:45%;background:radial-gradient(circle at 50% 50%,rgba(236,72,153,.22),transparent 70%);animation:drift3 26s ease-in-out infinite alternate}' +
    '@keyframes drift1{to{transform:translate3d(20vw,12vh,0) scale(1.25)}}' +
    '@keyframes drift2{to{transform:translate3d(-18vw,-14vh,0) scale(1.2)}}' +
    '@keyframes drift3{to{transform:translate3d(-22vw,10vh,0) scale(.85)}}' +
    '.wrap{position:relative;z-index:1;max-width:480px;margin:0 auto}' +
    '.glass{background:var(--glass);border:1px solid var(--line);border-radius:24px;padding:16px;' +
    'backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);' +
    'box-shadow:0 12px 40px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.08);animation:rise .6s cubic-bezier(.2,.7,.3,1) both}' +
    '.glass+.glass{margin-top:14px;animation-delay:.12s}' +
    '@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}' +
    '.top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}' +
    '.brand{font-family:"Orbitron",Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:1px}' +
    '.brand .accent{color:var(--blue)}' +
    '.meta{font-size:10px;color:var(--sub);border:1px solid var(--line);border-radius:99px;padding:3px 10px}' +
    '.disc{width:150px;height:150px;margin:10px auto 14px;border-radius:50%;position:relative;' +
    'background:conic-gradient(from 0deg,#081120,#12324a,#081120,#16384f,#081120);border:1px solid var(--line);' +
    'box-shadow:0 0 26px rgba(75,213,255,.18),inset 0 0 30px rgba(0,0,0,.6);' +
    'animation:spin 9s linear infinite;animation-play-state:paused;will-change:transform}' +
    '.disc::before{content:"";position:absolute;inset:8%;border-radius:50%;background:repeating-radial-gradient(circle at 50% 50%,rgba(75,213,255,.10) 0 1px,transparent 1px 5px)}' +
    '.disc::after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,.16) 50%,transparent 65%)}' +
    '.disc-inner{position:absolute;inset:36%;border-radius:50%;background:radial-gradient(circle at 40% 35%,#8fe6ff,#1f6feb);display:flex;align-items:center;justify-content:center;font-size:18px;color:#02121c;z-index:1}' +
    'body.playing .disc{animation-play-state:running;animation-duration:3.2s}' +
    '@keyframes spin{to{transform:rotate(360deg)}}' +
    '.eq{display:flex;align-items:flex-end;justify-content:center;gap:5px;height:30px;margin-bottom:10px}' +
    '.eq span{width:5px;height:100%;border-radius:3px;background:linear-gradient(180deg,var(--blue),var(--blue2));transform:scaleY(.25);transform-origin:bottom;animation:eq 1s ease-in-out infinite;animation-play-state:paused}' +
    '.eq.on span{animation-play-state:running}' +
    '.eq span:nth-child(2){animation-delay:.12s}.eq span:nth-child(3){animation-delay:.24s}.eq span:nth-child(4){animation-delay:.36s}.eq span:nth-child(5){animation-delay:.48s}' +
    '@keyframes eq{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}' +
    '.title-wrap{text-align:center;margin-bottom:10px}' +
    '.title{font-size:15px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 0 12px rgba(75,213,255,.25);animation:glow 3s ease-in-out infinite}' +
    '@keyframes glow{0%,100%{text-shadow:0 0 8px rgba(75,213,255,.2)}50%{text-shadow:0 0 18px rgba(75,213,255,.55)}}' +
    '.sub{font-size:10px;color:var(--sub);letter-spacing:1px;margin-top:2px}' +
    '.prog{height:7px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden;position:relative;cursor:pointer}' +
    '.progbar{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--blue2),var(--blue));position:relative;overflow:hidden}' +
    '.shine{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-120%);animation:sheen 2.4s linear infinite}' +
    '@keyframes sheen{to{transform:translateX(120%)}}' +
    '.times{display:flex;justify-content:space-between;font-size:10px;color:var(--sub);margin-top:4px}' +
    '.ctrl{display:flex;align-items:center;justify-content:center;gap:12px;margin:14px 0 6px}' +
    '.cbtn{border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--blue);width:42px;height:42px;border-radius:50%;font-size:16px;transition:transform .15s ease,background .2s ease}' +
    '.cbtn:active{transform:scale(.88)}' +
    '.cbtn.on{background:rgba(75,213,255,.2);color:#fff}' +
    '.cbtn.main{width:58px;height:58px;font-size:22px;background:linear-gradient(135deg,var(--blue2),var(--blue));color:#02121c;border:0;box-shadow:0 8px 24px rgba(75,213,255,.35)}' +
    '.vol{display:flex;align-items:center;gap:8px;margin-top:8px}.vol input{flex:1;accent-color:#4bd5ff}' +
    '.lhead{display:flex;justify-content:space-between;align-items:center;font-family:"Orbitron",Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;margin-bottom:10px}' +
    '.lhead .cnt{color:var(--sub);font-family:"Rajdhani",Arial,sans-serif;font-weight:600;letter-spacing:0}' +
    '.plist{display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;padding-right:4px}' +
    '.plist::-webkit-scrollbar{width:6px}.plist::-webkit-scrollbar-thumb{background:var(--line);border-radius:99px}' +
    '.pt{display:flex;align-items:center;gap:10px;padding:9px 10px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.04);transition:transform .15s ease,background .2s ease;cursor:pointer}' +
    '.pt:active{transform:scale(.98)}' +
    '.pt .num{font-family:"Orbitron",Arial,sans-serif;font-size:10px;color:var(--sub);width:22px;text-align:center}' +
    '.pt .nm{flex:1;min-width:0;font-size:12px;color:#dff3ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.pt .dot{width:7px;height:7px;border-radius:50%;background:var(--sub);opacity:.4}' +
    '.pt.active{background:rgba(75,213,255,.14);border-color:var(--blue)}' +
    '.pt.active .nm{color:#fff;font-weight:700}' +
    '.pt.active .dot{background:var(--blue);opacity:1;box-shadow:0 0 8px var(--blue);animation:pulse 1.2s infinite}' +
    '@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}' +
    '.empty{text-align:center;padding:16px;color:var(--sub);font-size:12px;line-height:1.6}' +
    '.ft{margin-top:14px;text-align:center;font-size:10px;color:var(--sub)}' +
    '@media (prefers-reduced-motion:reduce){*{animation-duration:.001s!important;animation-iteration-count:1!important;transition:none!important}}'

const SCRIPT =
    'var SONGS=__SONGS__||[];' +
    'var di=0,loopMode=0,shuffleOn=false;' +
    'var audio=document.getElementById("aud"),pb=document.getElementById("play");' +
    'function pad(n){return (n<10?"0":"")+n}' +
    'function fmt(s){s=Math.floor(s||0);return Math.floor(s/60)+":"+pad(s%60)}' +
    'function rows(){return document.querySelectorAll(".pt")}' +
    'function render(){var r=rows();for(var i=0;i<r.length;i++){r[i].className="pt"+(i===di?" active":"")}' +
    'var t=document.getElementById("stitle");if(t)t.textContent=SONGS.length?SONGS[di].t:"Tidak ada lagu";' +
    'var c=document.getElementById("cnt");if(c)c.textContent=SONGS.length+" lagu"}' +
    'function load(i,autoplay){if(!SONGS.length)return;di=((i%SONGS.length)+SONGS.length)%SONGS.length;audio.src=SONGS[di].u;' +
    'if(autoplay!==false){var p=audio.play();if(p&&p.catch)p.catch(function(){})}render()}' +
    'function toggle(){if(!SONGS.length)return;if(audio.paused){var p=audio.play();if(p&&p.catch)p.catch(function(){})}else audio.pause()}' +
    'function next(){if(!SONGS.length)return;if(shuffleOn)return load(Math.floor(Math.random()*SONGS.length));load(di+1)}' +
    'function prev(){if(!SONGS.length)return;load(di-1)}' +
    'function pick(i){load(i)}' +
    'function shuffle(){shuffleOn=!shuffleOn;var b=document.getElementById("sh");if(b)b.className="cbtn"+(shuffleOn?" on":"")}' +
    'function loopModeNext(){loopMode=(loopMode+1)%3;var b=document.getElementById("lp");' +
    'if(b){b.className="cbtn"+(loopMode?" on":"");b.textContent=loopMode===2?"🔂":"🔁"}audio.loop=(loopMode===2)}' +
    'function setVol(v){audio.volume=(parseInt(v,10)||0)/100}' +
    'function eq(on){var e=document.getElementById("eq");if(e)e.className="eq"+(on?" on":"")}' +
    'document.addEventListener("click",function(e){var r=e.target&&e.target.closest?e.target.closest(".pt"):null;if(!r)return;var i=parseInt(r.getAttribute("data-i"),10);if(!isNaN(i))pick(i)});' +
    'if(audio&&pb){audio.addEventListener("play",function(){pb.textContent="⏸";eq(true);document.body.classList.add("playing")});' +
    'audio.addEventListener("pause",function(){pb.textContent="▶";eq(false);document.body.classList.remove("playing")});' +
    'audio.addEventListener("ended",function(){if(loopMode===2)return;if(loopMode===1||SONGS.length>1)next()});' +
    'audio.addEventListener("timeupdate",function(){var e=document.getElementById("pbar");if(e&&audio.duration)e.style.width=(audio.currentTime/audio.duration*100)+"%";' +
    'var c=document.getElementById("cur"),t=document.getElementById("tot");if(c)c.textContent=fmt(audio.currentTime);if(t)t.textContent=fmt(audio.duration||0)});' +
    'var w=document.getElementById("pw");if(w)w.addEventListener("click",function(e){if(!audio.duration)return;var r=w.getBoundingClientRect();if(!r.width)return;audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration});' +
    'if(SONGS.length)load(0,false);else render();}'

export function buildMusicHTML({ bot = 'JhonBot', songs = [], link = '' } = {}) {
    const list = Array.isArray(songs) ? songs : []
    const json = JSON.stringify(list.map(s => ({ t: s.title, u: s.url }))).replace(/</g, '\\u003c')
    const script = SCRIPT.replace('__SONGS__', json)

    const rows = list.map((s, i) =>
        '<div class="pt" data-i="' + i + '"><span class="num">' + (i + 1) + '</span>' +
        '<span class="nm">' + esc(s.title) + '</span><span class="dot"></span></div>'
    ).join('')

    const listBody = list.length
        ? '<div class="plist">' + rows + '</div>'
        : '<div class="empty">Belum ada lagu.<br>Taruh file <b>MP3</b> di folder <b>src/audio/</b> lalu jalankan <b>.musik</b> lagi.</div>'

    return '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">' +
        '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">' +
        '<style>' + STYLE + '</style></head><body>' +

        '<div class="aurora"><span class="b1"></span><span class="b2"></span><span class="b3"></span></div>' +

        '<div class="wrap">' +
        '<div class="glass">' +
        '<div class="top"><div class="brand">JHON338x<span class="accent">MUSIK</span></div>' +
        '<div class="meta" id="cnt">' + list.length + ' lagu</div></div>' +

        '<div class="disc"><div class="disc-inner">♪</div></div>' +
        '<div class="eq" id="eq"><span></span><span></span><span></span><span></span><span></span></div>' +

        '<div class="title-wrap"><div class="title" id="stitle">' + (list.length ? esc(list[0].title) : 'Tidak ada lagu') + '</div>' +
        '<div class="sub">' + esc(bot) + ' · AI RICH MUSIC</div></div>' +

        '<div class="prog" id="pw"><div class="progbar" id="pbar"><span class="shine"></span></div></div>' +
        '<div class="times"><span id="cur">0:00</span><span id="tot">0:00</span></div>' +

        '<div class="ctrl">' +
        '<button class="cbtn" id="sh" onclick="shuffle()">🔀</button>' +
        '<button class="cbtn" onclick="prev()">⏮</button>' +
        '<button class="cbtn main" id="play" onclick="toggle()">▶</button>' +
        '<button class="cbtn" onclick="next()">⏭</button>' +
        '<button class="cbtn" id="lp" onclick="loopModeNext()">🔁</button>' +
        '</div>' +
        '<div class="vol"><span>🔊</span><input id="vol" type="range" min="0" max="100" value="80" oninput="setVol(this.value)"></div>' +
        '</div>' +

        '<div class="glass"><div class="lhead"><span>PLAYLIST</span><span class="cnt" id="cnt2">' + list.length + ' lagu</span></div>' +
        listBody + '</div>' +

        '<div class="ft">DEVELOPER BY JHON338 · POWERED BY BAILEYS</div>' +
        '</div>' +

        '<audio id="aud" preload="none"></audio>' +
        '<script>' + script + '</script>' +
        '</body></html>'
}
