import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:flex;align-items:center;gap:10px">
    <div style="flex:1;font-size:16px;font-weight:bold;color:#fff">🛍️ AI Store</div>
    <button id="cartbtn" style="position:relative;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.1);font-size:18px;cursor:pointer">🛒<span id="badge" style="position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:9px;background:#e0245e;color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center">0</span></button>
  </div>
  <div style="display:flex;gap:6px;margin:12px 0" id="cats">
    <button class="cat cA" data-c="All" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:#6c5ce7;color:#fff">All</button>
    <button class="cat" data-c="Games" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Games</button>
    <button class="cat" data-c="Tools" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Tools</button>
    <button class="cat" data-c="Decor" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Decor</button>
  </div>
  <div id="grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px"></div>
  <div id="overlay" style="display:none;position:fixed;inset:0;background:rgba(5,5,12,.7);align-items:flex-end;justify-content:center;z-index:9">
    <div style="width:100%;max-width:640px;background:#20213c;border-radius:18px 18px 0 0;padding:16px;max-height:70vh;display:flex;flex-direction:column">
      <div style="font-size:15px;font-weight:bold;color:#fff;margin-bottom:8px">Your Cart</div>
      <div id="cartitems" style="flex:1;overflow:auto;display:flex;flex-direction:column;gap:8px"></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
        <div style="flex:1" class="big" id="total">Total: $0</div>
        <button id="closebtn" class="btn" style="background:rgba(255,255,255,.1)">Close</button>
        <button id="checkbtn" class="btn" style="background:#00b894">Checkout ✓</button>
      </div>
    </div>
  </div>
</div>`

const GAME_JS = `
var products=[['Arcade Blast','Games',12,'🕹️','#6c5ce7'],['Puzzle Pro','Games',8,'🧩','#0984e3'],['Task Manager','Tools',15,'🧰','#e17055'],['Neon Lamp','Decor',22,'💡','#00b894'],['Speed Racer','Games',19,'🏎️','#e0245e'],['Note Pad','Tools',6,'📓','#f9a825'],['Cozy Sofa','Decor',18,'🛋️','#8e44ad'],['Crypto Calc','Tools',25,'🪙','#00cec9']];
var prodMap={};products.forEach(function(p){prodMap[p[0]]=p});
var grid=document.getElementById('grid'),tabs=Array.prototype.slice.call(document.querySelectorAll('.cat')),activeCat='All',badge=document.getElementById('badge'),ovl=document.getElementById('overlay'),cartItems=document.getElementById('cartitems'),totalEl=document.getElementById('total');
var baskets={},count=0,total=0;
var toast=document.createElement('div');toast.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#2e2f55;border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:12px;font-size:12px;z-index:99;opacity:0;transition:opacity .3s;pointer-events:none';document.body.appendChild(toast);var toastT;
function showToast(msg){toast.textContent=msg;toast.style.opacity='1';clearTimeout(toastT);toastT=setTimeout(function(){toast.style.opacity='0'},1400)}
function render(){grid.innerHTML='';products.forEach(function(p){if(activeCat!=='All'&&p[1]!==activeCat)return;var d=document.createElement('div');d.style.cssText='background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;text-align:center';d.innerHTML='<div style="height:62px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:34px;background:linear-gradient(135deg,'+p[4]+'55,#2d2d50)">'+p[3]+'</div><div style="font-size:12px;font-weight:bold;margin-top:8px;color:#fff">'+p[0]+'</div><div style="font-size:11px;color:#00b894;font-weight:bold">$'+p[2]+'</div><button style="margin-top:8px;width:100%;padding:8px;border:0;border-radius:8px;background:#6c5ce7;color:#fff;font-size:12px;font-weight:bold;cursor:pointer">ADD TO CART</button>';d.querySelector('button').onclick=function(){baskets[p[0]]=(baskets[p[0]]||0)+1;count++;total+=p[2];badge.textContent=count;renderCart();showToast('Added '+p[0]+' 🛒')};grid.appendChild(d)})}
function renderCart(){cartItems.innerHTML='';var keys=Object.keys(baskets);if(!keys.length){cartItems.innerHTML='<div class="muted" style="text-align:center;padding:18px">Cart is empty 🛒</div>'}keys.forEach(function(n){var it=prodMap[n];var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,.05);border-radius:10px';d.innerHTML='<div style="font-size:22px">'+it[3]+'</div><div style="flex:1;font-size:12px;font-weight:bold;color:#fff">'+n+'<div class="muted" style="font-weight:normal;font-size:10px">x'+baskets[n]+'</div></div><div style="font-size:12px;font-weight:bold;color:#00b894">$'+(it[2]*baskets[n])+'</div>';cartItems.appendChild(d)});totalEl.textContent='Total: $'+total}
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(o){o.style.background='rgba(255,255,255,.08)';o.style.color='#ddd'});t.style.background='#6c5ce7';t.style.color='#fff';activeCat=t.dataset.c;render()}});
document.getElementById('cartbtn').onclick=function(){renderCart();ovl.style.display='flex'};
document.getElementById('closebtn').onclick=function(){ovl.style.display='none'};
document.getElementById('checkbtn').onclick=function(){ovl.style.display='none';count=0;total=0;baskets={};badge.textContent='0';renderCart();showToast('Checkout done! Thank you 🎉')};
render();renderCart();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🛒', key: m.key } })
    try {
        const html = shell({ title: 'Store', tag: 'APP', icon: '🛒', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Store' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['store']
export default handler