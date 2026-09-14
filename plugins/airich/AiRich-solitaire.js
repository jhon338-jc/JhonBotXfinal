import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.querySelector('.wrap');
var SUITS=['S','H','D','C'],RANKS=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var SCOL={S:'#333',H:'#d33',D:'#d33',C:'#333'};
var deck=[],stock=[],waste=[],found=[[],[],[],[]],tableau=[[],[],[],[],[],[],[]],selected=null,selType='',selPile=-1,selIdx=-1;
var info=document.createElement('div');info.style.cssText='display:flex;gap:8px;margin-bottom:8px;align-items:center;flex-wrap:wrap';
info.innerHTML='<span class="big" id="sinfo">Solitaire</span><button id="newg" class="btn" style="background:#6c5ce7;font-size:11px">New Game</button><button id="undo" class="btn" style="background:rgba(255,255,255,.15);font-size:11px">Undo</button>';
wrap.appendChild(info);
var board=document.createElement('div');board.style.cssText='position:relative;width:100%;aspect-ratio:1.5;min-height:280px;max-height:400px;background:rgba(0,0,0,.15);border-radius:10px;border:1px solid rgba(255,255,255,.1);overflow:hidden';
wrap.appendChild(board);
function mkDeck(){deck=[];for(var s=0;s<4;s++)for(var r=0;r<13;r++)deck.push({s:s,r:r});shuffle(deck)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function init(){mkDeck();stock=deck.slice(28);waste=[];found=[[],[],[],[]];tableau=[[],[],[],[],[],[],[]];for(var i=0;i<7;i++){for(var j=i;j<7;j++){var card=stock.pop();card.face=j===i;tableau[j].push(card)}}selected=null;render()}
function cardDiv(card,faceUp,x,y,w,h,small,clickFn){var d=document.createElement('div');var rank=RANKS[card.r],suit=SUITS[card.s],col=SCOL[suit];d.style.cssText='position:absolute;left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;border-radius:5px;border:1px solid rgba(255,255,255,.25);font-size:'+(small?9:13)+'px;font-weight:bold;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:transform .1s,box-shadow .1s;z-index:1';if(!faceUp){d.style.background='linear-gradient(135deg,#6c5ce7,#5a4bd1)';d.innerHTML='<div style="font-size:18px;opacity:.3">\\u2660</div>'}else{d.style.background='#fff';d.style.color=col;d.innerHTML='<div style="position:absolute;top:3px;left:5px">'+rank+'<br><span style="font-size:'+(small?8:10)+'px">'+suit+'</span></div>'}if(selected&&selected.card===card){d.style.boxShadow='0 0 0 3px #6c5ce7';d.style.transform='translateY(-6px)'}d.addEventListener('click',function(e){e.stopPropagation();clickFn(card)});return d}
function render(){board.innerHTML='';var bw=board.offsetWidth,bh=board.offsetHeight;var cw=Math.floor((bw-20)/7),ch=Math.floor(cw*1.4),gap=4;var sX=bw-2*cw-gap,sY=8;
var stkD=document.createElement('div');stkD.style.cssText='position:absolute;left:8px;top:8px;width:'+cw+'px;height:'+ch+'px;border-radius:5px;border:2px dashed rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;color:rgba(255,255,255,.4)';stkD.textContent=stock.length?stock.length+' cards':'Empty';stkD.addEventListener('click',function(){if(stock.length===0){stock=waste.reverse();stock.forEach(function(c){c.face=false});waste=[]}else if(stock.length>0){var c=stock.pop();c.face=true;waste.push(c)}selected=null;render()});board.appendChild(stkD);
if(waste.length>0){var wc=waste[waste.length-1];var wd=cardDiv(wc,true,sX,sY,cw,ch,false,function(card){selPile=-1;selIdx=-1;selType='waste';selected={card:card,pile:'waste'};render()});board.appendChild(wd)}
for(var i=0;i<4;i++){var fd=document.createElement('div');fd.style.cssText='position:absolute;left:'+(sX+(i+1)*(cw+gap))+'px;top:8px;width:'+cw+'px;height:'+ch+'px;border-radius:5px;border:2px dashed rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:16px;color:rgba(255,255,255,.3)';fd.textContent=['\\u2660','\\u2665','\\u2666','\\u2663'][i];board.appendChild(fd);if(found[i].length>0){var fc=found[i][found[i].length-1];var fdd=cardDiv(fc,true,sX+(i+1)*(cw+gap),sY,cw,ch,false,function(card){});var fdi=i;fdd.onclick=function(card,fi){return function(e){e.stopPropagation();if(selected&&canPlaceFound(selected.card,fi)){found[fi].push(selected.card);removeFromPile(selected);selected=null;checkWin();render()}}(fc,fdi);board.appendChild(fdd)}}
var tY=ch+20;for(var t=0;t<7;t++){var tX=8+t*(cw+gap);for(var ci=0;ci<tableau[t].length;ci++){var card=tableau[t][ci];var stacked=ci<tableau[t].length-1;var cd=cardDiv(card,card.face,tX,tY+ci*16,cw,ch,stacked,function(){});var ti=t,ci2=ci;cd.onclick=(function(card,ti2,ci2){return function(e){e.stopPropagation();if(!card.face)return;if(selected){if(ci2===tableau[ti2].length-1&&canPlaceTableau(card,ti2)){var cards=removeFromPile(selected);tableau[ti2].push.apply(tableau[ti2],cards);selected=null;render();return}selected=null;render();return}if(ci2===tableau[ti2].length-1){selType='tableau';selPile=ti2;selIdx=ci2;selected={card:card,pile:'tableau',pileIdx:ti2,idx:ci2};render()}})(card,ti,ci2);board.appendChild(cd)}}
var stacks=document.createElement('div');stacks.style.cssText='position:absolute;bottom:8px;left:8px;right:8px;display:flex;gap:4px';
board.appendChild(stacks)}
function removeFromPile(sel){if(sel.pile==='waste'){waste.pop();return[sel.card]}if(sel.pile==='tableau'){var pile=tableau[sel.pileIdx];var idx=pile.indexOf(sel.card);var cards=pile.splice(idx);return cards}return[sel.card]}
function canPlaceTableau(card,tIdx){var pile=tableau[tIdx];if(pile.length===0)return card.r===12;var top=pile[pile.length-1];if(!top.face)return false;var topRed=top.s===1||top.s===2;var cardRed=card.s===1||card.s===2;return topRed!==cardRed&&card.r===top.r-1}
function canPlaceFound(card,fIdx){if(found[fIdx].length===0)return card.r===0;var top=found[fIdx][found[fIdx].length-1];return card.s===top.s&&card.r===top.r+1}
function checkWin(){for(var i=0;i<4;i++)if(found[i].length!==13)return false;document.getElementById('sinfo').textContent='You Win!';return true}
document.getElementById('newg').addEventListener('click',function(){init()});
document.getElementById('undo').addEventListener('click',function(){selected=null;render()});
board.addEventListener('click',function(){selected=null;render()});
init();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Solitaire', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Solitaire' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['solitaire']
export default handler
