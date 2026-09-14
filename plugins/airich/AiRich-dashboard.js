import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px"><div class="muted">Users</div><div class="big" id="k1">12,482</div><div style="font-size:10px;color:#00b894">▲ 12.4%</div></div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px"><div class="muted">Revenue</div><div class="big" id="k2">$4,120</div><div style="font-size:10px;color:#00b894">▲ 8.1%</div></div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px"><div class="muted">Orders</div><div class="big" id="k3">1,203</div><div style="font-size:10px;color:#e17055">▼ 3.2%</div></div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px"><div class="muted">Conversion</div><div class="big" id="k4">3.8%</div><div style="font-size:10px;color:#00b894">▲ 0.6%</div></div>
  </div>
  <div style="display:flex;gap:6px;margin:14px 0 8px">
    <button class="tbtn tabA" data-t="A" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:#6c5ce7;color:#fff">Mobile</button>
    <button class="tbtn" data-t="B" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Desktop</button>
    <button class="tbtn" data-t="C" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Tablet</button>
  </div>
  <div style="font-size:12px;font-weight:bold;color:#fff">💡 Traffic by hour</div>
  <div id="chart" style="display:flex;align-items:flex-end;gap:6px;height:130px;margin-top:8px;padding:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px"></div>
  <div style="display:flex;justify-content:space-between;margin-top:6px" class="muted"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
</div>`

const GAME_JS = `
var data={A:[20,35,28,42,55,70,62,80,90,75,50,38],B:[10,15,12,18,22,30,28,35,32,25,18,12],C:[8,12,10,16,20,26,22,28,24,18,12,9]};
var labels=['00','02','04','06','08','10','12','14','16','18','20','22'];
var kpi={A:['14,210','$5,900','1,862','4.6%'],B:['8,420','$3,120','981','3.1%'],C:['3,105','$1,190','410','2.2%']};
var keys=['k1','k2','k3','k4'];
var chart=document.getElementById('chart'),btns=Array.prototype.slice.call(document.querySelectorAll('.tbtn')),active='A';
function render(){chart.innerHTML='';var arr=data[active],max=Math.max.apply(null,arr);arr.forEach(function(v,i){var d=document.createElement('div');d.style.cssText='flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%';var b=document.createElement('div');b.style.cssText='width:100%;max-width:26px;border-radius:5px 5px 0 0;background:linear-gradient(180deg,#6c5ce7,#a29bfe);height:0;transition:height .5s ease';d.appendChild(b);var l=document.createElement('div');l.className='muted';l.style.fontSize='8px';l.textContent=labels[i];d.appendChild(l);chart.appendChild(d);setTimeout(function(){b.style.height=(v/max*100)+'%'},30)});kpi[active].forEach(function(v,i){document.getElementById(keys[i]).textContent=v})}
btns.forEach(function(b){b.onclick=function(){btns.forEach(function(o){o.style.background='rgba(255,255,255,.08)';o.style.color='#ddd'});b.style.background='#6c5ce7';b.style.color='#fff';active=b.dataset.t;render()}});
render();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '📊', key: m.key } })
    try {
        const html = shell({ title: 'Dashboard', tag: 'APP', icon: '📊', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Dashboard' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['dashboard']
export default handler