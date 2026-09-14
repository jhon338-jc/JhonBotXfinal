import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var DB={
science:[
{q:'What planet is closest to the Sun?',a:['Venus','Mercury','Mars','Earth'],c:1},
{q:'What is H2SO4?',a:['Sulfuric Acid','Hydrochloric Acid','Nitric Acid','Acetic Acid'],c:0},
{q:'What is the powerhouse of the cell?',a:['Nucleus','Ribosome','Mitochondria','Golgi Body'],c:2},
{q:'What gas do we breathe?',a:['Nitrogen','CO2','Oxygen','Hydrogen'],c:2},
{q:'What force keeps us on Earth?',a:['Magnetism','Friction','Gravity','Inertia'],c:2}
],
sports:[
{q:'How many players in a soccer team?',a:['9','10','11','12'],c:2},
{q:'In which sport is a "love" score?',a:['Tennis','Golf','Cricket','Badminton'],c:0},
{q:'How many rings in Olympics?',a:['3','4','5','6'],c:2},
{q:'What sport uses a shuttlecock?',a:['Tennis','Badminton','Squash','Racquetball'],c:1},
{q:'How long is an Olympic pool?',a:['25m','50m','75m','100m'],c:1}
],
music:[
{q:'How many keys on a standard piano?',a:['82','85','88','92'],c:2},
{q:'What instrument has 6 strings?',a:['Bass','Violin','Guitar','Ukulele'],c:2},
{q:'Who is the King of Pop?',a:['Elvis','MJ','Prince','Bieber'],c:1},
{q:'How many members in a quartet?',a:['2','3','4','5'],c:2},
{q:'What does "DJ" stand for?',a:['Disk Jockey','Data Junction','Direct Join','Deep Jazz'],c:0}
]};
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
var BOX=document.createElement('div');document.querySelector('.wrap').appendChild(BOX);
var cat,qs,qi,score,streak,best,answ,timer,tiq=10,totalQ=10;
function pickCat(){
BOX.innerHTML='<div style="text-align:center;font-size:13px;color:rgba(255,255,255,.6);margin-bottom:10px">Choose Category</div>';
['science','sports','music'].forEach(function(c){
var b=document.createElement('button');
b.style.cssText='display:block;width:100%;padding:12px;margin:5px 0;border:1px solid rgba(108,92,231,.3);border-radius:10px;background:rgba(108,92,231,.1);color:#fff;font-size:13px;cursor:pointer;text-align:center';
b.textContent=c.charAt(0).toUpperCase()+c.slice(1);
b.onclick=function(){cat=c;startGame()};BOX.appendChild(b)})}
function startGame(){qs=DB[cat].slice();while(qs.length>totalQ)qs.pop();shuffle(qs);qi=0;score=0;streak=0;best=0;answ=false;render()}
function render(){
if(qi>=qs.length){
BOX.innerHTML='<div style="text-align:center"><div style="font-size:36px;margin:12px 0">'+(score>=8?'\uD83C\uDFC6':'\uD83C\uDF1F')+'</div><div style="font-size:22px;font-weight:bold;color:#f1c40f">'+score+'/'+totalQ+'</div><div style="font-size:12px;color:rgba(255,255,255,.5);margin:4px 0">Best streak: '+best+'</div><div style="display:flex;gap:6px;justify-content:center;margin-top:10px"><button id="rr" style="padding:10px 20px;border:0;border-radius:10px;background:#6c5ce7;color:#fff;font-size:12px;font-weight:bold;cursor:pointer">Same</button><button id="rc" style="padding:10px 20px;border:0;border-radius:10px;background:rgba(255,255,255,.1);color:#fff;font-size:12px;cursor:pointer">Change</button></div></div>';
document.getElementById('rr').onclick=startGame;document.getElementById('rc').onclick=pickCat;return}
var item=qs[qi];answ=false;timer=tiq;
BOX.innerHTML='<div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.4);margin-bottom:4px"><span>'+(qi+1)+'/'+totalQ+' | '+cat.toUpperCase()+'</span><span style="color:#f1c40f">Score:'+score+'</span><span style="color:#e74c3c">Streak:'+streak+'</span></div><div id="tbar" style="height:3px;background:rgba(255,255,255,.1);border-radius:2px;margin-bottom:8px"><div id="tfill" style="height:100%;background:#6c5ce7;border-radius:2px;transition:width 1s linear;width:100%"></div></div><div style="font-size:14px;font-weight:bold;color:#fff;margin-bottom:10px">'+item.q+'</div><div id="abx"></div>';
var abx=document.getElementById('abx');
item.a.forEach(function(a,i){
var b=document.createElement('button');
b.style.cssText='display:block;width:100%;padding:10px;margin:4px 0;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:12px;cursor:pointer;text-align:left';
b.textContent=a;
b.onclick=function(){pick(i)};abx.appendChild(b)});
var iv=setInterval(function(){
timer--;var fill=document.getElementById('tfill');
if(fill)fill.style.width=(timer/tiq*100)+'%';
if(timer<=0){clearInterval(iv);if(!answ){answ=true;streak=0;showAns(-1)}}
},1000)}
function pick(idx){if(answ)return;answ=true;showAns(idx)}
function showAns(idx){
var item=qs[qi];var btns=document.getElementById('abx').querySelectorAll('button');
btns.forEach(function(b,i){b.style.pointerEvents='none';
if(i===item.c)b.style.cssText+='background:rgba(46,204,113,.3);border-color:#2ecc71';
else if(i===idx&&idx!==item.c)b.style.cssText+='background:rgba(231,76,60,.3);border-color:#e74c3c'});
if(idx===item.c){score++;streak++;if(streak>best)best=streak}
else streak=0;
setTimeout(function(){qi++;render()},900)}
pickCat();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🧩', key: m.key } })
    try {
        const html = shell({ title: 'Trivia', tag: 'GAME', icon: '🧩', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Trivia' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['trivia']
export default handler
