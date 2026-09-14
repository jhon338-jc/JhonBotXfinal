import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,score=0,round=1,maxR=5,ringX,ringY,ringR,ringSpd,ringDir=1,arrows=3,over=false,best=0;
function init(){score=0;round=1;over=false;newRing()}
function newRing(){ringX=W/2;ringY=H*0.35;ringR=100;ringSpd=1.5+round*0.3;arrows=3}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
cx.strokeStyle='rgba(255,255,255,.08)';cx.lineWidth=2;
var cols=['#e74c3c','#c0392b','#fff','#3498db','#2ecc71'];var radii=[14,28,42,56,70];
for(var i=radii.length-1;i>=0;i--){cx.beginPath();cx.arc(ringX,ringY,radii[i],0,Math.PI*2);cx.fillStyle=cols[i];cx.globalAlpha=0.3;cx.fill();cx.globalAlpha=1;cx.strokeStyle='rgba(255,255,255,.3)';cx.stroke()}
cx.fillStyle='rgba(255,255,255,.15)';cx.beginPath();cx.arc(ringX,ringY,ringR,0,Math.PI*2);cx.fill();
var crossS=8;cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=1;cx.beginPath();cx.moveTo(ringX-crossS,ringY);cx.lineTo(ringX+crossS,ringY);cx.moveTo(ringX,ringY-crossS);cx.lineTo(ringX,ringY+crossS);cx.stroke();
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.fillText('Score: '+score+'  Round: '+round+'/'+maxR,10,20);cx.fillText('Arrows: '+arrows,10,34);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Final Score: '+score,W/2,H/2-10);cx.font='14px Arial';cx.fillText('Best: '+best,W/2,H/2+16);cx.font='13px Arial';cx.fillText('Tap to play again',W/2,H/2+38);cx.textAlign='left'}}
function loop(){if(over)return;ringX+=ringSpd*ringDir;if(ringX+ringR>W-20)ringDir=-1;if(ringX-ringR<20)ringDir=1;draw();requestAnimationFrame(loop)}
function shoot(e){if(over)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);
var dx=mx-ringX,dy=my-ringY,dist=Math.sqrt(dx*dx+dy*dy);
var pts=0;if(dist<14)pts=10;else if(dist<28)pts=8;else if(dist<42)pts=6;else if(dist<56)pts=4;else if(dist<70)pts=2;else pts=0;
score+=pts;arrows--;
cx.fillStyle='#fff';cx.font='bold 18px Arial';cx.textAlign='center';cx.fillText('+'+pts,mx,my-10);cx.textAlign='left';
if(pts===0){draw()}if(arrows<=0){round++;if(round>maxR){over=true;if(score>best)best=score;draw();return}newRing()}draw()}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();draw();loop();return}shoot(e)});
init();draw();loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Archery', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Archery' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['archery']
export default handler
