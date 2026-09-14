import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const TS=[{n:'Midnight Drive',a:'Neon Vega',d:196,g:'linear-gradient(135deg,#6c5ce7,#a29bfe)',e:''},{n:'Golden Hour',a:'Sora Lane',d:224,g:'linear-gradient(135deg,#f39c12,#f9d423)',e:''},{n:'Electric Dawn',a:'Volt City',d:178,g:'linear-gradient(135deg,#0984e3,#74b9ff)',e:''},{n:'Blue Skies',a:'The Meridian',d:251,g:'linear-gradient(135deg,#00b894,#55efc4)',e:''},{n:'Paper Planes',a:'Aiden Cole',d:203,g:'linear-gradient(135deg,#e84393,#fd79a8)',e:''}];
let st=document.createElement('style');st.textContent='@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';document.head.appendChild(st);
let i=0,playing=false,sec=0,lastUp=0;
const $=id=>document.getElementById(id);
const art=$('art'),pf=$('pf'),cur=$('cur'),dur=$('dur'),tl=$('t'),ar=$('a'),pl=$('play'),stt=$('st');
function fmt(s){s=Math.max(0,Math.floor(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function load(){let T=TS[i];art.style.background=T.g;art.textContent=T.e;tl.textContent=T.n;ar.textContent=T.a;dur.textContent=fmt(T.d);sec=0;stt.textContent=playing?'▌▌ Now Playing  '+T.n:'Paused';upd()}
function upd(){pf.style.width=(Math.min(sec,TS[i].d)/TS[i].d*100)+'%';cur.textContent=fmt(sec)}
function togg(){playing=!playing;pl.textContent=playing?'':'';art.style.animation=playing?'spin 6s linear infinite':'';stt.textContent=playing?'▌▌ Now Playing  '+TS[i].n:'Paused';cur.textContent=fmt(sec)}
function nxt(){i=(i+1)%TS.length;load()}
function prv(){i=(i-1+TS.length)%TS.length;load()}
function loop(now){requestAnimationFrame(loop);if(!lastUp)lastUp=now;let dt=(now-lastUp)/1000;lastUp=now;if(playing){sec+=dt;if(sec>=TS[i].d){sec=0;nxt()}}upd()}
 $('play').addEventListener('click',togg);
$('next2').addEventListener('click',nxt);
$('prev').addEventListener('click',prv);
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();togg()}if(e.code==='ArrowRight')nxt();if(e.code==='ArrowLeft')prv()});
lastUp=0;load();requestAnimationFrame(loop);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Spotify', tag: 'APP', icon: '', html: '<div id="r" style="font-family:Arial;color:#fff"><div style="text-align:center;font-size:13px;letter-spacing:2px;color:rgba(255,255,255,.6);margin-bottom:10px">SPOTIFY</div>' +
                '<div id="art" style="width:120px;height:120px;margin:0 auto 12px;border-radius:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);display:flex;align-items:center;justify-content:center;font-size:44px;box-shadow:0 10px 30px rgba(108,92,231,.35)"></div>' +
                '<div style="text-align:center"><div id="t" style="font-size:18px;font-weight:bold"></div><div id="a" style="font-size:13px;color:rgba(255,255,255,.55);margin-top:4px"></div></div>' +
                '<div style="margin:14px 6px 2px;font-size:12px;color:rgba(255,255,255,.5)"><span id="cur">0:00</span><span id="dur" style="float:right">0:00</span></div>' +
                '<div style="height:6px;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden"><div id="pf" style="height:100%;width:0%;background:linear-gradient(90deg,#6c5ce7,#a29bfe);border-radius:4px"></div></div>' +
                '<div style="display:flex;justify-content:center;align-items:center;gap:34px;margin-top:16px;font-size:26px"><div id="prev" style="cursor:pointer;opacity:.8"></div><div id="play" style="width:56px;height:56px;border-radius:50%;background:#6c5ce7;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 8px 20px rgba(108,92,231,.4)"></div><div id="next2" style="cursor:pointer;opacity:.8"></div></div>' +
                '<div id="st" style="text-align:center;font-size:12px;color:rgba(255,255,255,.45);margin-top:12px">Paused</div></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Spotify' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['spotify']
export default handler