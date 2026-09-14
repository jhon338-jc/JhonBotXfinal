import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var T=20,COLS=Math.floor(c.width/T),ROWS=Math.floor(c.height/T);
var snake,dir,nextDir,food,score,over,playing,speed,timer;
function reset(){snake=[{x:5,y:5},{x:4,y:5},{x:3,y:5}];dir={x:1,y:0};nextDir={x:1,y:0};score=0;over=false;playing=false;speed=150;placeFood()}
function placeFood(){var empty=[];for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++){var free=true;for(var s=0;s<snake.length;s++){if(snake[s].x===cc&&snake[s].y===r){free=false;break}}if(free)empty.push({x:cc,y:r})}
if(empty.length){food=empty[Math.floor(Math.random()*empty.length)]}else{food={x:10,y:10}}}
function draw(){x.clearRect(0,0,c.width,c.height);
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE: '+score,10,16);
x.strokeStyle='rgba(255,255,255,.05)';x.lineWidth=1;for(var r=0;r<=ROWS;r++){x.beginPath();x.moveTo(0,r*T);x.lineTo(c.width,r*T);x.stroke()}
for(var cc=0;cc<=COLS;cc++){x.beginPath();x.moveTo(cc*T,0);x.lineTo(cc*T,c.height);x.stroke()}
for(var i=0;i<snake.length;i++){var s=snake[i];var bright=i===0?'#6c5ce7':'rgba(108,92,231,'+(0.8-i*0.02)+')';x.fillStyle=bright;x.fillRect(s.x*T+1,s.y*T+1,T-2,T-2);
if(i===0){x.fillStyle='#fff';x.fillRect(s.x*T+4,s.y*T+4,4,4);x.fillRect(s.x*T+12,s.y*T+4,4,4)}}
if(food){x.fillStyle='#e17055';x.beginPath();x.arc(food.x*T+T/2,food.y*T+T/2,7,0,Math.PI*2);x.fill();
x.fillStyle='#fdcb6e';x.beginPath();x.arc(food.x*T+T/2-2,food.y*T+T/2-2,2,0,Math.PI*2);x.fill()}
if(!playing&&!over){x.fillStyle='rgba(15,15,25,.6)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#6c5ce7';x.font='bold 24px Arial';x.fillText('SNAKE',c.width/2-42,c.height/2-10);x.fillStyle='rgba(255,255,255,.5)';x.font='13px Arial';x.fillText('Tap to start',c.width/2-40,c.height/2+15)}
if(over){x.fillStyle='rgba(15,15,25,.75)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#e17055';x.font='bold 24px Arial';x.fillText('GAME OVER',c.width/2-78,c.height/2-10);x.fillStyle='rgba(255,255,255,.6)';x.font='13px Arial';x.fillText('Score: '+score+' | Tap to restart',c.width/2-100,c.height/2+15)}}
function step(){if(!playing||over)return;var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){over=true;playing=false;draw();return}
for(var i=0;i<snake.length;i++){if(snake[i].x===head.x&&snake[i].y===head.y){over=true;playing=false;draw();return}}
snake.unshift(head);
if(food&&head.x===food.x&&head.y===food.y){score+=10;placeFood();clearTimeout(timer);speed=Math.max(60,speed-3)}
dir=nextDir;draw();timer=setTimeout(step,speed)}
function startGame(){reset();playing=true;draw();timer=setTimeout(step,speed)}
document.addEventListener('pointerdown',function(e){e.preventDefault();if(over||!playing){startGame();return}
var bx=e.clientX,by=e.clientY;document.addEventListener('pointerup',function handler(ev){document.removeEventListener('pointerup',handler);var dx=ev.clientX-bx,dy=ev.clientY-by;if(Math.abs(dx)<5&&Math.abs(dy)<5)return;
if(Math.abs(dx)>Math.abs(dy)){nextDir=dx>0?{x:1,y:0}:{x:-1,y:0}}else{nextDir=dy>0?{x:0,y:1}:{x:0,y:-1}}},{once:true})});
document.addEventListener('keydown',function(e){var k={'ArrowUp':{x:0,y:-1},'ArrowDown':{x:0,y:1},'ArrowLeft':{x:-1,y:0},'ArrowRight':{x:1,y:0}}[e.key];if(k){e.preventDefault();if(k.x!==-dir.x||k.y!==-dir.y)nextDir=k}});
reset();draw();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🐍', key: m.key } })
    try {
        const html = shell({ title: 'Snake', tag: 'GAME', icon: '🐍', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Snake' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['snake']
export default handler
