import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,score=301,round=1,dartsLeft=3,over=false,lastHit=null,hitTimer=0;
var bx=W/2,by=H/2,br=Math.min(W,H)*0.38;
function getScore(dx,dy){var dist=Math.sqrt(dx*dx+dy*dy);if(dist>br)return 0;if(dist<br*0.15)return 50;if(dist<br*0.3)return 25;var ang=Math.atan2(dy,dx)*180/Math.PI;if(ang<0)ang+=360;var seg=Math.floor((ang+9)/18)%20;var multi=1;if(dist>br*0.7&&dist<br*0.78)multi=3;else if(dist>br*0.85&&dist<br*0.93)multi=2;var vals=[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];return vals[seg]*multi}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
var cols2=['#1a5c3a','#1a5c3a','#c0392b','#ecf0f1','#c0392b','#ecf0f1'];var rings=[1,0.85,0.78,0.7,0.3,0.15];
for(var i=0;i<rings.length;i++){cx.fillStyle=cols2[i];cx.beginPath();cx.arc(bx,by,br*rings[i],0,Math.PI*2);cx.fill()}
cx.strokeStyle='rgba(255,255,255,.15)';cx.lineWidth=1;for(var i=0;i<20;i++){var a=i*18*Math.PI/180;cx.beginPath();cx.moveTo(bx,by);cx.lineTo(bx+Math.cos(a)*br,by+Math.sin(a)*br);cx.stroke()}
if(lastHit&&hitTimer>0){cx.fillStyle='rgba(255,255,255,'+Math.min(hitTimer/30,1)+')';cx.font='bold 18px Arial';cx.textAlign='center';cx.fillText('+'+lastHit,bx,by-br-15);cx.textAlign='left'}
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.fillText('Score: '+score+'  Darts: '+dartsLeft+'  Round: '+round,10,20);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText(score<=0?'You Win!':'Game Over',W/2,H/2-10);cx.font='14px Arial';cx.fillText('Final: '+score,W/2,H/2+14);cx.font='13px Arial';cx.fillText('Tap to restart',W/2,H/2+34);cx.textAlign='left'}}
function throwDart(e){if(over)return;var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/W),my=(e.clientY-rect.top)/(rect.height/H);var dx=mx-bx,dy=my-by;var pts=getScore(dx,dy);score-=pts;lastHit=pts;hitTimer=30;dartsLeft--;
if(dartsLeft<=0){round++;dartsLeft=3;if(round>10||score<=0){over=true}draw();return}draw()}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();return}throwDart(e)});
function anim(){if(hitTimer>0)hitTimer--;draw();requestAnimationFrame(anim)}
function init(){score=301;round=1;dartsLeft=3;over=false;lastHit=null;hitTimer=0;draw()}
init();anim();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Darts', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Darts' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['darts']
export default handler
