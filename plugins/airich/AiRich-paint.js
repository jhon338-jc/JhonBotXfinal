import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const box=document.createElement('div');box.style.cssText='position:relative';
document.querySelector('.wrap').appendChild(box);box.appendChild(document.getElementById('game'));
const c=document.getElementById('game'),x=c.getContext('2d');
const cw=c.width,chh=c.height;
x.lineCap='round';x.lineJoin='round';
let color='#6c5ce7',size=8,drawing=false,lastX=0,lastY=0,saved=null;
function blank(){x.fillStyle='#fff';x.fillRect(0,0,cw,chh)}
blank();
const TR=document.createElement('div');TR.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin-top:8px';
document.querySelector('.wrap').appendChild(TR);
const COLS=['#6c5ce7','#e74c3c','#2ecc71','#f1c40f','#3498db','#e67e22','#e84393','#ffffff'];
COLS.forEach(function(col){
if(col==='#ffffff')return;
const s=document.createElement('button');
s.style.cssText='width:26px;height:26px;border-radius:50%;border:2px solid '+(col===color?'#fff':'transparent')+';background:'+col+';cursor:pointer';
s.onclick=function(){color=col;swatch()};TR.appendChild(s)});
function swatch(){TR.querySelectorAll('button').forEach(function(b,i){b.style.borderColor=b.style.background===color?'#fff':'transparent'})}
const SZ=document.createElement('input');SZ.type='range';SZ.min='2';SZ.max='32';SZ.value='8';
SZ.style.cssText='flex:1;accent-color:#6c5ce7;min-width:100px';
TR.appendChild(SZ);
SZ.oninput=function(){size=parseInt(SZ.value)};
const ER=document.createElement('button');ER.textContent='🧽 Eraser';ER.style.cssText='flex:1;padding:9px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:11px;cursor:pointer';ER.onclick=function(){color='#ffffff'};TR.appendChild(ER);
const ROW2=document.createElement('div');ROW2.style.cssText='display:flex;gap:6px;margin-top:6px';
document.querySelector('.wrap').appendChild(ROW2);
const CLS=document.createElement('button');CLS.textContent='🗑 Clear';CLS.style.cssText='flex:1;padding:9px;border:0;border-radius:8px;background:rgba(231,76,60,.8);color:#fff;font-size:11px;font-weight:bold;cursor:pointer';CLS.onclick=function(){blank()};ROW2.appendChild(CLS);
const SAV=document.createElement('button');SAV.textContent='⬇ Save';SAV.style.cssText='flex:1;padding:9px;border:0;border-radius:8px;background:#2ecc71;color:#fff;font-size:11px;font-weight:bold;cursor:pointer';SAV.onclick=function(){const a=document.createElement('a');a.download='paint.png';a.href=c.toDataURL('image/png');a.click()};ROW2.appendChild(SAV);
function down(e){drawing=true;const r=c.getBoundingClientRect();lastX=(e.clientX-r.left)*(cw/r.width);lastY=(e.clientY-r.top)*(chh/r.height);saved=x.getImageData(0,0,cw,chh)}
function move(e){
if(!drawing)return;
const r=c.getBoundingClientRect();
const px=(e.clientX-r.left)*(cw/r.width),py=(e.clientY-r.top)*(chh/r.height);
x.strokeStyle=color;x.lineWidth=size;
x.beginPath();x.moveTo(lastX,lastY);x.lineTo(px,py);x.stroke();
lastX=px;lastY=py}
function up(){drawing=false}
c.addEventListener('pointerdown',function(e){e.preventDefault();c.setPointerCapture(e.pointerId);down(e)});
c.addEventListener('pointermove',move);
c.addEventListener('pointerup',up);
c.addEventListener('pointerleave',up);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } })
    try {
        const html = shell({ title: 'Paint', tag: 'TOOL', icon: '🎨', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Paint' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['paint']
export default handler