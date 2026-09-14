import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var history=[];
var histWrap=document.createElement('div');
histWrap.style.cssText='margin:6px 0;max-height:90px;overflow-y:auto';
document.querySelector('.wrap').appendChild(histWrap);
function addHist(short,long){
history.unshift({short:short,long:long});
if(history.length>5)history.pop();
renderHist();
}
function renderHist(){
histWrap.innerHTML='';
if(!history.length){histWrap.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.35);text-align:center;padding:4px">No links yet</div>';return;}
history.forEach(function(h){
var row=document.createElement('div');
row.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:6px 8px;background:rgba(255,255,255,.04);border-radius:8px;margin-bottom:4px;font-size:11px';
var left=document.createElement('div');
left.style.cssText='color:#6c5ce7;font-weight:bold;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
left.textContent=h.short;
var cpBtn=document.createElement('span');
cpBtn.style.cssText='color:rgba(255,255,255,.4);cursor:pointer;margin-left:8px;font-size:10px';
cpBtn.textContent='📋 Copy';
cpBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
navigator.clipboard.writeText(h.short).then(function(){
cpBtn.textContent='✅ Copied!';
setTimeout(function(){cpBtn.textContent='📋 Copy';},1500);
});
});
row.appendChild(left);
row.appendChild(cpBtn);
histWrap.appendChild(row);
});
}
renderHist();
var inputRow=document.createElement('div');
inputRow.style.cssText='display:flex;gap:6px;margin:8px 0';
var input=document.createElement('input');
input.placeholder='Paste long URL here...';
input.style.cssText='flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;outline:none';
inputRow.appendChild(input);
document.querySelector('.wrap').appendChild(inputRow);
var shortBtn=document.createElement('div');
shortBtn.style.cssText='text-align:center;padding:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:12px;font-size:14px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s;margin:8px 0';
shortBtn.textContent='🔗 Shorten';
document.querySelector('.wrap').appendChild(shortBtn);
var result=document.createElement('div');
result.style.cssText='display:none;margin:8px 0';
document.querySelector('.wrap').appendChild(result);
function makeSlug(len){
var chars='abcdefghijklmnopqrstuvwxyz0123456789';
var s='';
for(var i=0;i<len;i++)s+=chars.charAt(Math.floor(Math.random()*chars.length));
return s;
}
var processing=false;
shortBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(processing)return;
var url=input.value.trim();
if(!url){input.style.borderColor='#d63031';setTimeout(function(){input.style.borderColor='rgba(255,255,255,.15)';},800);return;}
processing=true;
shortBtn.textContent='Shortening...';
shortBtn.style.opacity='.6';
result.style.display='none';
setTimeout(function(){
var slug=makeSlug(6);
var shortUrl='https://slink.to/'+slug;
result.style.display='block';
result.innerHTML='<div style="background:rgba(108,92,231,.1);border:1px solid rgba(108,92,231,.3);border-radius:12px;padding:14px;animation:fadeIn .3s">'+
'<div style="font-size:11px;color:rgba(255,255,255,.5);margin-bottom:4px">Shortened URL</div>'+
'<div style="font-size:15px;font-weight:bold;color:#6c5ce7;word-break:break-all">'+shortUrl+'</div>'+
'<div style="display:flex;gap:8px;margin-top:8px">'+
'<div id="cpShort" style="padding:6px 14px;background:#6c5ce7;border-radius:8px;font-size:11px;color:#fff;cursor:pointer">📋 Copy</div>'+
'</div></div>';
var fadeS=document.createElement('style');
fadeS.textContent='@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(fadeS);
var cpEl=document.getElementById('cpShort');
cpEl.addEventListener('pointerdown',function(ev){
ev.preventDefault();
navigator.clipboard.writeText(shortUrl).then(function(){
cpEl.textContent='✅ Copied!';
cpEl.style.background='#00b894';
setTimeout(function(){cpEl.textContent='📋 Copy';cpEl.style.background='#6c5ce7';},2000);
});
});
addHist(shortUrl,url);
shortBtn.textContent='🔗 Shorten';
shortBtn.style.opacity='1';
processing=false;
},600+Math.random()*400);
});
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🔗', key: m.key } })
    try {
        const html = shell({ title: 'Short Link', tag: 'TOOL', icon: '🔗', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Short Link' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['shortlink']
export default handler
