import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var PRI=['50','100','LOSE','300','25','500','PLUS','150'];
var COL2=['#e74c3c','#2ecc71','#f1c40f','#3498db','#e67e22','#9b59b6','#1abc9c','#6c5ce7'];
var cv=document.getElementById('game'),x=cv.getContext('2d');
var angle=0,spinV=0,spinning=false,bal=100;
var TAU=Math.PI*2,cx=280,cy=172,R=120;
function draw(){
x.clearRect(0,0,cv.width,cv.height);
var step=TAU/PRI.length;
for(var i=0;i<PRI.length;i++){
var a0=angle+i*step,a1=angle+(i+1)*step;
x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R,a0,a1);x.closePath();
x.fillStyle=COL2[i];x.fill();
x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=2;x.stroke();
}
x.fillStyle='#fff';x.font='bold 11px Arial';x.textAlign='center';x.textBaseline='middle';
for(var i=0;i<PRI.length;i++){
x.save();
var a=angle+(i+.5)*step;
x.translate(cx+Math.cos(a)*R*.55,cy+Math.sin(a)*R*.55);
x.rotate(a+Math.PI/2);
x.fillText(PRI[i],0,0);
x.restore();
}
x.textAlign='start';x.textBaseline='alphabetic';
x.fillStyle='#6c5ce7';x.beginPath();x.arc(cx,cy,26,0,TAU);x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(cx,cy,9,0,TAU);x.fill();
x.fillStyle='#feca57';x.beginPath();x.moveTo(cx,cy-R-12);x.lineTo(cx-10,cy-R+3);x.lineTo(cx+10,cy-R+3);x.closePath();x.fill();
}
function winner(){
var rel=(((-Math.PI/2)-angle)%TAU+TAU)%TAU;
return PRI[Math.floor(rel/(TAU/PRI.length))%PRI.length];
}
function settle(){
var w=winner(),add=0,txt='',isCoin=true;
if(w==='LOSE'){bal=Math.max(0,bal-25);txt=' Zonk! LOSE -25';isCoin=false}
else if(w==='PLUS'){add=100;txt=' PLUS +100'}
else{add=parseInt(w);txt=' +'+w}
bal+=add;
document.getElementById('bal').textContent=bal;
document.getElementById('spinN').style.pointerEvents='auto';
var h=document.getElementById('hist');
var d=document.createElement('div');
d.style.cssText='padding:5px 8px;border-radius:6px;margin:3px 0;font-size:12px;font-weight:bold;background:'+(isCoin?'rgba(46,204,113,.12)':'rgba(231,76,60,.12)')+';color:'+(isCoin?'#2ecc71':'#e74c3c')+'';
d.textContent=txt+' → bal '+bal;
h.insertBefore(d,h.firstChild);
while(h.children.length>6)h.removeChild(h.lastChild);
}
function loop(){
requestAnimationFrame(loop);
if(spinning){
angle=(angle+spinV)%TAU;
spinV*=.985;
if(spinV<.008){spinning=false;settle()}
}
draw();
}
function spinN(){
if(spinning)return;
if(bal<10){document.getElementById('spinN').textContent='SALDO ABIS';return}
bal-=10;document.getElementById('bal').textContent=bal;
document.getElementById('spinN').style.pointerEvents='none';
spinV=.35+Math.random()*.2;
spinning=true;
}
document.getElementById('spinN').onclick=spinN;
cv.addEventListener('pointerdown',function(e){e.preventDefault();spinN()});
draw();loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Wheel of Fortune', tag: 'GAME', icon: '', html: '<div class="row" style="justify-content:space-between"><span class="big">Wheel of Fortune</span><span class="chip">Koin: <b id="bal">100</b> · spin 10</span></div>' + stage(560, 320) + '<button class="btn" id="spinN" style="background:#6c5ce7;width:100%"> SPIN</button><div class="muted" style="margin-top:8px">Riwayat spin:</div><div id="hist"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Wheel of Fortune' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['wheel', 'fortune']
export default handler