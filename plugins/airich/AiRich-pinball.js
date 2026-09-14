import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var W=c.width,H=c.height;
var balls=[],bumpers=[],flipL=0,flipR=0,score=0,lives=3,over=false,launched=false,flipT=0;
var ball={x:W/2,y:H-40,r:7,vx:0,vy:0};
function build(){bumpers=[];var pts=[[W*0.3,H*0.18,W*0.07,'#f66'],[W*0.7,H*0.18,W*0.07,'#60f'],[W*0.5,H*0.3,W*0.09,'#6c5ce7'],[W*0.22,H*0.48,W*0.06,'#ff0'],[W*0.8,H*0.5,W*0.06,'#0f0']];for(var i=0;i<5;i++){bumpers.push({x:pts[i][0],y:pts[i][1],r:pts[i][2],col:pts[i][3]})}}
function reset(){score=0;lives=3;over=false;launched=false;ball.x=W/2;ball.y=H-40;ball.vx=0;ball.vy=0;build()}
function launch(){if(over){reset();return}if(!launched){launched=true;ball.vx=2+(Math.random()-0.5)*2;ball.vy=-7}}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,W,H);x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=3;x.beginPath();x.moveTo(0,0);x.lineTo(0,H);x.moveTo(W,0);x.lineTo(W,H);x.stroke();x.fillStyle='#6c5ce7';for(var i=0;i<6;i++){var yy=20+i*14;x.fillRect(W-14,yy,4,8)}bumpers.forEach(function(b){x.fillStyle=b.col;x.beginPath();x.arc(b.x,b.y,b.r,0,Math.PI*2);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(b.x-2,b.y-2,3,0,Math.PI*2);x.fill()});x.fillStyle='#e17a7a';var fy=H-16;x.beginPath();x.moveTo(W/2-70,fy+8);x.lineTo(W/2-70+flipL,fy);x.lineTo(W/2-2,fy+8);x.closePath();x.fill();x.beginPath();x.moveTo(W/2+70,fy+8);x.lineTo(W/2+70-flipR,fy);x.lineTo(W/2+2,fy+8);x.closePath();x.fill();x.fillStyle='#fff';x.beginPath();x.arc(ball.x,ball.y,ball.r,0,Math.PI*2);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE '+score+'   BALLS '+lives,8,20);if(!launched&&!over){x.fillStyle='rgba(255,255,255,.85)';x.font='bold 22px Arial';x.textAlign='center';x.fillText('PINBALL',W/2,H/2-10);x.font='12px Arial';x.fillText('Tap Left/Right or A/D for flippers, Space to launch',W/2,H/2+14);x.textAlign='left'}if(over){x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 22px Arial';x.textAlign='center';x.fillText('GAME OVER',W/2,H/2-10);x.font='12px Arial';x.fillText('Score: '+score+'  Tap to restart',W/2,H/2+14);x.textAlign='left'}}
var lastT;function loop(t){if(!lastT)lastT=t;var dt=Math.min((t-lastT)/16.67,3);lastT=t;if(launched&&!over){ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;ball.vy+=.4*dt;if(ball.x-ball.r<3){ball.x=3+ball.r;ball.vx=Math.abs(ball.vx)}if(ball.x+ball.r>W-3){ball.x=W-3-ball.r;ball.vx=-Math.abs(ball.vx)}if(ball.y-ball.r<0){ball.y=ball.r;ball.vy=Math.abs(ball.vy)}if(ball.y-ball.r>H-30){if(ball.x<W/2-3){if(flipL>0||ball.vy>0){ball.vy=-Math.abs(ball.vy)*.9;ball.vx=-2-Math.random()*2;ball.y=H-30;flipL=0}else{loss()}}else if(ball.x>W/2+3){if(flipR>0||ball.vy>0){ball.vy=-Math.abs(ball.vy)*.9;ball.vx=2+Math.random()*2;ball.y=H-30;flipR=0}else{loss()}}else if(ball.y>H+20){loss()}}bumpers.forEach(function(b){var dx=ball.x-b.x,dy=ball.y-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<b.r+ball.r){score+=25;var nx=dx/d||1,ny=dy/d||1;var sp=Math.sqrt(ball.vx*ball.vx+ball.vy*ball.vy);var push=6+Math.abs(ball.vy);ball.vx=nx*push;ball.vy=ny*push-3;ball.x=b.x+nx*(b.r+ball.r);ball.y=b.y+ny*(b.r+ball.r)}})if(flipT>0)flipT-=dt;if(flipL>0)flipL=Math.max(0,flipL-5*dt);if(flipR>0)flipR=Math.max(0,flipR-5*dt)}draw();requestAnimationFrame(loop)}
function loss(){lives--;launched=false;ball.x=W/2;ball.y=H-40;ball.vx=0;ball.vy=0;if(lives<=0)over=true}
function flip(side){if(!launched)launch();if(side==='L')flipL=46;else flipR=46;flipT=80}
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();launch()}if(e.code==='KeyA'||e.code==='ArrowLeft'){e.preventDefault();flip('L')}if(e.code==='KeyD'||e.code==='ArrowRight'){e.preventDefault();flip('R')}});
document.addEventListener('pointerdown',function(e){e.preventDefault();var rect=c.getBoundingClientRect();var cx=(e.clientX-rect.left)*(W/rect.width);launch();if(cx<W/2)flip('L');else flip('R')});
reset();requestAnimationFrame(loop);
`
let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎱', key: m.key } })
    try {
        const html = shell({ title: 'Pinball', tag: 'GAME', icon: '🎱', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Pinball' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}
handler.command = ['pinball']
export default handler