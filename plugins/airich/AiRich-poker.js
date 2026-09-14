import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var SU=['♠','♥','♦','♣'],RK=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var deck=[],hand=[],hold=[false,false,false,false,false],phase=0;
function isRed(s){return s==='♥'||s==='♦'}
function build(){deck=[];for(var s=0;s<4;s++)for(var r=0;r<13;r++)deck.push([SU[s],RK[r]]);for(var i=deck.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=deck[i];deck[i]=deck[j];deck[j]=t}}
function cardHTML(c,held){
var col=isRed(c[0])?'#ef5350':'#eee';
return '<div style="flex:1;min-width:54px;cursor:pointer;text-align:center;background:'+(held?'rgba(108,92,231,.25)':'#23233f')+';border:2px solid '+(held?'#6c5ce7':'rgba(255,255,255,.15)')+';border-radius:8px;padding:10px 4px;font-size:22px;color:'+col+'">'+c[0]+'<div style="font-size:14px">'+c[1]+'</div>'+(held?'<div style="font-size:9px;color:#a29bfe">HOLD</div>':'')+'</div>';
}
function renderCards(){
var wrap=document.getElementById('cards');wrap.innerHTML='';
for(var i=0;i<5;i++){
if(!hand[i]){
var em=document.createElement('div');em.style.cssText='flex:1;min-width:54px;text-align:center;background:#181830;border:1px dashed rgba(255,255,255,.2);border-radius:8px;padding:20px 4px;color:rgba(255,255,255,.4)';em.textContent='✕';wrap.appendChild(em);
continue;
}
var d=document.createElement('div');d.innerHTML=cardHTML(hand[i],hold[i]);
d.onclick=(function(j){return function(){if(phase===1){hold[j]=!hold[j];renderCards()}}})(i);
wrap.appendChild(d.firstChild);
}
}
function deal(){
build();hand=deck.slice(0,5);hold=[false,false,false,false,false];phase=1;
document.getElementById('act').textContent='Klik kartu untuk HOLD, lalu DRAW';
renderCards();
}
function draw(){
if(phase!==1)return;
var pool=deck.slice(5),pi=0;
for(var i=0;i<5;i++){if(!hold[i]){hand[i]=pool[pi];pi++}}
phase=2;
var res=evalHand();
document.getElementById('act').innerHTML=res.name+' <span style="color:#feca57">'+res.score+' pts</span>';
renderCards();
}
function evalHand(){
var ranks={};
for(var i=0;i<5;i++){var r=RK.indexOf(hand[i][1]);ranks[r]=(ranks[r]||0)+1}
var ks=Object.keys(ranks).map(Number).sort(function(a,b){return a-b});
var flush=true;
for(var i=1;i<5;i++)if(hand[i][0]!==hand[0][0])flush=false;
var straight=ks.length===5&&(ks[4]-ks[0]===4||(ks[4]===12&&ks[3]===3));
var pairs=ks.filter(function(k){return ranks[k]===2}).length;
var tri=ks.some(function(k){return ranks[k]===3});
var quad=ks.some(function(k){return ranks[k]===4});
if(flush&&straight&&ks[4]===12)return{name:'✨ ROYAL FLUSH',score:100};
if(flush&&straight)return{name:'🃏 STRAIGHT FLUSH',score:80};
if(quad)return{name:'FOUR OF A KIND',score:60};
if(tri&&pairs===1)return{name:'FULL HOUSE',score:50};
if(flush)return{name:'FLUSH',score:40};
if(straight)return{name:'STRAIGHT',score:35};
if(tri)return{name:'THREE OF A KIND',score:28};
if(pairs===2)return{name:'TWO PAIR',score:20};
if(pairs===1)return{name:'PAIR',score:10};
return{name:'HIGH CARD',score:5};
}
document.getElementById('deal').onclick=deal;
document.getElementById('drawB').onclick=draw;
document.getElementById('act').textContent='Tekan DEAL untuk mulai';
renderCards();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '♠️', key: m.key } })
    try {
        const html = shell({ title: 'Poker', tag: 'APP', icon: '♠️', html: '<div id="cards" class="row" style="gap:4px"></div><div id="act" class="muted" style="text-align:center;margin:10px 0;min-height:16px"></div><div class="row" style="justify-content:center"><button class="btn" id="deal" style="background:#6c5ce7">DEAL</button><button class="btn" id="drawB" style="background:#0dbd8b">DRAW</button></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Poker' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['poker']
export default handler