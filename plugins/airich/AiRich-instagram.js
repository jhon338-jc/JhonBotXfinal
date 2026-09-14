import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div id="stories" style="display:flex;gap:10px;overflow-x:auto;padding:4px 2px"></div>
  <div style="margin-top:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px">
      <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af);display:flex;align-items:center;justify-content:center"></div>
      <div><div style="font-size:13px;font-weight:bold;color:#fff">jhon338</div><div class="muted" style="font-size:10px">Bali, Indonesia</div></div>
      <span style="flex:1"></span><span style="color:rgba(255,255,255,.6)">⋯</span>
    </div>
    <div id="photo" style="position:relative;aspect-ratio:1/1;background:linear-gradient(135deg,#6c5ce7,#00b894);border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);overflow:hidden">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:56px;color:#fff;font-weight:bold"></div>
      <div id="hearts" style="position:absolute;inset:0;pointer-events:none"></div>
    </div>
    <div style="display:flex;gap:16px;padding:10px 12px;font-size:20px">
      <span id="likebtn" style="cursor:pointer"></span>
      <span id="cmtbtn" style="cursor:pointer"></span>
      <span style="cursor:pointer"></span>
      <span style="flex:1"></span><span style="cursor:pointer"></span>
    </div>
    <div style="padding:0 12px 8px;font-size:12px"><b id="likecount">128 likes</b></div>
    <div style="padding:0 12px 10px;font-size:12px;color:#ddd"><b>jhon338</b> Sunset vibes di pantai  #bali #sunset </div>
    <div style="padding:0 12px 10px;font-size:11px;color:rgba(255,255,255,.5)">View all comments</div>
    <div id="comments" style="padding:0 12px 12px;display:flex;flex-direction:column;gap:6px;max-height:160px;overflow:auto"></div>
  </div>
</div>`

const GAME_JS = `
var sdata=[['nova','#f58529'],['bima','#3897f0'],['citra','#dd2a7b'],['reza','#00b894'],['ayu','#f9a825'],['dika','#e17055']];
var srow=document.getElementById('stories');
sdata.forEach(function(s){var d=document.createElement('div');d.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;min-width:56px;cursor:pointer';d.innerHTML='<div style="width:52px;height:52px;border-radius:50%;padding:3px;background:conic-gradient('+s[1]+',#fff,#6c5ce7,'+s[1]+')"><div style="width:100%;height:100%;border-radius:50%;background:#1e1f38;display:flex;align-items:center;justify-content:center;font-size:20px"></div></div><div class="muted" style="font-size:9px">'+s[0]+'</div>';srow.appendChild(d)});
var likes=128,liked=false;
var countEl=document.getElementById('likecount'),likeBtn=document.getElementById('likebtn'),hearts=document.getElementById('hearts'),photo=document.getElementById('photo'),cmtBtn=document.getElementById('cmtbtn'),comments=document.getElementById('comments');
var names=['bima','nova','citra','reza','ayu'];
var st=document.createElement('style');st.textContent='@keyframes pop{0%{transform:translate(-50%,-50%) scale(.4);opacity:1}100%{transform:translate(-50%,-90%) scale(1.6);opacity:0}}';document.head.appendChild(st);
function burst(){var h=document.createElement('div');h.textContent='';h.style.cssText='position:absolute;left:50%;top:45%;font-size:56px;transform:translate(-50%,-50%);animation:pop .8s ease-out forwards';hearts.appendChild(h);setTimeout(function(){h.remove()},800)}
var lastT=0;
photo.addEventListener('pointerdown',function(e){e.preventDefault();var now=Date.now();if(now-lastT<350){liked=true;likes++;burst();update()}lastT=now});
likeBtn.onclick=function(){if(liked){liked=false;likes--}else{liked=true;likes++;burst()}update()};
function update(){countEl.textContent=likes.toLocaleString()+' likes';likeBtn.textContent=liked?'':''}
var cm=0;
cmtBtn.onclick=function(){cm++;var line=document.createElement('div');line.style.fontSize='12px';line.innerHTML='<b style="color:#eee">'+names[cm%names.length]+'</b> <span style="color:#ddd">Nice shot!  ('+cm+')</span>';comments.appendChild(line);comments.scrollTop=9999};
update();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Instagram', tag: 'APP', icon: '', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Instagram' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['instagram']
export default handler