import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
let carX,speed,fuel,dist,last,over,started,gasOn,brkOn,rot,cans,t0;
function gy(w){return 250+Math.sin(w*.012)*34+Math.sin(w*.031+2)*20}
function gs(w){return .408*Math.cos(w*.012)+.62*Math.cos(w*.031+2)}
function reset(){carX=40;speed=0;fuel=72;dist=0;rot=0;over=false;started=false;gasOn=false;brkOn=false;cans=[{x:720},{x:1400},{x:2350},{x:3300},{x:4250}]}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){
let slp=gs(carX),slD=Math.atan(slp)*180/Math.PI;
if(gasOn)speed=Math.min(14,speed+.13*dt);
if(brkOn)speed=Math.max(-2,speed-.22*dt);
speed-=slp*.16*dt;
speed*=.997;
carX+=speed*dt*1.35;
let steep=Math.abs(slD)>26;
let rT=slD+(steep?(Math.abs(slD)-26)*1.35*(1+speed/10)*(slD>0?1:-1):0);
rot+=(rT-rot)*.12;
if(Math.abs(rot)>52&&speed>1)over=true;
fuel-=(.04+Math.abs(speed)*.012)*dt;
for(const cn of cans)if(!cn.got&&Math.abs(cn.x-carX)<24){cn.got=true;fuel=Math.min(100,fuel+42)}
if(cans.length&&cans[cans.length-1].x-carX<650)cans.push({x:cans[cans.length-1].x+600+Math.random()*500});
if(fuel<=0){fuel=0;over=true}
dist=Math.max(dist,carX);
}
draw();}
function draw(){
x.clearRect(0,0,W,GY);
let gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,'#1c2350');gr.addColorStop(1,'#4a3f83');x.fillStyle=gr;x.fillRect(0,0,W,GY);
let sc=160-carX;
x.fillStyle='#2b2f6b';for(let i=0;i<3;i++){x.beginPath();x.moveTo(0,0);for(let wx=carX-380;wx<=carX+520;wx+=16){let yy=90-i*22+Math.sin(wx*.004+i*2+carX*.012)*28;x.lineTo(wx+sc,yy)}x.lineTo(W,0);x.closePath();x.fill()}
x.fillStyle='#3a2f52';x.beginPath();x.moveTo(carX-380+sc,GY);for(let wx=carX-380;wx<=carX+520;wx+=10)x.lineTo(wx+sc,gy(wx));x.lineTo(carX+520+sc,GY);x.closePath();x.fill();
x.strokeStyle='#7bd88a';x.lineWidth=3;x.beginPath();for(let wx=carX-380;wx<=carX+520;wx+=10)x.lineTo(wx+sc,gy(wx));x.stroke();
for(const cn of cans){if(cn.got)continue;let sx=cn.x+sc;x.fillStyle='#ffd166';x.beginPath();x.arc(sx,gy(cn.x)-16,8,0,7);x.fill();x.fillStyle='#e63946';x.fillRect(sx-5,gy(cn.x)-12,10,8)}
x.save();x.translate(carX+sc,gy(carX)-20);x.rotate(rot*Math.PI/180);
x.fillStyle='#e63946';x.fillRect(-17,-14,34,20);x.fillStyle='#ffd166';x.fillRect(-17,-18,34,7);x.fillStyle='#c1121f';x.fillRect(-19,-14,4,20);x.fillRect(15,-14,4,20);
x.fillStyle='#111';x.beginPath();x.arc(-10,7,6,0,7);x.fill();x.beginPath();x.arc(10,7,6,0,7);x.fill();
x.restore();
x.fillStyle='rgba(255,255,255,.85)';x.font='bold 15px Arial';x.textAlign='left';x.fillText('FUEL',12,26);
x.fillStyle='#333';x.fillRect(56,14,140,12);let fc=Math.min(1,fuel/100);x.fillStyle=fc>.5?'#6c5ce7':fc>.25?'#f4a261':'#e63946';x.fillRect(56,14,140*Math.max(0,fc),12);
x.fillText('DIST '+String(Math.floor(dist/3)).padStart(6,'0'),W-140,26);
if(!started){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('HILL CLIMB',W/2,132);x.font='13px Arial';x.fillText('Gas di kanan, rem di kiri. Jangan oleng!',W/2,160);x.fillText('Kumpulkan bahan bakar ',W/2,184);x.fillText('TAP untuk MULAI',W/2,244)}
if(over){x.fillStyle='rgba(10,10,24,.72)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('OLENG!',W/2,140);x.font='16px Arial';x.fillText('Jarak '+String(Math.floor(dist/3)).padStart(6,'0'),W/2,172);x.fillText('Tap untuk main lagi',W/2,236)}
}
function tap(){if(!started){started=true;return}if(over){reset();started=true}}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap();if(started&&!over){if(e.clientX<W/2)brkOn=true;else gasOn=true}});
document.addEventListener('pointerup',function(){brkOn=false;gasOn=false});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}if(e.code==='ArrowRight'||e.code==='ArrowUp')gasOn=true;if(e.code==='ArrowLeft'||e.code==='ArrowDown')brkOn=true});
document.addEventListener('keyup',function(e){if(e.code==='ArrowRight'||e.code==='ArrowUp')gasOn=false;if(e.code==='ArrowLeft'||e.code==='ArrowDown')brkOn=false});
reset();frame(0);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Hill Climb', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Hill Climb' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['hillclimb']
export default handler