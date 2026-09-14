import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const TS=[{n:'Tokyo Drift',a:'Yuzu',d:214},{n:'Night Owl',a:'Kimi',d:190},{n:'Afterglow',a:'Nova',d:238}];
const H=[30,42,18,55,36,64,25,48,70,33,52,80,44,29,61,38,74,23,58,45,82,36,50,28,66,41,31,57,24,49,35,68];
let st=document.createElement('style');st.textContent='@keyframes wav{from{transform:scaleY(.35)}to{transform:scaleY(1.15)}}';document.head.appendChild(st);
let i=0,playing=false,sec=0,lastUp=0,following=false;
const $=id=>document.getElementById(id);
const tt=$('tt'),aa=$('aa'),dd=$('dd'),wave=$('wave'),pl=$('play'),fol=$('fol'),cur=$('cur'),sl=$('sl');
let bars=[];
H.forEach(function(h){let b=document.createElement('span');b.style.cssText='flex:1;height:'+h+'%;border-radius:3px;background:rgba(255,255,255,.22);transform-origin:bottom';wave.appendChild(b);bars.push(b)});
function fmt(s){s=Math.max(0,Math.floor(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function load(){let T=TS[i];tt.textContent=T.n;aa.textContent=T.a;dd.textContent=fmt(T.d);sec=0;sl.value=0;upd()}
function upd(){let pct=Math.min(100,sec/TS[i].d*100);sl.value=pct;cur.textContent=fmt(sec);
bars.forEach(function(b,k){if(k<=pct/100*H.length){b.style.background='linear-gradient(180deg,#f26b00,#ffb75e)'}else{b.style.background='rgba(255,255,255,.22)'}b.style.animation=playing?'wav .5s infinite alternate':'none';b.style.animationDelay=k*.04+'s'})}
function togg(){playing=!playing;pl.textContent=playing?'':'';upd()}
function folTogg(){following=!following;fol.textContent=following?'FOLLOWING':'FOLLOW';fol.style.background=following?'rgba(242,107,0,.85)':'rgba(255,255,255,.1)'}
pl.addEventListener('click',togg);
fol.addEventListener('click',folTogg);
sl.addEventListener('input',function(e){sec=e.target.value/100*TS[i].d;upd()});
function loop(now){requestAnimationFrame(loop);if(!lastUp)lastUp=now;let dt=(now-lastUp)/1000;lastUp=now;if(playing){sec+=dt;if(sec>=TS[i].d){sec=0;i=(i+1)%TS.length;load()}}upd()}
load();requestAnimationFrame(loop);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'SoundCloud', tag: 'APP', icon: '', html: '<div style="font-family:Arial;color:#fff"><div style="text-align:center;font-size:13px;letter-spacing:2px;color:rgba(255,255,255,.6);margin-bottom:10px">SOUNDCLOUD</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><div id="tt" style="font-size:16px;font-weight:bold"></div><div id="aa" style="font-size:12px;color:rgba(255,255,255,.55)"></div></div><button id="fol" style="border:1px solid rgba(242,107,0,.6);background:rgba(255,255,255,.1);color:#fff;border-radius:20px;padding:8px 16px;font-size:12px;font-weight:bold;cursor:pointer">FOLLOW</button></div>' +
                '<div id="wave" style="height:110px;display:flex;align-items:flex-end;gap:2px;margin:12px 0"></div>' +
                '<div style="display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.55)"><span id="cur">0:00</span><span id="dd">0:00</span></div>' +
                '<input id="sl" type="range" min="0" max="100" value="0" style="width:100%;accent-color:#f26b00;height:26px">' +
                '<div style="display:flex;align-items:center;justify-content:center;margin-top:6px"><button id="play" style="background:linear-gradient(135deg,#f26b00,#ffb75e);border:0;color:#fff;border-radius:50%;width:58px;height:58px;font-size:20px;cursor:pointer;box-shadow:0 8px 20px rgba(242,107,0,.35)"></button></div></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'SoundCloud' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['soundcloud']
export default handler