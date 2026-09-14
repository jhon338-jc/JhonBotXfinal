import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var tracks=[{name:'Blinding Lights',artist:'The Weeknd',dur:200},{name:'Levitating',artist:'Dua Lipa',dur:203},{name:'Stay',artist:'Kid LAROI & Justin Bieber',dur:141},{name:'Peaches',artist:'Justin Bieber',dur:198},{name:'Montero',artist:'Lil Nas X',dur:137}];
var cur=0,playing=false,progress=0,timer=null;
var player=document.getElementById('mp');if(!player){player=document.createElement('div');player.id='mp';player.style.cssText='padding:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:14px;margin-top:10px';document.querySelector('.wrap').appendChild(player)}
function fmt(s){var m=Math.floor(s/60);var sec=Math.floor(s%60);return m+':'+(sec<10?'0':'')+sec}
function render(){var t=tracks[cur];player.innerHTML=
'<div style="text-align:center;margin-bottom:12px"><div style="width:80px;height:80px;margin:0 auto;border-radius:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);display:flex;align-items:center;justify-content:center;font-size:36px">'+(playing?'':'')+'</div></div>'+
'<div style="text-align:center;margin-bottom:4px"><div style="font-size:15px;font-weight:bold;color:#fff">'+t.name+'</div><div style="font-size:11px;color:rgba(255,255,255,.5)">'+t.artist+'</div></div>'+
'<div style="margin:10px 0;background:rgba(255,255,255,.08);height:4px;border-radius:2px;position:relative"><div style="height:100%;width:'+((progress/t.dur)*100)+'%;background:#6c5ce7;border-radius:2px;transition:width .3s"></div></div>'+
'<div style="display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.4)"><span>'+fmt(progress)+'</span><span>'+fmt(t.dur)+'</span></div>'+
'<div style="display:flex;justify-content:center;gap:16px;margin-top:12px;align-items:center">'+
'<button id="mpf" style="background:rgba(255,255,255,.08);border:0;border-radius:50%;width:36px;height:36px;font-size:16px;cursor:pointer;color:#fff"></button>'+
'<button id="mpp" style="background:#6c5ce7;border:0;border-radius:50%;width:44px;height:44px;font-size:20px;cursor:pointer;color:#fff">'+(playing?'':'')+'</button>'+
'<button id="mpn" style="background:rgba(255,255,255,.08);border:0;border-radius:50%;width:36px;height:36px;font-size:16px;cursor:pointer;color:#fff"></button>'+
'</div>'+
'<div id="mpl" style="margin-top:14px">'+trackList()+'</div>';
document.getElementById('mpp').onclick=function(){togglePlay()};
document.getElementById('mpf').onclick=function(){prev()};
document.getElementById('mpn').onclick=function(){next()};
var items=document.querySelectorAll('.mti');for(var i=0;i<items.length;i++){items[i].onclick=function(){cur=parseInt(this.getAttribute('data-c'));progress=0;playing=true;startTimer();render()}}
}
function trackList(){var h='<div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:6px;letter-spacing:1px">TRACKLIST</div>';for(var i=0;i<tracks.length;i++){var t=tracks[i];h+='<div class="mti" data-c="'+i+'" style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-radius:8px;cursor:pointer;margin-bottom:2px;background:'+(i===cur?'rgba(108,92,231,.15)':'transparent')+'">'+
'<div style="display:flex;gap:8px;align-items:center"><span style="font-size:11px;color:'+(i===cur?'#6c5ce7':'rgba(255,255,255,.3)')+'">'+(i===cur?'':' '+(i+1))+'</span><div><div style="font-size:12px;color:'+(i===cur?'#fff':'rgba(255,255,255,.7)')+'">'+t.name+'</div><div style="font-size:10px;color:rgba(255,255,255,.35)">'+t.artist+'</div></div></div>'+
'<span style="font-size:10px;color:rgba(255,255,255,.35)">'+fmt(t.dur)+'</span></div>'}return h}
function togglePlay(){playing=!playing;if(playing)startTimer();else clearInterval(timer);render()}
function next(){cur=(cur+1)%tracks.length;progress=0;playing=true;startTimer();render()}
function prev(){cur=(cur-1+tracks.length)%tracks.length;progress=0;playing=true;startTimer();render()}
function startTimer(){clearInterval(timer);timer=setInterval(function(){if(!playing)return;progress++;if(progress>=tracks[cur].dur){next()}else render()},1000)}
render();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Music Player', tag: 'APP', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Music Player' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['player']
export default handler
