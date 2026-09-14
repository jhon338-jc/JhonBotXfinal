import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var grid=document.getElementById('mg');if(!grid){grid=document.createElement('div');grid.id='mg';grid.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:14px';document.querySelector('.wrap').appendChild(grid)}
var info=document.getElementById('mgi');if(!info){info=document.createElement('div');info.id='mgi';info.style.cssText='text-align:center;margin:8px 0';document.querySelector('.wrap').appendChild(info)}
var cells=[],moles={},score=0,time=30,playing=false,timer=null;
function init(){score=0;time=30;playing=false;moles={};clearInterval(timer);
grid.innerHTML='';cells=[];
for(var i=0;i<9;i++){var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;justify-content:center;font-size:40px;aspect-ratio:1;border-radius:12px;background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.08);cursor:pointer;transition:all .15s';d.textContent='';d.setAttribute('data-i',i);d.onclick=function(){whack(parseInt(this.getAttribute('data-i')))};cells.push(d);grid.appendChild(d)}
updateInfo()}
function updateInfo(){info.innerHTML=(playing?'<span style="color:rgba(255,255,255,.6);font-size:13px">Time: </span><span style="color:'+(time<=5?'#e17055':'#6c5ce7')+';font-weight:bold;font-size:15px">'+time+'s</span>':'')+'<span style="color:rgba(255,255,255,.6);font-size:13px;margin-left:10px">Score: </span><span style="color:#00b894;font-weight:bold;font-size:15px">'+score+'</span>'+(time<=0?'<div style="color:#e17055;margin-top:6px;font-weight:bold">TIME UP! Score: '+score+' | Tap mole holes to play again</div>':'')}
function whack(i){if(!playing&&time<=0){startGame();return}if(!playing)return;if(!moles[i])return;clearTimeout(moles[i].timer);cells[i].textContent='';score++;cells[i].style.background='rgba(0,184,148,.2)';delete moles[i];setTimeout(function(){cells[i].textContent='';cells[i].style.background='rgba(255,255,255,.06)'},200);updateInfo()}
function pop(){if(!playing)return;var free=[];for(var i=0;i<9;i++)if(!moles[i])free.push(i);if(!free.length)return;var idx=free[Math.floor(Math.random()*free.length)];cells[idx].textContent='';cells[idx].style.background='rgba(255,255,255,.12)';var t=setTimeout(function(){if(moles[idx]){cells[idx].textContent='';cells[idx].style.background='rgba(255,255,255,.06)';delete moles[idx]}},1000+Math.random()*500);moles[idx]={timer:t}}
function startGame(){init();playing=true;timer=setInterval(function(){time--;if(time<=0){playing=false;clearInterval(timer);for(var k in moles){clearTimeout(moles[k].timer);cells[k].textContent='';cells[k].style.background='rgba(255,255,255,.06)'}moles={}}updateInfo()},1000);var sp=setInterval(function(){if(!playing){clearInterval(sp);return}pop()},600)}
init();updateInfo();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Whack-a-Mole', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Whack-a-Mole' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['mole']
export default handler
