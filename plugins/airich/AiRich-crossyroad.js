import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height,grid=40,cols=Math.floor(W/grid),rows=Math.floor(H/grid);
var player={x:Math.floor(cols/2),y:rows-2},vehicles=[],logs=[],rowTypes=[],score=0,over=false,best=0;
var waterY=Math.floor(rows*0.45),roadY=rows-4,playerW=grid*0.7,playerH=grid*0.8;
function buildLevel(){rowTypes=[];for(var r=0;r<rows;r++){if(r<waterY-1)rowTypes.push({type:'grass',speed:0});else if(r<waterY+2)rowTypes.push({type:'water',speed:0.8+Math.random()});else rowTypes.push({type:'road',speed:1+Math.random()*2})}
vehicles=[];logs=[];for(var r=waterY;r<waterY+2;r++)for(var i=0;i<2+Math.floor(Math.random()*2);i++){logs.push({x:Math.random()*W,y:r,sp:rowTypes[r].speed*(Math.random()<0.5?1:-1),w:grid*2+Math.random()*grid*2})}
for(var r=waterY+2;r<rows-1;r++)for(var i=0;i<1+Math.floor(Math.random()*2);i++){vehicles.push({x:Math.random()*W,y:r,sp:rowTypes[r].speed*(Math.random()<0.5?1:-1),w:grid*(1+Math.floor(Math.random()*2)),h:grid*0.7})}}
function init(){player={x:Math.floor(cols/2),y:rows-2};score=0;over=false;buildLevel();draw()}
function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#0f1023';cx.fillRect(0,0,W,H);
for(var r=0;r<rows;r++){var ry=r*grid;cx.fillStyle=r<waterY?'rgba(46,204,113,.1)':r<waterY+2?'rgba(52,152,219,.15)':'rgba(255,255,255,.03)';cx.fillRect(0,ry,W,grid)}
logs.forEach(function(l){cx.fillStyle='#8B4513';cx.fillRect(l.x,l.y*grid+grid*0.2,l.w,grid*0.6);cx.fillStyle='#A0522D';cx.fillRect(l.x+5,l.y*grid+grid*0.25,l.w-10,grid*0.3)});
vehicles.forEach(function(v){cx.fillStyle=v.sp>0?'#e74c3c':'#3498db';cx.fillRect(v.x,v.y*grid+(grid-v.h)/2,v.w,v.h);cx.fillStyle='rgba(255,255,255,.2)';cx.fillRect(v.x+5,v.y*grid+(grid-v.h)/2+3,v.w*0.2,v.h-6)});
cx.fillStyle='#f1c40f';cx.fillRect(player.x*grid+(grid-playerW)/2,player.y*grid+(grid-playerH)/2,playerW,playerH);cx.fillStyle='#e67e22';cx.fillRect(player.x*grid+(grid-playerW)/2+playerW*0.3,player.y*grid+(grid-playerH)/2,playerW*0.4,playerH*0.3);
cx.fillStyle='rgba(255,255,255,.7)';cx.font='bold 13px Arial';cx.fillText('Score: '+score,10,20);
if(over){cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,W,H);cx.fillStyle='#fff';cx.font='bold 22px Arial';cx.textAlign='center';cx.fillText('Game Over! Score: '+score,W/2,H/2);cx.font='13px Arial';cx.fillText('Best: '+best,W/2,H/2+20);cx.fillText('Tap to restart',W/2,H/2+40);cx.textAlign='left'}}
function loop(){if(over)return;
logs.forEach(function(l){l.x+=l.sp;if(l.sp>0&&l.x>W)l.x=-l.w;if(l.sp<0&&l.x+l.w<0)l.x=W+l.w});
vehicles.forEach(function(v){v.x+=v.sp;if(v.sp>0&&v.x>W)v.x=-v.w;if(v.sp<0&&v.x+v.w<0)v.x=W+v.w});
if(player.y<waterY-1){var onLog=false;logs.forEach(function(l){if(l.y===player.y&&player.x*grid>=l.x-grid*0.3&&player.x*grid<=l.x+l.w+grid*0.3)onLog=true});if(!onLog){over=true;if(score>best)best=score;draw();return}else{var curLog=null;logs.forEach(function(l){if(l.y===player.y&&player.x*grid>=l.x-grid*0.3&&player.x*grid<=l.x+l.w+grid*0.3)curLog=l});if(curLog)player.x+=curLog.sp>0?0.03:-0.03;if(player.x<0||player.x>=cols){over=true;if(score>best)best=score;draw();return}}}
vehicles.forEach(function(v){if(v.y===player.y){var px=player.x*grid,pw=playerW/2;if(px+pw>v.x&&px<v.x+v.w){over=true;if(score>best)best=score;draw();return}}});
draw();requestAnimationFrame(loop)}
function move(dx,dy){if(over)return;player.x+=dx;player.y+=dy;player.x=Math.max(0,Math.min(cols-1,player.x));player.y=Math.max(0,Math.min(rows-1,player.y));if(dy<0)score++;if(player.y===0){score+=10;player.y=rows-2;buildLevel()}}
document.addEventListener('keydown',function(e){if(e.code==='ArrowUp')move(0,-1);if(e.code==='ArrowDown')move(0,1);if(e.code==='ArrowLeft')move(-1,0);if(e.code==='ArrowRight')move(1,0);if(e.code==='Space'){e.preventDefault();move(0,-1)}});
var tsX=null,tsY=null;
document.addEventListener('pointerdown',function(e){if(over){init();return}tsX=e.clientX;tsY=e.clientY});
document.addEventListener('pointerup',function(e){if(tsX===null)return;var dx=e.clientX-tsX,dy=e.clientY-tsY;tsX=null;tsY=null;if(Math.abs(dx)<10&&Math.abs(dy)<10){move(0,-1);return}if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1,0);else move(0,dy>0?1:-1)});
init();draw();loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Crossy Road', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Crossy Road' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['crossyroad']
export default handler
