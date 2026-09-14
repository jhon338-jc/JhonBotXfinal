import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var symbols=['💎','👑','🎵','🔥','⭐','🎤','🎧','💡'];
var reels=[0,3,5],spinning=[false,false,false],coins=100,bet=10;
var board=document.getElementById('sb');if(!board){board=document.createElement('div');board.id='sb';board.style.cssText='text-align:center;padding:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:14px';document.querySelector('.wrap').appendChild(board)}
var info=document.getElementById('si');if(!info){info=document.createElement('div');info.id='si';info.style.cssText='text-align:center;margin:8px 0';document.querySelector('.wrap').appendChild(info)}
function render(){var s='<div style="display:flex;justify-content:center;gap:10px;margin-bottom:12px">';
for(var i=0;i<3;i++){s+='<div style="width:70px;height:70px;border-radius:12px;background:rgba(255,255,255,.08);border:2px solid '+(spinning[i]?'#6c5ce7':'rgba(255,255,255,.12)')+';display:flex;align-items:center;justify-content:center;font-size:32px;transition:all .2s">'+symbols[reels[i]]+'</div>'}
s+='</div>';board.innerHTML=s}
function updateInfo(){var msg='';if(coins>=bet){msg='<button id="spinb" style="background:#6c5ce7;border:0;border-radius:10px;padding:10px 32px;color:#fff;font-size:14px;font-weight:bold;cursor:pointer">SPIN ('+bet+' coins)</button>'
+'<div style="display:flex;justify-content:center;gap:8px;margin-top:8px">'+['5','10','25'].map(function(b){return '<button class="bb" data-b="'+b+'" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:6px;padding:4px 10px;color:rgba(255,255,255,.6);font-size:11px;cursor:pointer">'+b+'</button>'}).join('')+'</div>'}else{msg='<div style="color:#e17055;font-size:13px;font-weight:bold">Not enough coins! Tap RESET</div>'}
info.innerHTML='<div style="font-size:12px;color:rgba(255,255,255,.5);margin-bottom:4px">Coins: <span style="color:#ffeaa7;font-size:14px;font-weight:bold">'+coins+'</span></div>'+msg+
'<button id="respin" style="background:rgba(225,112,85,.3);border:1px solid rgba(225,112,85,.5);border-radius:8px;padding:6px 16px;color:#fff;font-size:11px;cursor:pointer;margin-top:8px">RESET (50 coins)</button>';
var sb=document.getElementById('spinb');if(sb)sb.onclick=spin;
var rb=document.getElementById('respin');if(rb)rb.onclick=function(){if(coins<50)return;coins-=50;render();updateInfo()};
var bbs=document.querySelectorAll('.bb');for(var i=0;i<bbs.length;i++){bbs[i].onclick=function(){bet=parseInt(this.getAttribute('data-b'));updateInfo()}}}
function spin(){if(coins<bet||spinning[0])return;coins-=bet;
for(var i=0;i<3;i++){spinning[i]=true}render();updateInfo();
for(var i=0;i<3;i++){(function(idx){var count=0;var iv=setInterval(function(){reels[idx]=Math.floor(Math.random()*symbols.length);count++;render();
if(count>=15+idx*8){clearInterval(iv);spinning[idx]=false;
if(idx===2){setTimeout(checkWin,100)}}},60)})(i)}}
function checkWin(){var a=reels[0],b=reels[1],c=reels[2];var win=0;
if(a===b&&b===c){var m={'💎':50,'👑':40,'🎵':30,'🔥':25,'⭐':20,'🎤':15,'🎧':10,'💡':10};win=(m[symbols[a]]||10)*bet}
else if(a===b||b===c||a===c){win=Math.floor(bet*2)}
if(win>0){coins+=win;info.innerHTML='<div style="color:#00b894;font-size:16px;font-weight:bold;margin:8px 0">WIN +'+win+' coins!</div>'}
else{info.innerHTML='<div style="color:#e17055;font-size:13px;margin:8px 0">No match</div>'}
setTimeout(function(){render();updateInfo()},800)}
render();updateInfo();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎰', key: m.key } })
    try {
        const html = shell({ title: 'Slot MC', tag: 'GAME', icon: '🎰', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Slot MC' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['slotmc']
export default handler
