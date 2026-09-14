import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var effects=[
{id:'chipmunk',label:'Chipmunk',color:'#fdcb6e',wave:'#ffeaa7'},
{id:'robot',label:'Robot',color:'#6c5ce7',wave:'#a29bfe'},
{id:'dark',label:'Dark',color:'#2d3436',wave:'#636e72'},
{id:'deep',label:'Deep',color:'#d63031',wave:'#e17a7a'}
];
var active=null;
var chips=document.createElement('div');
chips.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin:10px 0';
document.querySelector('.wrap').appendChild(chips);
effects.forEach(function(eff){
var c=document.createElement('div');
c.style.cssText='padding:8px 14px;border-radius:20px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.12);font-size:12px;color:#fff;cursor:pointer;transition:all .2s';
c.textContent=eff.label;
c.dataset.id=eff.id;
c.addEventListener('pointerdown',function(ev){
ev.preventDefault();
active=eff.id;
c.style.borderColor=eff.color;
c.style.background=eff.color+'33';
c.style.boxShadow='0 0 12px '+eff.color+'44';
document.querySelectorAll('.chip-item').forEach(function(ch){
if(ch.dataset.id!==eff.id){
ch.style.borderColor='rgba(255,255,255,.12)';
ch.style.background='rgba(255,255,255,.08)';
ch.style.boxShadow='none';
}
});
});
c.className='chip-item';
c.dataset.id=eff.id;
chips.appendChild(c);
});
var waveWrap=document.createElement('div');
waveWrap.style.cssText='height:80px;background:rgba(0,0,0,.25);border-radius:12px;margin:10px 0;position:relative;overflow:hidden';
document.querySelector('.wrap').appendChild(waveWrap);
var waveCanvas=document.createElement('canvas');
waveCanvas.width=560;
waveCanvas.height=80;
waveCanvas.style.cssText='width:100%;height:100%';
waveWrap.appendChild(waveCanvas);
var ctx=waveCanvas.getContext('2d');
var recording=false;
var wavePhase=0;
var waveColor='#6c5ce7';
var bars=[];
for(var i=0;i<40;i++){
bars.push(0);
}
function getWaveColor(){
if(!active)return '#6c5ce7';
var eff=effects.find(function(e){return e.id===active;});
return eff?eff.wave:'#6c5ce7';
}
function drawWave(){
ctx.clearRect(0,0,waveCanvas.width,waveCanvas.height);
var cw=getWaveColor();
var bw=waveCanvas.width/bars.length;
for(var i=0;i<bars.length;i++){
ctx.fillStyle=cw;
ctx.globalAlpha=0.7;
var bh=bars[i];
ctx.fillRect(i*bw+1,waveCanvas.height/2-bh/2,bw-2,bh);
ctx.globalAlpha=1;
}
if(recording){
wavePhase+=0.08;
for(var j=0;j<bars.length;j++){
var target=Math.random()*40+8;
if(active==='chipmunk')target=Math.random()*55+15;
if(active==='deep')target=Math.random()*20+5;
if(active==='robot')target=(Math.random()>.5?35:8);
if(active==='dark')target=Math.random()*25+5;
bars[j]+=(target-bars[j])*0.3;
}
}else{
for(var k=0;k<bars.length;k++){
bars[k]+=(2-bars[k])*0.1;
}
}
ctx.globalAlpha=1;
}
setInterval(drawWave,40);
var recBtn=document.createElement('div');
recBtn.style.cssText='text-align:center;padding:14px;background:linear-gradient(135deg,#d63031,#e17a7a);border-radius:14px;font-size:15px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s;margin-top:10px';
recBtn.textContent='● REC';
recBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
recording=!recording;
if(recording){
recBtn.textContent='■ STOP';
recBtn.style.background='linear-gradient(135deg,#636e72,#2d3436)';
recBtn.style.boxShadow='0 0 20px rgba(214,48,49,.5)';
}else{
recBtn.textContent='● REC';
recBtn.style.background='linear-gradient(135deg,#d63031,#e17a7a)';
recBtn.style.boxShadow='none';
}
});
document.querySelector('.wrap').appendChild(recBtn);
var status=document.createElement('div');
status.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-top:8px;min-height:16px';
status.textContent='Select effect then tap REC';
document.querySelector('.wrap').appendChild(status);
setInterval(function(){
if(recording){
var effLabel=active?effects.find(function(e){return e.id===active;}).label:'None';
status.textContent='Recording with '+effLabel+' effect...';
status.style.color='#e17a7a';
}else{
status.textContent='Tap an effect chip, then press REC';
status.style.color='rgba(255,255,255,.5)';
}
},500);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎙️', key: m.key } })
    try {
        const html = shell({ title: 'Voice Changer', tag: 'TOOL', icon: '🎙️', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Voice Changer' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['voicechanger']
export default handler
