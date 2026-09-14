import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="display:flex;align-items:center;gap:10px">
    <div style="flex:1;font-size:15px;font-weight:bold;color:#fff">🎒 Inventory</div>
    <span id="count" class="chip">10 items</span>
  </div>
  <div style="display:flex;gap:6px;margin:12px 0">
    <button class="if iA" data-f="All" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:#6c5ce7;color:#fff">All</button>
    <button class="if" data-f="Weapon" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Weapon</button>
    <button class="if" data-f="Potion" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Potion</button>
    <button class="if" data-f="Armor" style="flex:1;padding:8px;border:0;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,.08);color:#ddd">Armor</button>
  </div>
  <button id="sortby" style="width:100%;padding:9px;border:0;border-radius:10px;background:rgba(255,255,255,.08);color:#ddd;font-size:12px;font-weight:bold;cursor:pointer">SORT BY RARITY</button>
  <div id="grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:10px"></div>
</div>`

const GAME_JS = `
var items=[['Iron Sword','Weapon','Common','⚔️','#8a8fa3'],['Health Potion','Potion','Common','🧪','#8a8fa3'],['Thunder Bow','Weapon','Rare','🏹','#0984e3'],['Mana Elixir','Potion','Rare','💧','#0984e3'],['Dragon Blade','Weapon','Epic','🗡️','#8e44ad'],['Phoenix Wing','Potion','Epic','🪶','#8e44ad'],['Frost Gauntlet','Weapon','Epic','🧤','#8e44ad'],['Oblivion Crown','Armor','Legendary','👑','#e17055'],['Divine Shield','Armor','Legendary','🛡️','#e17055'],['Shadow Cloak','Armor','Rare','🧥','#0984e3']];
var counts={'Iron Sword':1,'Health Potion':4,'Thunder Bow':1,'Mana Elixir':3,'Dragon Blade':1,'Phoenix Wing':2,'Frost Gauntlet':1,'Oblivion Crown':1,'Divine Shield':1,'Shadow Cloak':2};
var active='All',equipped='Dragon Blade',sortR=false;
var grid=document.getElementById('grid'),countEl=document.getElementById('count');
var rc={Common:'#8a8fa3',Rare:'#0984e3',Epic:'#8e44ad',Legendary:'#e17055'};
function rIdx(r){return r==='Common'?0:r==='Rare'?1:r==='Epic'?2:3}
function render(){grid.innerHTML='';var list=items.slice();if(sortR)list.sort(function(a,b){return rIdx(b[2])-rIdx(a[2])});var shown=0;list.forEach(function(it){if(active!=='All'&&it[1]!==active)return;shown++;var eq=equipped===it[0],used=it[1]==='Potion'&&counts[it[0]]===0;var d=document.createElement('div');d.style.cssText='background:rgba(255,255,255,.05);border:1px solid '+(eq?'#6c5ce7':'rgba(255,255,255,.12)')+';border-radius:12px;padding:10px;text-align:center;box-shadow:'+(eq?'0 0 12px rgba(108,92,231,.5)':'none');d.innerHTML='<div style="height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:26px;background:'+rc[it[2]]+'33">'+it[3]+'</div><div style="font-size:11px;font-weight:bold;color:#fff;margin-top:6px">'+it[0]+'</div><div style="font-size:9px;color:'+rc[it[2]]+';font-weight:bold">'+it[2].toUpperCase()+'</div><div class="muted" style="font-size:9px">x'+counts[it[0]]+'</div><button style="width:100%;margin-top:6px;padding:6px;border:0;border-radius:7px;font-size:10px;font-weight:bold;cursor:pointer;background:'+(eq?'#6c5ce7':'rgba(255,255,255,.14)')+';color:#fff">'+(used?'USED':eq?'EQUIPPED':it[1]==='Potion'?'USE':'EQUIP')+'</button>';var b=d.querySelector('button');b.onclick=function(){if(used)return;if(it[1]==='Potion'){counts[it[0]]--}else{equipped=eq?'':it[0]}render()};grid.appendChild(d)});countEl.textContent=shown+' shown • Equipped: '+(equipped===''?'none':'1')}
var tabs=Array.prototype.slice.call(document.querySelectorAll('.if'));
tabs.forEach(function(t){t.onclick=function(){tabs.forEach(function(o){o.style.background='rgba(255,255,255,.08)';o.style.color='#ddd'});t.style.background='#6c5ce7';t.style.color='#fff';active=t.dataset.f;render()}});
var sortBtn=document.getElementById('sortby');
sortBtn.onclick=function(){sortR=!sortR;sortBtn.style.background=sortR?'#6c5ce7':'rgba(255,255,255,.08)';sortBtn.style.color=sortR?'#fff':'#ddd';sortBtn.textContent=sortR?'SORTED ✓':'SORT BY RARITY';render()};
render();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎒', key: m.key } })
    try {
        const html = shell({ title: 'Inventory', tag: 'APP', icon: '🎒', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Inventory' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['inventory']
export default handler