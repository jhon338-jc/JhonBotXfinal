import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var bal=1000,bet=50,spinning=false;
var REELS=['🍒','🍋','🔔','⭐','💎','7️⃣'];
var reelA=[0,1,2];
function updBal(){document.getElementById('bal').textContent=bal.toLocaleString()}
function updBet(){
var row=document.getElementById('bet');row.innerHTML='';
var BETS=[10,25,50,100,250];
for(var i=0;i<BETS.length;i++){
var b=document.createElement('button');b.className='btn';b.textContent=BETS[i];
b.style.cssText='background:'+(bet===BETS[i]?'#6c5ce7':'rgba(255,255,255,.1)')+';font-size:11px;padding:8px 12px';
b.onclick=(function(v){return function(){bet=v;updBet()}})(BETS[i]);
row.appendChild(b);
}
}
function drawReels(){for(var i=0;i<3;i++)document.getElementById('r'+i).textContent=REELS[reelA[i]]}
function randReels(){for(var i=0;i<3;i++)reelA[i]=Math.floor(Math.random()*REELS.length);drawReels()}
function toast(msg,ok){
var t=document.getElementById('toast');
t.innerHTML=(ok?'✅ ':'❌ ')+msg;
t.style.background=ok?'rgba(46,204,113,.15)':'rgba(231,76,60,.15)';
t.style.border=ok?'1px solid rgba(46,204,113,.5)':'1px solid rgba(231,76,60,.5)';
}
function spin(){
if(spinning||bal<bet)return;
spinning=true;bal-=bet;updBal();
document.getElementById('spinN').style.opacity='.4';
var c=0,iv=setInterval(function(){
randReels();
c++;
if(c>11){clearInterval(iv);settle()}
},70);
}
function settle(){
spinning=false;
document.getElementById('spinN').style.opacity='1';
var a=reelA[0],b=reelA[1],c=reelA[2],gain=0;
if(a===b&&b===c){
gain=a===5?bet*50:a===4?bet*25:bet*10;
toast('JACKPOT '+gain.toLocaleString()+' KOIN!',true);
}else if(a===b||b===c||a===c){
gain=bet*2;
toast('Menang '+gain.toLocaleString()+' koin!',true);
}else{
toast('Kalah '+bet.toLocaleString()+' koin',false);
}
bal+=gain;updBal();
}
document.getElementById('spinN').onclick=spin;
updBal();updBet();drawReels();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎰', key: m.key } })
    try {
        const html = shell({ title: 'Casino', tag: 'APP', icon: '🎰', html: '<div class="row" style="justify-content:space-between"><span class="big">Slot Machine</span><span class="chip">Koin: <b id="bal">1.000</b></span></div><div style="display:flex;justify-content:center;gap:10px;margin:14px 0"><div id="r0" class="chip" style="font-size:44px;min-width:84px;text-align:center">🍒</div><div id="r1" class="chip" style="font-size:44px;min-width:84px;text-align:center">🍒</div><div id="r2" class="chip" style="font-size:44px;min-width:84px;text-align:center">🍒</div></div><div class="row" style="justify-content:center" id="bet"></div><button class="btn" id="spinN" style="background:#6c5ce7;width:100%;font-size:16px;padding:12px">🎰 SPIN</button><div id="toast" style="margin-top:10px;padding:10px;border-radius:10px;text-align:center;font-weight:bold;font-size:13px"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Casino' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['casino']
export default handler