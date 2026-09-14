import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
const BH=24;
let stack,slide,spd,dir,last,over,started,height,flash,t0;
function reset(){stack=[];let w=150;for(let i=0;i<5;i++){let bw=w-i*9;stack.push({x:(W-bw)/2,w:bw})}slide={x:6,w:stack[0].w*(.64+Math.random()*.2)};dir=1;height=0;over=false;flash=0;started=false;spd=2.6+stack.length*.22}
function step(){let b=stack[stack.length-1],a=slide.x,cr=a+slide.w,bL=b.x,bR=b.x+b.w;
let L=Math.max(a,bL),R=Math.min(cr,bR),w=R-L;
if(R-L<=0){over=true;return}
let full=Math.abs(R-L-b.w)<1?true:false;
stack.push({x:L,w:w});height++;if(full)height+=2;if(full)flash=1;
spd=2.6+stack.length*.22}
function drawBlock(bx,bw,by,lev){let col='hsl('+((lev*46+20)%360)+',70%,53%)';
x.fillStyle=col;x.fillRect(bx,by,bw,BH);
x.fillStyle='rgba(255,255,255,.2)';x.fillRect(bx,by,bw,4);
x.fillStyle='rgba(0,0,0,.22)';x.fillRect(bx,by+BH-3,bw,3);
x.fillStyle='rgba(255,255,255,.3)';x.fillRect(bx+3,by-3,bw-3,3);}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){slide.x+=dir*spd*dt;if(slide.x<2){slide.x=2;dir=1}if(slide.x+slide.w>W-2){slide.x=W-2-slide.w;dir=-1}}
if(flash>0)flash-=.05*dt;
x.clearRect(0,0,W,GY);
let gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,'#0e0f2b');gr.addColorStop(1,'#2b2c60');x.fillStyle=gr;x.fillRect(0,0,W,GY);
let baseY=GY-24,lev=0;
for(const b of stack){drawBlock(b.x,b.w,baseY-lev*BH,lev);lev++}
drawBlock(slide.x,slide.w,baseY-lev*BH,lev);
x.fillStyle='rgba(255,255,255,.85)';x.font='bold 18px Arial';x.textAlign='left';x.fillText('HEIGHT '+height,14,28);
if(flash>0){x.fillStyle='rgba(255,225,120,.9)';x.font='bold 22px Arial';x.textAlign='center';x.fillText('PERFECT +2',W/2,GY/2-40)}
if(!started){x.fillStyle='rgba(10,10,24,.7)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 28px Arial';x.textAlign='center';x.fillText('STACK',W/2,128);x.font='13px Arial';x.fillText('Ketuk saat balok di atas tumpukan',W/2,156);x.fillText('TAP untuk MULAI',W/2,240)}
if(over){x.fillStyle='rgba(10,10,24,.7)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 28px Arial';x.textAlign='center';x.fillText('GAME OVER',W/2,128);x.font='16px Arial';x.fillText('Tinggi '+height,W/2,162);x.fillText('Tap untuk main lagi',W/2,236)}
}
function tap(){if(!started){started=true;return}if(over){reset();started=true;return}step()}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap()});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}});
reset();frame(0);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🧱', key: m.key } })
    try {
        const html = shell({ title: 'Stack', tag: 'GAME', icon: '🧱', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Stack' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['stack']
export default handler