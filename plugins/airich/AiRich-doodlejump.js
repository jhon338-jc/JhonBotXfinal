import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
let d,plats,scroll,score,left,right,last,over,started,minY,tiltX,t0;
function reset(){d={x:W/2-16,y:GY-60,w:32,h:30,vy:0};plats=[];scroll=0;score=0;over=false;minY=GY;left=false;right=false;tiltX=0;
for(let i=0;i<17;i++){let w=76+Math.random()*28;let p={x:Math.random()*(W-w),y:GY-30-i*40,w:w,dx:i%6===0?(Math.random()<.5?-1:1)*1.3:0,col:'hsl('+((i*47+140)%360)+',72%,56%)'};plats.push(p);if(p.y<minY)minY=p.y}
d.y=GY-30-d.h}
function hitP(p){let sy=p.y+scroll;return d.vy>0&&d.y+d.h>=sy&&d.y+d.h<=sy+14&&d.x+d.w>p.x+6&&d.x<p.x+p.w-6}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){
let mv=(left?-1:0)+(right?1:0);
d.x+=mv*5*dt+tiltX*20*dt;
if(d.x<-26)d.x=W+26;if(d.x>W+26)d.x=-26;
d.vy+=.32*dt;d.y+=d.vy*dt;
for(const p of plats){p.x+=p.dx*dt;if(p.x<-42)p.x=W+22;if(p.x>W+42)p.x=-22;if(hitP(p))d.vy=-12.4}
if(d.y<GY/2){scroll+=GY/2-d.y;d.y=GY/2;if(scroll>score)score=Math.floor(scroll)}
plats=plats.filter(p=>p.y+scroll<GY+70);
while(plats.length<17){let w=76+Math.random()*28;minY-=30+Math.random()*22;let p={x:Math.random()*(W-w),y:minY,w:w,dx:Math.random()<.17?(Math.random()<.5?-1:1)*(1+Math.random()*1.3):0,col:'hsl('+(Math.random()*360|0)+',72%,56%)'};plats.push(p)}
if(d.y>GY+10)over=true}
x.clearRect(0,0,W,GY);
let gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,'#151642');gr.addColorStop(1,'#2d2f68');x.fillStyle=gr;x.fillRect(0,0,W,GY);
x.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<5;i++){let yy=(i*82+(scroll*.8%82))%GY;x.fillRect(0,yy,W,2)}
for(let i=plats.length-1;i>=0;i--){let p=plats[i],sy=p.y+scroll;if(sy>-30&&sy<GY+20){x.fillStyle=p.col;x.fillRect(p.x,sy,p.w,13);x.fillStyle='rgba(255,255,255,.4)';x.beginPath();x.arc(p.x+p.w/2,sy-2,3,0,7);x.fill()}}
x.fillStyle='#ffd166';x.fillRect(d.x,d.y,d.w,d.h);x.fillStyle='#20203a';x.fillRect(d.x+7,d.y+6,7,7);x.fillRect(d.x+18,d.y+6,7,7);x.fillStyle='#ef476f';x.fillRect(d.x+3,d.y+21,26,9);
x.fillStyle='rgba(255,255,255,.85)';x.font='bold 16px Arial';x.textAlign='left';x.fillText('HEIGHT '+score,12,24);
if(!started){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('DOODLE JUMP',W/2,132);x.font='13px Arial';x.fillText('Pijak platform, jangan jatuh',W/2,160);x.fillText('Geser / panah / miringkan HP untuk gerak',W/2,184);x.fillText('TAP untuk MULAI',W/2,244)}
if(over){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('JATUH!',W/2,140);x.font='16px Arial';x.fillText('Tinggi '+score,W/2,172);x.fillText('Tap untuk main lagi',W/2,236)}
}
function tap(){if(!started){started=true;return}if(over){reset();started=true}}
document.addEventListener('pointerdown',function(e){e.preventDefault();if(!started||over){tap();return}if(e.clientX<W/2)left=true;else right=true});
document.addEventListener('pointerup',function(){left=false;right=false});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}if(e.code==='ArrowLeft')left=true;if(e.code==='ArrowRight')right=true});
document.addEventListener('keyup',function(e){if(e.code==='ArrowLeft')left=false;if(e.code==='ArrowRight')right=false});
function onOr(e){tiltX=(e.gamma||0)/90}
try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){DeviceOrientationEvent.requestPermission().then(function(p){if(p==='granted')window.addEventListener('deviceorientation',onOr)}).catch(function(){})}else if(typeof DeviceOrientationEvent!=='undefined'){window.addEventListener('deviceorientation',onOr)}}catch(e){}
reset();frame(0);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🖍️', key: m.key } })
    try {
        const html = shell({ title: 'Doodle Jump', tag: 'GAME', icon: '🖍️', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Doodle Jump' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['doodlejump']
export default handler