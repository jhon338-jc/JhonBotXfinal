import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var BX=document.createElement('div');BX.style.cssText='display:flex;align-items:center;gap:10px;margin:8px 0';
document.querySelector('.wrap').appendChild(BX);
var Q=document.createElement('div');Q.style.cssText='flex:1;font-size:28px;font-weight:bold;color:#fff;text-align:center';
BX.appendChild(Q);
var PH=document.createElement('div');PH.style.cssText='flex:1;font-size:20px;color:#f1c40f;text-align:center';
BX.appendChild(PH);
var SC=document.createElement('div');SC.style.cssText='display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(255,255,255,.6);margin-bottom:6px';
document.querySelector('.wrap').appendChild(SC);
var LN=document.createElement('div');LN.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px';
document.querySelector('.wrap').appendChild(LN);
var EX=document.createElement('div');EX.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px';
document.querySelector('.wrap').appendChild(EX);
var fmt=document.createElement('div');fmt.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin:8px 0';
document.querySelector('.wrap').appendChild(fmt);
var ma='+',mb,ans;
var lvl=1,strk=0,pts=0,best=0,answered=false;
function newQ(){
lvl=1+Math.floor(pts/50);
var ops=pts>=100?['+','-','*','-','+']:pts>=50?['+','-','*']:['+','-'];
if(lvl>=3)ops=['+','-','*'];
ma=ops[Math.floor(Math.random()*ops.length)];
var hi=5+lvl*3;
var a=2+Math.floor(Math.random()*hi),b=2+Math.floor(Math.random()*hi);
if(ma==='+'){ans=a+b}
else if(ma==='-'){if(a<b){var t=a;a=b;b=t}ans=a-b}
else{ans=a*b}
Q.textContent=a+' '+ma+' '+b+' = ?';
Q.style.color='#ffffff';
PH.textContent='';
answered=false;
SC.innerHTML='<span>Level <b style="color:#2ecc71">'+lvl+'</b></span><span>Streak <b style="color:#f1c40f">'+strk+'</b></span><span>Best <b style="color:#e74c3c">'+best+'</b></span><span>Pts <b style="color:#6c5ce7">'+pts+'</b></span>';
buildOpts();
}
function buildOpts(){
var wrongs=[],n;
while(wrongs.length<3){n=ans+(Math.floor(Math.random()*19)-9);if(n!==ans&&wrongs.indexOf(n)<0)wrongs.push(n)}
var opts=wrongs.slice();opts.push(ans);
for(var i=opts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=opts[i];opts[i]=opts[j];opts[j]=t}
LN.innerHTML='';
opts.forEach(function(o,i){
var b=document.createElement('button');
b.style.cssText='padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(255,255,255,.05);color:#fff;font-size:15px;font-weight:bold;cursor:pointer';
b.textContent=o;
b.onclick=function(){answer(o,b)};
LN.appendChild(b)});
}
function answer(o,btn){
if(answered)return;answered=true;
var btns=LN.querySelectorAll('button');
btns.forEach(function(b){
b.style.pointerEvents='none';
if(parseInt(b.textContent)===ans)b.style.cssText+='border-color:#2ecc71;background:rgba(46,204,113,.25)';
else if(b===btn)b.style.cssText+='border-color:#e74c3c;background:rgba(231,76,60,.25)'});
if(o===ans){strk++;pts+=10+lvl*2;if(strk>best)best=strk;
SC.innerHTML='<span style="color:rgba(255,255,255,.6)">CORRECT!</span><span>+'+ (10+lvl*2) +' pts</span><span>Streak '+strk+'</span><span style="color:#2ecc71">Next: 5s</span>';
var tbar=document.createElement('div');tbar.style.cssText='height:4px;background:#2ecc71;border-radius:2px;margin-top:4px;width:100%';SC.appendChild(tbar);
setTimeout(newQ,800)}
else{strk=0;Q.textContent=Q.textContent+'  Answer: '+ans;Q.style.color='#e74c3c';
SC.innerHTML='<span>WRONG!</span><span>Keep going!</span>';setTimeout(newQ,1100)}}
newQ();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '➗', key: m.key } })
    try {
        const html = shell({ title: 'Math Trainer', tag: 'GAME', icon: '➗', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Math Trainer' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['math']
export default handler