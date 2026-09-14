import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var hasImage=false;
var showingBg=false;
var uploadArea=document.createElement('div');
uploadArea.style.cssText='border:2px dashed rgba(255,255,255,.2);border-radius:12px;padding:30px;text-align:center;margin:10px 0;cursor:pointer;transition:all .2s';
uploadArea.innerHTML='<div style="font-size:32px;margin-bottom:6px">📤</div><div style="font-size:12px;color:rgba(255,255,255,.5)">Tap to add subject</div>';
document.querySelector('.wrap').appendChild(uploadArea);
var preview=document.createElement('div');
preview.style.cssText='position:relative;display:none;margin:8px 0;border-radius:12px;overflow:hidden';
document.querySelector('.wrap').appendChild(preview);
var beforeCanvas=document.createElement('canvas');
beforeCanvas.width=560;
beforeCanvas.height=200;
beforeCanvas.style.cssText='width:100%;display:block';
preview.appendChild(beforeCanvas);
var afterCanvas=document.createElement('canvas');
afterCanvas.width=560;
afterCanvas.height=200;
afterCanvas.style.cssText='width:100%;display:none;position:absolute;inset:0';
preview.appendChild(afterCanvas);
var scanLine=document.createElement('div');
scanLine.style.cssText='position:absolute;left:0;top:0;width:3px;height:100%;background:linear-gradient(180deg,#6c5ce7,#a29bfe);box-shadow:0 0 15px #6c5ce7;display:none;z-index:5';
preview.appendChild(scanLine);
function drawCheckerboard(ctx,w,h){
for(var y=0;y<h;y+=16){
for(var x=0;x<w;x+=16){
ctx.fillStyle=((x/16+y/16)%2===0)?'#ccc':'#fff';
ctx.fillRect(x,y,16,16);
}
}
}
function drawScene(ctx,w,h){
var grad=ctx.createLinearGradient(0,0,0,h);
grad.addColorStop(0,'#2d3436');
grad.addColorStop(1,'#636e72');
ctx.fillStyle=grad;
ctx.fillRect(0,0,w,h);
ctx.fillStyle='rgba(255,255,255,.15)';
for(var i=0;i<8;i++){
ctx.fillRect(20+i*60,h-40-Math.random()*30,40,40+Math.random()*30);
}
ctx.fillStyle='#e17055';
ctx.beginPath();
ctx.arc(w/2,h/2-10,35,0,Math.PI*2);
ctx.fill();
ctx.fillStyle='#fdcb6e';
ctx.fillRect(w/2-18,h/2+25,36,50);
ctx.fillStyle='#ffeaa7';
ctx.beginPath();
ctx.arc(w/2,h/2-25,22,0,Math.PI*2);
ctx.fill();
ctx.fillStyle='#6c5ce7';
ctx.fillRect(w/2-8,h/2-18,6,6);
ctx.fillRect(w/2+2,h/2-18,6,6);
}
function drawSilhouette(ctx,w,h){
ctx.clearRect(0,0,w,h);
drawCheckerboard(ctx,w,h);
ctx.fillStyle='#333';
ctx.beginPath();
ctx.arc(w/2,h/2-10,35,0,Math.PI*2);
ctx.fill();
ctx.fillStyle='#333';
ctx.fillRect(w/2-18,h/2+25,36,50);
ctx.fillStyle='#333';
ctx.beginPath();
ctx.arc(w/2,h/2-25,22,0,Math.PI*2);
ctx.fill();
}
uploadArea.addEventListener('pointerdown',function(e){
e.preventDefault();
hasImage=true;
showingBg=false;
uploadArea.style.display='none';
preview.style.display='block';
var ctx=beforeCanvas.getContext('2d');
drawScene(ctx,beforeCanvas.width,beforeCanvas.height);
afterCanvas.style.display='none';
scanLine.style.display='none';
removeBtn.style.display='block';
toggleBtn.style.display='none';
});
var btnRow=document.createElement('div');
btnRow.style.cssText='display:flex;gap:8px;margin:8px 0';
document.querySelector('.wrap').appendChild(btnRow);
var removeBtn=document.createElement('div');
removeBtn.style.cssText='flex:1;text-align:center;padding:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:12px;font-size:13px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s;display:none';
removeBtn.textContent='✂️ Remove BG';
btnRow.appendChild(removeBtn);
var toggleBtn=document.createElement('div');
toggleBtn.style.cssText='flex:1;text-align:center;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:12px;font-size:13px;color:#fff;cursor:pointer;display:none';
toggleBtn.textContent='👁️ Before';
btnRow.appendChild(toggleBtn);
var statusText=document.createElement('div');
statusText.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);min-height:16px;margin-top:4px';
document.querySelector('.wrap').appendChild(statusText);
var processing=false;
removeBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(processing||!hasImage)return;
processing=true;
removeBtn.style.opacity='.5';
statusText.textContent='Scanning image...';
scanLine.style.display='block';
scanLine.style.left='0px';
afterCanvas.style.display='block';
showingBg=true;
var w=preview.offsetWidth;
var scanX=0;
var iv=setInterval(function(){
scanX+=4;
scanLine.style.left=scanX+'px';
var ctx=afterCanvas.getContext('2d');
ctx.clearRect(0,0,afterCanvas.width,afterCanvas.height);
drawCheckerboard(ctx,afterCanvas.width,afterCanvas.height);
ctx.save();
ctx.beginPath();
ctx.rect(0,0,scanX*(afterCanvas.width/w),afterCanvas.height);
ctx.clip();
drawSilhouette(ctx,afterCanvas.width,afterCanvas.height);
ctx.restore();
if(scanX>=w){
clearInterval(iv);
scanLine.style.display='none';
statusText.textContent='Background removed!';
removeBtn.style.display='none';
removeBtn.style.opacity='1';
toggleBtn.style.display='block';
toggleBtn.textContent='👁️ Before';
processing=false;
}
},20);
});
toggleBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
showingBg=!showingBg;
if(showingBg){
afterCanvas.style.display='block';
toggleBtn.textContent='👁️ Before';
}else{
afterCanvas.style.display='none';
toggleBtn.textContent='👁️ After';
}
});
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '✂️', key: m.key } })
    try {
        const html = shell({ title: 'Remove BG', tag: 'TOOL', icon: '✂️', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Remove BG' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['removebg']
export default handler
