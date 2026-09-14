import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var styles=[{label:'Abstract',c1:'#6c5ce7',c2:'#a29bfe'},{label:'Sunset',c1:'#e17055',c2:'#fdcb6e'},{label:'Ocean',c1:'#0984e3',c2:'#00b894'},{label:'Neon',c1:'#e84393',c2:'#fd79a8'},{label:'Forest',c1:'#00b894',c2:'#55efc4'}];
var activeStyle=0;
var chips=document.createElement('div');
chips.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:8px 0';
document.querySelector('.wrap').appendChild(chips);
styles.forEach(function(s,i){
var c=document.createElement('div');
c.style.cssText='padding:6px 12px;border-radius:16px;background:rgba(255,255,255,.08);border:2px solid '+(i===0?'#6c5ce7':'rgba(255,255,255,.12)')+';font-size:11px;color:#fff;cursor:pointer;transition:all .2s';
c.textContent=s.label;
c.addEventListener('pointerdown',function(e){
e.preventDefault();
activeStyle=i;
chips.querySelectorAll('div').forEach(function(x){x.style.borderColor='rgba(255,255,255,.12)';});
c.style.borderColor=s.c1;
c.style.background=s.c1+'33';
});
chips.appendChild(c);
});
var inputWrap=document.createElement('div');
inputWrap.style.cssText='display:flex;gap:6px;margin:8px 0';
var input=document.createElement('input');
input.placeholder='Describe the image...';
input.style.cssText='flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;outline:none';
inputWrap.appendChild(input);
document.querySelector('.wrap').appendChild(inputWrap);
var genBtn=document.createElement('div');
genBtn.style.cssText='text-align:center;padding:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:12px;font-size:14px;font-weight:bold;color:#fff;cursor:pointer;transition:all .2s';
genBtn.textContent=' Generate';
document.querySelector('.wrap').appendChild(genBtn);
var canvasWrap=document.createElement('div');
canvasWrap.style.cssText='margin-top:10px;display:none';
var canvas=document.createElement('canvas');
canvas.width=560;
canvas.height=300;
canvas.style.cssText='width:100%;border-radius:12px;border:1px solid rgba(255,255,255,.12)';
canvasWrap.appendChild(canvas);
document.querySelector('.wrap').appendChild(canvasWrap);
var statusText=document.createElement('div');
statusText.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-top:6px;min-height:16px';
document.querySelector('.wrap').appendChild(statusText);
function seededRand(seed){
var x=Math.sin(seed)*10000;
return x-Math.floor(x);
}
function paintImage(prompt){
canvasWrap.style.display='block';
var ctx=canvas.getContext('2d');
var s=styles[activeStyle];
var c1=s.c1,c2=s.c2;
var tw=canvas.width,th=canvas.height;
var gradient=ctx.createLinearGradient(0,0,tw,th);
gradient.addColorStop(0,c1);
gradient.addColorStop(1,c2);
ctx.fillStyle=gradient;
ctx.fillRect(0,0,tw,th);
var totalPixels=tw*th;
var progress=0;
var step=8;
var imgData=ctx.getImageData(0,0,tw,th);
var seed=prompt.length*137+activeStyle*999;
for(var y=0;y<th;y+=step){
for(var x=0;x<tw;x+=step){
var r1=seededRand(seed+x+y*tw);
var r2=seededRand(seed+1+x*3+y*tw*2);
var brightness=0.4+r1*0.6;
var hueShift=r2*40-20;
imgData.data[(y*tw+x)*4]=Math.min(255,Math.floor(parseInt(c1.substr(1,2),16)*brightness+hueShift));
imgData.data[(y*tw+x)*4+1]=Math.min(255,Math.floor(parseInt(c1.substr(3,2),16)*brightness+hueShift));
imgData.data[(y*tw+x)*4+2]=Math.min(255,Math.floor(parseInt(c1.substr(5,2),16)*brightness+hueShift));
imgData.data[(y*tw+x)*4+3]=255;
for(var dy=0;dy<step&&y+dy<th;dy++){
for(var dx=0;dx<step&&x+dx<tw;dx++){
var idx=((y+dy)*tw+(x+dx))*4;
imgData.data[idx]=imgData.data[(y*tw+x)*4];
imgData.data[idx+1]=imgData.data[(y*tw+x)*4+1];
imgData.data[idx+2]=imgData.data[(y*tw+x)*4+2];
imgData.data[idx+3]=255;
}
}
}
ctx.putImageData(imgData,0,0);
}
function drawNoise(ctx,tw,th,seed){
for(var i=0;i<60;i++){
var x=seededRand(seed+i)*tw;
var y=seededRand(seed+i+500)*th;
var size=2+seededRand(seed+i+1000)*12;
ctx.fillStyle='rgba(255,255,255,'+(0.05+seededRand(seed+i+1500)*0.12)+')';
ctx.beginPath();
ctx.arc(x,y,size,0,Math.PI*2);
ctx.fill();
}
}
function addShimmer(ctx,tw,th){
for(var i=0;i<40;i++){
var x=Math.random()*tw;
var y=Math.random()*th;
ctx.fillStyle='rgba(255,255,255,'+(0.1+Math.random()*0.2)+')';
ctx.beginPath();
ctx.arc(x,y,1+Math.random()*2,0,Math.PI*2);
ctx.fill();
}
}
var generating=false;
genBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(generating)return;
var prompt=input.value.trim();
if(!prompt){input.style.borderColor='#d63031';setTimeout(function(){input.style.borderColor='rgba(255,255,255,.15)';},800);return;}
generating=true;
genBtn.textContent='Painting...';
genBtn.style.opacity='.6';
canvasWrap.style.display='block';
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,canvas.width,canvas.height);
var tw=canvas.width,th=canvas.height;
var seed=prompt.length*137+activeStyle*999;
var currentLine=0;
var lineStep=4;
var iv=setInterval(function(){
var endLine=Math.min(currentLine+lineStep*8,th);
var gradient=ctx.createLinearGradient(0,0,tw,th);
gradient.addColorStop(0,styles[activeStyle].c1);
gradient.addColorStop(1,styles[activeStyle].c2);
ctx.fillStyle=gradient;
ctx.fillRect(0,currentLine,tw,endLine-currentLine);
var imgData=ctx.getImageData(0,currentLine,tw,endLine-currentLine);
for(var py=0;py<endLine-currentLine;py++){
for(var px=0;px<tw;px+=2){
var ri=seed+px+(currentLine+py)*tw;
var r1=seededRand(ri);
var brightness=0.5+r1*0.5;
var baseR=parseInt(styles[activeStyle].c1.substr(1,2),16);
var baseG=parseInt(styles[activeStyle].c1.substr(3,2),16);
var baseB=parseInt(styles[activeStyle].c1.substr(5,2),16);
var idx=(py*tw+px)*4;
imgData.data[idx]=Math.floor(baseR*brightness);
imgData.data[idx+1]=Math.floor(baseG*brightness);
imgData.data[idx+2]=Math.floor(baseB*brightness);
imgData.data[idx+3]=255;
if(px+1<tw){
imgData.data[idx+4]=imgData.data[idx];
imgData.data[idx+5]=imgData.data[idx+1];
imgData.data[idx+6]=imgData.data[idx+2];
imgData.data[idx+7]=255;
}
}
}
ctx.putImageData(imgData,0,currentLine);
currentLine=endLine;
var pct=Math.floor((currentLine/th)*100);
statusText.textContent='Painting... '+pct+'%';
if(currentLine>=th){
clearInterval(iv);
drawNoise(ctx,tw,th,seed);
addShimmer(ctx,tw,th);
ctx.fillStyle='rgba(255,255,255,.8)';
ctx.font='bold 11px Arial';
ctx.fillText(prompt.substring(0,30),10,th-10);
statusText.textContent='Done! Image generated.';
genBtn.textContent=' Generate';
genBtn.style.opacity='1';
generating=false;
}
},50);
});
var dlBtn=document.createElement('div');
dlBtn.style.cssText='text-align:center;padding:10px;margin-top:8px;background:rgba(255,255,255,.06);border-radius:10px;font-size:12px;color:rgba(255,255,255,.6);cursor:pointer';
dlBtn.textContent=' Download';
dlBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
if(canvasWrap.style.display==='none')return;
var link=document.createElement('a');
link.download='text2img.png';
link.href=canvas.toDataURL();
link.click();
dlBtn.textContent=' Saved!';
setTimeout(function(){dlBtn.textContent=' Download';},1500);
});
document.querySelector('.wrap').appendChild(dlBtn);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Text to Image', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Text to Image' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['text2img']
export default handler
