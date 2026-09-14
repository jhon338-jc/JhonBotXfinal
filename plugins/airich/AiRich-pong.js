import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var W=c.width,H=c.height;
var PW=12,PH=80,BW=8,BH=8;
var lp={y:H/2-PH/2},rp={y:H/2-PH/2},ball={x:W/2,y:H/2,vx:4,vy:3,r:4};
var ls=0,rs=0,WIN=5,over=false,started=false,aiSpd=3.2;
var running=false,lastT,particles=[];
function reset(){ball.x=W/2;ball.y=H/2;ball.vx=(Math.random()>.5?1:-1)*4;ball.vy=(Math.random()-.5)*4;lp.y=H/2-PH/2;rp.y=H/2-PH/2}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,W,H);x.setLineDash([8,8]);x.strokeStyle='rgba(255,255,255,.15)';x.lineWidth=2;x.beginPath();x.moveTo(W/2,0);x.lineTo(W/2,H);x.stroke();x.setLineDash([]);x.fillStyle='#6c5ce7';x.fillRect(8,lp.y,PW,PH);x.fillStyle='#e17a7a';x.fillRect(W-8-PW,rp.y,PW,PH);x.fillStyle='#fff';x.beginPath();x.arc(ball.x,ball.y,ball.r,0,Math.PI*2);x.fill();particles.forEach(function(p){x.fillStyle='rgba('+p.c+','+p.a+')';x.fillRect(p.x,p.y,p.s,p.s)});x.fillStyle='rgba(255,255,255,.7)';x.font='bold 28px Arial';x.textAlign='center';x.fillText(ls,W/2-40,35);x.fillText(rs,W/2+40,35);if(!started){x.fillStyle='rgba(255,255,255,.85)';x.font='bold 22px Arial';x.fillText('PONG',W/2,H/2-20);x.font='13px Arial';x.fillText('Tap or Space to Start',W/2,H/2+10);x.textAlign='left'}if(over){x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 22px Arial';x.textAlign='center';x.fillText(ls>=WIN?'YOU WIN!':'AI WINS!',W/2,H/2-10);x.font='13px Arial';x.fillText('Tap to Restart',W/2,H/2+14);x.textAlign='left'}x.textAlign='left'}
var fingerY=null;
function loop(t){if(!lastT)lastT=t;lastT=t;if(running&&!over){if(fingerY!==null){var ty=fingerY-PH/2;lp.y+=(ty-lp.y)*.15}else{var cY=ball.vy>0?ball.y-H/4:ball.y+H/4;lp.y+=(cY-lp.y)*.06}lp.y=Math.max(0,Math.min(H-PH,lp.y));var aiC=ball.y-PH/2;rp.y+=(aiC-rp.y)*.055;rp.y=Math.max(0,Math.min(H-PH,rp.y));ball.x+=ball.vx;ball.y+=ball.vy;if(ball.y-ball.r<=0||ball.y+ball.r>=H){ball.vy*=-1;ball.y=Math.max(ball.r,Math.min(H-ball.r,ball.y))}if(ball.x-BW/2<=22&&ball.x+ball.r>=8&&ball.y>=lp.y&&ball.y<=lp.y+PH){ball.vx=Math.abs(ball.vx)*1.03;ball.vy+=(ball.y-(lp.y+PH/2))*.15;for(var i=0;i<4;i++)particles.push({x:ball.x,y:ball.y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,a:1,c:'108,92,231',s:3})}if(ball.x+BW/2>=W-22&&ball.x-ball.r<=W-8&&ball.y>=rp.y&&ball.y<=rp.y+PH){ball.vx=-Math.abs(ball.vx)*1.03;ball.vy+=(ball.y-(rp.y+PH/2))*.15;for(var i=0;i<4;i++)particles.push({x:ball.x,y:ball.y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,a:1,c:'225,122,122',s:3})}if(ball.x<0){rs++;reset();if(rs>=WIN)over=true}if(ball.x>W){ls++;reset();if(ls>=WIN)over=true}particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a-=.025});particles=particles.filter(function(p){return p.a>0})}draw();requestAnimationFrame(loop)}
function startGame(){if(over){ls=0;rs=0;over=false;reset()}if(!started){started=true}running=true;reset();requestAnimationFrame(loop)}
document.addEventListener('pointerdown',function(e){e.preventDefault();if(e.touches){fingerY=e.touches[0].clientY}else{fingerY=null}startGame()});
document.addEventListener('pointermove',function(e){if(e.touches){fingerY=e.touches[0].clientY}else if(fingerY!==null){fingerY=e.clientY}});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();startGame()}if(e.code==='ArrowUp'){e.preventDefault();lp.y=Math.max(0,lp.y-20)}if(e.code==='ArrowDown'){e.preventDefault();lp.y=Math.min(H-PH,lp.y+20)}});
draw();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Pong', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Pong' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['pong']
export default handler
