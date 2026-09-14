import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),cw=c.width,ch=c.height;
var sx=cw/2,sy=ch-50,sw=30,sh=30,bullets=[],enemies=[],particles=[],score=0,over=false,started=false,tick=0;
var speed=2,shootCD=0,enemyCD=60,ecols=['#e17a7a','#6c5ce7','#fdcb6e','#00b894','#e84393'];
function mkEnemy(){var w=28+Math.random()*12,h=28+Math.random()*12;enemies.push({x:Math.random()*(cw-40)+20,y:-h,speed:1+Math.random()*2+score*0.02,w:w,h:h,col:ecols[Math.floor(Math.random()*ecols.length)],hp:1})}
function boom(px,py,col){for(var i=0;i<8;i++)particles.push({x:px,y:py,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:1,col:col,sz:2+Math.random()*3})}
function draw(){x.clearRect(0,0,cw,ch);
var gd=x.createLinearGradient(0,0,0,ch);gd.addColorStop(0,'#0a0a1a');gd.addColorStop(1,'#151528');x.fillStyle=gd;x.fillRect(0,0,cw,ch);
x.fillStyle='rgba(255,255,255,.15)';for(var i=0;i<20;i++){var sx2=(i*37+tick*0.3)%cw,sy2=(i*53+tick*0.5)%ch;x.fillRect(sx2,sy2,1,1)}
for(var i=0;i<bullets.length;i++){x.fillStyle='#fdcb6e';x.fillRect(bullets[i].x-1.5,bullets[i].y,3,10)}
for(var i=0;i<enemies.length;i++){var e=enemies[i];x.fillStyle=e.col;x.beginPath();x.moveTo(e.x,e.y);x.lineTo(e.x-e.w/2,e.y+e.h);x.lineTo(e.x+e.w/2,e.y+e.h);x.closePath();x.fill();
x.fillStyle='rgba(255,255,255,.2)';x.beginPath();x.arc(e.x,e.y+e.h*0.4,e.w*0.2,0,Math.PI*2);x.fill()}
x.fillStyle='#6c5ce7';x.beginPath();x.moveTo(sx,sy);x.lineTo(sx-sw/2,sy+sh);x.lineTo(sx+sw/2,sy+sh);x.closePath();x.fill();
x.fillStyle='#a29bfe';x.beginPath();x.moveTo(sx-5,sy+5);x.lineTo(sx-12,sy+sh);x.lineTo(sx-3,sy+sh);x.closePath();x.fill();
x.beginPath();x.moveTo(sx+5,sy+5);x.lineTo(sx+12,sy+sh);x.lineTo(sx+3,sy+sh);x.closePath();x.fill();
x.fillStyle='#fff';x.fillRect(sx-2,sy+8,4,8);
for(var i=0;i<particles.length;i++){var p=particles[i];x.fillStyle=p.col;x.globalAlpha=Math.max(p.life,0);x.fillRect(p.x,p.y,p.sz,p.sz)}x.globalAlpha=1;
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 11px Arial';x.fillText('SCORE '+score,cw-80,18);
if(!started){x.fillStyle='rgba(15,15,25,.5)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 16px Arial';x.textAlign='center';x.fillText('GALAXY SHOOTER',cw/2,ch/2-10);x.font='12px Arial';x.fillText('Tap or arrows to move',cw/2,ch/2+10);x.fillText('Auto-shoot enabled!',cw/2,ch/2+26);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('GAME OVER',cw/2,ch/2-15);x.font='13px Arial';x.fillText('Score: '+score,cw/2,ch/2+5);x.fillText('Tap to restart',cw/2,ch/2+25);x.textAlign='left'}}
function loop(){if(!started||over){requestAnimationFrame(loop);return}
tick++;
if(shootCD>0)shootCD--;shootCD--;if(shootCD<0)shootCD=0;if(tick%12===0)bullets.push({x:sx,y:sy-5});
if(tick%Math.max(20,60-score)<0||tick%Math.max(20,60-score)===0)mkEnemy();
enemyCD--;if(enemyCD<=0){mkEnemy();enemyCD=Math.max(20,60-score)}
for(var i=0;i<bullets.length;i++)bullets[i].y-=7;bullets=bullets.filter(function(b){return b.y>-10});
for(var i=0;i<enemies.length;i++)enemies[i].y+=enemies[i].speed;
for(var i=enemies.length-1;i>=0;i--){var e=enemies[i];if(e.y>ch+20){enemies.splice(i,1);over=true;continue}
for(var j=bullets.length-1;j>=0;j--){var b=bullets[j];if(Math.abs(b.x-e.x)<e.w/2&&b.y>e.y&&b.y<e.y+e.h){e.hp--;bullets.splice(j,1);if(e.hp<=0){boom(e.x,e.y,e.col);score+=10;enemies.splice(i,1)}}}}
for(var i=0;i<enemies.length;i++){var e=enemies[i];if(Math.abs(sx-e.x)<(sw+e.w)/2&&Math.abs(sy-e.y)<(sh+e.h)/2){boom(sx,sy,'#6c5ce7');over=true}}
particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.life-=0.02});particles=particles.filter(function(p){return p.life>0});
draw();requestAnimationFrame(loop)}
function moveL(){sx=Math.max(sw/2,sx-speed-10)}
function moveR(){sx=Math.min(cw-sw/2,sx+speed+10)}
function start2(){if(over){over=false;started=false;bullets=[];enemies=[];particles=[];score=0;tick=0;sx=cw/2;sy=ch-50;enemyCD=60;shootCD=0;draw();return}if(!started){started=true;enemies=[];score=0;tick=0}}
c.addEventListener('pointerdown',function(e){e.preventDefault();start2();var r=c.getBoundingClientRect();var sx2=c.width/r.width;var px=(e.clientX-r.left)*sx2;if(px<cw/2)moveL();else moveR()});
c.addEventListener('pointermove',function(e){if(!started||over)return;var r=c.getBoundingClientRect();var sx2=c.width/r.width;sx=(e.clientX-r.left)*sx2;if(sx<sw/2)sx=sw/2;if(sx>cw-sw/2)sx=cw-sw/2});
document.addEventListener('keydown',function(e){if(e.code==='ArrowLeft')moveL();if(e.code==='ArrowRight')moveR();if(e.code==='Space'){e.preventDefault();start2()}});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Galaxy Shooter', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Galaxy Shooter' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['galaxyshooter']
export default handler
