import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var faq=[
{q:'How do I use AI Rich?',a:'Type the command for any feature (e.g. calculator, calendar) and the bot sends an interactive card right in WhatsApp.'},
{q:'Do I need to install anything?',a:'No! Everything works inside WhatsApp. Just send the command and tap on the card.'},
{q:'What is AI Rich Menu?',a:'Type airichmenu to see all available features organized by category.'},
{q:'Can I play games?',a:'Yes! Try 2048 or Dino Runner for fun mini-games directly in chat.'},
{q:'How do reminders work?',a:'Set a reminder with a title and time. When the countdown hits zero, the card flashes to alert you.'}
];
var faqWrap=document.createElement('div');faqWrap.style.cssText='display:flex;flex-direction:column;gap:6px;margin-bottom:14px';wrap.appendChild(faqWrap);
faq.forEach(function(f){
var item=document.createElement('div');item.style.cssText='background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;overflow:hidden';
var q=document.createElement('div');q.style.cssText='padding:12px 14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer';
var qt=document.createElement('span');qt.textContent=f.q;qt.style.cssText='font-size:13px;color:#eee;font-weight:bold';
var ar=document.createElement('span');ar.textContent='+';ar.style.cssText='color:#6c5ce7;font-size:16px;font-weight:bold;transition:transform .2s';
q.appendChild(qt);q.appendChild(ar);
var a=document.createElement('div');a.textContent=f.a;a.style.cssText='padding:0 14px 0;color:rgba(255,255,255,.65);font-size:12px;line-height:1.5;max-height:0;overflow:hidden;transition:all .3s';
item.appendChild(q);item.appendChild(a);
var open=false;
q.addEventListener('click',function(){open=!open;a.style.maxHeight=open?'80px':'0';a.style.padding=open?'0 14px 12px':'0 14px 0';ar.textContent=open?'-':'+';ar.style.transform=open?'rotate(45deg)':'rotate(0)'});
faqWrap.appendChild(item)});
var steps=document.createElement('div');steps.style.cssText='margin-bottom:14px';
var stTitle=document.createElement('div');stTitle.textContent='How To Use';stTitle.style.cssText='font-size:13px;font-weight:bold;color:#6c5ce7;margin-bottom:8px';steps.appendChild(stTitle);
['1. Send a command (e.g. calculator, notes)','2. An interactive card appears in chat','3. Tap buttons and interact inside the card','4. Results update live'].forEach(function(s){
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:8px 10px;background:rgba(255,255,255,.04);border-radius:8px';
var dot=document.createElement('div');dot.style.cssText='width:6px;height:6px;border-radius:50%;background:#6c5ce7;flex-shrink:0';
var txt=document.createElement('div');txt.textContent=s;txt.style.cssText='font-size:12px;color:rgba(255,255,255,.7)';
row.appendChild(dot);row.appendChild(txt);steps.appendChild(row)});
wrap.appendChild(steps);
var card=document.createElement('div');card.style.cssText='background:linear-gradient(135deg,rgba(108,92,231,.2),rgba(255,255,255,.05));border:1px solid rgba(108,92,231,.3);border-radius:12px;padding:14px;text-align:center';
var ccIcon=document.createElement('div');ccIcon.textContent='🤖';ccIcon.style.cssText='font-size:28px;margin-bottom:6px';
var ccName=document.createElement('div');ccName.textContent='Jhon338 Bot';ccName.style.cssText='font-size:14px;font-weight:bold;color:#fff';
var ccDesc=document.createElement('div');ccDesc.textContent='AI Rich Interactive Plugins';ccDesc.style.cssText='font-size:11px;color:rgba(255,255,255,.5);margin-top:2px';
card.appendChild(ccIcon);card.appendChild(ccName);card.appendChild(ccDesc);wrap.appendChild(card);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🆘', key: m.key } })
    try {
        const html = shell({ title: 'Help', tag: 'MENU', icon: '🆘', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Help' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['airichhelp', 'arichhelp']
export default handler