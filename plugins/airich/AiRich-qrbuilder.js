import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game');
var ctx=c.getContext('2d');
var wrap=document.querySelector('.wrap');
var inputRow=document.createElement('div');
inputRow.style.cssText='display:flex;gap:6px;margin:8px 0';
var input=document.createElement('input');
input.placeholder='Enter text or URL...';
input.style.cssText='flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;outline:none';
inputRow.appendChild(input);
wrap.insertBefore(inputRow,c.parentNode);
var colorRow=document.createElement('div');
colorRow.style.cssText='display:flex;gap:6px;align-items:center;margin:6px 0';
var colors=['#000000','#6c5ce7','#d63031','#00b894','#0984e3','#e17055'];
var activeColor='#000000';
colors.forEach(function(col){
var swatch=document.createElement('div');
swatch.style.cssText='width:24px;height:24px;border-radius:50%;background:'+col+';cursor:pointer;border:2px solid '+(col===activeColor?'#fff':'transparent')+';transition:border .2s';
swatch.addEventListener('pointerdown',function(e){
e.preventDefault();
activeColor=col;
colorRow.querySelectorAll('div').forEach(function(s){s.style.borderColor='transparent';});
swatch.style.borderColor='#fff';
generate();
});
colorRow.appendChild(swatch);
});
wrap.insertBefore(colorRow,c.parentNode);
function hashCode(str){
var hash=0;
for(var i=0;i<str.length;i++){
hash=((hash<<5)-hash)+str.charCodeAt(i);
hash|=0;
}
return Math.abs(hash);
}
function seededRng(seed){
var x=Math.sin(seed)*10000;
return x-Math.floor(x);
}
function generate(){
var text=input.value||'default';
var seed=hashCode(text);
ctx.clearRect(0,0,c.width,c.height);
ctx.fillStyle='#f0f0f0';
ctx.fillRect(0,0,c.width,c.height);
var size=280;
var modules=21;
var cellSize=size/modules;
var margin=Math.floor((280-size)/2);
for(var y=0;y<modules;y++){
for(var x=0;x<modules;x++){
var isFinder=(x<7&&y<7)||(x>=modules-7&&y<7)||(x<7&&y>=modules-7);
var isBorder=(isFinder&&((x===0||x===6||y===0||y===6)||(x>=modules-7&&x<=modules-1&&(y===0||y===6))||(y>=modules-7&&y<=modules-1&&(x===0||x===6))));
var isInner=(isFinder&&x>=2&&x<=4&&y>=2&&y<=4)||(isFinder&&x>=modules-5&&x<=modules-3&&y>=2&&y<=4)||(isFinder&&x>=2&&x<=4&&y>=modules-5&&y<=modules-3);
var filled;
if(isBorder||isInner){
filled=true;
}else if(isFinder){
filled=false;
}else{
filled=seededRng(seed+x*31+y*17)>0.5;
}
if(filled){
ctx.fillStyle=activeColor;
ctx.fillRect(margin+x*cellSize,margin+y*cellSize,cellSize-0.5,cellSize-0.5);
}
}
}
ctx.fillStyle='#fff';
ctx.fillRect(margin+7*cellSize,margin+modules*cellSize-3,7*cellSize,3);
ctx.fillRect(margin+modules*cellSize-3,margin+7*cellSize,3,7*cellSize);
}
input.addEventListener('input',function(){generate();});
input.value='hello';
generate();
var dlBtn=document.createElement('div');
dlBtn.style.cssText='text-align:center;padding:10px;margin-top:6px;background:rgba(255,255,255,.06);border-radius:10px;font-size:12px;color:rgba(255,255,255,.6);cursor:pointer';
dlBtn.textContent='💾 Download QR';
dlBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
var link=document.createElement('a');
link.download='qr.png';
link.href=c.toDataURL();
link.click();
dlBtn.textContent='✅ Saved!';
setTimeout(function(){dlBtn.textContent='💾 Download QR';},1500);
});
wrap.appendChild(dlBtn);
var hint=document.createElement('div');
hint.style.cssText='text-align:center;font-size:10px;color:rgba(255,255,255,.35);margin-top:6px';
hint.textContent='Scan with camera to test (decorative only)';
wrap.appendChild(hint);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '📱', key: m.key } })
    try {
        const html = shell({ title: 'QR Builder', tag: 'TOOL', icon: '📱', html: stage(280, 280), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'QR Builder' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['qrbuilder']
export default handler
