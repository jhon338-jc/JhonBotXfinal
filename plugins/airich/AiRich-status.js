import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var start=Date.now();
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
function makeRow(label,initial){
var r=document.createElement('div');r.style.cssText='display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px 14px;margin-bottom:6px';
var l=document.createElement('span');l.textContent=label;l.style.cssText='font-size:13px;color:#eee';
var dot=document.createElement('span');dot.style.cssText='width:10px;height:10px;border-radius:50%;background:'+(initial||'#2ecc71');
var val=document.createElement('span');val.style.cssText='font-size:12px;color:rgba(255,255,255,.6);font-family:monospace';
r.appendChild(l);r.appendChild(val);r.appendChild(dot);wrap.appendChild(r);return{el:val,dot:dot}}
var uptimeRow=makeRow('Uptime','');
var pingRow=makeRow('Ping','');
var serverRow=makeRow('Server','#2ecc71');
var dbRow=makeRow('Database','#2ecc71');
var cacheRow=makeRow('Cache','#f39c12');
var refreshBtn=document.createElement('button');refreshBtn.textContent='Refresh';refreshBtn.style.cssText='width:100%;background:rgba(108,92,231,.25);border:1px solid rgba(108,92,231,.4);border-radius:10px;padding:10px;color:#fff;font-size:13px;font-weight:bold;cursor:pointer;margin-top:10px';
wrap.appendChild(refreshBtn);
var tick=0;
function fmt(ms){
var s=Math.floor(ms/1000),m=Math.floor(s/60),h=Math.floor(m/60);
return String(h).padStart(2,'0')+':'+String(m%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function pingAnim(){
var ping=Math.floor(Math.random()*80)+20;
pingRow.el.textContent=ping+'ms';
pingRow.dot.style.background=ping<50?'#2ecc71':ping<100?'#f39c12':'#e74c3c'}
function flicker(d){var states=['#2ecc71','#f39c12','#e74c3c','#2ecc71'];d.dot.style.background=states[tick%states.length]}
function refresh(){
tick++;
uptimeRow.el.textContent=fmt(Date.now()-start);
pingAnim();flicker(serverRow);flicker(dbRow);flicker(cacheRow)}
refreshBtn.addEventListener('click',refresh);
refresh();setInterval(refresh,1500);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Status', tag: 'APP', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Status' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['status']
export default handler