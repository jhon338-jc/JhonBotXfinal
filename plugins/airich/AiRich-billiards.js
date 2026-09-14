import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,ballR=8,pockets=[];
var balls=[],cue={x:0,y:0},aiming=false,aimA=0,power=0,shooting=false,shotCnt=0,over=false;
var px=40,py=40,bw=W-80,bh=H-80;
function init(){balls=[];shotCnt=0;over=false;aiming=true;shooting=false;
balls.push({x:px+bw/2,y:py+bh/2,vx:0,vy:0,col:'#fff',id:0});
var sx=px+bw*0.7,sy=py+bh/2,sp=14,cols=['#e74c3c','#3498db','#2ecc71','#f1c40f','#8e44ad','#e67e22','#1abc9c','#c0392b','#2980b9','#27ae60','#f39c12','#9b59b6','#d35400','#16a085'];
for(var i=0;i<14;i++){var row=Math.floor(i/4),off=i%4;balls.push({x:sx+row*sp*(0.866)+off*sp*0.5-6,y:sy+off*sp*0.5-row*sp*0.5+sp*0.5,vx:0,vy:0,col:cols[i],id:i+1})}
pockets=[{x:px,y:py},{x:px+bw/2,y:py-5},{x:px+bw,y:py},{x:px,y:py+bh},{x:px+bw/2,y:py+bh+5},{x:px+bw,y:py+bh}];
cue=balls[0];
draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0d3320';cx.fillRect(0,0,W,H);cx.fillStyle='#1a5c3a';cx.fillRect(px-5,py-5,bw+10,bh+10);cx.fillStyle='#0d3320';cx.fillRect(px,py,bw,bh);
pockets.forEach(function(pk){cx.fillStyle='#000';cx.beginPath();cx.arc(pk.x,pk.y,10,0,Math.PI*2);cx.fill()});
balls.forEach(function(b){cx.fillStyle=b.col;cx.beginPath();cx.arc(b.x,b.y,ballR,0,Math.PI*2);cx.fill();cx.strokeStyle='rgba(0,0,0,.3)';cx.lineWidth=1;cx.stroke()});
if(aiming&&!shooting){cx.strokeStyle='rgba(255,255,255,.4)';cx.lineWidth=2;cx.setLineDash([4,4]);cx.beginPath();cx.moveTo(cue.x,cue.y);cx.lineTo(cue.x+Math.cos(aimA)*80,cue.y+Math.sin(aimA)*80);cx.stroke();cx.setLineDash([]);if(power>0){cx.fillStyle='#e74c3c';cx.fillRect(10,H-20,bw*(power/100),8);cx.strokeStyle='rgba(255,255,255,.3)';cx.strokeRect(10,H-20,bw,8)}}
cx.fillStyle='rgba(255,255,255,.6)';cx.font='bold 12px Arial';cx.fillText('Shots: '+shotCnt,px,py-15);if(over){cx.fillStyle='rgba(0,0,0,.5)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 20px Arial';cx.textAlign='center';cx.fillText('Cleared! Shots: '+shotCnt,W/2,H/2);cx.font='13px Arial';cx.fillText('Tap to restart',W/2,H/2+22);cx.textAlign='left'}}
function step(){var moving=false;balls.forEach(function(b){b.x+=b.vx;b.y+=b.vy;b.vx*=.985;b.vy*=.985;if(b.x-ballR<px){b.x=px+ballR;b.vx*=-.7}if(b.x+ballR>px+bw){b.x=px+bw-ballR;b.vx*=-.7}if(b.y-ballR<py){b.y=py+ballR;b.vy*=-.7}if(b.y+ballR>py+bh){b.y=py+bh-ballR;b.vy*=-.7}if(Math.abs(b.vx)>.1||Math.abs(b.vy)>.1)moving=true});
for(var i=0;i<balls.length;i++)for(var j=i+1;j<balls.length;j++){var a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<ballR*2&&dist>0){var nx=dx/dist,ny=dy/dist,dvn=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(dvn>0){a.vx-=dvn*nx*.8;a.vy-=dvn*ny*.8;b.vx+=dvn*nx*.8;b.vy+=dvn*ny*.8}var ov=(ballR*2-dist)/2;a.x-=nx*ov;a.y-=ny*ov;b.x+=nx*ov;b.y+=ny*ov}}
pockets.forEach(function(pk){balls.forEach(function(b,i){if(i===0)return;var dx=b.x-pk.x,dy=b.y-pk.y;if(Math.sqrt(dx*dx+dy*dy)<12){b.x=-100;b.y=-100;b.vx=0;b.vy=0}})});
if(!moving&&shooting){shooting=false;aiming=true;balls=balls.filter(function(b){return b.x>-50});var allIn=true;balls.forEach(function(b){if(b.id>0)allIn=false});if(allIn||balls.length<=1)over=true;draw()}else if(moving){draw();requestAnimationFrame(step)}else{draw()}}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();return}if(!aiming||shooting)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);aimA=Math.atan2(my-cue.y,mx-cue.x);power=60;shooting=true;shotCnt++;aiming=false;cue=balls[0];var sp=Math.max(power*0.15,5);balls[0].vx=Math.cos(aimA)*sp;balls[0].vy=Math.sin(aimA)*sp;requestAnimationFrame(step)});
cv.addEventListener('pointermove',function(e){if(!aiming||shooting)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);aimA=Math.atan2(my-cue.y,mx-cue.x);draw()});
init();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎱', key: m.key } })
    try {
        const html = shell({ title: 'Billiards', tag: 'GAME', icon: '🎱', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Billiards' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['billiards']
export default handler
