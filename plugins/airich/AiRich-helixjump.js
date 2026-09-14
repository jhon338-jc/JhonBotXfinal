import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
const S=9,sW=40,PI=Math.PI;
let pile,held,ang,bobA,last,over,started,level,fallT,t0;
function mkRing(){let sec=[];let gap=Math.floor(Math.random()*S);let red=(gap+4+Math.floor(Math.random()*3))%S;for(let i=0;i<S;i++)sec.push(i===gap?'g':i===red?'r':'s');return sec}
function idxAt(cfg){return Math.floor(((((ang-cfg.ro)%360)+360)%360)/sW)%S}
function secAt(cfg){return cfg.sec[idxAt(cfg)]}
function reset(){held=0;ang=(-30+Math.random()*60+360)%360;bobA=0;level=0;over=false;fallT=0;started=false;pile=[];for(let i=0;i<9;i++)pile.push({sec:mkRing(),ro:Math.random()*70})}
function ringY(i){return 16+i*40}
function ringR(i){return 34+i*11}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){
ang+=held*3.6*dt;ang=((ang%360)+360)%360;
for(const p of pile)p.ro+=.9*dt;
bobA+=.085*dt;let b=Math.sin(bobA);
if(b<-0.96){let st=secAt(pile[0]);if(st==='r'){over=true;return}if(st==='g')fallT=1}
if(fallT){fallT+=.085*dt;if(fallT>=2){fallT=0;level++;pile.shift();pile.push({sec:mkRing(),ro:Math.random()*360})}}
}
draw();}
function disc(i){let y=ringY(i),r=ringR(i),cfg=pile[i];
for(let s=0;s<S;s++){let a0=(s*sW+cfg.ro)*PI/180,a1=a0+sW*PI/180;
let col=cfg.sec[s]==='g'?'#edf0ff':cfg.sec[s]==='r'?'#ff5d6c':'hsl('+((s*40+140)%360)+',65%,55%)';
x.fillStyle=col;x.beginPath();x.moveTo(W/2,y);x.arc(W/2,y,r,a0,a1);x.closePath();x.fill();}
x.fillStyle='#181a3c';x.beginPath();x.arc(W/2,y,r*.3,0,7);x.fill();
x.strokeStyle='rgba(255,255,255,.14)';x.beginPath();x.arc(W/2,y,r,0,7);x.stroke();}
function draw(){
x.clearRect(0,0,W,GY);
let gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,'#120f2e');gr.addColorStop(1,'#2c2a63');x.fillStyle=gr;x.fillRect(0,0,W,GY);
for(let i=0;i<pile.length;i++)disc(i);
let a=ang*PI/180,R=ringR(0)*.52,y0=ringY(0);
let bob=Math.max(0,-Math.sin(bobA))*20;
let bx=W/2+Math.cos(a)*R,by=y0+Math.sin(a)*R-bob;
let sc=fallT?1+fallT*.45:1;
x.fillStyle='rgba(255,255,255,.22)';x.beginPath();x.arc(bx,by+7*sc,7*sc,0,7);x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(bx,by,7*sc,0,7);x.fill();
x.fillStyle='rgba(108,92,231,.9)';x.beginPath();x.arc(bx,by,4*sc,0,7);x.fill();
x.fillStyle='rgba(255,255,255,.85)';x.font='bold 16px Arial';x.textAlign='left';x.fillText('LEVEL '+level,12,24);
if(!started){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('HELIX JUMP',W/2,132);x.font='13px Arial';x.fillText('Putar menuju celah putih, hindari merah',W/2,160);x.fillText('Tahan kanan/kiri untuk gerak bola',W/2,184);x.fillText('TAP untuk MULAI',W/2,244)}
if(over){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('KRASH!',W/2,140);x.font='16px Arial';x.fillText('Level '+level,W/2,172);x.fillText('Tap untuk main lagi',W/2,236)}
}
function tap(){if(!started){started=true;return}if(over){reset();started=true}}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap();if(started&&!over)held=(e.clientX<W/2?-1:1)});
document.addEventListener('pointerup',function(){held=0});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}if(e.code==='ArrowLeft')held=-1;if(e.code==='ArrowRight')held=1});
document.addEventListener('keyup',function(e){if(e.code==='ArrowLeft'||e.code==='ArrowRight')held=0});
reset();frame(0);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🌀', key: m.key } })
    try {
        const html = shell({ title: 'Helix Jump', tag: 'GAME', icon: '🌀', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Helix Jump' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['helixjump']
export default handler