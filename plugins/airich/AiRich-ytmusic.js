import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const TS=[{n:'Neon Horizon',a:'Aurora',g:'linear-gradient(135deg,#ff416c,#ff4b2b)',e:'🌆'},{n:'Late Night Drive',a:'Kavv',g:'linear-gradient(135deg,#00c6ff,#0072ff)',e:'🌃'},{n:'Sunday',a:'Mantra',g:'linear-gradient(135deg,#f83600,#f9d423)',e:'🌞'},{n:'Ghost Light',a:'Neve',g:'linear-gradient(135deg,#8e2de2,#4a00e0)',e:'👻'},{n:'Wildfire',a:'Boreal',g:'linear-gradient(135deg,#fc466b,#3f5efb)',e:'🔥'}];
let st=document.createElement('style');st.textContent='@keyframes eqb{from{transform:scaleY(.3)}to{transform:scaleY(1)}}.eq.on span{animation:eqb .6s infinite alternate;transform-origin:bottom}.eq.on span:nth-child(1){animation-delay:0s}.eq.on span:nth-child(2){animation-delay:.18s}.eq.on span:nth-child(3){animation-delay:.36s}';document.head.appendChild(st);
let playing=-1,likedFlip=[false,false,false,false,false],rows=[];
const nowEl=document.getElementById('now'),list=document.getElementById('list');
TS.forEach(function(T,ix){let row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;padding:9px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);margin-bottom:6px;cursor:pointer;transition:background .25s,border-color .25s';
row.innerHTML='<div style="width:44px;height:44px;border-radius:10px;background:'+T.g+';flex:none;display:flex;align-items:center;justify-content:center;font-size:20px">'+T.e+'</div>'+
'<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+T.n+'</div><div style="font-size:11px;color:rgba(255,255,255,.5)">'+T.a+'</div></div>'+
'<div id="pb'+ix+'" style="flex:none;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:13px">▶</div>'+
'<div id="eq'+ix+'" class="eq" style="flex:none;width:22px;height:24px;display:flex;align-items:flex-end;justify-content:center;gap:2px"><span style="width:4px;height:9px;background:#6c5ce7;border-radius:2px"></span><span style="width:4px;height:16px;background:#6c5ce7;border-radius:2px"></span><span style="width:4px;height:12px;background:#6c5ce7;border-radius:2px"></span></div>'+
'<div id="lk'+ix+'" style="flex:none;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer">♡</div>';
list.appendChild(row);rows.push(row);
row.addEventListener('click',function(){toggle(ix)});
row.lastChild.addEventListener('click',function(e){e.stopPropagation();like(ix)});
});
function like(ix){likedFlip[ix]=!likedFlip[ix];let lk=document.getElementById('lk'+ix);lk.textContent=likedFlip[ix]?'❤':'♡';lk.style.background=likedFlip[ix]?'rgba(108,92,231,.6)':'rgba(255,255,255,.07)'}
function toggle(ix){playing=playing===ix?-1:ix;upd()}
function upd(){for(let ix=0;ix<TS.length;ix++){let on=playing===ix;rows[ix].style.background=on?'rgba(108,92,231,.28)':'rgba(255,255,255,.05)';rows[ix].style.borderColor=on?'rgba(108,92,231,.7)':'rgba(255,255,255,.08)';document.getElementById('eq'+ix).className=on?'eq on':'eq';document.getElementById('pb'+ix).textContent=on?'❚❚':'▶'}
nowEl.textContent=playing>=0?'▶ '+TS[playing].n+' — '+TS[playing].a:'▶ Pilih lagu untuk diputar'}
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key } })
    try {
        const html = shell({ title: 'YouTube Music', tag: 'APP', icon: '🎧', html: '<div style="font-family:Arial;color:#fff"><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><div style="width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#ff0000,#ff5f6d);display:flex;align-items:center;justify-content:center;font-size:20px">▶</div><div style="flex:1"><div style="font-size:15px;font-weight:bold">YouTube Music</div><div id="now" style="font-size:12px;color:rgba(255,255,255,.55);margin-top:2px">▶ Pilih lagu untuk diputar</div></div></div><div id="list"></div></div>', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'YouTube Music' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['ytmusic']
export default handler