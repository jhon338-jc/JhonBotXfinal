import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),cw=c.width,ch=c.height;
var by=ch*0.65,bvy=0,gravity=0.35,flap=-6.5,bx=cw*0.3,bw=28,bh=22;
var pipes=[],pgap=140,pw=52,pSpeed=3,score=0,over=false,started=false,tick=0;
var bg1=0,bg2=0;
function draw(){x.clearRect(0,0,cw,ch);
var gd=x.createLinearGradient(0,0,0,ch);gd.addColorStop(0,'#1a1b2e');gd.addColorStop(1,'#26264a');x.fillStyle=gd;x.fillRect(0,0,cw,ch);
x.fillStyle='rgba(255,255,255,.03)';for(var i=0;i<6;i++){var cx2=(i*95-bg1%(95*6)+95*6)%(95*6);x.fillRect(cx2,20+Math.sin(i*2)*10,30,3)}
for(var i=0;i<pipes.length;i++){var p=pipes[i];var gd2=x.createLinearGradient(p.x,0,p.x+pw,0);gd2.addColorStop(0,'#2ecc71');gd2.addColorStop(1,'#27ae60');
x.fillStyle=gd2;x.fillRect(p.x,0,pw,p.y);x.fillRect(p.x,p.y+pgap,pw,ch-p.y-pgap);
x.fillStyle='rgba(255,255,255,.15)';x.fillRect(p.x+pw-6,p.y-8,8,8);x.fillRect(p.x+pw-6,p.y+pgap,8,8)}
x.fillStyle='#fdcb6e';x.beginPath();x.ellipse(bx+bw/2,by+bh/2,bw/2,bh/2,0,0,Math.PI*2);x.fill();
x.fillStyle='#f39c12';x.beginPath();x.ellipse(bx+bw/2+3,by+bh/2-2,bw*0.35,bh*0.35,0,0,Math.PI*2);x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(bx+bw/2+4,by+bh/2-4,3,0,Math.PI*2);x.fill();
x.fillStyle='#2d3436';x.beginPath();x.arc(bx+bw/2+5,by+bh/2-4,1.5,0,Math.PI*2);x.fill();
x.fillStyle='#e17a7a';x.beginPath();x.moveTo(bx+bw/2+bw/2,by+bh/2-2);x.lineTo(bx+bw/2+bw/2+8,by+bh/2-4);x.lineTo(bx+bw/2+bw/2+8,by+bh/2+4);x.closePath();x.fill();
x.fillStyle='rgba(255,255,255,.8)';x.font='bold 16px Arial';x.textAlign='center';x.fillText(score,cw/2,30);x.textAlign='left';
if(!started){x.fillStyle='rgba(15,15,25,.5)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('FLAPPY BIRD',cw/2,ch/2-10);x.font='12px Arial';x.fillText('Tap or Space to flap',cw/2,ch/2+10);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('GAME OVER',cw/2,ch/2-15);x.font='13px Arial';x.fillText('Score: '+score,cw/2,ch/2+5);x.fillText('Tap to restart',cw/2,ch/2+25);x.textAlign='left'}}
function loop(){if(!started||over){requestAnimationFrame(loop);return}
tick++;bvy+=gravity;by+=bvy;bg1+=pSpeed;
if(by<0){by=0;bvy=0}
if(by+bh>ch-10){over=true}
for(var i=0;i<pipes.length;i++){pipes[i].x-=pSpeed}
pipes=pipes.filter(function(p){return p.x+pw>-10});
if(tick%90===0){var miny=60,maxy=ch-pgap-60;var py=miny+Math.random()*(maxy-miny);pipes.push({x:cw+10,y:py})}
for(var i=0;i<pipes.length;i++){var p=pipes[i];if(bx+bw>p.x&&bx<p.x+pw){if(by<p.y||by+bh>p.y+pgap){over=true}}
if(!p.scored&&p.x+pw<bx){p.scored=true;score++}}
draw();requestAnimationFrame(loop)}
function flap2(){if(over){over=false;started=false;by=ch*0.65;bvy=0;pipes=[];score=0;tick=0;draw();return}if(!started){started=true;bvy=flap;return}bvy=flap}
c.addEventListener('pointerdown',function(e){e.preventDefault();flap2()});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();flap2()}});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Flappy Bird', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Flappy Bird' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['flappy']
export default handler
