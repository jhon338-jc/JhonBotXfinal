import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var UI=document.createElement('div');UI.style.cssText='display:flex;justify-content:space-between;margin:8px 0;font-size:13px';
document.querySelector('.wrap').appendChild(UI);
var MSG=document.createElement('div');MSG.style.cssText='text-align:center;font-size:12px;color:#f1c40f;min-height:18px;margin-top:4px';
document.querySelector('.wrap').appendChild(MSG);
var GR=document.createElement('div');GR.style.cssText='display:grid;grid-template-columns:repeat(9,1fr);gap:2px;padding:8px;background:rgba(0,0,0,.3);border-radius:12px;border:1px solid rgba(255,255,255,.1)';
document.querySelector('.wrap').appendChild(GR);
var GW=9,GH=9,mp,hx,hy,hp,mhp,gld,fl,alive;
function gen(){
mp=[];for(var y=0;y<GH;y++){mp[y]=[];for(var x=0;x<GW;x++)mp[y][x]=Math.random()<.2?0:1}
hx=4;hy=4;mp[hy][hx]=1;
var ix=0;
while(ix<5+fl*2){var rx=1+Math.floor(Math.random()*(GW-2)),ry=1+Math.floor(Math.random()*(GH-2));if(mp[ry][rx]===1&&!(rx===hx&&ry===hy)){mp[ry][rx]=2;ix++}}
ix=0;while(ix<2+fl){var rx=1+Math.floor(Math.random()*(GW-2)),ry=1+Math.floor(Math.random()*(GH-2));if(mp[ry][rx]===1){mp[ry][rx]=3;ix++}}
ix=0;while(ix<1){var rx=1+Math.floor(Math.random()*(GW-2)),ry=1+Math.floor(Math.random()*(GH-2));if(mp[ry][rx]===1){mp[ry][rx]=4;ix++}}
}
var TC=['#1a1a2e','#2d2d44','#f1c40f','#e74c3c','#2ecc71'];
function render(){
GR.innerHTML='';GR.style.gridTemplateColumns='repeat('+GW+',1fr)';
for(var y=0;y<GH;y++)for(var x=0;x<GW;x++){
var d=document.createElement('div');var v=mp[y][x];var isH=x===hx&&y===hy;
d.style.cssText='aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;border-radius:4px;background:'+(isH?'#6c5ce7':TC[v])+';color:#fff;transition:all .15s';
d.textContent=isH?'@':v===2?'G':v===3?'E':v===4?'S':'. ';
GR.appendChild(d)}
UI.innerHTML='<span style="color:#e74c3c">HP:'+hp+'/'+mhp+'</span><span style="color:#f1c40f">Gold:'+gld+'</span><span style="color:#2ecc71">Floor:'+(fl+1)+'</span>';
}
function msg(t){MSG.textContent=t;setTimeout(function(){if(MSG.textContent===t)MSG.textContent=''},1500)}
function step(dx,dy){
if(!alive)return;
var nx=hx+dx,ny=hy+dy;
if(nx<0||nx>=GW||ny<0||ny>=GH||mp[ny][nx]===0)return;
var c=mp[ny][nx];hx=nx;hy=ny;
if(c===2){var g=5+Math.floor(Math.random()*10)+fl*3;gld+=g;mp[ny][nx]=1;msg('Found '+g+' gold!')}
if(c===3){var ed=3+Math.floor(Math.random()*4)+fl;hp-=ed;if(hp<=0){alive=false;msg('Defeated! Gold:'+gld);render();setTimeout(function(){reset()},1000);return}if(Math.random()<.55){mp[ny][nx]=1;gld+=8+fl*4;msg('Killed enemy! -'+ed+'hp +'+(8+fl*4)+'g')}else{msg('Enemy hit you -'+ed+'hp')}}
if(c===4){fl++;mp[ny][nx]=1;gen();hp=Math.min(hp+15,30);msg('Floor '+(fl+1))}
render()}
document.addEventListener('keydown',function(e){var k={\u0027ArrowUp\u0027:[0,-1],\u0027ArrowDown\u0027:[0,1],\u0027ArrowLeft\u0027:[-1,0],\u0027ArrowRight\u0027:[1,0]}[e.code];if(k){e.preventDefault();step(k[0],k[1])}});
var ts;document.addEventListener('pointerdown',function(e){ts={x:e.clientX,y:e.clientY}});
document.addEventListener('pointerup',function(e){if(!ts)return;var dx=e.clientX-ts.x,dy=e.clientY-ts.y;ts=null;if(Math.abs(dx)<12&&Math.abs(dy)<12)return;
if(Math.abs(dx)>Math.abs(dy))step(dx>0?1:-1,0);else step(0,dy>0?1:-1)});
function reset(){hp=30;mhp=30;gld=0;fl=0;alive=true;gen();render();MSG.textContent='Find the stairs (S)!'}
reset();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🏰', key: m.key } })
    try {
        const html = shell({ title: 'Dungeon', tag: 'GAME', icon: '🏰', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Dungeon' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['dungeon']
export default handler