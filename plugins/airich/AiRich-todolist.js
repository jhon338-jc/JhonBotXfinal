import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var tasks=[],filter='all';
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var inputRow=document.createElement('div');inputRow.style.cssText='display:flex;gap:6px;margin-bottom:10px';
var inp=document.createElement('input');inp.placeholder='Add task...';inp.style.cssText='flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff;font-size:13px;outline:none';
var addBtn=document.createElement('button');addBtn.textContent='+';addBtn.style.cssText='background:#6c5ce7;border:0;border-radius:10px;color:#fff;font-size:18px;width:42px;cursor:pointer;font-weight:bold';
inputRow.appendChild(inp);inputRow.appendChild(addBtn);wrap.appendChild(inputRow);
var stats=document.createElement('div');stats.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:8px';
var counter=document.createElement('div');counter.style.cssText='font-size:11px;color:rgba(255,255,255,.5)';
var tabRow=document.createElement('div');tabRow.style.cssText='display:flex;gap:4px';
stats.appendChild(counter);stats.appendChild(tabRow);wrap.appendChild(stats);
['all','active','done'].forEach(function(f){
var t=document.createElement('button');t.textContent=f.charAt(0).toUpperCase()+f.slice(1);
t.style.cssText='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:4px 10px;font-size:10px;color:#aaa;cursor:pointer';
t.addEventListener('click',function(){filter=f;render()});tabRow.appendChild(t)});
var list=document.createElement('div');list.style.cssText='display:flex;flex-direction:column;gap:6px;margin-top:6px';wrap.appendChild(list);
function addTask(){var v=inp.value.trim();if(!v)return;tasks.push({text:v,done:false});inp.value='';render()}
addBtn.addEventListener('click',addTask);
inp.addEventListener('keydown',function(e){if(e.key==='Enter')addTask()});
function render(){
list.innerHTML='';
var filtered=tasks.filter(function(t){return filter==='all'||(filter==='active'&&!t.done)||(filter==='done'&&t.done)});
var done=tasks.filter(function(t){return t.done}).length;
counter.textContent=done+'/'+tasks.length+' done';
list.parentElement.querySelectorAll('button').forEach(function(b){var f=b.textContent.toLowerCase();b.style.background=filter===f?'#6c5ce7':'rgba(255,255,255,.08)';b.style.color=filter===f?'#fff':'#aaa'});
filtered.forEach(function(t,i){
var real=tasks.indexOf(t);
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px 12px';
var cb=document.createElement('div');cb.style.cssText='width:20px;height:20px;border-radius:50%;border:2px solid '+(t.done?'#6c5ce7':'rgba(255,255,255,.25)')+';background:'+(t.done?'#6c5ce7':'transparent')+';cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;flex-shrink:0';
cb.textContent=t.done?'\u2713':'';
cb.addEventListener('click',function(){tasks[real].done=!tasks[real].done;render()});
var txt=document.createElement('div');txt.textContent=t.text;txt.style.cssText='flex:1;font-size:13px;color:#eee;text-decoration:'+(t.done?'line-through':'none')+';opacity:'+(t.done?'.5':'1');
var del=document.createElement('button');del.textContent='\u2715';del.style.cssText='background:rgba(231,76,60,.3);border:0;border-radius:6px;color:#e74c3c;font-size:12px;padding:4px 8px;cursor:pointer;flex-shrink:0';
del.addEventListener('click',function(){tasks.splice(real,1);render()});
row.appendChild(cb);row.appendChild(txt);row.appendChild(del);list.appendChild(row)});
if(!filtered.length){var emp=document.createElement('div');emp.style.cssText='text-align:center;color:rgba(255,255,255,.35);font-size:12px;padding:16px';emp.textContent='No tasks';list.appendChild(emp)}}
render();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'To-Do List', tag: 'APP', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'To-Do List' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['todolist']
export default handler