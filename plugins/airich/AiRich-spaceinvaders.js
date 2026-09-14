import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var W=c.width,H=c.height;
var ship={x:W/2-15,y:H-50,w:30,h:20},bullets=[],aliens=[],aBullets=[],score=0,lives=3,dir=1,dropTimer=0,dropI=60,alienTimer=0,alienShootTimer=0,over=false,started=false,particles=[];
var alienW=24,alienH=20,alienGap=14,alienCols=10,alienRows=4;
function spawnAliens(){aliens=[];for(var r=0;r<alienRows;r++)for(var col=0;col<alienCols;col++){aliens.push({x:40+col*(alienW+alienGap),y:40+r*(alienH+alienGap),w:alienW,h:alienH,alive:true,row:r})}}
function reset(){bullets=[];aBullets=[];particles=[];score=0;lives=3;ship.x=W/2-15;dir=1;dropTimer=0;alienTimer=0;alienShootTimer=0;over=false;spawnAliens()}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,W,H);x.fillStyle='#6c5ce7';x.beginPath();x.moveTo(ship.x+ship.w/2,ship.y);x.lineTo(ship.x,ship.y+ship.h);x.lineTo(ship.x+ship.w,ship.y+ship.h);x.closePath();x.fill();x.fillRect(ship.x+2,ship.y+ship.h,ship.w-4,5);aliens.forEach(function(a){if(!a.alive)return;var col=a.row===0?'#f66':a.row===1?'#f90':a.row===2?'#ff0':'#0f0';x.fillStyle=col;x.fillRect(a.x+3,a.y+2,a.w-6,a.h-4);x.fillRect(a.x,a.y+4,a.w,a.h-8);x.fillRect(a.x+7,a.y-2,3,4);x.fillRect(a.x+a.w-10,a.y-2,3,4)});bullets.forEach(function(b){x.fillStyle='#fff';x.fillRect(b.x-1,b.y,2,8)});aBullets.forEach(function(b){x.fillStyle='#e17a7a';x.fillRect(b.x-1,b.y,2,8)});particles.forEach(function(p){x.fillStyle='rgba('+p.c+','+p.a+')';x.fillRect(p.x,p.y,p.s,p.s)});x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE '+score+'   LIVES '+lives,8,20);if(!started){x.fillStyle='rgba(255,255,255,.85)';x.font='bold 22px Arial';x.textAlign='center';x.fillText('SPACE INVADERS',W/2,H/2-10);x.font='13px Arial';x.fillText('Tap or Space to Start',W/2,H/2+14);x.textAlign='left'}if(over){x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 22px Arial';x.textAlign='center';x.fillText('GAME OVER',W/2,H/2-10);x.font='13px Arial';x.fillText('Score: '+score+'  Tap to Restart',W/2,H/2+14);x.textAlign='left'}}
var lastT;function loop(t){if(!lastT)lastT=t;var dt=Math.min((t-lastT)/16.67,3);lastT=t;if(started&&!over){alienTimer+=dt;if(alienTimer>=4){alienTimer=0;var moved=false;for(var i=0;i<aliens.length;i++){if(!aliens[i].alive)continue;aliens[i].x+=dir*6;if(aliens[i].x+aliens[i].w>W-10||aliens[i].x<10)moved=true}if(moved){dir*=-1;for(var i=0;i<aliens.length;i++){if(!aliens[i].alive)continue;aliens[i].y+=16;if(aliens[i].y+aliens[i].h>H-60){over=true}}}}alienShootTimer+=dt;if(alienShootTimer>80){alienShootTimer=0;var alive=aliens.filter(function(a){return a.alive});if(alive.length>0){var a=alive[Math.floor(Math.random()*alive.length)];aBullets.push({x:a.x+a.w/2,y:a.y+a.h,vy:3})}}bullets.forEach(function(b){b.y-=8*dt});bullets=bullets.filter(function(b){return b.y>-10});aBullets.forEach(function(b){b.y+=b.vy*dt});aBullets=aBullets.filter(function(b){return b.y<H+10});for(var i=aliens.length-1;i>=0;i--){if(!aliens[i].alive)continue;var a=aliens[i];for(var j=bullets.length-1;j>=0;j--){var b=bullets[j];if(b.x>=a.x&&b.x<=a.x+a.w&&b.y>=a.y&&b.y<=a.y+a.h){a.alive=false;bullets.splice(j,1);score+=10*(alienRows-a.row);for(var k=0;k<6;k++)particles.push({x:a.x+a.w/2,y:a.y+a.h/2,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,a:1,c:'108,92,231',s:3});break}}}for(var j=aBullets.length-1;j>=0;j--){var b=aBullets[j];if(b.x>=ship.x&&b.x<=ship.x+ship.w&&b.y>=ship.y&&b.y<=ship.y+ship.h+5){aBullets.splice(j,1);lives--;if(lives<=0){over=true;for(var k=0;k<12;k++)particles.push({x:ship.x+ship.w/2,y:ship.y+ship.h/2,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,a:1,c:'225,122,122',s:4})}}}
var aliveCount=aliens.filter(function(a){return a.alive}).length;if(aliveCount===0){spawnAliens();dropI=Math.max(20,dropI-5)}}particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a-=.025});particles=particles.filter(function(p){return p.a>0})}draw();requestAnimationFrame(loop)
function startGame(){if(over){reset()}if(!started){started=true;spawnAliens();requestAnimationFrame(loop)}}
var shipDir=0;
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();startGame()}if(e.code==='ArrowLeft'){e.preventDefault();ship.x=Math.max(5,ship.x-15)}if(e.code==='ArrowRight'){e.preventDefault();ship.x=Math.min(W-ship.w-5,ship.x+15)}if(e.code==='ArrowUp'){e.preventDefault();bullets.push({x:ship.x+ship.w/2,y:ship.y})}});
document.addEventListener('pointerdown',function(e){e.preventDefault();if(!started||over){startGame();return}var rect=c.getBoundingClientRect();var cx=e.clientX-rect.left;var sx=rect.width/W;if(cx*sx<W/2)ship.x=Math.max(5,ship.x-25);else{ship.x=Math.min(W-ship.w-5,ship.x+25)}bullets.push({x:ship.x+ship.w/2,y:ship.y})});
draw();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Space Invaders', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Space Invaders' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['spaceinvaders']
export default handler
