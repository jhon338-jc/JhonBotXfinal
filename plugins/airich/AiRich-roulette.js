import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var NUM=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
var REDS=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
var cv=document.getElementById('game'),x=cv.getContext('2d');
var angle=0,ballA=0,spinV=0,spinning=false;
var bal=1000,betA=10,betOpt=null,numGs=[];
var TAU=Math.PI*2,cx=280,cy=188,R=128;
function isRed(n){return REDS.indexOf(n)>=0}
function colOf(n){return n===0?'#27ae60':isRed(n)?'#e74c3c':'#111226'}
function draw(){
x.clearRect(0,0,cv.width,cv.height);
var step=TAU/NUM.length;
for(var i=0;i<NUM.length;i++){
var a0=angle+i*step,a1=angle+(i+1)*step;
x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R,a0,a1);x.closePath();
x.fillStyle=colOf(NUM[i]);x.fill();
x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=1;x.stroke();
}
x.fillStyle='rgba(255,255,255,.9)';x.font='9px Arial';
for(var i=0;i<NUM.length;i++){
var a=angle+(i+.5)*step;
x.fillText(String(NUM[i]),cx+Math.cos(a)*(R-24)-4,cy+Math.sin(a)*(R-24)+3);
}
x.fillStyle='#6c5ce7';x.beginPath();x.arc(cx,cy,30,0,TAU);x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(cx,cy,12,0,TAU);x.fill();
x.fillStyle='#feca57';
x.beginPath();x.moveTo(cx,cy-R-14);x.lineTo(cx-10,cy-R);x.lineTo(cx+10,cy-R);x.closePath();x.fill();
var ba=spinning?ballA:-Math.PI/2,br=R-34;
x.fillStyle='#dfe6e9';x.beginPath();x.arc(cx+Math.cos(ba)*br,cy+Math.sin(ba)*br,7,0,TAU);x.fill();
x.fillStyle='#636e72';x.beginPath();x.arc(cx+Math.cos(ba)*br,cy+Math.sin(ba)*br,3,0,TAU);x.fill();
}
function winner(){
var rel=(((-Math.PI/2)-angle)%TAU+TAU)%TAU;
return NUM[Math.floor(rel/(TAU/NUM.length))%NUM.length];
}
function settle(){
var w=winner(),mult=0;
if(betOpt){
if(betOpt.type==='col'){
if(betOpt.val==='red'&&isRed(w))mult=1;
if(betOpt.val==='black'&&w!==0&&!isRed(w))mult=1;
if(betOpt.val==='even'&&w!==0&&w%2===0)mult=1;
if(betOpt.val==='odd'&&w!==0&&w%2===1)mult=1;
}else if(betOpt.type==='num'&&betOpt.val===w)mult=35;
}
var gain=betA*mult;
bal+=gain;
var r=document.getElementById('res');
r.style.color=mult?'#2ecc71':'#e74c3c';
r.innerHTML=(mult?' MENANG +'+gain:' KALAH -'+betA)+' | Angka: '+w+' '+(w===0?'':isRed(w)?'':'');
document.getElementById('bal').textContent=bal;
}
function loop(){
requestAnimationFrame(loop);
if(spinning){
angle=(angle+spinV)%TAU;
ballA=(ballA-spinV*1.6)%TAU;
spinV*=.985;
if(spinV<.008){spinning=false;settle()}
}
draw();
}
function spinN(){
if(spinning)return;
var r=document.getElementById('res');
if(!betOpt){r.innerHTML='<span style="color:#feca57">Pilih taruhan dulu!</span>';return}
if(bal<betA){r.innerHTML='<span style="color:#e74c3c">Saldo tidak cukup!</span>';return}
bal-=betA;document.getElementById('bal').textContent=bal;
ballA=angle+Math.random()*TAU;
spinV=.3+Math.random()*.15;
r.innerHTML='';
spinning=true;
}
function pick(o,b){
betOpt=o;
var bs=bOpt.querySelectorAll('.btn');
for(var i=0;i<bs.length;i++)bs[i].style.outline='none';
for(var i=0;i<numGs.length;i++)numGs[i].style.outline='none';
b.style.outline='2px solid #feca57';
document.getElementById('res').innerHTML='';
}
var bOpt=document.getElementById('betOpt');
var BETS=[['RED','#e74c3c','red'],['BLACK','#10101f','black'],['EVEN','#6c5ce7','even'],['ODD','#6c5ce7','odd']];
for(var i=0;i<BETS.length;i++){
(function(idx){
var b=document.createElement('button');b.className='btn';b.textContent=BETS[idx][0];
b.style.cssText='background:'+BETS[idx][1]+';font-size:12px;padding:8px 12px';
b.onclick=function(){pick({type:'col',val:BETS[idx][2]},b)};
bOpt.appendChild(b);
})(i);
}
var ng=document.getElementById('numGrid');
for(var n=0;n<=36;n++){
(function(v){
var b=document.createElement('button');b.className='btn';b.textContent=v;
b.style.cssText='background:'+(v===0?'#27ae60':isRed(v)?'#e74c3c':'#151527')+';font-size:10px;padding:5px 7px;min-width:32px';
b.onclick=function(){pick({type:'num',val:v},b)};
ng.appendChild(b);numGs.push(b);
})(n);
}
var ag=document.getElementById('betAmt'),AM=[10,50,100];
for(var i=0;i<AM.length;i++){
(function(v){
var b=document.createElement('button');b.className='btn';b.textContent=v;
b.style.cssText='background:'+(betA===v?'#6c5ce7':'rgba(255,255,255,.1)')+';font-size:11px;padding:6px 10px';
b.onclick=function(){betA=v;for(var k=0;k<ag.children.length;k++)ag.children[k].style.background=AM[k]===v?'#6c5ce7':'rgba(255,255,255,.1)'};
ag.appendChild(b);
})(AM[i]);
}
document.getElementById('spinN').onclick=spinN;
loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Roulette', tag: 'APP', icon: '', html: '<div class="row" style="justify-content:space-between"><span class="big">Roulette</span><span class="chip">Koin: <b id="bal">1000</b></span></div><div class="muted">Taruhan</div><div class="row" id="betOpt"></div><div class="row" id="numGrid" style="gap:4px"></div><div class="row" style="justify-content:space-between"><div id="betAmt" class="row"></div><button class="btn" id="spinN" style="background:#6c5ce7"> SPIN</button></div>' + stage(560, 360) + '<div id="res" style="text-align:center;font-weight:bold;font-size:14px;margin-top:8px"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Roulette' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['roulette']
export default handler