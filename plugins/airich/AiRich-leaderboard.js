import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:flex;gap:6px;margin:4px 0 12px">
    <button class="lb lA" data-p="all" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:#6c5ce7;color:#fff">ALL-TIME</button>
    <button class="lb" data-p="week" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">WEEKLY</button>
  </div>
  <div id="list"></div>
</div>`

const GAME_JS = `
var data={all:[['Nova',9840],['Bima',8210],['Citra',7640],['Reza',6120],['Ayu',5480],['Dika',4930],['Eko',4210],['Sari',3860]],week:[['Bima',1240],['Ayu',1180],['Reza',1105],['Nova',980],['Citra',865],['Eko',740],['Dika',620],['Sari',515]]};
var medals=['','',''];
var active='all',listEl=document.getElementById('list'),tabs=Array.prototype.slice.call(document.querySelectorAll('.lb'));
function render(){listEl.innerHTML='';var rows=data[active],max=rows[0][1];rows.forEach(function(r,i){var top=i.index===0;var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;margin-bottom:6px;background:'+(i<3?'linear-gradient(90deg,rgba(108,92,231,.28),rgba(255,255,255,.03))':'rgba(255,255,255,.04)')+';border:1px solid '+(i===0?'rgba(255,213,0,.45)':'rgba(255,255,255,.08)')+'';d.innerHTML='<div style="width:30px;text-align:center;font-size:17px">'+(i<3?medals[i]:'#'+(i+1))+'</div><div style="flex:1"><div style="font-size:13px;font-weight:bold;color:#fff">'+r[0]+'</div><div style="height:8px;border-radius:4px;background:rgba(255,255,255,.1);margin-top:5px;overflow:hidden"><div data-b style="height:100%;width:0;border-radius:4px;background:linear-gradient(90deg,#6c5ce7,#a29bfe);transition:width .8s ease"></div></div></div><div style="font-size:13px;font-weight:bold;color:#ffd700">'+r[1].toLocaleString()+'</div>';listEl.appendChild(d);setTimeout(function(){d.querySelector('[data-b]').style.width=(r[1]/max*100)+'%'},40)})}
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(o){o.style.background='rgba(255,255,255,.08)';o.style.color='#ddd'});t.style.background='#6c5ce7';t.style.color='#fff';active=t.dataset.p;render()}});
render();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Leaderboard', tag: 'APP', icon: '', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Leaderboard' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['leaderboard']
export default handler