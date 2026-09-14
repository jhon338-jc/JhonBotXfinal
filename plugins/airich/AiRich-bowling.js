import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,frame=1,throwInFrame=1,scores=[],total=0,over=false;
var pins=[],ball={x:0,y:0,vx:0,vy:0,active:false},phase='aim',aimX=W/2,power=0,powerDir=2,shots=[];
function resetPins(){pins=[];var sx=W/2-60,sy=50,sp=22;var rows=[[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]];rows.forEach(function(row,ri){row.forEach(function(ci){pins.push({x:sx+ci*sp+(4-ri)*sp*0.5,y:sy+ri*sp,w:14,h:14,standing:true})})})}
function init(){frame=1;throwInFrame=1;scores=[];total=0;over=false;shots=[];resetPins();phase='aim';aimX=W/2;power=0;ball.active=false;draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
cx.fillStyle='rgba(255,255,255,.05)';cx.fillRect(W/2-100,30,200,H-60);
pins.forEach(function(p){if(!p.standing)return;cx.fillStyle='#ecf0f1';cx.fillRect(p.x-p.w/2,p.y-p.h/2,p.w,p.h);cx.strokeStyle='rgba(255,255,255,.3)';cx.strokeRect(p.x-p.w/2,p.y-p.h/2,p.w,p.h)});
if(ball.active){cx.fillStyle='#2ecc71';cx.beginPath();cx.arc(ball.x,ball.y,10,0,Math.PI*2);cx.fill()}
if(phase==='aim'){cx.fillStyle='rgba(255,255,255,.5)';cx.beginPath();cx.arc(aimX,H-40,10,0,Math.PI*2);cx.fill();cx.fillStyle='rgba(255,255,255,.15)';cx.fillRect(aimX-2,H-80,4,40);cx.fillStyle='#e74c3c';cx.fillRect(20,H-16,power*3,8);cx.strokeStyle='rgba(255,255,255,.2)';cx.strokeRect(20,H-16,150,8)}
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 12px Arial';cx.textAlign='center';cx.fillText('Frame '+frame+'/10 | Shot '+throwInFrame+' | Total: '+total,W/2,20);cx.textAlign='left';
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Game Over! Score: '+total,W/2,H/2);cx.font='13px Arial';cx.fillText('Tap to play again',W/2,H/2+24);cx.textAlign='left'}}
function step(){if(!ball.active)return;ball.x+=ball.vx;ball.y+=ball.vy;ball.vy-=0.1;var hitAny=false;pins.forEach(function(p){if(!p.standing)return;var dx=ball.x-p.x,dy=ball.y-p.y;if(Math.abs(dx)<p.w/2+10&&Math.abs(dy)<p.h/2+10){p.standing=false;hitAny=true}});
if(ball.y<20||ball.x<10||ball.x>W-10)endThrow();else if(!hitAny&&ball.vy>=-0.1&&ball.y>H-60)endThrow();else requestAnimationFrame(step)}
function endThrow(){ball.active=false;var knocked=pins.filter(function(p){return !p.standing}).length;var prev=shots.length?shots[shots.length-1]:0;var fScore=knocked-prev;scores.push(fScore);total+=fScore;shots.push(knocked);
if(knocked===10&&throwInFrame===1){throwInFrame=1;frame++;shots=[];if(frame>10){over=true;draw();return}resetPins();phase='aim';draw();return}
throwInFrame++;if(throwInFrame>2||knocked>=10){throwInFrame=1;frame++;shots=[];if(frame>10){over=true;draw();return}resetPins();phase='aim';draw();return}phase='aim';draw()}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();return}if(phase==='aim'){phase='power';power=0;powerDir=2;return}if(phase==='power'){phase='none';ball={x:aimX,y:H-40,vx:(aimX-W/2)*0.03,vy:-8-power*0.06,active:true};step();return}});
function aimMove(e){if(phase!=='aim')return;var rect=cv.getBoundingClientRect();aimX=(e.clientX-rect.left)/(rect.width/W)*W}
cv.addEventListener('pointermove',aimMove);
function powerTick(){if(phase==='power'){power+=powerDir;if(power>100||power<0)powerDir*=-1;draw();requestAnimationFrame(powerTick)}}
var origDown=cv.onpointerdown||null;
cv.addEventListener('pointerdown',function(){if(phase==='power')powerTick()});
function loop(){if(phase==='aim')draw();if(!over)requestAnimationFrame(loop)}loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Bowling', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Bowling' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['bowling']
export default handler
