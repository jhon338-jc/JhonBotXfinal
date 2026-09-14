import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),cw=c.width,ch=c.height;
var ground=ch-50,px=80,py=ground,pw=30,ph=30,pvy=0,grav=0.55,jforce=-10,jumping=false;
var spikes=[],blocks=[],speed=5,score=0,over=false,started=false,tick=0,particles=[];
var bgoff=0;
function addSpike(){var h=30+Math.random()*30;spikes.push({x:cw+10,y:ground-h,w:24,h:h,tp:'s'})}
function addBlock(){var h=22+Math.random()*20,bw=22+Math.random()*20;var gapY=ground-h-50-Math.random()*80;blocks.push({x:cw+10,y:gapY,w:38,h:h,tp:'b'})}
function boom(){for(var i=0;i<12;i++)particles.push({x:px+pw/2,y:py+ph/2,vx:(Math.random()-.5)*8,vy:(Math.random()-.5)*8,life:1,sz:2+Math.random()*3})}
function draw(){x.clearRect(0,0,cw,ch);
var gd=x.createLinearGradient(0,0,0,ch);gd.addColorStop(0,'#0a0a1a');gd.addColorStop(1,'#1e1e3a');x.fillStyle=gd;x.fillRect(0,0,cw,ch);
x.fillStyle='rgba(255,255,255,.04)';for(var i=0;i<12;i++){var xx=(i*60-bgoff%(60*12)+60*12)%(60*12);x.fillRect(xx,ground-40+Math.sin(i)*20,40,2)}
x.strokeStyle='rgba(255,255,255,.15)';x.lineWidth=2;x.beginPath();x.moveTo(0,ground);x.lineTo(cw,ground);x.stroke();
x.fillStyle='rgba(255,255,255,.06)';x.fillRect(0,ground,cw,ch-ground);
for(var i=0;i<spikes.length;i++){var s=spikes[i];x.fillStyle='#e17a7a';x.beginPath();x.moveTo(s.x,s.y+s.h);x.lineTo(s.x+s.w/2,s.y);x.lineTo(s.x+s.w,s.y+s.h);x.closePath();x.fill();x.strokeStyle='rgba(255,255,255,.2)';x.stroke()}
for(var i=0;i<blocks.length;i++){var b=blocks[i];var gd2=x.createLinearGradient(b.x,b.y,b.x,b.y+b.h);gd2.addColorStop(0,'#6c5ce7');gd2.addColorStop(1,'#5a4bd1');x.fillStyle=gd2;x.fillRect(b.x,b.y,b.w,b.h);x.strokeStyle='rgba(255,255,255,.2)';x.strokeRect(b.x,b.y,b.w,b.h)}
x.fillStyle='#00b894';x.fillRect(px,py,pw,ph);
x.fillStyle='rgba(0,0,0,.2)';x.fillRect(px+pw-8,py+4,6,ph-8);
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE '+score,cw-80,20);
x.fillStyle='rgba(255,255,255,.25)';x.font='10px Arial';x.fillText('SPACE/TAP: JUMP',10,ch-8);
for(var i=0;i<particles.length;i++){var p=particles[i];x.fillStyle='rgba(255,255,255,'+Math.max(p.life,0)+')';x.fillRect(p.x,p.y,p.sz,p.sz)}
if(!started){x.fillStyle='rgba(15,15,25,.5)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 16px Arial';x.textAlign='center';x.fillText('GEOMETRY DASH',cw/2,ch/2-10);x.font='12px Arial';x.fillText('Tap / Space to jump',cw/2,ch/2+10);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('GAME OVER',cw/2,ch/2-15);x.font='13px Arial';x.fillText('Score: '+score,cw/2,ch/2+5);x.fillText('Tap to restart',cw/2,ch/2+25);x.textAlign='left'}}
function loop(){if(!started||over){requestAnimationFrame(loop);return}
tick++;bgoff+=speed;
pvy+=grav;py+=pvy;if(py>=ground){py=ground;pvy=0;jumping=false}
if(tick%50===0&&Math.random()<.6)addSpike();
if(tick%75===0&&Math.random()<.5)addBlock();
for(var i=0;i<spikes.length;i++)spikes[i].x-=speed;spikes=spikes.filter(function(s){return s.x>-40});
for(var i=0;i<blocks.length;i++)blocks[i].x-=speed;blocks=blocks.filter(function(b){return b.x>-60});
for(var i=0;i<spikes.length;i++){var s=spikes[i];if(px+pw-4>s.x&&px+4<s.x+s.w&&py+ph>s.y){over=true;boom()}}
for(var i=0;i<blocks.length;i++){var b=blocks[i];if(px+pw>b.x+4&&px<b.x+b.w-4&&py+ph>b.y+4&&py<b.y+b.h-4){over=true;boom()}}
score+=1;
particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=0.3;p.life-=0.03});particles=particles.filter(function(p){return p.life>0});
draw();requestAnimationFrame(loop)}
function jump2(){if(over){over=false;started=false;py=ground;pvy=0;spikes=[];blocks=[];particles=[];score=0;tick=0;draw();return}if(!started){started=true;return}if(!jumping){jumping=true;pvy=jforce}}
c.addEventListener('pointerdown',function(e){e.preventDefault();jump2()});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();jump2()}});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Geometry Dash', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Geometry Dash' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['gd', 'geometrydash']
export default handler
