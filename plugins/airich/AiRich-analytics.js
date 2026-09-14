import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px"><div class="muted">Visits</div><div class="big" id="c1">124K</div></div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px"><div class="muted">Bounce</div><div class="big" id="c2">28%</div></div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px"><div class="big" id="c3" style="color:#00b894">▲ 18%</div><div class="muted">Growth</div></div>
  </div>
  <div style="display:flex;gap:6px;margin:14px 0 8px">
    <button class="ptab pA" data-p="D" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:#6c5ce7;color:#fff">Day</button>
    <button class="ptab" data-p="W" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Week</button>
    <button class="ptab" data-p="M" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Month</button>
  </div>
  <div style="font-size:12px;font-weight:bold;color:#fff" id="charttitle"> Daily Activity</div>
  <div id="chartbox" style="display:block;margin-top:8px;padding:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px"></div>
</div>`

const GAME_JS = `
var per={D:{n:12,title:'Daily Activity'},W:{n:7,title:'Weekly Activity'},M:{n:30,title:'Monthly Activity'}};
var active='D';
var box=document.getElementById('chartbox'),tabs=Array.prototype.slice.call(document.querySelectorAll('.ptab')),c1=document.getElementById('c1'),c2=document.getElementById('c2'),c3=document.getElementById('c3'),ttl=document.getElementById('charttitle');
function gen(n){var a=[];for(var i=0;i<n;i++)a.push(35+Math.floor(Math.random()*65));return a}
function build(){var n=per[active].n,data=gen(n),w=520,h=170,pad=18,max=100,j,k;
var pts=[];for(j=0;j<n;j++)pts.push([pad+(w-2*pad)*j/(n-1),h-pad-(data[j]/100)*(h-2*pad)]);
var line='';for(j=0;j<n;j++)line+=(j?' ':'')+pts[j][0].toFixed(1)+','+pts[j][1].toFixed(1);
var area='M'+pad+','+h+' L'+line.replace(/ /g,' L')+' L'+(w-pad)+','+h+' Z';
var seg=(w-2*pad)/(n-1),len=(n-1)*seg,sum=0;
for(k=0;k<n;k++)sum+=data[k];
c1.textContent=sum.toFixed(0)+'K';c2.textContent=(18+Math.floor(Math.random()*14))+'%';
var gr=Math.floor(Math.random()*11)-5;c3.textContent=(gr>=0?'▲ ':'▼ ')+Math.abs(gr)+'%';c3.style.color=gr>=0?'#00b894':'#e17055';
ttl.textContent=' '+per[active].title;
var svg='<svg viewBox="0 0 '+w+' '+h+'" style="width:100%;display:block"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(108,92,231,.35)"/><stop offset="100%" stop-color="rgba(108,92,231,0)"/></linearGradient></defs>';
svg+='<path d="'+area+'" fill="url(#gr)"/>';
svg+='<polyline points="'+line+'" fill="none" stroke="#6c5ce7" stroke-width="3" stroke-linecap="round" stroke-dasharray="'+len.toFixed(0)+'" stroke-dashoffset="'+len.toFixed(0)+'" style="animation:draw 1s ease forwards"/>';
for(j=0;j<n;j++)svg+='<circle cx="'+pts[j][0].toFixed(1)+'" cy="'+pts[j][1].toFixed(1)+'" r="4" fill="#a29bfe" style="transform-box:fill-box;transform-origin:center;animation:pop .3s ease '+(j*0.04)+'s backwards"/>';
svg+='<style>@keyframes draw{to{stroke-dashoffset:0}}@keyframes pop{0%{transform:scale(0)}100%{transform:scale(1)}}</style>';
box.innerHTML=svg+'</svg>'}
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(o){o.style.background='rgba(255,255,255,.08)';o.style.color='#ddd'});t.style.background='#6c5ce7';t.style.color='#fff';active=t.dataset.p;build()}});
build();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Analytics', tag: 'APP', icon: '', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Analytics' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['analytics']
export default handler