import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var CNT=document.createElement('div');CNT.style.cssText='text-align:center;margin:10px 0';
document.querySelector('.wrap').appendChild(CNT);
var PER=document.createElement('div');PER.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-bottom:8px';
document.querySelector('.wrap').appendChild(PER);
var COOK=document.createElement('div');COOK.style.cssText='width:100px;height:100px;margin:0 auto;border-radius:50%;background:radial-gradient(circle,#f4a73c,#d4821e);font-size:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .1s;border:3px solid rgba(255,255,255,.2);box-shadow:0 4px 20px rgba(244,167,60,.3)';
COOK.textContent='';
document.querySelector('.wrap').appendChild(COOK);
var UPD=document.createElement('div');UPD.style.cssText='margin-top:12px';
document.querySelector('.wrap').appendChild(UPD);
var total=0,pps=0,clicks=1;
var ups=[
{name:'Auto Clicker',base:15,scale:1.5,count:0,inc:1},
{name:'Grandma',base:100,scale:1.6,count:0,inc:5},
{name:'Factory',base:500,scale:1.7,count:0,inc:25},
{name:'Bank',base:2000,scale:1.8,count:0,inc:100},
{name:'Lab',base:10000,scale:1.9,count:0,inc:500}
];
function cost(i){return Math.floor(ups[i].base*Math.pow(ups[i].scale,ups[i].count))}
function fmt(n){if(n>=1e9)return(n/1e9).toFixed(1)+'B';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return Math.floor(n)}
function updUI(){
CNT.innerHTML='<div style="font-size:32px;font-weight:bold;color:#f4a73c">'+fmt(total)+'</div><div style="font-size:11px;color:rgba(255,255,255,.5)">cookies</div>';
PER.innerHTML='<span style="color:#6c5ce7">'+fmt(pps)+'</span> per second | <span style="color:#2ecc71">+'+clicks+'</span> per click';
UPD.innerHTML='';
for(var i=0;i<ups.length;i++){
var c=cost(i);var b=document.createElement('button');
b.style.cssText='display:flex;justify-content:space-between;align-items:center;width:100%;padding:10px 12px;margin:4px 0;border:1px solid '+(total>=c?'rgba(108,92,231,.4)':'rgba(255,255,255,.08)')+';border-radius:10px;background:'+(total>=c?'rgba(108,92,231,.15)':'rgba(255,255,255,.04)')+';color:#fff;font-size:12px;cursor:'+(total>=c?'pointer':'not-allowed')+';opacity:'+(total>=c?1:.5);
b.innerHTML='<span><b>'+ups[i].name+'</b> <span style="color:rgba(255,255,255,.4)">x'+ups[i].count+'</span></span><span style="color:'+(total>=c?'#f1c40f':'rgba(255,255,255,.3)')+'">'+fmt(c)+'</span>';
(function(idx){b.onclick=function(){if(total>=cost(idx)){total-=cost(idx);ups[idx].count++;recalc();updUI()}}})(i);
UPD.appendChild(b)}}
function recalc(){pps=0;clicks=1;for(var i=0;i<ups.length;i++){pps+=ups[i].count*ups[i].inc}clicks+=ups[0].count}
COOK.addEventListener('pointerdown',function(e){e.preventDefault();total+=clicks;COOK.style.transform='scale(.9)';setTimeout(function(){COOK.style.transform='scale(1)'},80);updUI()});
setInterval(function(){total+=pps;updUI()},1000);
updUI();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Clicker', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Clicker' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['clicker']
export default handler
