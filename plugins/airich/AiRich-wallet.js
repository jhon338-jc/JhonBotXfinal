import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="border-radius:16px;padding:18px;background:linear-gradient(135deg,#6c5ce7,#00b894);border:1px solid rgba(255,255,255,.2)">
    <div class="muted" style="color:rgba(255,255,255,.85)">Total Balance</div>
    <div id="bal" style="font-size:34px;font-weight:bold;color:#fff;margin:6px 0 12px">USD 1,280</div>
    <div id="curs" style="display:flex;gap:6px">
      <button data-c="USD" class="cur cA" style="flex:1;padding:6px;border:0;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;background:#fff;color:#6c5ce7">USD</button>
      <button data-c="IDR" class="cur" style="flex:1;padding:6px;border:0;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.2);color:#fff">IDR</button>
      <button data-c="EUR" class="cur" style="flex:1;padding:6px;border:0;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.2);color:#fff">EUR</button>
    </div>
  </div>
  <div class="row" style="justify-content:center">
    <button id="topup" class="btn" style="flex:1;background:#00b894">＋ TOP UP</button>
    <button id="send" class="btn" style="flex:1;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2)">→ SEND</button>
  </div>
  <div style="font-size:12px;font-weight:bold;color:#fff;margin:14px 0 8px">🧾 Transactions</div>
  <div id="txlist"></div>
</div>`

const GAME_JS = `
var rates={USD:1,IDR:15440,EUR:.92};
var cur='USD',bal=1280;
var txs=[[250,'Top-up • 2m ago'],[ -75,'Send to Citra • 1h ago'],[50,'Daily reward • 3h ago'],[-120,'Send to Bima • 5h ago']];
var balEl=document.getElementById('bal'),txList=document.getElementById('txlist'),curBtns=Array.prototype.slice.call(document.querySelectorAll('.cur'));
function disp(n){return cur+' '+Math.floor(Math.abs(n)*rates[cur]).toLocaleString()}
function fmtCur(n){return cur+' '+Math.floor(n*rates[cur]).toLocaleString()}
function renderBal(){balEl.textContent=fmtCur(bal)}
function renderTx(){txList.innerHTML='';txs.forEach(function(t){var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;margin-bottom:6px';d.innerHTML='<div style="width:32px;height:32px;border-radius:50%;background:'+(t[0]>0?'#00b89433':'#e1705533')+';display:flex;align-items:center;justify-content:center;font-size:14px">'+(t[0]>0?'⬆️':'⬇️')+'</div><div style="flex:1;font-size:12px;font-weight:bold;color:#fff">'+t[1]+'</div><div style="font-size:13px;font-weight:bold;color:'+(t[0]>0?'#00b894':'#e17055')+'">'+(t[0]>0?'+':'-')+disp(t[0])+'</div>';txList.appendChild(d)})}
var toast=document.createElement('div');toast.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#2e2f55;border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:12px;font-size:12px;z-index:99;opacity:0;transition:opacity .3s;pointer-events:none';document.body.appendChild(toast);var toastT;
function showToast(msg){toast.textContent=msg;toast.style.opacity='1';clearTimeout(toastT);toastT=setTimeout(function(){toast.style.opacity='0'},1500)}
document.getElementById('topup').onclick=function(){var amt=100+Math.floor(Math.random()*500);bal+=amt;txs.unshift([amt,'Top-up • just now']);renderBal();renderTx();showToast('Top-up '+disp(amt)+' ✅')};
document.getElementById('send').onclick=function(){showToast('Transferred '+disp(50)+' to friend_ai (demo) ✅')};
curBtns.forEach(function(b){b.onclick=function(){curBtns.forEach(function(o){o.style.background='rgba(255,255,255,.2)';o.style.color='#fff'});b.style.background='#fff';b.style.color='#6c5ce7';cur=b.dataset.c;renderBal();renderTx()}});
renderBal();renderTx();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '💰', key: m.key } })
    try {
        const html = shell({ title: 'Wallet', tag: 'APP', icon: '💰', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Wallet' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['wallet']
export default handler