import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var emojis=['🍎','🍊','🍋','🍇','🍓','🍒','🍑','🥝'];
var cards=[],flipped=[],matched=[],moves=0,locked=false,found=0;
var board=document.getElementById('mb');if(!board){board=document.createElement('div');board.id='mb';board.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:14px';document.querySelector('.wrap').appendChild(board)}
var info=document.getElementById('mi');if(!info){info=document.createElement('div');info.id='mi';info.style.cssText='text-align:center;margin:8px 0';document.querySelector('.wrap').appendChild(info)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function init(){var pairs=emojis.concat(emojis);cards=shuffle(pairs);flipped=[];matched=[];moves=0;found=0;locked=false;renderBoard();updateInfo()}
function updateInfo(){info.innerHTML='<span style="color:rgba(255,255,255,.6);font-size:13px">Moves: </span><span style="color:#6c5ce7;font-weight:bold;font-size:15px">'+moves+'</span><span style="color:rgba(255,255,255,.6);font-size:13px;margin-left:12px">Pairs: </span><span style="color:#00b894;font-weight:bold;font-size:15px">'+found+'/8</span>'+(found===8?'<div style="color:#00b894;margin-top:6px;font-weight:bold">YOU WIN!</div>':'')}
function renderBoard(){board.innerHTML='';for(var i=0;i<16;i++){var d=document.createElement('div');var isMatch=matched.indexOf(i)>=0;var isFlip=flipped.indexOf(i)>=0;var show=isMatch||isFlip;d.style.cssText='display:flex;align-items:center;justify-content:center;font-size:28px;aspect-ratio:1;border-radius:10px;cursor:pointer;transition:all .3s;background:'+(show?(isMatch?'rgba(0,184,148,.2)':'rgba(108,92,231,.2)'):'rgba(255,255,255,.08)')+';border:1px solid '+(show?(isMatch?'#00b894':'#6c5ce7'):'rgba(255,255,255,.1)')+';pointer-events:'+(isMatch?'none':'auto');d.textContent=show?cards[i]:'?';d.setAttribute('data-i',i);d.onclick=function(){flip(parseInt(this.getAttribute('data-i')))};board.appendChild(d)}}
function flip(i){if(locked||flipped.indexOf(i)>=0||matched.indexOf(i)>=0||flipped.length>=2)return;flipped.push(i);renderBoard();if(flipped.length===2){moves++;locked=true;var a=flipped[0],b=flipped[1];if(cards[a]===cards[b]){matched.push(a);matched.push(b);found++;flipped=[];locked=false;renderBoard();updateInfo()}else{setTimeout(function(){flipped=[];locked=false;renderBoard()},600)}updateInfo()}}
init();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🧠', key: m.key } })
    try {
        const html = shell({ title: 'Memory Match', tag: 'GAME', icon: '🧠', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Memory Match' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['memory']
export default handler
