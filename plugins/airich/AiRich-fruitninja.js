import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,fruits=[],score=0,combo=0,lives=3,over=false,swipes=[];
var colors=['#e74c3c','#2ecc71','#f39c12','#9b59b6','#e67e22','#1abc9c'];
var fruitChars=['🍎','🍊','🍋','🍇','🥝','🍉'];
function spawn(){var isBomb=Math.random()<0.12;fruits.push({x:50+Math.random()*(W-100),y:H+30,vy:-(6+Math.random()*4),vx:(Math.random()-0.5)*2,r:20+Math.random()*8,bomb:isBomb,sliced:false,life:1,ch:fruitChars[Math.floor(Math.random()*fruitChars.length)]})}
function init(){fruits=[];score=0;combo=0;lives=3;over=false;swipes=[];draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
fruits.forEach(function(f){if(f.sliced)return;cx.font=f.r+'px Arial';cx.textAlign='center';cx.fillText(f.bomb?'💣':f.ch,f.x,f.y)});
swipes.forEach(function(s){cx.strokeStyle='rgba(255,255,255,'+s.a+')';cx.lineWidth=3;cx.beginPath();cx.moveTo(s.x1,s.y1);cx.lineTo(s.x2,s.y2);cx.stroke()});
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.textAlign='left';cx.fillText('Score: '+score+'  Lives: '+lives,10,20);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Game Over! Score: '+score,W/2,H/2);cx.font='13px Arial';cx.fillText('Tap to restart',W/2,H/2+24);cx.textAlign='left'}}
function loop(){if(over)return;if(Math.random()<0.04)spawn();fruits.forEach(function(f){f.y+=f.vy;f.vy+=0.25;f.x+=f.vx});fruits=fruits.filter(function(f){return f.y<H+60});swipes=swipes.filter(function(s){s.a-=0.02;return s.a>0});draw();requestAnimationFrame(loop)}
function slice(e){if(over)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);
for(var i=fruits.length-1;i>=0;i--){var f=fruits[i];if(f.sliced)continue;var dx=mx-f.x,dy=my-f.y;if(Math.sqrt(dx*dx+dy*dy)<f.r+15){if(f.bomb){lives--;if(lives<=0){over=true;draw();return}}else{combo++;score+=10*combo}f.sliced=true;f.life=0}}
if(swipes.length>0){var ls=swipes[swipes.length-1];swipes.push({x1:ls.x2,y1:ls.y2,x2:mx,y2:my,a:0.7})}else{swipes.push({x1:mx-2,y1:my-2,x2:mx,y2:my,a:0.7})}}
var lastPos=null;
cv.addEventListener('pointermove',function(e){if(over)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);if(lastPos){slice(e)}lastPos={x:mx,y:my}});
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();loop();return}lastPos=null;slice(e)});
cv.addEventListener('pointerup',function(){lastPos=null;combo=0});
init();loop();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🍉', key: m.key } })
    try {
        const html = shell({ title: 'Fruit Ninja', tag: 'GAME', icon: '🍉', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Fruit Ninja' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['fruitninja']
export default handler
