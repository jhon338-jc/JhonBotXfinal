import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var RAR=[['Common','#9e9e9e','C',40],['Rare','#3498db','R',32],['Epic','#9b59b6','E',20],['Legendary','#f1c40f','L',8]];
var pity=0;
function rarity(){
var r=Math.random()*100,a=0;
for(var i=0;i<RAR.length;i++){a+=RAR[i][3];if(r<a)return i}
return 3;
}
function roll(){if(pity>=9){return Math.random()<.4?3:2}return rarity()}
function doPull(n){
if(n===10)document.getElementById('grid').style.gridTemplateColumns='repeat(5,1fr)';
var res=[];
for(var i=0;i<n;i++)res.push(roll());
if(n===10){var ix=Math.floor(Math.random()*n);if(res[ix]>2)res[ix]=2}
var g=document.getElementById('grid');g.innerHTML='';
for(var i=0;i<n;i++){
(function(idx){
var d=document.createElement('div');
d.style.cssText='aspect-ratio:3/4;border-radius:8px;background:#181830;border:1px dashed rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;min-height:92px';
d.innerHTML='<div style="font-size:26px"></div>';
d.onclick=function(){
var r=res[idx],R=RAR[r];
d.style.transition='transform .35s';d.style.transform='rotateY(90deg)';
setTimeout(function(){
d.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:34px;height:34px;border-radius:50%;background:'+R[1]+'22;border:2px solid '+R[1]+';display:flex;align-items:center;justify-content:center;font-size:16px;color:'+R[1]+';box-shadow:0 0 14px '+R[1]+'">'+R[2]+'</div><div style="font-size:10px;font-weight:bold;color:'+R[1]+'">'+R[0]+'</div><div style="font-size:8px;color:rgba(255,255,255,.45)">'+(r<=2?' EPIC':'')+'</div></div>';
d.style.border='1px solid '+R[1];d.style.boxShadow='0 0 16px '+R[1]+'66';
d.style.background='#1a1a2e';
d.style.transform='rotateY(0)';
d.style.transition='';
},180);
};
g.appendChild(d);
})(i);
}
var gotEpic=false;
for(var i=0;i<n;i++)if(res[i]<=2)gotEpic=true;
if(gotEpic)pity=0;else pity+=n;
document.getElementById('pity').textContent=pity;
document.getElementById('log').textContent=gotEpic?' EPIC / LEGENDARY muncul!':'Pity +'+n+' (10x menjamin Epic)';
}
document.getElementById('pull1').onclick=function(){doPull(1)};
document.getElementById('pull10').onclick=function(){doPull(10)};
document.getElementById('log').textContent='Tap kartu untuk reveal';
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Gacha Draw', tag: 'GAME', icon: '', html: '<div class="row" style="justify-content:space-between"><span class="big">Gacha Draw</span><span class="chip">Pity: <b id="pity">0</b></span></div><div class="muted" style="margin-top:6px">Tap kartu untuk reveal</div><div id="grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:12px 0"></div><div class="row" style="justify-content:center"><button class="btn" id="pull1" style="background:#6c5ce7"> PULL 1x</button><button class="btn" id="pull10" style="background:#e84393"> PULL 10x</button></div><div id="log" class="muted" style="text-align:center"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Gacha Draw' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['gacha']
export default handler