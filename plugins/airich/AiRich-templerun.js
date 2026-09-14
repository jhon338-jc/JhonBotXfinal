import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,lane=1,speed=3,score=0,over=false,playerY=H-90,playerVY=0,jumping=false,ducking=false;
var obstacles=[],gaps=[],best=0,groundY=H-40,playerLanes=[W*0.25,W*0.5,W*0.75];
function init(){lane=1;speed=3;score=0;over=false;playerY=H-90;playerVY=0;jumping=false;ducking=false;obstacles=[];gaps=[];draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#1a0a2e';cx.fillRect(0,0,W,H);
cx.fillStyle='rgba(255,255,255,.04)';cx.fillRect(W*0.05,groundY,W*0.9,H-groundY);
cx.fillStyle='rgba(255,255,255,.08)';for(var i=1;i<3;i++){cx.fillRect(W*i*0.333-1,0,2,groundY)}
gaps.forEach(function(g){cx.fillStyle='#0a0015';cx.fillRect(g.lane*W*0.333+W*0.033,g.y,W*0.23,40);cx.fillStyle='rgba(231,76,60,.3)';cx.fillRect(g.lane*W*0.333+W*0.033,g.y,6,40);cx.fillRect((g.lane+1)*W*0.333-W*0.067,g.y,6,40)});
var ppx=playerLanes[lane],ppTop=ducking?playerY-15:playerY-40;
cx.fillStyle='#e67e22';if(ducking){cx.fillRect(ppx-12,playerY-15,24,15)}else{cx.fillRect(ppx-10,playerY-40,20,40);cx.fillStyle='#f39c12';cx.fillRect(ppx-6,playerY-30,12,12)}
obstacles.forEach(function(o){var ox=o.lane*W*0.333+W*0.1;cx.fillStyle=o.type===0?'#8e44ad':'#7f8c8d';
if(o.type===0){cx.fillRect(ox-15,o.y-40,30,40);cx.fillStyle='rgba(255,255,255,.2)';cx.fillRect(ox-12,o.y-35,24,3)}
else{cx.fillRect(ox-20,o.y-15,40,15);cx.fillStyle='rgba(255,255,255,.15)';cx.fillRect(ox-18,o.y-13,36,3)}});
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.fillText('Score: '+Math.floor(score),10,20);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Game Over! Score: '+Math.floor(score),W/2,H/2);cx.font='13px Arial';cx.fillText('Best: '+Math.floor(best),W/2,H/2+20);cx.fillText('Tap to restart',W/2,H/2+40);cx.textAlign='left'}}
function loop(){if(over)return;playerY+=playerVY;if(jumping){playerVY+=0.7;if(playerY>=H-90){playerY=H-90;playerVY=0;jumping=false}}
if(Math.random()<0.015*speed*0.5)obstacles.push({x:0,y:-40,lane:Math.floor(Math.random()*3),type:Math.random()<0.6?0:1});
if(Math.random()<0.008*speed*0.5)gaps.push({x:0,y:-40,lane:Math.floor(Math.random()*3)});
obstacles.forEach(function(o){o.y+=speed});gaps.forEach(function(g){g.y+=speed});
obstacles=obstacles.filter(function(o){return o.y<H+60});gaps=gaps.filter(function(g){return g.y<H+60});
var px=playerLanes[lane],pTop=ducking?playerY-15:playerY-40,pBot=playerY;
for(var i=0;i<obstacles.length;i++){var o=obstacles[i];if(o.lane===lane){var ox=o.lane*W*0.333+W*0.1;if(px-10<ox+15&&px+10>ox-15&&pBot>o.y-40&&pTop<o.y){over=true;if(score>best)best=score;draw();return}}}
for(var i=0;i<gaps.length;i++){var g=gaps[i];if(g.lane===lane&&Math.abs(playerY-H+90)<5&&g.y>groundY-30&&g.y<groundY+10){over=true;if(score>best)best=score;draw();return}}
score+=speed*0.05;speed=Math.min(10,speed+0.003);draw();requestAnimationFrame(loop)}
function moveLane(d){lane=Math.max(0,Math.min(2,lane+d))}
function jump(){if(!jumping&&!over){jumping=true;playerVY=-13}}
function duck(){ducking=true;setTimeout(function(){ducking=false},350)}
document.addEventListener('keydown',function(e){if(e.code==='ArrowLeft')moveLane(-1);if(e.code==='ArrowRight')moveLane(1);if(e.code==='Space'){e.preventDefault();jump()}if(e.code==='ArrowDown')duck()});
var tsX=null;
document.addEventListener('pointerdown',function(e){if(over){init();loop();return}tsX=e.clientX});
document.addEventListener('pointerup',function(e){if(tsX===null)return;var dx=e.clientX-tsX;tsX=null;if(Math.abs(dx)>30)moveLane(dx>0?1:-1);else jump()});
init();draw();loop();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🏛️', key: m.key } })
    try {
        const html = shell({ title: 'Temple Run', tag: 'GAME', icon: '🏛️', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Temple Run' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['templerun']
export default handler
