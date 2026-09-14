import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var T=20,COLS=28,ROWS=18;
var maze=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var map=[];for(var r=0;r<ROWS;r++){map.push([]);for(var cc=0;cc<COLS;cc++){map[r].push(maze[cc]===1?1:0)}}
var walls=[];for(var r=1;r<ROWS-1;r++)for(var cc=1;cc<COLS-1;cc++)map[r][cc]=0;
[[0,0,COLS,1],[0,ROWS-1,COLS,1],[0,0,1,ROWS],[COLS-1,0,1,ROWS]].forEach(function(w){var x0=w[0],y0=w[1],ww=w[2],wh=w[3];for(var rr=y0;rr<y0+wh&&rr<ROWS;rr++)for(var cc=x0;cc<x0+ww&&cc<COLS;cc++){map[rr][cc]=1}});
[[3,1,22,1],[3,5,6,1],[10,5,8,1],[20,5,6,1],[3,9,6,1],[10,9,3,1],[15,9,8,1],[20,9,6,1],[1,13,COLS-2,1]].forEach(function(w){for(var rr=w[1];rr<w[1]+w[3]&&rr<ROWS;rr++)for(var cc=w[0];cc<w[0]+w[2]&&cc<COLS;cc++)if(rr<ROWS&&cc<COLS)map[rr][cc]=1});
var dots=[];for(var r=0;r<ROWS;r++){dots.push([]);for(var cc=0;cc<COLS;cc++){dots[r].push(map[r][cc]?0:1)}}
var pac={x:1,y:1,dir:{x:0,y:0},nextDir:{x:0,y:0},mouth:0,mDir:1};
var ghosts=[{x:COLS-2,y:ROWS-2,dir:{x:-1,y:0},color:'#e17055',scared:false},{x:COLS-2,y:1,dir:{x:0,y:1},color:'#74b9ff',scared:false},{x:1,y:ROWS-2,dir:{x:1,y:0},color:'#fd79a8',scared:false}];
var score=0,over=false,win=false,dotCount=0,totalDots=0;
for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++)if(dots[r][cc])totalDots++;
function movePac(){var nx=pac.x+pac.nextDir.x,ny=pac.y+pac.nextDir.y;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&map[ny][nx]!==1){pac.dir=pac.nextDir}
nx=pac.x+pac.dir.x;ny=pac.y+pac.dir.y;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&map[ny][nx]!==1){pac.x=nx;pac.y=ny}
if(dots[pac.y]&&dots[pac.y][pac.x]){dots[pac.y][pac.x]=0;score+=10;dotCount++;if(dotCount>=totalDots){win=true;over=true}}
for(var i=0;i<ghosts.length;i++){var g=ghosts[i];if(g.x===pac.x&&g.y===pac.y){if(g.scared){score+=200;g.x=COLS-2;g.y=ROWS-2}else{over=true}}}}
function moveGhost(g){
var best={x:0,y:0,bd:99999};var dirs=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];
for(var i=0;i<dirs.length;i++){var d=dirs[i];if(d.x===-g.dir.x&&d.y===-g.dir.y)continue;
var nx=g.x+d.x,ny=g.y+d.y;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&map[ny][nx]!==1){
var dist=(pac.x-nx)*(pac.x-nx)+(pac.y-ny)*(pac.y-ny);if(dist<best.bd){best={x:d.x,y:d.y,bd:dist}}}}
if(best.bd<99999){g.dir={x:best.x,y:best.y}}
var nx=g.x+g.dir.x,ny=g.y+g.dir.y;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&map[ny][nx]!==1){g.x=nx;g.y=ny}}
function draw(){x.clearRect(0,0,c.width,c.height);
for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++){if(map[r][cc]){x.fillStyle='rgba(108,92,231,.6)';x.fillRect(cc*T,r*T,T,T)}
else if(dots[r]&&dots[r][cc]){x.fillStyle='rgba(255,255,255,.5)';x.beginPath();x.arc(cc*T+T/2,r*T+T/2,3,0,Math.PI*2);x.fill()}}
pac.mouth+=pac.mDir*.15;if(pac.mouth>.4||pac.mouth<0)pac.mDir*=-1;
var angle=Math.atan2(pac.dir.y,pac.dir.x);x.save();x.translate(pac.x*T+T/2,pac.y*T+T/2);x.rotate(angle);
x.fillStyle='#ffeaa7';x.beginPath();x.arc(0,0,8,Math.PI*2-pac.mouth,Math.PI*2+pac.mouth);x.lineTo(0,0);x.fill();x.restore();
for(var i=0;i<ghosts.length;i++){var g=ghosts[i];x.fillStyle=g.scared?'#74b9ff':g.color;
x.beginPath();x.arc(g.x*T+T/2,g.y*T+T/2+2,8,Math.PI,0);x.lineTo(g.x*T+T/2+8,g.y*T+T/2+10);x.lineTo(g.x*T+T/2-8,g.y*T+T/2+10);x.closePath();x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(g.x*T+T/2-3,g.y*T+T/2-1,2,0,Math.PI*2);x.arc(g.x*T+T/2+3,g.y*T+T/2-1,2,0,Math.PI*2);x.fill()}
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE '+score,10,16);
if(over){x.fillStyle='rgba(15,15,25,.75)';x.fillRect(0,0,c.width,c.height);x.fillStyle=win?'#00b894':'#e17055';x.font='bold 28px Arial';x.fillText(win?'YOU WIN!':'GAME OVER',c.width/2-80,c.height/2-10);x.fillStyle='rgba(255,255,255,.6)';x.font='14px Arial';x.fillText('Score: '+score+' | Tap to restart',c.width/2-100,c.height/2+20)}}
function loop(){if(!over){movePac();for(var i=0;i<ghosts.length;i++)moveGhost(ghosts[i]);draw();requestAnimationFrame(loop)}}
function restart(){over=false;win=false;score=0;dotCount=0;pac.x=1;pac.y=1;pac.dir={x:0,y:0};pac.nextDir={x:0,y:0};
ghosts[0].x=COLS-2;ghosts[0].y=ROWS-2;ghosts[1].x=COLS-2;ghosts[1].y=1;ghosts[2].x=1;ghosts[2].y=ROWS-2;
for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++)if(map[r][cc]!==1)dots[r][cc]=1;totalDots=0;for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++)if(dots[r][cc])totalDots++;
draw();requestAnimationFrame(loop)}
document.addEventListener('keydown',function(e){var k={'ArrowUp':{x:0,y:-1},'ArrowDown':{x:0,y:1},'ArrowLeft':{x:-1,y:0},'ArrowRight':{x:1,y:0}}[e.key];if(k){e.preventDefault();pac.nextDir=k}});
var ts;document.addEventListener('pointerdown',function(e){if(over){restart();return}ts={x:e.clientX,y:e.clientY}});
document.addEventListener('pointerup',function(e){if(!ts)return;var dx=e.clientX-ts.x,dy=e.clientY-ts.y;ts=null;if(Math.abs(dx)<5&&Math.abs(dy)<5)return;
if(Math.abs(dx)>Math.abs(dy))pac.nextDir=dx>0?{x:1,y:0}:{x:-1,y:0};else pac.nextDir=dy>0?{x:0,y:1}:{x:0,y:-1}});
draw();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '👻', key: m.key } })
    try {
        const html = shell({ title: 'Pac-Man', tag: 'GAME', icon: '👻', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Pac-Man' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['pacman']
export default handler
