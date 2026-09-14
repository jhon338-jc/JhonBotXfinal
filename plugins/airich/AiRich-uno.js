import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.querySelector('.wrap');
var COLORS2=['#e74c3c','#f1c40f','#27ae60','#3498db'],SUIT=['0','1','2','3'];
var deck=[],player=[],ai=[],discard=[],turn='player',openDraw=0,picking=false,winner='';
var info=document.createElement('div');info.style.cssText='display:flex;gap:8px;margin-bottom:8px;align-items:center;flex-wrap:wrap';
info.innerHTML='<span class="big" id="turn">Your Turn</span><span class="chip" id="pinfo">You: 7</span><span class="chip">AI: 7</span><button id="newu" class="btn" style="background:#6c5ce7;font-size:11px">New Game</button>';
wrap.appendChild(info);
var aiRow=document.createElement('div');aiRow.style.cssText='display:flex;gap:4px;min-height:64px;flex-wrap:wrap;padding:8px;background:rgba(0,0,0,.15);border-radius:10px;margin-bottom:8px;align-items:center;justify-content:center';
aiRow.innerHTML='<span class="muted">AI hand</span>';
wrap.appendChild(aiRow);
var mid=document.createElement('div');mid.style.cssText='display:flex;justify-content:center;gap:14px;margin:10px 0;align-items:center';
mid.innerHTML='<button id="dbtn" class="btn" style="background:#6c5ce7;font-size:12px;padding:8px 12px">Draw</button>';
wrap.appendChild(mid);
var pile=document.createElement('div');pile.style.cssText='display:flex;gap:6px;justify-content:center;min-height:80px;align-items:center';
pile.innerHTML='<div class="muted">Stack:</div>';
wrap.appendChild(pile);
var playerRow=document.createElement('div');playerRow.style.cssText='display:flex;gap:4px;min-height:70px;flex-wrap:wrap;padding:8px;background:rgba(0,0,0,.15);border-radius:10px;align-items:center;justify-content:center';
playerRow.innerHTML='<span class="muted">Your hand</span>';
wrap.appendChild(playerRow);
function mkDeck(){deck=[];for(var c=0;c<4;c++)for(var n=0;n<=9;n++){deck.push({c:c,n:n});if(n>0)deck.push({c:c,n:n})}for(var c=0;c<4;c++){deck.push({c:c,n:'+2'});deck.push({c:c,n:'+2'})}for(var c=0;c<4;c++)deck.push({c:c,n:10})}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function ucard(card){return card&&card.n===10?{c:card.c,n:'W'}:card}
function cardDiv(card,small,clickFn){var cc=ucard(card);var d=document.createElement('div');d.style.cssText='width:'+(small?44:58)+'px;height:'+(small?64:84)+'px;border-radius:6px;background:#fff;color:'+(cc.c<2?'#d33':cc.c===1?'#b8860b':'#333')+';border:1px solid rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:'+(small?16:22)+'px;cursor:pointer;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,.3)';d.innerHTML=(cc.c==1?18:cc.n)+'<br><span style="font-size:'+(small?10:13)+'px">'+['\\u2660','\\u2665','\\u2666','\\u2663'][cc.c==1?1:cc.c]+'</span>';if(clickFn)d.addEventListener('click',function(){clickFn(card)});return d}
function cardBack(){var d=document.createElement('div');d.style.cssText='width:44px;height:64px;border-radius:6px;background:linear-gradient(135deg,#e74c3c,#c0392b);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:bold;flex-shrink:0';d.textContent='?';return d}
function render(){aiRow.innerHTML='<span class="muted">AI hand ('+ai.length+')</span>';for(var i=0;i<Math.min(ai.length,10);i++)aiRow.appendChild(cardBack());if(ai.length>10){var more=document.createElement('span');more.className='muted';more.textContent=' +'+(ai.length-10);aiRow.appendChild(more)}playerRow.innerHTML='<span class="muted">Your hand ('+player.length+')</span>';player.forEach(function(card){playerRow.appendChild(cardDiv(card,opens(),function(cc){playCard(cc)}))});pile.innerHTML='<div class="muted">Stack:</div>';var top=discard[discard.length-1];var pd=cardDiv(top,false,null);pd.style.pointerEvents='none';pile.appendChild(pd);document.getElementById('pinfo').textContent='You: '+player.length;document.getElementById('turn').textContent=turn==='player'?'Your Turn':'AI Thinking...'}
function opens(){return player.length; }
function canPlay(card){var top=discard[discard.length-1];if(ucard(card).n==='W')return true;if(ucard(top).n==='W')return true;var cc=ucard(card),t=ucard(top);return cc.c===t.c||cc.n===t.n||cc.n===+2||t.n===+2||(cc.n==='+2'&&(top.n==='+2'||top.c===cc.c))}
function playCard(card){if(turn!=='player'||winner)return;if(!canPlay(card)){return}player.splice(player.indexOf(card),1);discard.push(ucard(card));if(player.length===0){winner='You Win!';finish();return}afterPlay()}
function drawCard(){if(turn!=='player'||winner||picking)return;if(deck.length===0)reshuffle();var c=deck.pop();player.push(c);document.getElementById('dbtn').textContent='Draw again';if(!canPlay(c)){picking=true;setTimeout(function(){picking=false;document.getElementById('dbtn').textContent='Draw';skipTurn()},400)}else{picking=true;render();document.getElementById('dbtn').textContent='Draw & play';setTimeout(function(){document.getElementById('dbtn').textContent='Draw'},1500)}render()}
function allowPlay(){picking=false;document.getElementById('dbtn').textContent='Draw';render()}
function skipTurn(){turn='ai';render();setTimeout(aiTurn,900)}
function afterPlay(){var top=discard[discard.length-1];picking=true;render();setTimeout(function(){picking=false;turn='ai';render();setTimeout(aiTurn,900)},700)}
function reshuffle(){if(deck.length===0){deck=discard.slice(0,-1);discard=discard.slice(-1);shuffle(deck)}}
function drawNCards(n){for(var i=0;i<n;i++){if(deck.length===0)reshuffle();ai.push(deck.pop())}}
function aiTurn(){if(winner)return;var top=discard[discard.length-1],found=-1;for(var i=0;i<ai.length;i++){if(canPlay(ai[i])){found=i;break}}if(found!==-1){var card=ai[found];if(card.n==='+2'){drawNCards(2)}discard.push(ucard(card));ai.splice(found,1);if(ai.length===0){winner='AI Wins!';finish();return}}else{if(deck.length===0)reshuffle();ai.push(deck.pop());if(!canPlay(ai[ai.length-1])){turn='player';render();return}}turn='player';render()}
function finish(){document.getElementById('turn').textContent=winner;render()}
document.getElementById('newu').addEventListener('click',function(){start()});
function start(){mkDeck();shuffle(deck);player=deck.splice(0,7);ai=deck.splice(0,7);discard=[deck.pop()];turn='player';winner='';picking=false;document.getElementById('dbtn').textContent='Draw';render();if(ucard(discard[discard.length-1]).n==='W'){discard.pop();discard.push(deck.pop())}render()}
document.getElementById('dbtn').addEventListener('click',function(){if(turn==='player'&&!winner)drawCard()});
start();
`
let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '1️⃣', key: m.key } })
    try {
        const html = shell({ title: 'UNO', tag: 'GAME', icon: '1️⃣', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'UNO' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}
handler.command = ['uno']
export default handler