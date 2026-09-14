import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const VC=[{c:'TikTok AI Rich demo ',g:'linear-gradient(165deg,#fe2c55,#6c5ce7)',fx:['','','','','']},{c:'Glassmorphism trend ',g:'linear-gradient(165deg,#25f4ee,#6c5ce7)',fx:['','','','','']},{c:'Tap the heart ',g:'linear-gradient(165deg,#f7b733,#fc4a1a)',fx:['','','','','']}];
let st=document.createElement('style');st.textContent='@keyframes fally{from{transform:translateY(0) rotate(0);opacity:.95}to{transform:translateY(340px) rotate(240deg);opacity:0}}@keyframes pop{0%{transform:scale(1)}40%{transform:scale(1.7)}100%{transform:scale(1)}}.hp{animation:pop .4s ease-out}';document.head.appendChild(st);
let idx=0,playing=false,likes=0,sec=0,lastUp=0,coms=0,shares=0;
const $=id=>document.getElementById(id);
const vd=$('vd'),cap=$('cap'),hc=$('hc'),cc=$('cc'),sc=$('sc'),pf=$('pf2'),pl=$('playing'),pn=$('pn'),pt=$('pt'),nv=$('nv'),nx=$('nx'),vfx=$('vfx');
function load(){let v=VC[idx];vd.style.background=v.g;cap.textContent=v.c;likes=(400+Math.random()*1000)|0;coms=(20+Math.random()*300)|0;shares=(10+Math.random()*200)|0;sec=0;hc.textContent=likes;cc.textContent=coms;sc.textContent=shares;pn.textContent=idx+1;pt.textContent=VC.length;upd()}
function upd(){pf.style.width=Math.min(100,sec/8*100)+'%';pl.textContent=playing?'Playing':'Paused'}
function togg(){playing=!playing;upd()}
function nxt(){idx=(idx+1)%VC.length;load()}
function prv(){idx=(idx-1+VC.length)%VC.length;load()}
function spawn(){if(!playing&&Math.random()>.5)return;let v=VC[idx],s=document.createElement('span');s.textContent=v.fx[Math.random()*v.fx.length|0];s.style.cssText='position:absolute;left:'+(5+Math.random()*90)+'%;top:20px;font-size:'+(14+Math.random()*18)+'px;animation:fally '+(2.2+Math.random()*2)+'s linear forwards;pointer-events:none';vfx.appendChild(s);setTimeout(function(){s.remove()},4700)}
setInterval(spawn,550);
vd.addEventListener('pointerdown',function(e){e.preventDefault();togg()});
hc.parentNode.addEventListener('pointerdown',function(e){e.stopPropagation()});
document.getElementById('heart').addEventListener('pointerdown',function(e){e.stopPropagation();likes++;hc.textContent=likes;this.classList.remove('hp');void this.offsetWidth;this.classList.add('hp')});
nv.addEventListener('click',prv);
nx.addEventListener('click',nxt);
function loop(now){requestAnimationFrame(loop);if(!lastUp)lastUp=now;let dt=(now-lastUp)/1000;lastUp=now;if(playing){sec+=dt;if(sec>=8)nxt()}upd()}
load();requestAnimationFrame(loop);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'TikTok', tag: 'APP', icon: '', html: '<div style="font-family:Arial;color:#fff"><div style="text-align:center;font-size:13px;letter-spacing:2px;color:rgba(255,255,255,.6);margin-bottom:10px">TIKTOK</div>' +
                '<div id="vd" style="position:relative;width:100%;max-width:300px;margin:auto;aspect-ratio:9/16;border-radius:18px;overflow:hidden;background:linear-gradient(165deg,#fe2c55,#6c5ce7);display:flex;flex-direction:column;justify-content:flex-end;box-shadow:0 14px 40px rgba(0,0,0,.4)">' +
                '<div id="vfx" style="position:absolute;inset:0;overflow:hidden;pointer-events:none"></div>' +
                '<div id="cap" style="position:relative;z-index:2;padding:14px;font-size:14px;font-weight:bold;text-shadow:0 2px 6px rgba(0,0,0,.6)"></div>' +
                '<div style="position:absolute;right:8px;bottom:46%;z-index:3;display:flex;flex-direction:column;gap:18px;align-items:center;font-size:24px">' +
                '<div id="heart" style="text-align:center;cursor:pointer;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))"><div></div><div id="hc" style="font-size:12px;font-weight:bold">0</div></div>' +
                '<div style="text-align:center"><div></div><div id="cc" style="font-size:12px;font-weight:bold">0</div></div>' +
                '<div style="text-align:center"><div></div><div id="sc" style="font-size:12px;font-weight:bold">0</div></div></div>' +
                '<div style="position:absolute;left:0;right:0;bottom:0;z-index:3"><div id="pf2" style="height:3px;width:0%;background:#fff;border-radius:2px"></div></div></div>' +
                '<div style="text-align:center;color:rgba(255,255,255,.5);font-size:13px;margin-top:8px"><span id="pn">1</span>/<span id="pt">3</span> · <span id="playing">Paused</span></div>' +
                '<div style="display:flex;gap:8px;margin-top:8px"><button id="nv" style="flex:1;background:#6c5ce7;border:0;border-radius:10px;color:#fff;padding:10px 0;font-size:13px;font-weight:bold;cursor:pointer"> Prev</button><button id="nx" style="flex:1;background:#28b8a9;border:0;border-radius:10px;color:#fff;padding:10px 0;font-size:13px;font-weight:bold;cursor:pointer">Next </button></div></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'TikTok' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['tiktok']
export default handler