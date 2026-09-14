import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),cw=c.width,ch=c.height;
var lanes=[cw*0.2,cw*0.4,cw*0.6,cw*0.8],carX=lanes[1],carW=30,carH=50,cy=ch-70;
var enemies=[],speed=3,score=0,over=false,started=false,hw=40,hh=55;
var laneX1=cw*0.25,laneX2=cw*0.75,roadL=cw*0.08,roadR=cw-20,lY=0;
var cols=['#e17a7a','#6c5ce7','#00b894','#fdcb6e','#e84393','#fd79a8'];
function drawCar(cx,cy2,w,h,col){x.fillStyle=col||'#6c5ce7';x.beginPath();x.roundRect(cx-w/2,cy2-h/2,w,h,6);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.fillRect(cx-w/2+3,cy2-h/2+8,w-6,10);x.fillStyle='rgba(255,255,255,.15)';x.fillRect(cx-w/2+3,cy2+h/2-14,w-6,8)}
function draw(){x.clearRect(0,0,cw,ch);
x.fillStyle='#2d2d3f';x.fillRect(roadL,0,roadR-roadL,ch);
x.setLineDash([20,15]);x.strokeStyle='rgba(255,255,255,.3)';x.lineWidth=2;
x.beginPath();x.moveTo(laneX1,0);x.lineTo(laneX1,ch);x.stroke();
x.beginPath();x.moveTo(laneX2,0);x.lineTo(laneX2,ch);x.stroke();x.setLineDash([]);
x.fillStyle='rgba(255,255,255,.35)';x.font='bold 11px Arial';x.fillText('SCORE '+score,cw/2-25,18);
drawCar(carX,cy,carW,carH,'#6c5ce7');
for(var i=0;i<enemies.length;i++){var e=enemies[i];drawCar(e.x,e.y,hw,hh,e.col)}
if(!started){x.fillStyle='rgba(15,15,25,.6)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 16px Arial';x.textAlign='center';x.fillText('CAR DODGE',cw/2,ch/2-10);x.font='12px Arial';x.fillText('Tap left/right to move',cw/2,ch/2+12);x.fillText('Dodge traffic!',cw/2,ch/2+30);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.75)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('CRASH! Score: '+score,cw/2,ch/2);x.font='12px Arial';x.fillText('Tap to restart',cw/2,ch/2+22);x.textAlign='left'}}
function spawn(){var li=Math.floor(Math.random()*4);var ex=lanes[li];var oy=-50-Math.random()*80;enemies.push({x:ex,y:oy,col:cols[Math.floor(Math.random()*cols.length)]});
if(Math.random()<.4){var li2=(li+1)%4;enemies.push({x:lanes[li2],y:oy-60-Math.random()*40,col:cols[Math.floor(Math.random()*cols.length)]})}}
var st2=0;
function loop(){if(over||!started){requestAnimationFrame(loop);return}
lY=(lY+speed)%35;
for(var i=0;i<enemies.length;i++)enemies[i].y+=speed;enemies=enemies.filter(function(e){return e.y<ch+60});
st2++;if(st2>Math.max(30,70-speed*5)){st2=0;spawn()}
speed=Math.min(9,3+score*0.04);score+=1;
for(var i=0;i<enemies.length;i++){var e=enemies[i];if(Math.abs(carX-e.x)<(carW+hw)/2-6&&Math.abs(cy-e.y)<(carH+hh)/2-6){over=true;return}}
draw();requestAnimationFrame(loop)}
function moveL(){carX=lanes[Math.max(0,lanes.indexOf(carX)-1)]}
function moveR(){carX=lanes[Math.min(3,lanes.indexOf(carX)+1)]}
function startGame(){if(over){over=false;started=false;enemies=[];speed=3;score=0;st2=0;carX=lanes[1];draw();return}if(!started){started=true;enemies=[];score=0;st2=0}}
c.addEventListener('pointerdown',function(e){e.preventDefault();startGame();var r=c.getBoundingClientRect();var sx=c.width/r.width;var cx=(e.clientX-r.left)*sx;if(cx<cw/2)moveL();else moveR()});
document.addEventListener('keydown',function(e){if(e.code==='ArrowLeft')moveL();if(e.code==='ArrowRight')moveR();if(e.code==='Space'){e.preventDefault();startGame()}});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Car Game', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Car Game' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['cargame', 'car', 'drive']
export default handler
