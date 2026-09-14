import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
const lx=[W/2-96,W/2,W/2+96],EM=['🚗','🚕','🚚','🚌'];
let lane,px,vehs,spT,speed,dist,last,over,started,off,psx,psy,t0;
function reset(){lane=1;px=lx[1];vehs=[];spT=40;speed=3;dist=0;off=0;over=false;started=false;psx=null}
function moveLane(d){let nl=lane+d;if(nl<0||nl>2)return;lane=nl}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){
px+=(lx[lane]-px)*.12;
speed=Math.min(10,speed+.012*dt);
off+=speed*dt;
spT-=dt;if(spT<=0){spT=40-speed*2+Math.random()*60;let l=Math.floor(Math.random()*3);vehs.push({l:l,y:-130-Math.random()*80,em:EM[Math.random()*EM.length|0],vy:speed*.35+Math.random()*1.4})}
for(const v of vehs)v.y+=(speed+v.vy)*dt;
vehs=vehs.filter(v=>v.y<GY+60);
for(const v of vehs){if(Math.abs(v.y-(GY-64))<26&&Math.abs(lx[v.l]-px)<24){over=true;break}}
dist=Math.floor(off*.38);
}
draw();}
function draw(){
x.clearRect(0,0,W,GY);
x.fillStyle='#0e6b3a';x.fillRect(0,0,W,GY);
x.fillStyle='#2a2a34';x.fillRect(W/2-156,0,312,GY);
let cbs=[(W/2-156+lx[0])/2,(lx[0]+lx[1])/2,(lx[1]+lx[2])/2,(lx[2]+W/2+156)/2];
x.fillStyle='rgba(255,255,255,.3)';for(const cb of cbs)for(let i=0;i<5;i++){let yy=((i*80+off*1.4)%80);x.fillRect(cb-2,yy,4,38)}
x.font='30px Arial';x.textAlign='center';
for(const v of vehs){if(v.y>-60&&v.y<GY+40)x.fillText(v.em,lx[v.l],v.y+10)}
x.font='32px Arial';x.fillText('🏍️',px,GY-54);
x.fillStyle='rgba(255,255,255,.85)';x.font='bold 16px Arial';x.textAlign='left';x.fillText('SKOR  '+String(Math.floor(dist)).padStart(6,'0'),14,26);
x.fillText('🚀 '+Math.round(speed*10)+' km/j',W-120,26);
if(!started){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('TRAFFIC RIDER',W/2,132);x.font='13px Arial';x.fillText('Hindari kendaraan, pindah lajur',W/2,160);x.fillText('Geser / panah kiri-kanan',W/2,184);x.fillText('TAP untuk MULAI',W/2,244)}
if(over){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('TABRAKAN!',W/2,140);x.font='16px Arial';x.fillText('Skor '+Math.floor(dist),W/2,172);x.fillText('Tap untuk main lagi',W/2,236)}
}
function tap(){if(!started){started=true;return}if(over){reset();started=true}}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap();if(started&&!over){psx=e.clientX;psy=e.clientY;moveLane(e.clientX<W/2?-1:1)}});
document.addEventListener('pointermove',function(e){if(psx===null)return;let dx=e.clientX-psx,dy=e.clientY-psy;if(Math.abs(dx)>Math.abs(dy)+8){ if(dx>0)moveLane(1);else moveLane(-1);psx=e.clientX;psy=e.clientY}});
document.addEventListener('pointerup',function(){psx=null});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}if(e.code==='ArrowLeft')moveLane(-1);if(e.code==='ArrowRight')moveLane(1)});
reset();frame(0);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🏍️', key: m.key } })
    try {
        const html = shell({ title: 'Traffic Rider', tag: 'GAME', icon: '🏍️', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Traffic Rider' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['trafficrider']
export default handler