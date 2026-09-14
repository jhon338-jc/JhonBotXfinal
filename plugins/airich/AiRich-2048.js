import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var G=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],score=0,won=false;
var box=document.createElement('div');box.style.cssText='display:grid;gap:8px;aspect-ratio:1;padding:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;grid-template-columns:repeat(4,1fr)';
document.querySelector('.wrap').appendChild(box);
var sc=document.createElement('div');sc.style.cssText='text-align:right;margin:8px 0;font-size:12px;color:rgba(255,255,255,.6)';
box.parentNode.insertBefore(sc,box);
var COL={2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
function empty(){for(var i=0;i<4;i++)for(var j=0;j<4;j++)if(!G[i][j])return true;return false}
function add(){var p=[];for(var i=0;i<4;i++)for(var j=0;j<4;j++)if(!G[i][j])p.push([i,j]);if(!p.length)return;var c=p[Math.floor(Math.random()*p.length)];G[c[0]][c[1]]=Math.random()<.9?2:4}
function slide(row){var r=row.filter(function(v){return v}),out=[];for(var i=0;i<r.length;i++){if(r[i]===r[i+1]){out.push(r[i]*2);score+=r[i]*2;i++}else out.push(r[i])}while(out.length<4)out.push(0);return out}
function move(dir){var moved=false,newG=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];for(var line=0;line<4;line++){var row=[];for(var k=0;k<4;k++){var i=dir==='up'?k:dir==='down'?3-k:line;var j=dir==='left'?k:dir==='right'?3-k:line;row.push(G[i][j])}var s=slide(row);for(var k=0;k<4;k++){var i=dir==='up'?k:dir==='down'?3-k:line;var j=dir==='left'?k:dir==='right'?3-k:line;if(newG[i][j]!==s[k]){if(newG[i][j]!==0||s[k]!==0)moved=true}newG[i][j]=s[k]}}G=newG;if(moved){add();render()}}
function render(){box.innerHTML='';for(var i=0;i<4;i++)for(var j=0;j<4;j++){var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:bold;border-radius:10px;color:'+(G[i][j]>4?'#fff':'#776e65')+';background:'+(COL[G[i][j]]||'rgba(255,255,255,.04)')+';aspect-ratio:1';d.textContent=G[i][j]||'';box.appendChild(d)}sc.innerHTML='SCORE <b style="color:#6c5ce7">'+score+'</b>'}
document.addEventListener('keydown',function(e){var k={'ArrowUp':'up','ArrowDown':'down','ArrowLeft':'left','ArrowRight':'right'}[e.code];if(k){e.preventDefault();move(k)}});
var ts;document.addEventListener('pointerdown',function(e){ts={x:e.clientX,y:e.clientY}});
document.addEventListener('pointerup',function(e){if(!ts)return;var dx=e.clientX-ts.x,dy=e.clientY-ts.y,abx=Math.abs(dx),aby=Math.abs(dy);ts=null;if(abx<10&&aby<10)return;if(abx>aby)move(dx>0?'right':'left');else move(dy>0?'down':'up')});
add();add();render();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })
    try {
        const html = shell({ title: '2048', tag: 'GAME', icon: '🔢', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: '2048' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['2048']
export default handler