import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var bx,by,bvy=0,obstacles=[],score=0,over=false,playing=false,scrollY=0,frame=0;
function reset(){bx=80;by=180;bvy=0;obstacles=[];score=0;over=false;scrollY=0;frame=0;
for(var i=0;i<6;i++){obstacles.push({x:100+i*120+Math.random()*40,y:100+Math.random()*200,w:18,h:60+Math.random()*80,type:Math.random()<.5?'top':'bottom'})}}
function draw(){x.clearRect(0,0,c.width,c.height);
x.fillStyle='rgba(108,92,231,.15)';for(var i=0;i<20;i++){x.beginPath();x.arc((i*57)%c.width,((i*43+scrollY*.3)%c.width)+20,2,0,Math.PI*2);x.fill()}
for(var i=0;i<obstacles.length;i++){var o=obstacles[i];var oy=(o.y-scrollY*0.6)%380;
x.fillStyle='rgba(108,92,231,.5)';x.fillRect(o.x,oy,o.w,o.h);
x.fillStyle='rgba(108,92,231,.7)';x.fillRect(o.x,oy,o.w,4)}
x.save();x.translate(bx,by);x.fillStyle='#ffeaa7';x.beginPath();x.arc(0,0,12,0,Math.PI*2);x.fill();
x.fillStyle='#fdcb6e';x.beginPath();x.arc(-3,-4,3,0,Math.PI*2);x.fill();
x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=1.5;x.beginPath();x.moveTo(0,-14);x.lineTo(-6,-28);x.moveTo(0,-14);x.lineTo(6,-28);x.moveTo(0,-14);x.lineTo(0,-32);x.stroke();
x.fillStyle='#fd79a8';x.beginPath();x.moveTo(0,-14);x.lineTo(-8,-30);x.lineTo(8,-30);x.closePath();x.fill();x.restore();
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 13px Arial';x.fillText('HEIGHT: '+score,10,18);
if(!playing&&!over){x.fillStyle='rgba(255,255,255,.5)';x.font='14px Arial';x.fillText('Tap to fly up',c.width/2-50,c.height/2)}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#e17055';x.font='bold 26px Arial';x.fillText('GAME OVER',c.width/2-80,c.height/2-10);x.fillStyle='rgba(255,255,255,.6)';x.font='14px Arial';x.fillText('Height: '+score+' | Tap to restart',c.width/2-100,c.height/2+20)}}
function loop(){if(!over&&playing){frame++;bvy+=.25;by+=bvy;scrollY+=1.5;
if(frame%40===0){var gap=100+Math.random()*60;var gy=40+Math.random()*200;obstacles.push({x:c.width+20,y:gy-scrollY*.6,w:18,h:40+Math.random()*80,type:'top'});obstacles.push({x:c.width+20,y:gy+gap-scrollY*.6,w:18,h:40+Math.random()*80,type:'bottom'})}
if(frame%10===0)score++;
for(var i=0;i<obstacles.length;i++){var o=obstacles[i];var oy=(o.y-scrollY*0.6)%380;
if(bx+12>o.x&&bx-12<o.x+o.w&&by-12<oy+o.h&&by+12>oy){over=true}}
if(by<-20||by>c.height+20)over=true;
if(by>c.height-10){by=c.height-10;bvy=0}}
draw();if(!over)requestAnimationFrame(loop)}
function fly(){if(over){reset();playing=true;requestAnimationFrame(loop);return}if(!playing){playing=true;requestAnimationFrame(loop)}bvy=-5}
document.addEventListener('pointerdown',function(e){e.preventDefault();fly()});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();fly()}});
reset();draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Sky Up', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Sky Up' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['skyup']
export default handler
