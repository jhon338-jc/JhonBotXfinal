import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var specs={
cpu:['Snapdragon 8 Gen 3','8 Cores','3.2 GHz'],
ram:['LPDDR5X','12 GB','5200 MHz'],
storage:['UFS 4.0','256 GB','4200 MB/s'],
battery:['Li-Po','5000 mAh','65W Fast Charge'],
os:['Android 15','One UI 7.0','Kernel 6.1'],
display:['AMOLED','6.7 inch','120Hz Refresh Rate'],
camera:['200 MP','OIS + EIS','8K@30fps']
};
var bars=[
{id:'cpu',label:'CPU Usage',max:100,color:'#6c5ce7'},
{id:'ram',label:'RAM Usage',max:100,color:'#00b894'},
{id:'storage',label:'Storage Used',max:100,color:'#fdcb6e'},
{id:'battery',label:'Battery',max:100,color:'#e17055'}
];
var barWrap=document.createElement('div');
barWrap.style.cssText='display:flex;flex-direction:column;gap:8px;margin:8px 0';
document.querySelector('.wrap').appendChild(barWrap);
bars.forEach(function(b){
var val=Math.floor(20+Math.random()*60);
var row=document.createElement('div');
row.innerHTML='<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">'+
'<span style="color:rgba(255,255,255,.7)">'+b.label+'</span>'+
'<span id="bv_'+b.id+'" style="color:'+b.color+';font-weight:bold">'+val+'%</span></div>'+
'<div style="height:6px;background:rgba(255,255,255,.08);border-radius:6px;overflow:hidden">'+
'<div id="bb_'+b.id+'" style="height:100%;width:0;background:'+b.color+';border-radius:6px;transition:width .8s"></div></div>';
barWrap.appendChild(row);
});
setTimeout(function(){
bars.forEach(function(b){
var val=Math.floor(20+Math.random()*60);
document.getElementById('bv_'+b.id).textContent=val+'%';
document.getElementById('bb_'+b.id).style.width=val+'%';
});
},200);
var specList=document.createElement('div');
specList.style.cssText='margin:10px 0';
document.querySelector('.wrap').appendChild(specList);
Object.keys(specs).forEach(function(key){
var s=specs[key];
var row=document.createElement('div');
row.style.cssText='display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:11px';
row.innerHTML='<div style="color:rgba(255,255,255,.5);text-transform:uppercase;font-size:9px;letter-spacing:1px">'+key+'</div>'+
'<div style="text-align:right"><div style="color:#fff;font-weight:bold">'+s[0]+'</div>'+
'<div style="color:rgba(255,255,255,.4);font-size:9px">'+s[1]+' | '+s[2]+'</div></div>';
specList.appendChild(row);
});
var refreshBtn=document.createElement('div');
refreshBtn.style.cssText='text-align:center;padding:10px;margin-top:8px;background:rgba(255,255,255,.06);border-radius:10px;font-size:12px;color:rgba(255,255,255,.6);cursor:pointer;transition:all .2s';
refreshBtn.textContent=' Refresh';
refreshBtn.addEventListener('pointerdown',function(e){
e.preventDefault();
refreshBtn.style.opacity='.5';
bars.forEach(function(b){
var val=Math.floor(15+Math.random()*70);
document.getElementById('bv_'+b.id).textContent=val+'%';
document.getElementById('bb_'+b.id).style.width=val+'%';
});
specList.innerHTML='';
var newSpecs={
cpu:['Snapdragon '+(['8 Gen 3','8s Gen 2','7+ Gen 2'][Math.floor(Math.random()*3)]),['8','6','4'][Math.floor(Math.random()*3)]+' Cores',(2+Math.random()*2).toFixed(1)+' GHz'],
ram:['LPDDR'+(['5X','5','4X'][Math.floor(Math.random()*3)]),[8,12,16][Math.floor(Math.random()*3)]+' GB'],
storage:['UFS '+(['4.0','3.1','2.2'][Math.floor(Math.random()*3)]),[128,256,512][Math.floor(Math.random()*3)]+' GB'],
battery:['Li-Po',[4500,5000,5500][Math.floor(Math.random()*3)]+' mAh'],
os:['Android '+[13,14,15][Math.floor(Math.random()*3)],''],
display:['AMOLED','6.'+Math.floor(1+Math.random()*6)+' inch',[90,120,144][Math.floor(Math.random()*3)]+'Hz'],
camera:[[108,200,50][Math.floor(Math.random()*3)]+' MP']
};
Object.keys(newSpecs).forEach(function(key){
var s=newSpecs[key];
var row=document.createElement('div');
row.style.cssText='display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:11px';
row.innerHTML='<div style="color:rgba(255,255,255,.5);text-transform:uppercase;font-size:9px;letter-spacing:1px">'+key+'</div>'+
'<div style="text-align:right"><div style="color:#fff;font-weight:bold">'+s[0]+'</div>'+
(s[1]?'<div style="color:rgba(255,255,255,.4);font-size:9px">'+s[1]+'</div>':'')+'</div>';
specList.appendChild(row);
});
setTimeout(function(){refreshBtn.style.opacity='1';},500);
});
document.querySelector('.wrap').appendChild(refreshBtn);
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'System Info', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'System Info' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['systeminfo']
export default handler
