import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div id="vidbox" style="position:relative;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#6c5ce7,#a29bfe);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.14)">
    <div id="thtitle" style="font-size:20px;font-weight:bold;color:#fff;text-align:center;padding:10px"> VIDEO</div>
    <div id="bigplay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(10,10,20,.35)"><div style="font-size:46px"></div></div>
  </div>
  <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
    <button id="play" class="btn" style="background:#6c5ce7">PLAY</button>
    <span id="time" class="muted">0:00 / 4:32</span>
    <span style="flex:1"></span>
    <span class="chip" id="likes" style="cursor:pointer"> 12.4K</span>
    <span class="chip" id="dislikes" style="cursor:pointer"> 312</span>
  </div>
  <div style="position:relative;height:6px;border-radius:4px;background:rgba(255,255,255,.12);margin-top:10px;overflow:hidden">
    <div id="bar" style="position:absolute;left:0;top:0;bottom:0;width:0%;background:#6c5ce7"></div>
    <div id="knob" style="position:absolute;top:50%;left:0%;width:12px;height:12px;border-radius:50%;background:#fff;transform:translate(-50%,-50%)"></div>
  </div>
  <div class="row">
    <span style="font-size:14px;font-weight:bold;color:#fff">Jhon338 <span class="muted" id="subcount">1.2M subscribers</span></span>
    <span style="flex:1"></span>
    <button id="sub" class="btn" style="background:#e0245e">SUBSCRIBE</button>
  </div>
  <div style="font-size:13px;font-weight:bold;margin:14px 0 6px;color:#fff">Suggested</div>
  <div id="sugg" style="display:flex;flex-direction:column;gap:8px"></div>
</div>`

const GAME_JS = `
var vids=[['Lofi Beats to Code','#6c5ce7',272],['Node.js in 10 min','#e17055',581],['Termux Setup 2026','#00b894',725],['AI Bots Explained','#0984e3',438]];
var idx=0,playing=false,liked=false,disliked=false,subbed=false,t=0,dur=272,likes=12400,dislikes=312;
var likesEl=document.getElementById('likes'),disEl=document.getElementById('dislikes'),subBtn=document.getElementById('sub'),subC=document.getElementById('subcount'),big=document.getElementById('bigplay'),playBtn=document.getElementById('play'),bar=document.getElementById('bar'),knob=document.getElementById('knob'),timeEl=document.getElementById('time'),sugg=document.getElementById('sugg'),tt=document.getElementById('thtitle'),vb=document.getElementById('vidbox');
function fmt(s){var m=Math.floor(s/60),ss=Math.floor(s%60);return m+':'+(ss<10?'0':'')+ss}
function renderSugg(){sugg.innerHTML='';vids.forEach(function(v,i){var d=document.createElement('div');d.style.cssText='display:flex;gap:10px;align-items:center;padding:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;cursor:pointer';d.innerHTML='<div style="width:64px;height:36px;border-radius:6px;background:'+v[1]+';display:flex;align-items:center;justify-content:center;font-size:12px">'+(i===idx?'':'')+'</div><div style="flex:1"><div style="font-size:12px;font-weight:bold;color:#fff">'+v[0]+'</div><div class="muted" style="font-size:10px">'+fmt(v[2])+'</div></div>';d.onclick=function(){load(i);renderSugg()};sugg.appendChild(d)})}
function load(i){idx=i;t=0;dur=vids[i][2];tt.textContent=' '+vids[i][0];vb.style.background='linear-gradient(135deg,'+vids[i][1]+',#2d2d50)';playing=false;big.style.display='flex';playBtn.textContent='PLAY';renderSugg()}
function setP(){var p=t/dur*100;bar.style.width=p+'%';knob.style.left=p+'%';timeEl.textContent=fmt(t)+' / '+fmt(dur)}
playBtn.onclick=function(){playing=!playing;big.style.display=playing?'none':'flex';playBtn.textContent=playing?'PAUSE':'PLAY';if(playing)requestAnimationFrame(tick)};
big.onclick=function(){if(!playing){playing=true;big.style.display='none';playBtn.textContent='PAUSE';requestAnimationFrame(tick)}};
function tick(){if(!playing)return;t+=.06;if(t>=dur)t=0;setP();requestAnimationFrame(tick)}
likesEl.onclick=function(){if(liked){liked=false;likes--}else{liked=true;if(disliked){disliked=false;dislikes--}likes++}up()};
disEl.onclick=function(){if(disliked){disliked=false;dislikes--}else{disliked=true;if(liked){liked=false;likes--}dislikes++}up()};
function up(){likesEl.textContent=' '+(likes>=1000?(likes/1000).toFixed(1)+'K':likes);disEl.textContent=' '+(dislikes>=1000?(dislikes/1000).toFixed(1)+'K':dislikes);likesEl.style.background=liked?'rgba(106,92,231,.45)':'rgba(255,255,255,.08)';disEl.style.background=disliked?'rgba(231,76,60,.45)':'rgba(255,255,255,.08)'}
subBtn.onclick=function(){if(subbed){subbed=false;subBtn.textContent='SUBSCRIBE';subBtn.style.background='#e0245e';subC.textContent='1.2M subscribers'}else{subbed=true;subBtn.textContent='SUBSCRIBED ';subBtn.style.background='#00b894';subC.textContent='1,200,001 subscribers'}};
up();renderSugg();setP();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'YouTube', tag: 'APP', icon: '', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'YouTube' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['youtube']
export default handler