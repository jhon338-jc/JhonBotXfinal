import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var meters=[
{id:'ping',label:'Ping',unit:'ms',color:'#6c5ce7',min:5,max:120},
{id:'down',label:'Download',unit:'Mbps',color:'#00b894',min:10,max:250},
{id:'up',label:'Upload',unit:'Mbps',color:'#fdcb6e',min:5,max:100}
];
var metersWrap=document.createElement('div');
metersWrap.style.cssText='display:flex;flex-direction:column;gap:10px;margin:10px 0';
document.querySelector('.wrap').appendChild(metersWrap);
meters.forEach(function(m){
var row=document.createElement('div');
row.innerHTML='<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">'+
'<span style="color:rgba(255,255,255,.7)">'+m.label+'</span>'+
'<span id="val_'+m.id+'" style="color:'+m.color+';font-weight:bold">--</span></div>'+
'<div style="height:8px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden">'+
'<div id="bar_'+m.id+'" style="height:100%;width:0;background:'+m.color+';border-radius:8px;transition:width .3s"></div></div>';
metersWrap.appendChild(row);
});
var resultCard=document.createElement('div');
resultCard.style.cssText='display:none;background:rgba(108,92,231,.08);border:1px solid rgba(108,92,231,.25);border-radius:12px;padding:14px;margin-top:10px;text-align:center';
document.querySelector('.wrap').appendChild(resultCard);
var startBtn=document.createElement('div');
startBtn.style.cssText='text-align:center;padding:14px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:14px;font-size:16px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s;margin-top:8px';
startBtn.textContent='▶ START';
document.querySelector('.wrap').appendChild(startBtn);
var status=document.createElement('div');
status.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-top:6px;min-height:16px';
document.querySelector('.wrap').appendChild(status);
var running=false;
startBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(running)return;
running=true;
startBtn.style.display='none';
resultCard.style.display='none';
meters.forEach(function(m){
document.getElementById('val_'+m.id).textContent='--';
document.getElementById('bar_'+m.id).style.width='0';
});
var phase=0;
var targets=meters.map(function(m){
return{val:m.min+Math.random()*(m.max-m.min),cur:0};
});
function runPhase(){
if(phase>=meters.length){
showResult(targets);
running=false;
startBtn.style.display='block';
startBtn.textContent='▶ START';
return;
}
var m=meters[phase];
status.textContent='Testing '+m.label+'...';
var t=targets[phase];
var progress=0;
var iv=setInterval(function(){
progress+=2;
var cur=Math.floor(t.val*(progress/100));
document.getElementById('val_'+m.id).textContent=cur+' '+m.unit;
document.getElementById('bar_'+m.id).style.width=Math.min(progress,100)+'%';
if(progress>=100){
clearInterval(iv);
document.getElementById('val_'+m.id).textContent=Math.floor(t.val)+' '+m.unit;
phase++;
setTimeout(runPhase,300);
}
},25);
}
runPhase();
});
function showResult(vals){
var pingV=Math.floor(vals[0].val);
var downV=Math.floor(vals[1].val);
var upV=Math.floor(vals[2].val);
var avgScore=Math.floor((Math.max(0,120-pingV)/120*30+downV/250*40+upV/100*30));
var grade='C';
var gradeColor='#fdcb6e';
if(avgScore>=80){grade='A+';gradeColor='#00b894';}
else if(avgScore>=60){grade='A';gradeColor='#55efc4';}
else if(avgScore>=40){grade='B';gradeColor='#6c5ce7';}
else if(avgScore>=20){grade='C';gradeColor='#fdcb6e';}
else{grade='D';gradeColor='#d63031';}
resultCard.style.display='block';
resultCard.innerHTML='<div style="font-size:40px;font-weight:bold;color:'+gradeColor+'">'+grade+'</div>'+
'<div style="font-size:11px;color:rgba(255,255,255,.5);margin:4px 0">Speed Score: '+avgScore+'/100</div>'+
'<div style="display:flex;justify-content:center;gap:16px;margin-top:8px">'+
'<div style="text-align:center"><div style="font-size:18px;font-weight:bold;color:#6c5ce7">'+pingV+'</div><div style="font-size:9px;color:rgba(255,255,255,.5)">Ping ms</div></div>'+
'<div style="text-align:center"><div style="font-size:18px;font-weight:bold;color:#00b894">'+downV+'</div><div style="font-size:9px;color:rgba(255,255,255,.5)">Down Mbps</div></div>'+
'<div style="text-align:center"><div style="font-size:18px;font-weight:bold;color:#fdcb6e">'+upV+'</div><div style="font-size:9px;color:rgba(255,255,255,.5)">Up Mbps</div></div>'+
'</div>';
status.textContent='Test complete!';
var fadeS=document.createElement('style');
fadeS.textContent='@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(fadeS);
resultCard.style.animation='fadeIn .4s';
}
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '📶', key: m.key } })
    try {
        const html = shell({ title: 'Speed Test', tag: 'TOOL', icon: '📶', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Speed Test' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['speedtest']
export default handler
