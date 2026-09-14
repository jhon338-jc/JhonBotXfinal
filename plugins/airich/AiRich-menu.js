import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var cats=[
{name:'GAMES',icon:'',items:['2048 - Puzzle sliding numbers','Dino Runner - Endless runner']},
{name:'APPS',icon:'',items:['Calendar - Monthly calendar view','To-Do List - Task manager','Notes - Sticky note cards','Reminder - Timer alerts','Status - Bot dashboard']},
{name:'TOOLS',icon:'',items:['Calculator - Math with history']}
];
var desc=document.createElement('div');desc.style.cssText='background:rgba(108,92,231,.12);border:1px solid rgba(108,92,231,.3);border-radius:10px;padding:12px;margin-bottom:10px;display:none;color:#eee;font-size:12px;line-height:1.5';
wrap.appendChild(desc);
var chips=document.createElement('div');chips.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px';wrap.appendChild(chips);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:8px';wrap.appendChild(grid);
var activeChip=null;
cats.forEach(function(cat){
var card=document.createElement('div');card.style.cssText='background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 8px;text-align:center;cursor:pointer;transition:all .2s';
var ic=document.createElement('div');ic.textContent=cat.icon;ic.style.cssText='font-size:28px;margin-bottom:6px';
var nm=document.createElement('div');nm.textContent=cat.name;nm.style.cssText='font-size:11px;font-weight:bold;color:rgba(255,255,255,.7);letter-spacing:1px';
card.appendChild(ic);card.appendChild(nm);
card.addEventListener('click',function(){
desc.style.display='block';
var list=cat.items.map(function(i){return'<div style=\\"padding:3px 0;color:#ddd\\">- '+i+'</div>'}).join('');
desc.innerHTML='<b style=\\"color:#6c5ce7\\">'+cat.icon+' '+cat.name+'</b>'+list;
grid.querySelectorAll('div').forEach(function(c){c.style.borderColor='rgba(255,255,255,.1)';c.style.background='rgba(255,255,255,.06)'});
card.style.borderColor='#6c5ce7';card.style.background='rgba(108,92,231,.2)';
if(activeChip)activeChip.remove();
var ch=document.createElement('div');ch.style.cssText='background:#6c5ce7;border-radius:12px;padding:4px 10px;font-size:10px;color:#fff;display:inline-flex;align-items:center;gap:4px';
ch.textContent=cat.icon+' '+cat.name+' Active';
chips.appendChild(ch);activeChip=ch});
grid.appendChild(card)});
var footer=document.createElement('div');footer.style.cssText='text-align:center;font-size:10px;color:rgba(255,255,255,.4);margin-top:14px;padding-top:10px;border-top:1px solid rgba(255,255,255,.08)';
footer.textContent='Ketik <command> untuk membuka';
wrap.appendChild(footer);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'AI Rich Menu', tag: 'MENU', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'AI Rich Menu' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['airichmenu', 'arichmenu']
export default handler