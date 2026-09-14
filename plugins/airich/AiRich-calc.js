import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.querySelector('.wrap'),expr='',disp;
var d=document.createElement('div');d.style.cssText='padding:8px';wrap.appendChild(d);
var screen=document.createElement('div');screen.style.cssText='background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px;margin-bottom:10px;min-height:52px;display:flex;flex-direction:column;align-items:flex-end;justify-content:center';
disp=document.createElement('div');disp.style.cssText='font:bold 28px Arial;color:#fff;min-height:30px;word-break:break-all;text-align:right;width:100%';disp.textContent='0';screen.appendChild(disp);
var sub=document.createElement('div');sub.style.cssText='font:11px Arial;color:rgba(255,255,255,.45);min-height:14px;margin-top:4px;width:100%;text-align:right';screen.appendChild(sub);
d.appendChild(screen);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:6px';d.appendChild(grid);
var btns=['C','\u00B1','%','\u00F7','7','8','9','\u00D7','4','5','6','-','1','2','3','+','0','0','.','='];
var ops={'\u00F7':'/','\u00D7':'*','+':'+','-':'-'};
function upd(){disp.textContent=expr||'0';var v='';try{v=String(eval(expr))}catch(e){}sub.textContent=v&&expr?'= '+v:''}
for(var i=0;i<btns.length;i++){var b=document.createElement('button'),t=btns[i],el;
if(t==='0'){el=document.createElement('div');el.style.cssText='grid-column:span 2'}else el=document.createElement('div');
var btn2=document.createElement('button');btn2.textContent=t;
var bg='rgba(255,255,255,.08)',fg='#fff',fs='16px';
if('+-\u00D7\u00F7'.indexOf(t)>=0){bg='#6c5ce7';fs='18px'}
if(t==='='||t==='C'||t==='%'||t==='\u00B1')bg='rgba(255,255,255,.15)';
if(t==='=')bg='#00b894';
btn2.style.cssText='width:100%;padding:16px 0;border:0;border-radius:10px;background:'+bg+';color:'+fg+';font:bold '+fs+' Arial;cursor:pointer';
btn2.addEventListener('pointerdown',function(e){e.preventDefault();tap(this.textContent)});
el.appendChild(btn2);grid.appendChild(el)}
function tap(t){if(t==='C'){expr='';upd();return}if(t==='='){try{var v=eval(expr);expr=String(isNaN(v)?0:v)}catch(e){expr=''}upd();return}
if(t==='\u00B1'){expr=expr.charAt(0)==='-'?expr.slice(1):'-'+expr;upd();return}if(t==='%'){try{expr=String(eval(expr)/100)}catch(e){}upd();return}
if(ops[t]){var l=expr.charAt(expr.length-1);if(l&&ops[l])expr=expr.slice(0,-1)+t;else if(l)expr+=t;upd();return}
var last=expr.charAt(expr.length-1);if(last==='='||expr==='0'&&'.\u00B1'.indexOf(t)<0){if(expr==='0'&&t!=='0')expr='';else if(expr==='0'&&t==='0')expr='0';else if(last==='=')expr='';else expr=''}
expr+=t;upd()}
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Calculator', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Calculator' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['calc']
export default handler
