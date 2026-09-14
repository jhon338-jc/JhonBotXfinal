import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var reminders=[];
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var form=document.createElement('div');form.style.cssText='display:flex;flex-direction:column;gap:6px;margin-bottom:12px';
var inpT=document.createElement('input');inpT.placeholder='Reminder title';inpT.style.cssText='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff;font-size:13px;outline:none';
var inpD=document.createElement('input');inpD.type='number';inpD.min='1';inpD.max='60';inpD.placeholder='Minutes from now (1-60)';inpD.style.cssText=inpT.style.cssText;
var addBtn=document.createElement('button');addBtn.textContent='Set Reminder';addBtn.style.cssText='background:#6c5ce7;border:0;border-radius:10px;color:#fff;font-size:13px;padding:10px;cursor:pointer;font-weight:bold';
form.appendChild(inpT);form.appendChild(inpD);form.appendChild(addBtn);wrap.appendChild(form);
var list=document.createElement('div');list.style.cssText='display:flex;flex-direction:column;gap:6px';wrap.appendChild(list);
addBtn.addEventListener('click',function(){
var t=inpT.value.trim(),mins=parseInt(inpD.value);
if(!t||!mins||mins<1||mins>60)return;
reminders.push({title:t,deadline:Date.now()+mins*60000,done:false});
inpT.value='';inpD.value='';render()});
function render(){
list.innerHTML='';
var now=Date.now();
reminders=reminders.filter(function(r){return r.deadline>now-30000||!r.done});
reminders.forEach(function(r,i){
var left=Math.max(0,r.deadline-now);var total=reminders.length;
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px 12px';
if(left<=0&&!r.done){r.done=true;row.style.borderColor='#e74c3c';row.style.background='rgba(231,76,60,.15)'}
var info=document.createElement('div');info.style.cssText='flex:1';
var tt=document.createElement('div');tt.textContent=r.title;tt.style.cssText='font-size:13px;color:#eee;font-weight:bold;text-decoration:'+(r.done?'line-through':'none');
var sub=document.createElement('div');
if(r.done){sub.textContent='TIME!';sub.style.cssText='font-size:11px;color:#e74c3c;font-weight:bold'}
else{var sec=Math.floor(left/1000);sub.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');sub.style.cssText='font-size:11px;color:rgba(255,255,255,.5)'}
info.appendChild(tt);info.appendChild(sub);
var del=document.createElement('button');del.textContent='\u2715';del.style.cssText='background:rgba(231,76,60,.3);border:0;border-radius:6px;color:#e74c3c;font-size:12px;padding:4px 8px;cursor:pointer;flex-shrink:0';
del.addEventListener('click',function(){reminders.splice(i,1);render()});
row.appendChild(info);row.appendChild(del);list.appendChild(row)});
if(!reminders.length){var emp=document.createElement('div');emp.style.cssText='text-align:center;color:rgba(255,255,255,.35);font-size:12px;padding:16px';emp.textContent='No reminders';list.appendChild(emp)}}
render();setInterval(render,1000);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Reminder', tag: 'APP', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Reminder' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['reminder']
export default handler