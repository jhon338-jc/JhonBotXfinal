import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const box=document.createElement('div');box.style.cssText='position:relative';
document.querySelector('.wrap').appendChild(box);box.appendChild(document.getElementById('game'));
const c=document.getElementById('game'),x=c.getContext('2d');
const cw=c.width,chh=c.height;
const hist=[];
function snap(){hist.push(c.toDataURL())}
function drawPhoto(){
const g=x.createLinearGradient(0,0,cw,chh);
g.addColorStop(0,'#ff9a9e');g.addColorStop(.35,'#fecfef');g.addColorStop(.7,'#a18cd1');g.addColorStop(1,'#6c5ce7');
x.fillStyle=g;x.fillRect(0,0,cw,chh);
const gr=x.createRadialGradient(cw*.25,chh*.3,10,cw*.25,chh*.3,130);
gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');
x.fillStyle=gr;x.fillRect(0,0,cw,chh);
x.fillStyle='#2c2c54';
for(let i=0;i<60;i++){
const hx=Math.random()*cw,hy=chh*.5+Math.random()*chh*.5,hw=30+Math.random()*60;
x.fillRect(hx,hy,hw,cw);}
x.fillStyle='#feca57';x.beginPath();x.arc(cw*.8,chh*.18,26,0,Math.PI*2);x.fill();
x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=4;
const cx=cw*.5;x.beginPath();x.moveTo(cx,chh*.95);x.quadraticCurveTo(cx,chh*.4,cx,chh*.1);x.stroke();
x.fillStyle='#fff';x.beginPath();x.arc(cx,chh*.1,38,0,Math.PI*2);x.fill();
x.fillStyle='#2c2c54';x.fillRect(cw*.5-10,chh*.78,20,34);
}
snap();
drawPhoto();
const FL=document.createElement('div');FL.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin-top:8px';
document.querySelector('.wrap').appendChild(FL);
const FILS=['RGB','Grayscale','Sepia','Invert','Brightness'];
let filter='RGB';
function bump(){x.globalAlpha=.3;x.fillStyle='#fff';x.fillRect(0,0,cw,10);x.fillRect(0,chh-10,cw,10);x.fillStyle='#6c5ce7';x.fillRect(0,0,10,chh);x.fillRect(cw-10,0,10,chh);x.globalAlpha=1}
let bright=0,mode='none';
function apply(){
const img=new Image();
img.onload=function(){
hist.push(c.toDataURL());if(hist.length>20)hist.shift();
x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cw,chh);x.drawImage(img,0,0);
const id=x.getImageData(0,0,cw,chh),d=id.data;
for(let i=0;i<d.length;i+=4){
const r=d[i],g=d[i+1],b=d[i+2];
const lum=.299*r+.587*g+.114*b;
if(mode==='gray'){d[i]=lum;d[i+1]=lum;d[i+2]=lum}
else if(mode==='sepia'){d[i]=Math.min(255,lum*1.07+40);d[i+1]=Math.min(255,lum*.74+10);d[i+2]=Math.min(255,lum*.33)}
else if(mode==='invert'){d[i]=255-r;d[i+1]=255-g;d[i+2]=255-b}
else if(mode==='bright'){d[i]=Math.min(255,r+bright);d[i+1]=Math.min(255,g+bright);d[i+2]=Math.min(255,b+bright)}}
x.putImageData(id,0,0);
};
img.src=hist[hist.length-1];
}
FILS.forEach(function(f){
const b=document.createElement('button');b.textContent=f;
b.style.cssText='flex:1;padding:8px 0;border:1px solid '+(f===filter?'#6c5ce7':'rgba(255,255,255,.12)')+';border-radius:8px;background:'+(f===filter?'#6c5ce7':'rgba(255,255,255,.05)')+';color:#fff;font-size:11px;font-weight:bold;cursor:pointer';
b.onclick=function(){filter=f;
mode=f==='Grayscale'?'gray':f==='Sepia'?'sepia':f==='Invert'?'invert':f==='Brightness'?'bright':'none';
apply()};FL.appendChild(b)});
const BR=document.createElement('input');BR.type='range';BR.min='-100';BR.max='100';BR.value='0';
BR.style.cssText='width:100%;accent-color:#6c5ce7;margin-top:8px';
BR.oninput=function(){if(mode==='bright'){bright=parseInt(BR.value);apply()}};
document.querySelector('.wrap').appendChild(BR);
const TL=document.createElement('div');TL.style.cssText='display:flex;align-items:center;gap:6px;margin-top:8px';
document.querySelector('.wrap').appendChild(TL);
const BR2=document.createElement('span');BR2.style.cssText='width:24px;text-align:center;font-size:11px;color:rgba(255,255,255,.5)';BR2.textContent=bright;TL.appendChild(BR2);
const UND=document.createElement('button');UND.textContent=' Undo';UND.style.cssText='flex:1;padding:9px;border:0;border-radius:8px;background:rgba(108,92,231,.8);color:#fff;font-size:11px;font-weight:bold;cursor:pointer';
UND.onclick=function(){if(hist.length>1){hist.pop();const img=new Image();img.onload=function(){x.clearRect(0,0,cw,chh);x.drawImage(img,0,0)};img.src=hist[hist.length-1]}};
TL.appendChild(UND);
const RST=document.createElement('button');RST.textContent='↺ Reset';RST.style.cssText='flex:1;padding:9px;border:0;border-radius:8px;background:rgba(255,255,255,.1);color:#fff;font-size:11px;cursor:pointer';
RST.onclick=function(){mode='none';bright=0;BR.value='0';BR2.textContent='0';hist.push(c.toDataURL());const img=new Image();img.onload=function(){x.clearRect(0,0,cw,chh);x.drawImage(img,0,0)};img.src=hist[0];filter='RGB';FL.querySelectorAll('button').forEach(function(b){b.style.cssText=b.textContent==='RGB'?'flex:1;padding:8px 0;border:1px solid #6c5ce7;border-radius:8px;background:#6c5ce7;color:#fff;font-size:11px;font-weight:bold;cursor:pointer':'flex:1;padding:8px 0;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:11px;cursor:pointer'})};
TL.appendChild(RST);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Photo Editor', tag: 'TOOL', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Photo Editor' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['photoeditor']
export default handler