import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var bal=25000,den=null,pay=null;
var DENS=[10000,25000,50000,100000],PAYS=[['DANA','#007dfc'],['OVO','#4b2c83'],['GoPay','#00aed6'],['QRIS','#6c5ce7']];
function fmt(n){return 'Rp '+n.toLocaleString('id-ID')}
function renderDen(){
var D=document.getElementById('den');D.innerHTML='';
for(var i=0;i<DENS.length;i++){
var b=document.createElement('button');b.className='btn';b.textContent=fmt(DENS[i]);
b.style.cssText='background:'+(den===DENS[i]?'#6c5ce7':'rgba(255,255,255,.1)')+';border:1px solid '+(den===DENS[i]?'#6c5ce7':'rgba(255,255,255,.14)');
b.onclick=(function(v){return function(){den=v;renderDen();updBtn()}})(DENS[i]);
D.appendChild(b);
}
}
function renderPay(){
var P=document.getElementById('pay');P.innerHTML='';
for(var i=0;i<PAYS.length;i++){
var p=PAYS[i],b=document.createElement('button');b.className='btn';b.textContent=p[0];
b.style.cssText='background:'+(pay===p[0]?p[1]:'rgba(255,255,255,.1)')+';border:1px solid '+(pay===p[0]?p[1]:'rgba(255,255,255,.14)');
b.onclick=(function(n){return function(){pay=n;renderPay();updBtn()}})(p[0]);
P.appendChild(b);
}
}
function updBtn(){document.getElementById('confirm').style.opacity=(den&&pay)?'1':'.35'}
function show(msg,ok){
var r=document.getElementById('rcpt');
if(ok){
var id='TRX'+Math.floor(Math.random()*1e9);
r.innerHTML='<div style="background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.5);border-radius:12px;padding:12px;margin-top:10px;text-align:center"><div style="font-size:22px">✅</div><div class="big">Pembayaran Sukses!</div><div class="muted" style="margin:6px 0">'+fmt(den)+' via '+pay+'</div><div class="chip" style="display:inline-block">ID: '+id+'</div><div class="muted" style="margin-top:6px">Struk diterima, saldo sudah masuk</div></div>';
}else{
r.innerHTML='<div style="background:rgba(231,76,60,.12);border:1px solid rgba(231,76,60,.5);border-radius:12px;padding:12px;margin-top:10px;text-align:center;color:#ff9a9a">'+msg+'</div>';
}
}
document.getElementById('confirm').onclick=function(){
if(!den||!pay){show('Pilih nominal dan metode pembayaran dulu!');return}
if(den>=bal){show('Saldo kamu tidak cukup ('+fmt(bal)+')');return}
bal-=den;document.getElementById('bal').textContent=fmt(bal);
show('+'+fmt(den)+' berhasil, struk terkirim via '+pay,true);
den=null;renderDen();updBtn();
};
renderDen();renderPay();updBtn();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '💳', key: m.key } })
    try {
        const html = shell({ title: 'Top Up', tag: 'APP', icon: '💳', html: '<div class="row" style="justify-content:space-between"><span class="big">Saldo<br><span id="bal">Rp 25.000</span></span><span class="chip">💳 Top Up</span></div><div class="muted" style="margin-top:10px">1️⃣ Pilih Nominal</div><div class="row" id="den"></div><div class="muted">2️⃣ Metode Pembayaran</div><div class="row" id="pay"></div><button class="btn" id="confirm" style="background:#6c5ce7;width:100%;margin-top:12px">CONFIRM TOP UP</button><div id="rcpt"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Top Up' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['topup']
export default handler