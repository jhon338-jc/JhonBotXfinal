import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var G=[],rows=8,cols=8,cs=38,score=0,over=false,sel=null,blocks=[];
for(var i=0;i<rows;i++){G[i]=[];for(var j=0;j<cols;j++)G[i][j]=0}
var wrap=document.querySelector('.wrap');
var sc=document.createElement('div');sc.style.cssText='text-align:center;margin-bottom:6px;font:13px Arial;color:rgba(255,255,255,.7)';wrap.appendChild(sc);
var board=document.createElement('div');board.style.cssText='display:inline-grid;grid-template-columns:repeat('+cols+','+cs+'px);gap:2px;padding:6px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:10px';wrap.appendChild(board);
var slots=document.createElement('div');slots.style.cssText='display:flex;gap:12px;justify-content:center;margin-top:10px;min-height:70px';wrap.appendChild(slots);
var rb=document.createElement('button');rb.textContent='NEW';rb.style.cssText='display:block;margin:10px auto 0;padding:6px 20px;border:0;border-radius:8px;background:#6c5ce7;color:#fff;font:bold 12px Arial;cursor:pointer';rb.addEventListener('pointerdown',function(e){e.preventDefault();init()});wrap.appendChild(rb);
var colors=['#6c5ce7','#e17a7a','#00b894','#fdcb6e','#e84393'];
function mkblock(){var t=Math.floor(Math.random()*5),c=colors[t];var shapes=[[[1,1],[1,1]],[[1,1,1]],[[1],[1],[1]],[[1,1]],[[1],[1]],[[1,1,1],[0,1,0]],[[1,0],[1,1]],[[1,1],[0,1]]];return{shape:shapes[Math.floor(Math.random()*shapes.length)],color:c}}
function fit(b,ri,ci){var s=b.shape;for(var r=0;r<s.length;r++)for(var c=0;c<s[r].length;c++)if(s[r][c]){var nr=ri+r,nc=ci+c;if(nr<0||nr>=rows||nc<0||nc>=cols||G[nr][nc])return false}return true}
function place(b,ri,ci){var s=b.shape;for(var r=0;r<s.length;r++)for(var c=0;c<s[r].length;c++)if(s[r][c])G[ri+r][ci+c]=b.color;clearlines();render();nxt()}
function clearlines(){var cr=[],cc=[];for(var r=0;r<rows;r++){var f=true;for(var c=0;c<cols;c++)if(!G[r][c]){f=false;break}if(f)cr.push(r)}for(var c=0;c<cols;c++){var f=true;for(var r=0;r<rows;r++)if(!G[r][c]){f=false;break}if(f)cc.push(c)}var n=cr.length+cc.length;if(n>0){score+=n*n*5;for(var i=0;i<cr.length;i++)for(var c=0;c<cols;c++)G[cr[i]][c]=0;for(var i=0;i<cc.length;i++)for(var r=0;r<rows;r++)G[r][cc[i]]=0}}
function render(){board.innerHTML='';for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var d=document.createElement('div');d.style.cssText='width:'+cs+'px;height:'+cs+'px;border-radius:5px;background:'+(G[r][c]||'rgba(255,255,255,.03)')+';border:1px solid '+(G[r][c]?'rgba(255,255,255,.25)':'rgba(255,255,255,.06)')+';transition:all .15s';d.dataset.r=r;d.dataset.c=c;if(!over)d.addEventListener('pointerdown',function(e){e.preventDefault();tapped(this)});board.appendChild(d)}
sc.innerHTML='SCORE <b style="color:#6c5ce7">'+score+'</b>'}
function renderslots(){slots.innerHTML='';for(var i=0;i<blocks.length;i++){var b=blocks[i],el=document.createElement('div');el.style.cssText='display:inline-flex;flex-wrap:wrap;gap:2px;padding:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;min-width:40px;justify-content:center';el.dataset.bi=i;for(var r=0;r<b.shape.length;r++)for(var c=0;c<b.shape[r].length;c++){var d=document.createElement('div');d.style.cssText='width:'+Math.min(16,cs/2.2)+'px;height:'+Math.min(16,cs/2.2)+'px;border-radius:3px;background:'+(b.shape[r][c]?b.color:'transparent')+';';el.appendChild(d)}if(sel===i)el.style.border='2px solid #6c5ce7';el.addEventListener('pointerdown',function(e){e.preventDefault();sel=parseInt(this.dataset.bi);renderslots()});slots.appendChild(el)}
if(!over&&blocks.length===0)for(var i=0;i<3;i++)blocks.push(mkblock());renderslots()}
function tapped(el){if(sel===null||over)return;var ri=parseInt(el.dataset.r),ci=parseInt(el.dataset.c),b=blocks[sel];if(fit(b,ri,ci)){place(b,ri,ci)}}
function check(){for(var i=0;i<blocks.length;i++){var b=blocks[i];for(var r=-1;r<rows;r++)for(var c=-1;c<cols;c++)if(fit(b,r,c))return}over=true;sc.innerHTML+=' <span style="color:#e17a7a">GAME OVER</span>'}
function nxt(){blocks.splice(0,1);if(blocks.length<3)for(var i=blocks.length;i<3;i++)blocks.push(mkblock());renderslots();check()}
function init(){G=[];for(var i=0;i<rows;i++){G[i]=[];for(var j=0;j<cols;j++)G[i][j]=0}score=0;over=false;sel=null;blocks=[];for(var i=0;i<3;i++)blocks.push(mkblock());render();renderslots()}
init();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Block Blast', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Block Blast' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['blockblast']
export default handler
