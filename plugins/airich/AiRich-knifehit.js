import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var logAng=0,logSpeed=2,dir=1,knives=[],score=0,round=1,over=false,ready=true,thrown=false;
var logCx=280,logCy=200,logR=60,playR=80;
function reset(){knives=[];round=1;score=0;over=false;logSpeed=2;logAng=0;ready=true}
function draw(){x.clearRect(0,0,c.width,c.height);
x.fillStyle='rgba(255,255,255,.15)';x.font='12px Arial';x.fillText('SCORE: '+score+'  ROUND: '+round,10,18);
x.save();x.translate(logCx,logCy);x.rotate(logAng);
x.fillStyle='#8B4513';x.fillRect(-12,-logR,24,logR*2);
x.fillStyle='#6d4c1a';x.fillRect(-16,-logR,32,12);x.fillRect(-16,logR-12,32,12);
x.fillStyle='#a0522d';for(var i=0;i<4;i++){x.fillRect(-10,-logR+16+i*30,20,2)}
x.restore();
var hitAng=0;for(var i=0;i<knives.length;i++){var k=knives[i];x.save();x.translate(logCx,logCy);x.rotate(k.angle);
x.fillStyle='#ccc';x.fillRect(-2,10,4,18);x.fillStyle='#666';x.fillRect(-4,26,8,6);x.restore()}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#e17055';x.font='bold 28px Arial';x.fillText('GAME OVER',c.width/2-80,c.height/2-10);x.fillStyle='rgba(255,255,255,.6)';x.font='14px Arial';x.fillText('Score: '+score+' | Tap to restart',c.width/2-100,c.height/2+20)}
if(!over&&ready){x.fillStyle='rgba(255,255,255,.3)';x.font='13px Arial';x.fillText('Tap to throw knife',c.width/2-60,c.height-20)}}
function loop(){if(!over){logAng+=logSpeed*dir*.016;if(Math.random()<.005)dir*=-1;for(var i=0;i<knives.length;i++){if(Math.abs(knives[i].angle-logAng%(Math.PI*2))<.15||Math.abs(knives[i].angle-logAng%(Math.PI*2)+Math.PI*2)<.15||Math.abs(knives[i].angle-logAng%(Math.PI*2)-Math.PI*2)<.15){over=true;ready=false}}draw();requestAnimationFrame(loop)}}
function throwKnife(){if(over){reset();draw();requestAnimationFrame(loop);return}if(!ready)return;ready=false;
var a=-Math.PI/2;knives.push({angle:a,sticks:false});var th=20;
var iv=setInterval(function(){if(th<=0){clearInterval(iv);
var hitKnife=false;for(var i=0;i<knives.length-1;i++){var diff=Math.abs(knives[i].angle-a);if(diff<.15||diff>Math.PI*2-.15)hitKnife=true}
if(hitKnife){over=true;ready=false}else{score++;round++;logSpeed=Math.min(8,2+round*.5);ready=true}knives=[];draw();return}
th-=.03;knives[knives.length-1].angle=a+th},16)}
function tap(){if(!over){throwKnife()}else{reset();requestAnimationFrame(loop)}draw()}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap()});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Knife Hit', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Knife Hit' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['knifehit']
export default handler
