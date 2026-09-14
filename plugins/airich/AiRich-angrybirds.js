import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const c=document.getElementById('game'),x=c.getContext('2d'),W=560,GY=360;
const SLX=92,SLY=272;
let bird,birds,wait,over,started,drag,bx,by,scored,trail,t0;
let ents;
function E(k,xx,yy,rr,ww,hh){return{k:k,x:xx,y:yy,r:rr||0,w:ww||0,h:hh||0,vx:0,vy:0,rot:0,vrot:0,knocked:0,gone:0,tagged:0,life:0}}
function reset(){
birds=3;wait=0;over=false;started=false;drag=false;scored=0;trail=[];
ents=[];
ents.push(E('pig',350,GY-40,13));
ents.push(E('pig',404,GY-40,13));
ents.push(E('pig',458,GY-40,13));
ents.push(E('pig',377,GY-66,13));
ents.push(E('pig',431,GY-66,13));
ents.push(E('pig',404,GY-92,13));
ents.push(E('blk',404,GY-58,0,118,10));
ents.push(E('blk',404,GY-84,0,44,10));
arm();
}
function arm(){
bird={x:SLX-6,y:SLY-18,vx:0,vy:0,st:'stay'};
if(birds<=0&&wait<=0){over=true}
}
function knock(e,dx,dy){if(e.knocked)return;e.knocked=1;e.vx=dx;e.vy=dy;e.vrot=dx*.1+.5}
function imp(e){knock(e,bird.vx*.65,bird.vy*.4-1.4);bird.vx*=.35;bird.vy*=.5}
function hitCheck(e){if(e.k==='pig'){let ddx=bird.x-e.x,ddy=bird.y-e.y,r=e.r+8;if(ddx*ddx+ddy*ddy<r*r){imp(e);return}}
let hw=e.w/2,hh=e.h/2,cx=Math.max(e.x-hw,Math.min(bird.x,e.x+hw)),cy=Math.max(e.y-hh,Math.min(bird.y,e.y+hh)),ddx=bird.x-cx,ddy=bird.y-cy;if(ddx*ddx+ddy*ddy<64)imp(e)}
function frame(t){requestAnimationFrame(frame);if(!t0)t0=t;let dt=Math.min((t-t0)/16.67,2);t0=t;
if(started&&!over){
if(bird&&bird.st==='fly'){
bird.vy+=.42*dt;bird.x+=bird.vx*dt;bird.y+=bird.vy*dt;
trail.push({x:bird.x,y:bird.y});if(trail.length>10)trail.shift();
for(const e of ents)if(!e.gone&&!e.knocked)hitCheck(e);
if(bird.x>W+60||bird.x<-60||bird.y>GY+60){bird=null;wait=40}
else if(bird.y>=GY-24){bird.y=GY-24;bird.vy*=-.45;bird.vx*=.65}
}
for(const e of ents){if(e.knocked&&!e.gone){
e.vy+=.36*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;e.rot+=e.vrot*dt;
if(e.y>=GY-(e.k==='pig'?e.r:0)-2&&e.vy>0){e.y=GY-(e.k==='pig'?e.r:0)-2;e.vy*=-.4;e.vx*=.5;e.vrot*=.4}
e.life+=dt;
if(e.life>3.4||e.x<-90||e.x>W+90||e.y>GY+90)e.gone=1;
for(const o of ents)if(o!==e&&o.k==='pig'&&!o.knocked&&!o.gone){let ddx=e.x-o.x,ddy=e.y-o.y,r=(e.k==='pig'?e.r:Math.max(e.w,e.h)/2)+o.r;if(ddx*ddx+ddy*ddy<r*r)knock(o,e.vx*.6,e.vy*.35-1)}
}}
for(const e of ents)if(e.k==='pig'&&e.knocked&&!e.tagged){e.tagged=1;scored++}
if(wait>0){wait-=dt;if(wait<=0){if(birds>0){arm();if(bird&&birds===0)arm()}else if(!bird)over=true}}
if(bird===null&&!over&&bobCheck&&wait<=0&&birds>0){wait=40;arm()} 
}
draw();}
function posOf(e){if(e.k==='pig'){return null}return null}
function draw(){
x.clearRect(0,0,W,GY);
let gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,'#7fd4ff');gr.addColorStop(1,'#cfefff');x.fillStyle=gr;x.fillRect(0,0,W,GY);
x.fillStyle='#ffe66d';x.beginPath();x.arc(500,50,26,0,7);x.fill();
x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.arc(120,52,16,0,7);x.fill();x.arc(150,66,13,0,7);x.fill();x.arc(96,72,12,0,7);x.fill();
x.fillStyle='#8ed081';x.beginPath();x.arc(70,GY-20,52,0,7);x.fill();x.beginPath();x.arc(150,GY-10,70,0,7);x.fill();x.beginPath();x.arc(60,GY,60,0,7);x.fill();
x.fillStyle='#47b04a';x.fillRect(0,GY-24,W,24);
x.strokeStyle='#8a5a2b';x.lineWidth=5;x.beginPath();x.moveTo(SLX,SLY);x.lineTo(SLX-13,SLY-38);x.moveTo(SLX,SLY);x.lineTo(SLX+8,SLY-34);x.stroke();
for(let i=trail.length-1;i>=0;i--){x.fillStyle='rgba(120,40,40,'+(i/10*.4)+')';x.beginPath();x.arc(trail[i].x,trail[i].y,6,0,7);x.fill()}
if(bird){if(bird.st==='stay'){if(drag){x.strokeStyle='#332';x.lineWidth=3;x.beginPath();x.moveTo(SLX-13,SLY-38);x.lineTo(bird.x,bird.y);x.moveTo(SLX+8,SLY-34);x.lineTo(bird.x,bird.y);x.stroke()}}
x.fillStyle='#f0344c';x.beginPath();x.arc(bird.x,bird.y,9,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(bird.x-3,bird.y-2,3,0,7);x.fill()}
for(const e of ents){if(e.gone)continue;
x.save();x.translate(e.x,e.y);x.rotate(e.rot);
if(e.k==='pig'){x.fillStyle='#6abe30';x.beginPath();x.arc(0,0,e.r,0,7);x.fill();x.fillStyle='#4d9420';x.beginPath();x.arc(-4,0,3,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(-4,-4,2,0,7);x.fill();x.beginPath();x.arc(4,-4,2,0,7);x.fill()}
else{x.fillStyle='#b8813f';x.fillRect(-e.w/2,-e.h/2,e.w,e.h);x.fillStyle='rgba(0,0,0,.15)';x.fillRect(-e.w/2,-e.h/2,e.w,3)}
x.restore()}
x.fillStyle='rgba(20,20,40,.75)';x.font='bold 16px Arial';x.textAlign='left';x.fillText('PIGS '+scored+'/6   Burung '+Math.max(0,birds),14,26);
if(!started){x.fillStyle='rgba(10,20,40,.66)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('ANGRY BIRDS',W/2,132);x.font='13px Arial';x.fillText('Seret burung ke belakang, lepas untuk menembak',W/2,160);x.fillText('Hancurkan babi! 3 burung',W/2,184);x.fillText('TAP untuk MULAI',W/2,244)}
if(over){x.fillStyle='rgba(10,20,40,.66)';x.fillRect(0,0,W,GY);x.fillStyle='#fff';x.font='bold 26px Arial';x.textAlign='center';x.fillText('SELESAI!',W/2,140);x.font='16px Arial';x.fillText('Babi dihantam '+scored+' / 6',W/2,172);x.fillText('Tap untuk main lagi',W/2,236)}
}
function aimMove(cxx,cyy){let dx=SLX-cxx,dy=SLY-cyy,ln=Math.sqrt(dx*dx+dy*dy),m=ln>100?100/ln:1;if(bird){bird.vx=dx*m;bird.vy=dy*m;bird.x=SLX+dx*m*.35;bird.y=SLY+dy*m*.35;bird.st='stay'}}
function tap(){if(!started){started=true;return}if(over){reset();started=true}}
document.addEventListener('pointerdown',function(e){e.preventDefault();tap();if(started&&!over&&bird&&bird.st==='stay'){drag=true;bx=e.clientX;by=e.clientY;aimMove(bx,by)}});
document.addEventListener('pointermove',function(e){if(drag){bx=e.clientX;by=e.clientY;aimMove(bx,by)}});
document.addEventListener('pointerup',function(){if(!drag)return;drag=false;if(bird&&bird.st==='stay'){let ln=Math.sqrt(bird.vx*bird.vx+bird.vy*bird.vy);if(ln>14){bird.st='fly';birds--;bx=0;by=0}else{bird.x=SLX-6;bird.y=SLY-18;bird.vx=0;bird.vy=0}}});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();tap()}});
reset();frame(0);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Angry Birds', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Angry Birds' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['angrybirds']
export default handler