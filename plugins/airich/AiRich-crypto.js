import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var COINS=[['BTC','Bitcoin',68240,0],['ETH','Ethereum',3541,0],['SOL','Solana',172.5,0],['DOGE','Dogecoin',0.1534,0],['XRP','XRP',0.623,0],['ADA','Cardano',0.412,0]];
var sel=0,hist=[];
function spark(){
var c=document.getElementById('game');if(!c)return;
var x=c.getContext('2d');
hist=[];var p=COINS[sel][2];
for(var i=0;i<46;i++){p=p*(1+(Math.random()-.5)*.09);hist.push(+p.toFixed(4))}
var hi=Math.max.apply(null,hist),lo=Math.min.apply(null,hist),r=(hi-lo)||1;
x.clearRect(0,0,c.width,c.height);
x.fillStyle='rgba(108,92,231,.18)';x.beginPath();x.moveTo(0,c.height);
for(var i=0;i<hist.length;i++){x.lineTo(i/(hist.length-1)*c.width,c.height-10-(hist[i]-lo)/r*(c.height-28))}
x.lineTo(c.width,c.height);x.closePath();x.fill();
x.strokeStyle='#6c5ce7';x.lineWidth=2.5;x.lineJoin='round';x.beginPath();
for(var i=0;i<hist.length;i++){var px=i/(hist.length-1)*c.width,py=c.height-10-(hist[i]-lo)/r*(c.height-28);if(i)x.lineTo(px,py);else x.moveTo(px,py)}
x.stroke();
var last=hist[hist.length-1],first=hist[0],chg=(last-first)/first*100;
x.fillStyle=chg>=0?'#2ecc71':'#e74c3c';x.font='bold 13px Arial';
x.fillText((chg>=0?'+':'')+chg.toFixed(2)+'%',12,22);
x.fillStyle='#fff';x.fillText(COINS[sel][0]+' / '+COINS[sel][1],12,40);
x.fillStyle='rgba(255,255,255,.7)';x.font='12px Arial';x.fillText('$'+COINS[sel][2].toLocaleString(),12,58);
}
function render(){
var L=document.getElementById('list');L.innerHTML='';
for(var i=0;i<COINS.length;i++){
var c=COINS[i],up=c[3]>=0,d=document.createElement('div');
d.style.cssText='flex:1;min-width:150px;cursor:pointer;text-align:center;border-radius:8px;padding:9px 6px;border:1px solid '+(sel===i?'#6c5ce7':'rgba(255,255,255,.12)')+';background:'+(sel===i?'rgba(108,92,231,.2)':'rgba(255,255,255,.08)');
d.innerHTML='<div class="big">'+c[1]+'</div><div class="muted">$'+c[2].toLocaleString()+'</div><div style="font-size:12px;font-weight:bold;color:'+(up?'#2ecc71':'#e74c3c')+'">'+(up?'▲ +':'▼ -')+Math.abs(c[3]).toFixed(2)+'%</div>';
d.onclick=(function(j){return function(){sel=j;render();spark()}})(i);
L.appendChild(d);
}
}
function refresh(){
for(var i=0;i<COINS.length;i++){var k=COINS[i][2],dd=(Math.random()-.5)*.14;COINS[i][2]=+(k*(1+dd)).toFixed(4);COINS[i][3]=dd*100}
render();spark();
}
render();spark();
document.getElementById('refresh').onclick=refresh;
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🪙', key: m.key } })
    try {
        const html = shell({ title: 'Crypto', tag: 'APP', icon: '🪙', html: '<div class="row" style="justify-content:space-between"><span class="big">WATCHLIST</span><button class="btn" id="refresh" style="background:#6c5ce7">⟳ Refresh</button></div><div id="list" class="row"></div>' + stage(560, 150) + '<div class="muted">Tap coin untuk melihat sparkline</div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Crypto' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['crypto']
export default handler