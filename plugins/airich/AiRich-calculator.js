import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var expr='0',lastOp='',hist=[];
var wrap=document.createElement('div');document.querySelector('.wrap').appendChild(wrap);
var histLine=document.createElement('div');histLine.style.cssText='font-size:11px;color:rgba(255,255,255,.4);text-align:right;min-height:16px;margin-bottom:4px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis';histLine.innerHTML='&nbsp;';wrap.appendChild(histLine);
var display=document.createElement('div');display.style.cssText='text-align:right;font-size:28px;font-weight:bold;color:#fff;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 16px;margin-bottom:10px;word-wrap:break-word;min-height:20px';display.textContent='0';wrap.appendChild(display);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:6px';
wrap.appendChild(grid);
var DM='\u00d7',DV='\u00f7',DL='\u2190',DF='\u2212';
var buttons=[['C','(',' )','%'],['7','8','9',DV],['4','5','6',DM],['1','2','3','-'],['+/'+DF,'0','.',DL]];
function sanitize(s){return s.replace(/[^0-9+\\-*/().%]/g,'')}
function calc(s){s=s.replace(new RegExp(DM,'g'),'*').replace(new RegExp(DV,'g'),'/');var result=Function('return ('+sanitize(s)+')')();if(!isFinite(result))return 'Error';var r=parseFloat(result.toFixed(8));return String(r)}
function press(v){
if(v==='C'){expr='0';histLine.innerHTML='&nbsp;';display.textContent='0';return}
if(v===DL){expr=expr.length>1?expr.slice(0,-1):'0';display.textContent=expr;return}
if(v==='+/'+DF){if(expr==='0'||expr==='-0'){expr='-';display.textContent=expr}else{expr=expr.charAt(0)==='-'?expr.slice(1):'-'+expr;display.textContent=expr}return}
if(v==='('||v===')'){expr=expr==='0'?v:expr+v;display.textContent=expr;return}
if(v==='%'){expr=String(parseFloat(sanitize(expr))/100);display.textContent=expr;return}
if(v===DM||v===DV||v==='+'||v==='-'){histLine.textContent=expr+' '+v;expr+=' '+v+' ';display.textContent=expr;return}
if(v==='='){try{histLine.textContent=expr+' =';var r=calc(expr);expr=String(r);display.textContent=r;display.style.color='#6c5ce7';setTimeout(function(){display.style.color='#fff'},300)}catch(e){display.textContent='Error';expr='0'}return}
if(expr==='0')expr='';expr+=v;display.textContent=expr}
buttons.forEach(function(row){row.forEach(function(v){
var b=document.createElement('button');b.textContent=v;
var isOp=v===DM||v===DV||v==='+'||v==='-'||v==='=';
var isFunc=v==='C'||v==='%'||v==='(';
b.style.cssText='background:'+(v==='='?'#6c5ce7':isOp?'rgba(108,92,231,.35)':isFunc?'rgba(255,255,255,.04)':'rgba(255,255,255,.08)')+';border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 0;font-size:16px;font-weight:bold;color:#fff;cursor:pointer;transition:all .15s';
b.addEventListener('click',function(){press(v)});grid.appendChild(b)})});
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🧮', key: m.key } })
    try {
        const html = shell({ title: 'Calculator', tag: 'TOOL', icon: '🧮', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Calculator' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['calculator']
export default handler