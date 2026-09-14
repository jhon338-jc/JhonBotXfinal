import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var W=document.querySelector('.wrap');
var ED=document.createElement('div');ED.style.cssText='display:flex;border:1px solid rgba(255,255,255,.14);border-radius:10px;overflow:hidden;background:#11111f';
W.appendChild(ED);
var LN=document.createElement('div');LN.style.cssText='padding:10px 6px;background:rgba(255,255,255,.03);color:rgba(255,255,255,.35);font-size:12px;line-height:20px;text-align:right;user-select:none;white-space:pre';
ED.appendChild(LN);
var TA=document.createElement('textarea');
TA.value='function hello(){\n  var name = "world";\n  console.log("Hi " + name);\n  return name;\n}\n\nhello();';
TA.spellcheck=false;
TA.style.cssText='flex:1;background:transparent;border:0;outline:none;color:#9ee0c8;font-family:monospace;font-size:12px;line-height:20px;padding:10px;min-height:130px;resize:vertical;white-space:pre;overflow:auto';
ED.appendChild(TA);
var SW=document.createElement('div');SW.style.cssText='display:flex;gap:6px;margin-top:8px';
W.appendChild(SW);
var RUN=document.createElement('button');RUN.textContent=' Run';RUN.style.cssText='flex:1;padding:10px;border:0;border-radius:10px;background:#2ecc71;color:#fff;font-size:12px;font-weight:bold;cursor:pointer';SW.appendChild(RUN);
var CLR=document.createElement('button');CLR.textContent=' Clear';CLR.style.cssText='flex:1;padding:10px;border:0;border-radius:10px;background:rgba(231,76,60,.8);color:#fff;font-size:12px;font-weight:bold;cursor:pointer';SW.appendChild(CLR);
var CON=document.createElement('div');CON.style.cssText='margin-top:8px;background:#0a0a16;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;font-family:monospace;font-size:12px;color:#7ee787;min-height:20px;white-space:pre-wrap';
CON.textContent='> Ready. Press Run.';
W.appendChild(CON);
var KW=['function','var','let','const','if','else','for','while','return','console','new','true','false'];
function hl(src){
var esc=src.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
KW.forEach(function(k){
var re=new RegExp('\\\\b'+k+'\\\\b');
esc=esc.replace(re,'<span style="color:#c678dd">'+k+'</span>');
});
esc=esc.replace(/(".*?")/g,'<span style="color:#98c379">$1</span>');
esc=esc.replace(/(\\/\\/.*)/g,'<span style="color:rgba(255,255,255,.35)">$1</span>');
return esc;
}
function lineNo(){LN.textContent=TA.value.split('\\n').map(function(_,i){return i+1}).join('\\n')}
TA.addEventListener('input',lineNo);
RUN.onclick=function(){
CON.textContent='';
var src=TA.value;
var steps=[];
var lines=src.split('\\n');
for(var i=0;i<lines.length;i++){
var l=lines[i];
if(l.indexOf('console.log')>-1){
var m=l.match(/\\(.*\\)/);
if(m){
var arg=m[0].slice(1,-1);
var val=arg.replace(/["']/g,'').replace(/\\+ *([a-zA-Z]+)/g,function(_,v){return v+" world"});
steps.push(val);
}}}
if(src.indexOf('hello()')>-1)steps.push('called hello()');
if(src.indexOf('return')>-1)steps.push('returned value');
if(!steps.length)steps.push('No console output detected');
CON.innerHTML='<span style="color:rgba(255,255,255,.4)">&gt; running script...</span>\\n'+steps.map(function(s){return '> '+hl(s)}).join('\\n');
};
CLR.onclick=function(){TA.value='';lineNo();CON.textContent='> Cleared.'};
lineNo();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Code Pad', tag: 'TOOL', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Code Pad' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['codepad']
export default handler