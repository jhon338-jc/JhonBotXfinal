import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var notes=[],colors=['#6c5ce7','#e74c3c','#2ecc71','#f39c12','#1abc9c','#e91e63'];
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var inputRow=document.createElement('div');inputRow.style.cssText='display:flex;gap:6px;margin-bottom:10px';
var inp=document.createElement('input');inp.placeholder='New note...';inp.style.cssText='flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff;font-size:13px;outline:none';
var addBtn=document.createElement('button');addBtn.textContent='+';addBtn.style.cssText='background:#6c5ce7;border:0;border-radius:10px;color:#fff;font-size:18px;width:42px;cursor:pointer;font-weight:bold';
inputRow.appendChild(inp);inputRow.appendChild(addBtn);wrap.appendChild(inputRow);
var searchInp=document.createElement('input');searchInp.placeholder='Search notes...';searchInp.style.cssText='width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 10px;color:#fff;font-size:12px;outline:none;margin-bottom:10px';
wrap.appendChild(searchInp);
var counter=document.createElement('div');counter.style.cssText='font-size:11px;color:rgba(255,255,255,.45);margin-bottom:8px';wrap.appendChild(counter);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(2,1fr);gap:8px';wrap.appendChild(grid);
var colorBar=document.createElement('div');colorBar.style.cssText='display:flex;gap:5px;margin-top:10px;margin-bottom:6px';
colors.forEach(function(c,i){
var cb=document.createElement('div');cb.style.cssText='width:24px;height:24px;border-radius:50%;background:'+c+';cursor:pointer;border:2px solid '+(i===0?'#fff':'transparent')+';transition:border .2s';
cb.setAttribute('data-c',c);cb.addEventListener('click',function(){selColor=c;colorBar.querySelectorAll('div').forEach(function(b){b.style.borderColor=b.getAttribute('data-c')===selColor?'#fff':'transparent'})});
colorBar.appendChild(cb)});
wrap.appendChild(colorBar);
var selColor=colors[0];
function addNote(){var v=inp.value.trim();if(!v)return;notes.push({text:v,color:selColor,ts:Date.now()});inp.value='';render()}
addBtn.addEventListener('click',addNote);
inp.addEventListener('keydown',function(e){if(e.key==='Enter')addNote()});
searchInp.addEventListener('input',render);
function render(){
grid.innerHTML='';
var q=searchInp.value.toLowerCase();
var f=notes.filter(function(n){return !q||n.text.toLowerCase().indexOf(q)!==-1});
counter.textContent=f.length+' note'+(f.length!==1?'s':'')+' saved';
f.forEach(function(n){
var real=notes.indexOf(n);
var card=document.createElement('div');card.style.cssText='background:'+n.color+';border-radius:10px;padding:10px;position:relative;min-height:80px';
var del=document.createElement('button');del.textContent='\u2715';del.style.cssText='position:absolute;top:4px;right:6px;background:rgba(0,0,0,.3);border:0;border-radius:50%;color:#fff;font-size:11px;width:22px;height:22px;cursor:pointer;display:flex;align-items:center;justify-content:center';
del.addEventListener('click',function(){notes.splice(real,1);render()});
var txt=document.createElement('div');txt.textContent=n.text;txt.style.cssText='font-size:12px;color:#fff;word-wrap:break-word;padding-right:18px;line-height:1.4';
var time=document.createElement('div');var dt=new Date(n.ts);time.textContent=dt.getHours()+':'+String(dt.getMinutes()).padStart(2,'0')+' '+dt.getDate()+'/'+(dt.getMonth()+1);
time.style.cssText='font-size:9px;color:rgba(255,255,255,.6);margin-top:8px';
card.appendChild(del);card.appendChild(txt);card.appendChild(time);grid.appendChild(card)});
if(!f.length){counter.textContent='No notes found'}}
render();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Notes', tag: 'APP', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Notes' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['notes']
export default handler