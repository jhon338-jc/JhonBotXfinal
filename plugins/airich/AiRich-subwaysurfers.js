import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,playerL=1,speed=4,score=0,over=false,playerY=H-80,playerVY=0,jumping=false,ducking=false;
var obstacles=[],coins=[],laneW=W/3,groundY=H-40,best=0;
function init(){playerL=1;speed=4;score=0;over=false;playerY=H-80;playerVY=0;jumping=false;ducking=false;obstacles=[];coins=[];for(var i=0;i<3;i++)coins.push({x:100+i*200,lane:Math.floor(Math.random()*3),y:0});draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
cx.fillStyle='rgba(255,255,255,.06)';for(var i=1;i<3;i++){cx.fillRect(i*laneW-1,0,2,H)}
var ppx=playerL*laneW+laneW/2;cx.fillStyle='#e74c3c';if(ducking){cx.fillRect(ppx-15,playerY-15,30,20);cx.fillStyle='#f39c12';cx.fillRect(ppx-10,playerY-25,20,12)}else{cx.fillRect(ppx-12,playerY-45,24,45);cx.fillStyle='#3498db';cx.fillRect(ppx-8,playerY-35,16,16);cx.fillStyle='#f39c12';cx.fillRect(ppx-6,playerY-17,12,14)}
obstacles.forEach(function(o){var ox=o.lane*laneW+laneW/2,oy=o.y;cx.fillStyle=o.type===1?'#2c3e50':'#7f8c8d';if(o.type===1){cx.fillRect(ox-20,oy-50,40,50);cx.fillStyle='#e74c3c';cx.fillRect(ox-18,oy-48,36,6)}else{cx.fillRect(ox-25,oy-20,50,20);cx.fillStyle='#95a5a6';cx.fillRect(ox-22,oy-18,44,4)}});
coins.forEach(function(c){var cx2=c.lane*laneW+laneW/2;if(!c.collected){cx.fillStyle='#f1c40f';cx.beginPath();cx.arc(cx2,c.y,8,0,Math.PI*2);cx.fill();cx.fillStyle='#e67e22';cx.beginPath();cx.arc(cx2,c.y,5,0,Math.PI*2);cx.fill()}});
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.fillText('Score: '+Math.floor(score)+'  Speed: '+speed.toFixed(1),10,20);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Game Over! Score: '+Math.floor(score),W/2,H/2);cx.font='13px Arial';cx.fillText('Best: '+Math.floor(best),W/2,H/2+20);cx.fillText('Tap to restart',W/2,H/2+40);cx.textAlign='left'}}
function loop(){if(over)return;playerY+=playerVY;if(jumping){playerVY+=0.6;if(playerY>=H-80){playerY=H-80;playerVY=0;jumping=false}}
if(Math.random()<0.015*speed)obstacles.push({x:0,y:-40,lane:Math.floor(Math.random()*3),type:Math.random()<0.5?1:2});
if(Math.random()<0.02)coins.push({x:0,y:-30,lane:Math.floor(Math.random()*3),collected:false});
obstacles.forEach(function(o){o.y+=speed});
obstacles=obstacles.filter(function(o){return o.y<H+60});
coins.forEach(function(c){c.y+=speed});
coins=coins.filter(function(c){return c.y<H+60});
var ppx2=playerL*laneW+laneW/2,pTop=ducking?playerY-25:playerY-45,pBot=playerY;
for(var i=0;i<obstacles.length;i++){var o=obstacles[i];var ox=o.lane*laneW+laneW/2;if(o.lane===playerL){var oTop=o.type===1?o.y-50:o.y-20;if(ppx2-12<ox+20&&ppx2+12>ox-20&&pBot>oTop&&pTop<o.y){over=true;if(score>best)best=score;draw();return}}}
coins.forEach(function(c){if(!c.collected&&c.lane===playerL){var cx2=c.lane*laneW+laneW/2;if(Math.abs(playerY-c.y)<25){{c.collected=true;score+=10}}}});
score+=speed*0.05;speed=Math.min(12,speed+0.002);draw();requestAnimationFrame(loop)}
function moveLane(d){playerL=Math.max(0,Math.min(2,playerL+d))}
function jump(){if(!jumping&&!over){jumping=true;playerVY=-12}}
function duck(){ducking=true;setTimeout(function(){ducking=false},400)}
document.addEventListener('keydown',function(e){if(e.code==='ArrowLeft')moveLane(-1);if(e.code==='ArrowRight')moveLane(1);if(e.code==='Space'){e.preventDefault();jump()}if(e.code==='ArrowDown')duck()});
var tsX=null;
document.addEventListener('pointerdown',function(e){if(over){init();loop();return}tsX=e.clientX});
document.addEventListener('pointerup',function(e){if(tsX===null)return;var dx=e.clientX-tsX;tsX=null;if(Math.abs(dx)>30)moveLane(dx>0?1:-1);else jump()});
init();draw();loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Subway Surfers', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Subway Surfers' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['subwaysurfers']
export default handler
