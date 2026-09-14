import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var now=new Date(),y=now.getFullYear(),m=now.getMonth();
var wrap=document.createElement('div');
document.querySelector('.wrap').appendChild(wrap);
var nav=document.createElement('div');nav.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:10px';
var prev=document.createElement('button');prev.textContent='<';prev.style.cssText='background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#fff;padding:8px 14px;font-size:16px;cursor:pointer';
var next=document.createElement('button');next.textContent='>';next.style.cssText=prev.style.cssText;
var lbl=document.createElement('div');lbl.style.cssText='color:#fff;font-size:14px;font-weight:bold';
nav.appendChild(prev);nav.appendChild(lbl);nav.appendChild(next);wrap.appendChild(nav);
var info=document.createElement('div');info.style.cssText='background:rgba(108,92,231,.25);border:1px solid rgba(108,92,231,.4);border-radius:10px;padding:10px 12px;margin-top:10px;display:none;color:#eee;font-size:13px';
wrap.appendChild(info);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center';
wrap.appendChild(grid);
var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function render(){
lbl.textContent=['January','February','March','April','May','June','July','August','September','October','November','December'][m]+' '+y;
grid.innerHTML='';
days.forEach(function(d){var h=document.createElement('div');h.style.cssText='font-size:10px;color:rgba(255,255,255,.45);padding:4px 0;font-weight:bold';h.textContent=d;grid.appendChild(h)});
var first=new Date(y,m,1).getDay(),daysInMonth=new Date(y,m+1,0).getDate();
for(var i=0;i<first;i++){var e=document.createElement('div');grid.appendChild(e)}
for(var d=1;d<=daysInMonth;d++){
var b=document.createElement('button');b.textContent=d;
var isWeekend=(new Date(y,m,d).getDay()===0||new Date(y,m,d).getDay()===6);
var isToday=d===now.getDate()&&m===now.getMonth()&&y===now.getFullYear();
b.style.cssText='border:0;border-radius:8px;padding:8px 0;font-size:13px;cursor:pointer;color:#fff;background:'+(isToday?'#6c5ce7':isWeekend?'rgba(231,76,60,.35)':'rgba(255,255,255,.06)')+';transition:all .2s';
b.addEventListener('click',(function(day){return function(){
info.style.display='block';
var dt=new Date(y,m,day);
info.innerHTML='<b style="color:#6c5ce7">'+days[dt.getDay()]+'</b><br>'+['January','February','March','April','May','June','July','August','September','October','November','December'][m]+' '+day+', '+y+(isToday?' (Hari Ini)':'')+(dt.getDay()===0||dt.getDay()===6?' (Weekend)':'');
}})(d));
grid.appendChild(b)}}
prev.addEventListener('click',function(){m--;if(m<0){m=11;y--}render()});
next.addEventListener('click',function(){m++;if(m>11){m=0;y++}render()});
render();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '📅', key: m.key } })
    try {
        const html = shell({ title: 'Calendar', tag: 'APP', icon: '📅', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Calendar' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['calendar']
export default handler