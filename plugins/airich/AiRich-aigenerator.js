import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var history=[];
var histList=document.createElement('div');
histList.style.cssText='margin:8px 0;font-size:11px;color:rgba(255,255,255,.5)';
histList.innerHTML='<b style="color:rgba(255,255,255,.7)">History</b>';
var histItems=document.createElement('div');
histItems.style.cssText='max-height:80px;overflow-y:auto;margin-top:4px';
histList.appendChild(histItems);
document.querySelector('.wrap').appendChild(histList);
var inputRow=document.createElement('div');
inputRow.style.cssText='display:flex;gap:6px;margin:8px 0';
var input=document.createElement('input');
input.placeholder='Enter prompt...';
input.style.cssText='flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;outline:none';
inputRow.appendChild(input);
document.querySelector('.wrap').appendChild(inputRow);
var genBtn=document.createElement('div');
genBtn.style.cssText='text-align:center;padding:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:12px;font-size:14px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s;margin-bottom:8px';
genBtn.textContent='✨ Generate';
document.querySelector('.wrap').appendChild(genBtn);
var resultArea=document.createElement('div');
resultArea.style.cssText='min-height:60px;margin:8px 0';
document.querySelector('.wrap').appendChild(resultArea);
function addHist(prompt){
history.unshift(prompt);
if(history.length>8)history.pop();
histItems.innerHTML='';
history.forEach(function(h){
var d=document.createElement('div');
d.style.cssText='padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.5)';
d.textContent='▸ '+h;
histItems.appendChild(d);
});
}
var generating=false;
genBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(generating)return;
var prompt=input.value.trim();
if(!prompt){input.style.borderColor='#d63031';setTimeout(function(){input.style.borderColor='rgba(255,255,255,.15)';},800);return;}
generating=true;
genBtn.textContent='Generating...';
genBtn.style.opacity='.6';
resultArea.innerHTML='';
var progWrap=document.createElement('div');
progWrap.style.cssText='background:rgba(255,255,255,.06);border-radius:8px;height:6px;overflow:hidden;margin:10px 0';
var progBar=document.createElement('div');
progBar.style.cssText='height:100%;width:0;background:linear-gradient(90deg,#6c5ce7,#a29bfe,#fd79a8);border-radius:8px;transition:width .3s';
progWrap.appendChild(progBar);
resultArea.appendChild(progWrap);
var statusText=document.createElement('div');
statusText.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5)';
statusText.textContent='Initializing AI...';
resultArea.appendChild(statusText);
var steps=['Initializing AI model...','Analyzing prompt...','Generating content...','Refining output...','Finalizing result...'];
var p=0;
var iv=setInterval(function(){
p+=Math.random()*18+5;
if(p>=100){
p=100;
clearInterval(iv);
progBar.style.width='100%';
statusText.textContent='Done!';
setTimeout(function(){
genBtn.textContent='✨ Generate';
genBtn.style.opacity='1';
generating=false;
input.value='';
addHist(prompt);
var tags=['art','creative','AI','digital','generated'];
var picked=[];
for(var i=0;i<3;i++)picked.push(tags[Math.floor(Math.random()*tags.length)]);
var card=document.createElement('div');
card.style.cssText='background:rgba(108,92,231,.1);border:1px solid rgba(108,92,231,.3);border-radius:12px;padding:14px;margin-top:8px;animation:fadeIn .3s';
card.innerHTML='<div style="font-size:13px;font-weight:bold;color:#6c5ce7;margin-bottom:6px">Generated Result</div>'+
'<div style="font-size:11px;color:rgba(255,255,255,.6);line-height:1.5">'+prompt+'</div>'+
'<div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap">'+
picked.map(function(t){return '<span style="padding:3px 8px;border-radius:6px;background:rgba(108,92,231,.15);font-size:9px;color:#a29bfe">'+t+'</span>';}).join('')+
'</div>';
var fadeStyle=document.createElement('style');
fadeStyle.textContent='@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(fadeStyle);
resultArea.appendChild(card);
},400);
}else{
progBar.style.width=Math.min(p,99)+'%';
statusText.textContent=steps[Math.min(Math.floor(p/20),steps.length-1)];
}
},200);
});
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
    try {
        const html = shell({ title: 'AI Generator', tag: 'TOOL', icon: '✨', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'AI Generator' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['aigenerator']
export default handler
