import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var W=document.querySelector('.wrap');
var TA=document.createElement('textarea');TA.placeholder='Type text to translate...';
TA.style.cssText='width:100%;height:90px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#fff;font-size:13px;padding:10px;resize:none;box-sizing:border-box;outline:none';
W.appendChild(TA);
var CH=document.createElement('div');CH.style.cssText='display:flex;gap:6px;margin:8px 0';
W.appendChild(CH);
var langs=['EN','ID','JP','ES'];
var sel='EN';
function chips(){
CH.innerHTML='';
langs.forEach(function(l){
var b=document.createElement('button');
b.textContent=l;
b.style.cssText='flex:1;padding:8px 0;border:1px solid '+(l===sel?'#6c5ce7':'rgba(255,255,255,.12)')+';border-radius:8px;background:'+(l===sel?'#6c5ce7':'rgba(255,255,255,.05)')+';color:#fff;font-size:12px;font-weight:bold;cursor:pointer';
b.onclick=function(){sel=l;chips()};CH.appendChild(b)});
}
chips();
var BTN=document.createElement('button');BTN.textContent=' Detect & Translate';
BTN.style.cssText='width:100%;padding:11px;border:0;border-radius:10px;background:#6c5ce7;color:#fff;font-size:13px;font-weight:bold;cursor:pointer';
W.appendChild(BTN);
var OUT=document.createElement('div');OUT.style.cssText='margin-top:10px;padding:12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);min-height:60px;font-size:13px;color:rgba(255,255,255,.7);display:none';
W.appendChild(OUT);
var TAGS={en:'English',id:'Indonesian',jp:'Japanese',es:'Spanish',det:'Autodetect'};
var WORDS={
en:['Hello','world','good','morning','friend','how','are','you','thank','you','please','yes','no','love','awesome'],
id:['Halo','dunia','bagus','pagi','teman','bagaimana','apa','kabar','terima','kasih','tolong','ya','tidak','cinta','keren'],
jp:['Kon\u0027nichiwa','sekai','yoi','asa','tomodachi','dou','desu','anata','arigatou','gozaimasu','onegai','hai','iie','ai','sugoi'],
es:['Hola','mundo','bueno','ma\u00f1ana','amigo','como','estas','tu','gracias','por','favor','si','no','amor','genial']
};
function fake(txt,target){
var out=[];
txt.split(' ').forEach(function(w){
w=w.replace(/[^a-zA-Z]/g,'').toLowerCase();
var pool=WORDS[target]||WORDS.en;
var idx=Math.abs(w.split('').reduce(function(a,c){return a+c.charCodeAt(0)},0))%pool.length;
out.push(w?pool[idx]:' ');
});
return out.join(' ');
}
BTN.onclick=function(){
var t=TA.value.trim();
if(!t){OUT.style.display='block';OUT.textContent='Please type something first.';return}
var t1=Date.now();
OUT.style.display='block';OUT.textContent='Translating';
OUT.style.color='#f1c40f';
var iv=setInterval(function(){
OUT.textContent+='.';var k=Math.floor((Date.now()-t1)/250);if(k>=2)clearInterval(iv)},250);
setTimeout(function(){
clearInterval(iv);
var src=t.length%2===0?'EN':'ID';
var res=fake(t,sel.toLowerCase());
OUT.style.color='#fff';
OUT.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:6px">Detected: '+TAGS[src.toLowerCase()]+' -> '+TAGS[sel.toLowerCase()]+'</div><div style="font-size:15px">'+res+'</div>';
},900);
};
var CLR=document.createElement('button');CLR.textContent='Clear';
CLR.style.cssText='margin-top:8px;padding:8px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:12px;cursor:pointer';
CLR.onclick=function(){TA.value='';OUT.style.display='none'};
W.appendChild(CLR);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Translator', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Translator' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['translate']
export default handler