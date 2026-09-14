import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var sounds=[
{emoji:'',name:'Dog',color:'#e17055'},
{emoji:'',name:'Cat',color:'#fd79a8'},
{emoji:'',name:'Horn',color:'#fdcb6e'},
{emoji:'',name:'Drum',color:'#6c5ce7'},
{emoji:'',name:'Bell',color:'#00b894'},
{emoji:'',name:'Guitar',color:'#e84393'},
{emoji:'',name:'Piano',color:'#0984e3'},
{emoji:'',name:'Sax',color:'#d63031'},
{emoji:'',name:'Mic',color:'#a29bfe'},
{emoji:'',name:'Boom',color:'#ff7675'},
{emoji:'',name:'Note',color:'#55efc4'},
{emoji:'',name:'Pop',color:'#fab1a0'}
];
var grid=document.createElement('div');
grid.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0';
document.querySelector('.wrap').appendChild(grid);
var vizWrap=document.createElement('div');
vizWrap.style.cssText='height:40px;display:flex;align-items:flex-end;gap:3px;padding:8px 0;justify-content:center';
document.querySelector('.wrap').appendChild(vizWrap);
var bars=[];
for(var i=0;i<24;i++){
var b=document.createElement('div');
b.style.cssText='width:8px;height:4px;background:#6c5ce7;border-radius:4px;transition:height .1s';
vizWrap.appendChild(b);
bars.push(b);
}
var holdTimer=null,holdTarget=null;
sounds.forEach(function(s,idx){
var btn=document.createElement('div');
btn.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;cursor:pointer;transition:all .15s';
btn.innerHTML='<div style="font-size:28px">'+s.emoji+'</div><div style="font-size:9px;color:rgba(255,255,255,.5)">'+s.name+'</div>';
btn.addEventListener('pointerdown',function(e){
e.preventDefault();
btn.style.background=s.color+'33';
btn.style.transform='scale(0.92)';
btn.style.boxShadow='0 0 20px '+s.color+'55';
flashViz(s.color);
holdTarget=idx;
holdTimer=setInterval(function(){
showIndicator(idx);
},300);
});
btn.addEventListener('pointerup',function(){
btn.style.background='rgba(255,255,255,.06)';
btn.style.transform='scale(1)';
btn.style.boxShadow='none';
clearInterval(holdTimer);
hideIndicator();
});
btn.addEventListener('pointerleave',function(){
btn.style.background='rgba(255,255,255,.06)';
btn.style.transform='scale(1)';
btn.style.boxShadow='none';
clearInterval(holdTimer);
hideIndicator();
});
grid.appendChild(btn);
});
var indicator=document.createElement('div');
indicator.style.cssText='text-align:center;font-size:11px;color:#6c5ce7;min-height:16px;margin-top:4px;opacity:0;transition:opacity .2s';
indicator.textContent='';
document.querySelector('.wrap').appendChild(indicator);
function flashViz(color){
bars.forEach(function(b,i){
setTimeout(function(){
var h=8+Math.random()*32;
b.style.height=h+'px';
b.style.background=color||'#6c5ce7';
setTimeout(function(){b.style.height='4px';},120);
},i*15);
});
}
function showIndicator(idx){
indicator.style.opacity='1';
indicator.textContent='HOLDING: '+sounds[idx].emoji+' '+sounds[idx].name+' ...';
}
function hideIndicator(){
indicator.style.opacity='0';
indicator.textContent='';
}
var surpriseBtn=document.createElement('div');
surpriseBtn.style.cssText='text-align:center;margin-top:8px;padding:10px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:10px;font-size:13px;font-weight:bold;color:#fff;cursor:pointer';
surpriseBtn.textContent=' Random Surprise';
surpriseBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
surpriseBtn.style.transform='scale(0.95)';
var r=Math.floor(Math.random()*sounds.length);
flashViz(sounds[r].color);
indicator.style.opacity='1';
indicator.textContent='Surprise! '+sounds[r].emoji+' '+sounds[r].name+'!';
setTimeout(function(){hideIndicator();},1500);
});
surpriseBtn.addEventListener('pointerup',function(){surpriseBtn.style.transform='scale(1)';});
document.querySelector('.wrap').appendChild(surpriseBtn);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Soundboard', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Soundboard' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['soundboard']
export default handler
