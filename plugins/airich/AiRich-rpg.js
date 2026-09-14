import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var H={war:{n:'Warrior',e:'',hp:140,atk:18,mp:40},mag:{n:'Mage',e:'',hp:90,atk:26,mp:100},rog:{n:'Rogue',e:'',hp:110,atk:22,mp:60}};
var E={gob:{n:'Goblin',e:'',hp:80,atk:10},sli:{n:'Slime',e:'',hp:105,atk:8},orc:{n:'Orc',e:'',hp:145,atk:16},dra:{n:'Dragon',e:'',hp:230,atk:24}};
var hero=null,ene=null,def=false,busy=false,xp=0;
function lvl(){return Math.floor(xp/180)+1}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function logT(t){var L=document.getElementById('log');var d=document.createElement('div');d.textContent=t;L.appendChild(d);while(L.children>4)L.removeChild(L.firstChild)}
function render(){
var eh=Math.max(0,Math.round(ene.hp));
document.getElementById('eh').style.width=(eh/ene.mhp*100)+'%';
document.getElementById('eHpT').textContent=eh+'/'+ene.mhp;
var hh=Math.max(0,Math.round(hero.hp));
document.getElementById('hh').style.width=(hh/hero.mhp*100)+'%';
document.getElementById('hT').textContent=hh+'/'+hero.mhp+' · MP '+Math.round(hero.mp);
document.getElementById('lv').textContent='Lv '+lvl();
document.getElementById('xp').textContent=xp+' XP';
}
function eTurn(){
setTimeout(function(){
if(ene.hp<=0)return;
var d=rnd(ene.atk-3,ene.atk+5);
if(def){d=Math.max(1,Math.floor(d/2));logT(' Defend mengurangi DMG ke '+d)}
hero.hp-=d;
logT(ene.e+' '+ene.n+' menyerang, DMG '+d);
def=false;busy=false;render();
if(hero.hp<=0){hero.hp=0;render();logT(' '+hero.n+' tumbang...');busy=true}
},650);
}
function act(fn){
if(busy)return;
busy=true;
var ok=fn();
render();
if(!ok){busy=false;return}
if(ene.hp<=0){
ene.hp=0;render();
logT(' '+hero.n+' MENANG!');
var g=rnd(20,50)+Math.floor(ene.mhp/3);
xp+=g;logT('+'+g+' XP');render();
document.getElementById('next').style.display='inline-block';
return;
}
eTurn();
}
document.getElementById('atk').onclick=function(){act(function(){var d=rnd(hero.atk-4,hero.atk+6);ene.hp-=d;logT(' '+hero.n+' ATTACK, DMG '+d);return true})};
document.getElementById('skl').onclick=function(){act(function(){if(hero.mp<25){logT('MP tidak cukup!');return false}hero.mp-=25;var d=rnd(hero.atk*2-6,hero.atk*2+6);ene.hp-=d;logT(' SKILL! DMG '+d);return true})};
document.getElementById('heal').onclick=function(){act(function(){if(hero.mp<20){logT('MP tidak cukup!');return false}hero.mp-=20;var h=Math.round(hero.mhp*.4);hero.hp=Math.min(hero.mhp,hero.hp+h);logT(' Heal +'+h+' HP');return true})};
document.getElementById('defB').onclick=function(){act(function(){def=true;logT(' '+hero.n+' bersiap defend');return true})};
document.getElementById('next').onclick=function(){
document.getElementById('next').style.display='none';
hero.hp=hero.mhp;hero.mp=hero.mmp;
spawn();
};
function spawn(){
var ks=Object.keys(E),k=ks[Math.floor(Math.random()*ks.length)];
ene=JSON.parse(JSON.stringify(E[k]));ene.mhp=ene.hp;
def=false;busy=false;
logT(' Muncul '+ene.e+' '+ene.n+' ('+ene.hp+' HP)!');
render();
}
function start(k){
var h=H[k];
hero={n:h.n,e:h.e,mhp:h.hp,hp:h.hp,mp:h.mp,atk:h.atk,mmp:h.mp};
document.getElementById('sel').style.display='none';
document.getElementById('battle').style.display='block';
document.getElementById('hNm').textContent=h.e+' '+h.n;
spawn();
}
var sel=document.getElementById('sel');
for(var k in H){
(function(key){
var c=H[key];
var b=document.createElement('button');b.className='btn';
b.innerHTML=c.e+' '+c.n+'<span style="display:block;font-size:9px;opacity:.8">HP '+c.hp+' · ATK '+c.atk+' · MP '+c.mp+'</span>';
b.style.cssText='background:rgba(255,255,255,.1);font-size:12px;padding:8px';
b.onclick=function(){start(key)};
sel.appendChild(b);
})(k);
}
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'RPG Quest', tag: 'GAME', icon: '', html: '<div class="row" style="justify-content:space-between"><span class="big">RPG Quest</span><span class="chip"><span id="lv">Lv 1</span> · <span id="xp">0 XP</span></span></div><div class="muted">Pilih Hero Class</div><div id="sel" class="row" style="justify-content:center;margin-top:8px"></div><div id="battle" style="display:none"><div style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px;margin-top:10px"><div class="row" style="justify-content:space-between"><b id="eNm">Enemy</b><span class="chip" id="eHpT">0/0</span></div><div style="height:14px;background:rgba(255,255,255,.1);border-radius:8px;overflow:hidden"><div id="eh" style="height:100%;width:100%;background:#e74c3c;transition:width .5s"></div></div></div><div style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px;margin-top:8px"><div class="row" style="justify-content:space-between"><b id="hNm">Hero</b><span class="chip" id="hT">0/0 · MP 0</span></div><div style="height:14px;background:rgba(255,255,255,.1);border-radius:8px;overflow:hidden"><div id="hh" style="height:100%;width:100%;background:#2ecc71;transition:width .5s"></div></div></div><div id="log" style="background:rgba(0,0,0,.25);border-radius:10px;padding:8px;margin:8px 0;font-size:11px;min-height:34px;color:rgba(255,255,255,.7)"></div><div class="row" style="justify-content:center"><button class="btn" id="atk" style="background:#e74c3c"> ATTACK</button><button class="btn" id="skl" style="background:#f1c40f"> SKILL</button><button class="btn" id="heal" style="background:#27ae60"> HEAL</button><button class="btn" id="defB" style="background:#3498db"> DEFEND</button><button class="btn" id="next" style="background:#6c5ce7;display:none">NEXT BATTLE </button></div></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'RPG Quest' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['rpg']
export default handler