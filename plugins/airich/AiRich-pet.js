import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var PETS={dog:['','Dog Rex'],cat:['','Cat Whiskers'],dragon:['','Dragon Pyro']};
var sp='dog',hunger=100,happy=100,xp=0;
function lvl(){return Math.floor(xp/50)+1}
function upd(){
document.getElementById('hb').style.width=Math.max(0,hunger)+'%';
document.getElementById('hp').style.width=Math.max(0,happy)+'%';
document.getElementById('lv').textContent='Lv '+lvl();
document.getElementById('xp').textContent=xp+' XP';
}
function msg(t){document.getElementById('msg').textContent=t}
function renderSp(){
var C=document.getElementById('spC');C.innerHTML='';
for(var k in PETS){
(function(key){
var b=document.createElement('button');b.className='btn';b.textContent=PETS[key][0]+' '+PETS[key][1];
b.style.cssText='background:'+(sp===key?'#6c5ce7':'rgba(255,255,255,.1)');b.style.fontSize='11px';
b.onclick=function(){
sp=key;
renderSp();
document.getElementById('petShow').textContent=PETS[key][0];
document.getElementById('petName').textContent=PETS[key][1];
msg(PETS[key][0]+' dipilih!');
};
C.appendChild(b);
})(k);
}
}
document.getElementById('feed').onclick=function(){
hunger=Math.min(100,hunger+25);
msg(' Yummy! Lapar turun. (+25)');
upd();
};
document.getElementById('play').onclick=function(){
happy=Math.min(100,happy+20);
xp+=5;
document.getElementById('xp').textContent=xp+' XP';
msg(' Seru! (+20 bahagia, +5 XP)');
upd();
};
setInterval(function(){
if(hunger>0)hunger-=1;
if(happy>0)happy-=1;
if(hunger===0&&happy===0)msg(' Pet sangat lapar & sedih! Beri makan!');
else if(hunger===0)msg(' Pet lapar, beri makan!');
else if(happy===0)msg(' Pet sedih, ajak main!');
else if(msg().length===0);
upd();
},2000);
renderSp();upd();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Pet Simulator', tag: 'GAME', icon: '', html: '<div class="row" style="justify-content:space-between"><span class="big" id="lv">Lv 1</span><span class="chip"><span id="xp">0 XP</span> · <span id="petName">Dog Rex</span></span></div><div id="petShow" style="text-align:center;font-size:72px;margin:8px 0"></div><div class="row" style="justify-content:center" id="spC"></div><div class="muted">Lapar</div><div style="height:14px;background:rgba(255,255,255,.1);border-radius:8px;overflow:hidden"><div id="hb" style="height:100%;width:100%;background:#e74c3c;transition:width .4s"></div></div><div class="muted" style="margin-top:8px">Kebahagiaan</div><div style="height:14px;background:rgba(255,255,255,.1);border-radius:8px;overflow:hidden"><div id="hp" style="height:100%;width:100%;background:#2ecc71;transition:width .4s"></div></div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="feed" style="background:#e67e22"> FEED</button><button class="btn" id="play" style="background:#3498db"> PLAY</button></div><div id="msg" class="muted" style="text-align:center;margin-top:8px;min-height:14px"></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Pet Simulator' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['pet']
export default handler