import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var MH=document.createElement('div');MH.style.cssText='text-align:center;margin:10px 0';
document.querySelector('.wrap').appendChild(MH);
var MH2=document.createElement('div');MH2.style.cssText='text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-bottom:8px';
document.querySelector('.wrap').appendChild(MH2);
var BL=document.createElement('div');BL.style.cssText='display:flex;flex-direction:column;gap:6px';
document.querySelector('.wrap').appendChild(BL);
var money=50,inc=0;
var gens=[
{name:'Lemonade Stand',icon:'\uD83C\uDF53',base:50,scale:1.4,owned:0,inc:2},
{name:'Corner Store',icon:'\uD83D\uDED2',base:250,scale:1.5,owned:0,inc:10},
{name:'Factory',icon:'\uD83C\uDFED',base:1200,scale:1.6,owned:0,inc:50},
{name:'Tech Startup',icon:'\uD83D\uDCBB',base:8000,scale:1.7,owned:0,inc:250},
{name:'Skyscraper',icon:'\uD83C\uDFD7\uFE0F',base:50000,scale:1.8,owned:0,inc:1500}
];
function c(i){return Math.floor(gens[i].base*Math.pow(gens[i].scale,gens[i].owned))}
function fmt(n){if(n>=1e9)return(n/1e9).toFixed(1)+'B';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return Math.floor(n)}
function upd(){
MH.innerHTML='<div style="font-size:32px;font-weight:bold;color:#2ecc71">$'+fmt(money)+'</div>';
MH2.innerHTML='Income: <span style="color:#f1c40f">$'+fmt(inc)+'</span>/s';
BL.innerHTML='';
for(var i=0;i<gens.length;i++){
var co=c(i);var b=document.createElement('button');
b.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid '+(money>=co?'rgba(46,204,113,.3)':'rgba(255,255,255,.08)')+';border-radius:10px;background:'+(money>=co?'rgba(46,204,113,.1)':'rgba(255,255,255,.04)')+';color:#fff;font-size:12px;cursor:'+(money>=co?'pointer':'not-allowed')+';opacity:'+(money>=co?1:.5);
b.innerHTML='<span>'+gens[i].icon+' <b>'+gens[i].name+'</b> <span style="color:rgba(255,255,255,.4)">x'+gens[i].owned+'</span></span><span style="color:'+(money>=co?'#f1c40f':'rgba(255,255,255,.3)')+'">$'+fmt(co)+'</span>';
(function(idx){b.onclick=function(){var co2=c(idx);if(money>=co2){money-=co2;gens[idx].owned++;recalc();upd()}}})(i);
BL.appendChild(b)}}
function recalc(){inc=0;for(var i=0;i<gens.length;i++)inc+=gens[i].owned*gens[i].inc}
setInterval(function(){money+=inc;upd()},1000);
upd();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🏗️', key: m.key } })
    try {
        const html = shell({ title: 'Tycoon', tag: 'GAME', icon: '🏗️', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Tycoon' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['tycoon']
export default handler
