import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var deck=[],hand=[],dh=[],score=0,bj=false,over=false,bet=10,dbet=false;
var ui=document.createElement('div');ui.style.cssText='padding:8px';document.querySelector('.wrap').appendChild(ui);
var sc=document.createElement('div');sc.style.cssText='margin-bottom:8px;text-align:center';ui.appendChild(sc);
var hc=document.createElement('div');hc.style.cssText='display:flex;gap:6px;justify-content:center;min-height:80px;margin:8px 0';ui.appendChild(hc);
var dc=document.createElement('div');dc.style.cssText='display:flex;gap:6px;justify-content:center;min-height:80px;margin:8px 0';ui.appendChild(dc);
var bc=document.createElement('div');bc.style.cssText='text-align:center;margin-top:10px;min-height:50px';ui.appendChild(bc);
var S=String.fromCharCode;
var suits=[S(9824),S(9829),S(9830),S(9827)];
function init(){deck=[];var r=[S(65),S(50),S(51),S(52),S(53),S(54),S(55),S(56),S(57),S(49),S(48),S(74),S(81),S(75)];for(var s of suits)for(var v of r)deck.push(v+s);for(var i=deck.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=deck[i];deck[i]=deck[j];deck[j]=t}}
function cv(c){var v=c[0];if(v===S(65))return 11;if(v===S(75)||v===S(81)||v===S(74))return 10;return parseInt(v)}
function hv(h){var t=0,a=0;for(var i=0;i<h.length;i++){var v=cv(h[i]);if(v===11){a++;t+=11}else t+=v}while(t>21&&a>0){t-=10;a--}return t}
function card(c){return'<div style="width:44px;height:60px;background:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.2);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#333;font-weight:bold">'+c+'</div>'}
function flip(){return'<div style="width:44px;height:60px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:1px solid rgba(255,255,255,.2);border-radius:6px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:20px">'+S(9824)+'</div>'}
function rc(h){var s='';for(var i=0;i<h.length;i++)s+=card(h[i]);return s}
function sh(h,t){return'<div style="text-align:center;font:bold 12px Arial;color:rgba(255,255,255,.6)">'+t+': '+hv(h)+'</div>'}
function btn(t,fn){var b=document.createElement('button');b.textContent=t;b.style.cssText='margin:3px;padding:8px 18px;border:0;border-radius:8px;font:bold 13px Arial;cursor:pointer;color:#fff';b.style.background=fn===st?'#e17a7a':'#6c5ce7';b.addEventListener('pointerdown',function(e){e.preventDefault();fn()});return b}
function st(){if(over)return;while(hv(dh)<17){dh.push(deck.pop());dh[1]=dh[1]}over=true;dc.innerHTML=rc(dh);sh2();wr()}
function sh2(){var p=hv(hand),d=hv(dh),s='';if(hand.length===5&&p<=21)s='<span style="color:#6c5ce7">'+S(11088)+' 5-CARD WIN</span>';else if(bj&&dh.length===2&&d===21)s='PUSH';else if(bj)s='<span style="color:#6c5ce7">'+S(11088)+' BLACKJACK!</span>';else if(p>21)s='<span style="color:#e17a7a">BUST</span>';else if(d>21)s='<span style="color:#6c5ce7">'+S(11088)+' DEALER BUSTS</span>';else if(p>d)s='<span style="color:#6c5ce7">'+S(11088)+' YOU WIN</span>';else if(p<d)s='<span style="color:#e17a7a">'+S(10060)+' YOU LOSE</span>';else s='PUSH';score+=s.indexOf('WIN')>=0&&s.indexOf('LOSE')<0?bet:s.indexOf('LOSE')>=0?-bet:0;bc.innerHTML='<div style="text-align:center;font-size:12px;margin-bottom:6px;color:#fff">'+s+'</div>'}
function wr(){bc.innerHTML+='<div style="text-align:center;margin-top:8px"><button id="new" style="margin:3px;padding:8px 18px;border:0;border-radius:8px;font:bold 13px Arial;cursor:pointer;color:#fff;background:#00b894">NEW HAND</button></div>';document.getElementById('new').addEventListener('pointerdown',function(e){e.preventDefault();deal()})}
function deal(){over=false;bj=false;deck=[];hand=[];dh=[];init();hand.push(deck.pop());dh.push(deck.pop());hand.push(deck.pop());dh.push(deck.pop());hc.innerHTML=rc(hand);dc.innerHTML=flip()+card(dh[0]);sc.innerHTML=sh(hand,'YOU')+' | Score: <b style="color:#6c5ce7">'+score+'</b>';bc.innerHTML='';if(hv(hand)===21){bj=true;st();return}bc.appendChild(btn('HIT '+S(10070),function(){if(over)return;hand.push(deck.pop());hc.innerHTML=rc(hand);sc.innerHTML=sh(hand,'YOU');if(hv(hand)>21){over=true;dc.innerHTML=rc(dh);sh2();wr()}}));bc.appendChild(btn('STAND '+S(9992),st)}
init();deal();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Blackjack', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Blackjack' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['blackjack']
export default handler
