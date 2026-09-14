import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const HTML = `
<div id="app">
  <div style="text-align:center;padding:24px 16px;background:linear-gradient(180deg,rgba(108,92,231,.25),transparent);border-radius:16px;border:1px solid rgba(255,255,255,.12)">
    <div style="width:92px;height:92px;border-radius:50%;margin:0 auto;background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af);padding:4px"><div style="width:100%;height:100%;border-radius:50%;background:#20213c;display:flex;align-items:center;justify-content:center;font-size:42px">😎</div></div>
    <div id="pname" style="font-size:19px;font-weight:bold;color:#fff;margin-top:10px">Jhon</div>
    <div id="phandle" class="muted">@jhon338 • Joined 2023</div>
    <div id="pbio" style="font-size:12px;color:#ccc;margin-top:8px;max-width:280px;margin-left:auto;margin-right:auto">Bot developer & creator of AiRich cards ✨</div>
    <div class="stat" style="justify-content:center;margin-top:14px">
      <span class="chip"><b class="big">142</b> Posts</span>
      <span class="chip"><b class="big" id="fcount">1,024</b> Followers</span>
      <span class="chip"><b class="big" id="gcount">356</b> Following</span>
    </div>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:14px">
      <button id="follow" class="btn" style="flex:1;max-width:200px;background:#6c5ce7">FOLLOW</button>
      <button id="edit" class="btn" style="background:rgba(255,255,255,.1)">EDIT</button>
    </div>
  </div>
  <div id="editform" style="display:none;margin-top:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px">
    <div style="font-size:12px;font-weight:bold;color:#fff;margin-bottom:8px">✏️ Edit Profile</div>
    <input id="iname" placeholder="Name" style="width:100%;margin-bottom:8px;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.06);color:#fff;font-size:13px">
    <input id="ibio" placeholder="Bio" style="width:100%;margin-bottom:12px;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.06);color:#fff;font-size:13px">
    <div style="display:flex;gap:8px">
      <button id="save" class="btn" style="flex:1;background:#00b894">SAVE</button>
      <button id="cancel" class="btn" style="flex:1;background:rgba(255,255,255,.1)">CANCEL</button>
    </div>
  </div>
</div>`

const GAME_JS = `
var following=false,followers=1024,editing=false;
var followEl=document.getElementById('follow'),fcount=document.getElementById('fcount'),gcount=document.getElementById('gcount'),edit=document.getElementById('edit'),ef=document.getElementById('editform'),iname=document.getElementById('iname'),ibio=document.getElementById('ibio'),pname=document.getElementById('pname'),pbio=document.getElementById('pbio');
var gl=356;
function fmt(n){return n>=1000?(n/1000).toFixed(1).replace('.0','')+'K':n}
followEl.onclick=function(){if(following){following=false;followers--;followEl.style.background='#6c5ce7';followEl.style.border='0';followEl.textContent='FOLLOW'}else{following=true;followers++;followEl.style.background='#00b894';followEl.textContent='FOLLOWING ✓'}fcount.textContent=fmt(followers)};
function toggleEdit(on){editing=on;ef.style.display=on?'block':'none';if(on){iname.value=pname.textContent;ibio.value=pbio.textContent;edit.textContent='HIDE'}else{edit.textContent='EDIT'}}
edit.onclick=function(){toggleEdit(!editing)};
document.getElementById('save').onclick=function(){if(iname.value.length)pname.textContent=iname.value;if(ibio.value.length)pbio.textContent=ibio.value;toggleEdit(false)};
document.getElementById('cancel').onclick=function(){toggleEdit(false)};
gcount.textContent=fmt(gl);fcount.textContent=fmt(followers);
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '👤', key: m.key } })
    try {
        const html = shell({ title: 'Profile', tag: 'APP', icon: '👤', html: HTML, script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Profile' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['profile']
export default handler