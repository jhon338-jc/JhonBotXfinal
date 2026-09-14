import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var bank=[
{kw:['hello','hi','hey','halo'],r:'Hey there! How can I help you? 😊'},
{kw:['how are you','apa kabar'],r:'I am doing great, thanks for asking!'},
{kw:['name','siapa','nama'],r:'I am ChatBot, your friendly AI assistant!'},
{kw:['help','bantu','tolong'],r:'Sure! Ask me anything and I will do my best to answer.'},
{kw:['joke','lucu','humor'],r:'Why did the developer go broke? Because he used up all his cache! 😂'},
{kw:['time','jam','waktu'],r:'Time flies when you are having fun!'},
{kw:['weather','cuaca'],r:'I predict sunny code skies today! ☀️'},
{kw:['love','cinta'],r:'Love is in the air... and in the code! 💜'},
{kw:['bot','ai','robot'],r:'Beep boop! I am an AI chatbot, nice to meet you!'},
{kw:['music','lagu'],r:'I recommend listening to lo-fi beats while coding! 🎵'},
{kw:['food','makan','eat'],r:'Pizza is always a good choice! 🍕'},
{kw:['bye','dadah','quit'],r:'Goodbye! Come back anytime! 👋'},
{kw:['thanks','terima','makasih'],r:'You are welcome! Happy to help!'},
{kw:['game','main'],r:'Let us play 2048 or Dino Runner, your pick!'},
{kw:['code','coding','program'],r:'Code is poetry written in logic! 💻'}
];
function getReply(msg){
var m=msg.toLowerCase();
for(var i=0;i<bank.length;i++){
for(var j=0;j<bank[i].kw.length;j++){
if(m.indexOf(bank[i].kw[j])!==-1)return bank[i].r;
}
}
var defaults=['That is interesting! Tell me more.','I see! Can you elaborate?','Cool! What else?','Hmm, let me think about that...','Great point! 🤔'];
return defaults[Math.floor(Math.random()*defaults.length)];
}
var chatBox=document.createElement('div');
chatBox.style.cssText='display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto;padding:4px;margin:8px 0';
chatBox.style.cssText+='scroll-behavior:smooth';
document.querySelector('.wrap').appendChild(chatBox);
function addMsg(text,sender){
var row=document.createElement('div');
var isBot=sender==='bot';
row.style.cssText='display:flex;justify-content:'+(isBot?'flex-start':'flex-end')+';align-items:flex-end;gap:6px';
var av=document.createElement('div');
av.style.cssText='width:24px;height:24px;border-radius:50%;background:'+(isBot?'#6c5ce7':'#00b894')+';display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0';
av.textContent=isBot?'🤖':'👤';
var bubble=document.createElement('div');
bubble.style.cssText='max-width:75%;padding:8px 12px;border-radius:14px;font-size:12px;line-height:1.4;word-break:break-word';
if(isBot){
bubble.style.background='rgba(108,92,231,.2)';
bubble.style.border='1px solid rgba(108,92,231,.3)';
bubble.style.color='#ddd';
}else{
bubble.style.background='rgba(0,184,148,.2)';
bubble.style.border='1px solid rgba(0,184,148,.3)';
bubble.style.color='#ddd';
}
bubble.textContent=text;
if(isBot){row.appendChild(av);row.appendChild(bubble);}
else{row.appendChild(bubble);row.appendChild(av);}
chatBox.appendChild(row);
chatBox.scrollTop=chatBox.scrollHeight;
}
function showTyping(){
var t=document.createElement('div');
t.id='typing';
t.style.cssText='display:flex;align-items:center;gap:6px;padding:4px 12px';
var dot1=document.createElement('span');
var dot2=document.createElement('span');
var dot3=document.createElement('span');
[dot1,dot2,dot3].forEach(function(d,i){
d.style.cssText='width:6px;height:6px;border-radius:50%;background:#6c5ce7;animation:blink 1s infinite '+(i*0.2)+'s';
t.appendChild(dot1);t.appendChild(dot2);t.appendChild(dot3);
});
var style=document.createElement('style');
style.textContent='@keyframes blink{0%,100%{opacity:.3}50%{opacity:1}}';
document.head.appendChild(style);
chatBox.appendChild(t);
chatBox.scrollTop=chatBox.scrollHeight;
}
function hideTyping(){
var t=document.getElementById('typing');
if(t)t.remove();
}
addMsg('Hello! I am your ChatBot assistant. Ask me anything!','bot');
var inputRow=document.createElement('div');
inputRow.style.cssText='display:flex;gap:6px;margin:4px 0';
var input=document.createElement('input');
input.placeholder='Type a message...';
input.style.cssText='flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;outline:none';
inputRow.appendChild(input);
var sendBtn=document.createElement('div');
sendBtn.style.cssText='padding:10px 16px;background:#6c5ce7;border-radius:12px;font-size:14px;cursor:pointer;color:#fff;font-weight:bold';
sendBtn.textContent='➤';
inputRow.appendChild(sendBtn);
document.querySelector('.wrap').appendChild(inputRow);
function send(){
var txt=input.value.trim();
if(!txt)return;
input.value='';
addMsg(txt,'user');
showTyping();
setTimeout(function(){
hideTyping();
addMsg(getReply(txt),'bot');
},600+Math.random()*800);
}
sendBtn.addEventListener('pointerdown',function(e){e.preventDefault();send();});
input.addEventListener('keydown',function(e){if(e.key==='Enter')send();});
var clearBtn=document.createElement('div');
clearBtn.style.cssText='text-align:center;padding:8px;margin-top:6px;font-size:11px;color:rgba(255,255,255,.4);cursor:pointer;border-radius:8px';
clearBtn.textContent='🗑️ Clear Chat';
clearBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
chatBox.innerHTML='';
addMsg('Chat cleared! Say hi again.','bot');
});
document.querySelector('.wrap').appendChild(clearBtn);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })
    try {
        const html = shell({ title: 'Chat Bot', tag: 'APP', icon: '🤖', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Chat Bot' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['chatbot']
export default handler
