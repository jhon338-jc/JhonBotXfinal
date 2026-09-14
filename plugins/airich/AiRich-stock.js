import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var cash=10000,shares=0,price=148,open=148,candles=[];
function makeC(o){var ch=(Math.random()-.5)*7,c=o+ch;return{o:+o.toFixed(2),h:+(Math.max(o,c)+Math.random()*2.5).toFixed(2),l:+(Math.min(o,c)-Math.random()*2.5).toFixed(2),c:+c.toFixed(2)}}
function plant(){candles=[];var p=open;for(var i=0;i<30;i++){candles.push(makeC(p));p=candles[candles.length-1].c}price=p}
function tick(){candles.push(makeC(candles[candles.length-1].c));candles.shift();price=candles[candles.length-1].c;upd()}
function paint(){
var cv=document.getElementById('game'),x=cv.getContext('2d');
x.clearRect(0,0,cv.width,cv.height);
var lo=Math.min.apply(null,candles.map(function(a){return a.l})),hi=Math.max.apply(null,candles.map(function(a){return a.h})),r=(hi-lo)||1;
var n=candles.length,w=cv.width/n;
for(var i=0;i<n;i++){
var cd=candles[i],upB=cd.c>=cd.o,col=upB?'#2ecc71':'#e74c3c';
var x1=i*w+w/2,oy=12+(cv.height-24)*(1-(cd.o-lo)/r),cy=12+(cv.height-24)*(1-(cd.c-lo)/r);
var hy=12+(cv.height-24)*(1-(cd.h-lo)/r),ly=12+(cv.height-24)*(1-(cd.l-lo)/r);
x.strokeStyle=col;x.fillStyle=col;x.lineWidth=1;
x.beginPath();x.moveTo(x1,hy);x.lineTo(x1,ly);x.stroke();
if(upB)x.fillRect(x1-w*.2,cy,w*.4,oy-cy);else x.fillRect(x1-w*.2,oy,w*.4,cy-oy);
}
x.fillStyle='#fff';x.font='bold 14px Arial';x.fillText('APL $'+price.toFixed(2),12,24);
x.fillStyle='#6c5ce7';x.font='11px Arial';x.fillText('LIVE CANDLESTICK',12,40);
}
function upd(){
document.getElementById('sh').textContent=shares;
document.getElementById('cash').textContent=cash.toFixed(2);
var d=(price-open)/open*100,el=document.getElementById('dl');
el.innerHTML='<span style="color:'+(d>=0?'#2ecc71':'#e74c3c')+'">'+(d>=0?'↗ +':'↘ ')+d.toFixed(2)+'%</span>';
paint();
}
var txt=null;
function flash(s){
if(!txt){txt=document.createElement('div');txt.style.cssText='margin:8px 0;font-size:12px;color:#ff7675;text-align:center';document.querySelector('.wrap').appendChild(txt)}
txt.textContent=s;
setTimeout(function(){txt.textContent=''},1600);
}
function trade(n,buy){
if(buy){var cost=n*price;if(cash>=cost){cash-=cost;shares+=n}else{flash('Saldo tidak cukup!');return}}
else{if(shares>=n){shares-=n;cash+=n*price}else{flash('Saham tidak cukup!');return}}
upd();
}
document.getElementById('buy1').onclick=function(){trade(1,true)};
document.getElementById('buy5').onclick=function(){trade(5,true)};
document.getElementById('sell1').onclick=function(){trade(1,false)};
document.getElementById('sell5').onclick=function(){trade(5,false)};
plant();upd();
setInterval(tick,700);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '📉', key: m.key } })
    try {
        const html = shell({ title: 'Stock', tag: 'APP', icon: '📉', html: '<div class="row" style="justify-content:space-between"><div><div class="big" id="pr">Apple Inc.</div><div id="dl" class="muted"></div></div><div class="chip">Portfolio</div></div>' + stage(560, 240) + '<div class="row"><button class="btn" id="buy1" style="background:#2ecc71">BELI 1</button><button class="btn" id="buy5" style="background:#27ae60">BELI 5</button><button class="btn" id="sell1" style="background:#e74c3c">JUAL 1</button><button class="btn" id="sell5" style="background:#c0392b">JUAL 5</button></div><div class="stat"><span class="chip">Saham: <b id="sh">0</b></span><span class="chip">Saldo: $<span id="cash">10000</span></span></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Stock' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['stock']
export default handler