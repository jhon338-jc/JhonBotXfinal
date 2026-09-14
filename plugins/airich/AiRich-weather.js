import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:flex;align-items:center;gap:10px">
    <div style="flex:1;font-size:15px;font-weight:bold;color:#fff">🌍 Jakarta</div>
    <span id="unitbtn" class="chip" style="cursor:pointer">°F</span>
    <button id="ref" style="width:34px;height:34px;border:0;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;font-size:16px;cursor:pointer">🔄</button>
  </div>
  <div style="margin-top:12px;border-radius:16px;padding:22px;text-align:center;background:linear-gradient(135deg,#0984e3,#6c5ce7);border:1px solid rgba(255,255,255,.2)">
    <div id="bigicon" style="font-size:52px">⛅</div>
    <div id="cond" style="font-size:13px;color:rgba(255,255,255,.85)">Partly Cloudy</div>
    <div style="margin-top:4px"><span id="cur" style="font-size:46px;font-weight:bold;color:#fff">27°</span><span id="unit" style="color:rgba(255,255,255,.7)">C</span></div>
    <div id="range" class="muted" style="color:rgba(255,255,255,.8)">H:29° L:23°</div>
  </div>
  <div style="font-size:12px;font-weight:bold;margin:14px 0 6px;color:#fff">☔ Hourly Forecast</div>
  <div id="hourly" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px"></div>
</div>`

const GAME_JS = `
var hours=['Now','13','14','15','16','17','18','19','20'];
var icons=['☀️','⛅','🌦️','🌧️','⛈️','🌦️','🌙','🌙','🌙'];
var temps=[27,29,30,28,26,25,24,23,22];
var isC=true,spinId=null,cur=27,hi=29,lo=23;
var curEl=document.getElementById('cur'),unitEl=document.getElementById('unit'),unitBtn=document.getElementById('unitbtn'),condEl=document.getElementById('cond'),rangeEl=document.getElementById('range'),bigIcon=document.getElementById('bigicon'),hourly=document.getElementById('hourly'),ref=document.getElementById('ref');
function c2f(c){return Math.round(c*9/5+32)}
function showT(){curEl.textContent=(isC?cur:c2f(cur))+'°';unitEl.textContent=isC?'C':'F';unitBtn.textContent=isC?'°F':'°C';rangeEl.textContent='H:'+(isC?hi:c2f(hi))+'° L:'+(isC?lo:c2f(lo))+'°'}
function renderHour(){hourly.innerHTML='';hours.forEach(function(h,i){var t=isC?temps[i]:c2f(temps[i]);var d=document.createElement('div');d.style.cssText='min-width:58px;text-align:center;padding:8px 4px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px';d.innerHTML='<div class="muted" style="font-size:10px">'+h+'</div><div style="font-size:16px;margin:4px 0">'+icons[i]+'</div><div style="font-size:12px;font-weight:bold">'+t+'°</div>';hourly.appendChild(d)})}
unitBtn.onclick=function(){isC=!isC;showT();renderHour()};
function spinning(){ref.style.transform='rotate('+spinId+'deg)';if(spinId>=360){spinId=null;cur=25+Math.floor(Math.random()*6);hi=cur+2+Math.floor(Math.random()*2);lo=cur-3-Math.floor(Math.random()*2);for(var i=0;i<temps.length;i++)temps[i]=cur+Math.floor(Math.random()*4-2);var cs=[['☀️','Sunny'],['⛅','Partly Cloudy'],['🌦️','Light Rain'],['🌧️','Rainy']];var c=cs[Math.floor(Math.random()*cs.length)];bigIcon.textContent=c[0];condEl.textContent=c[1];showT();renderHour();return}spinId+=45;setTimeout(spinning,90)}
ref.onclick=function(){if(spinId!==null)return;spinId=0;spinning()};
showT();renderHour();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🌦️', key: m.key } })
    try {
        const html = shell({ title: 'Weather', tag: 'APP', icon: '🌦️', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Weather' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['weather']
export default handler