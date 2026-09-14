import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var words=['javascript','python','hangman','whatsapp','galaxy','puzzle','monster','castle','dragon','rocket','bridge','garden','island','jungle','knight','launch','mango','ninja','ocean','pirate','quest','rocket','shadow','tiger','ultra','viper','winter','xenon','yellow','zebra'];
var word='',guesses=[],wrong=0,max=6,over=false,won=false;
var gallows=document.getElementById('gallows');if(!gallows){gallows=document.createElement('div');gallows.id='gallows';gallows.style.cssText='text-align:center;font-family:monospace;color:#eee;font-size:18px;white-space:pre;margin:8px 0';document.querySelector('.wrap').appendChild(gallows)}
var kb=document.getElementById('kb');if(!kb){kb=document.createElement('div');kb.id='kb';kb.style.cssText='display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-top:10px';document.querySelector('.wrap').appendChild(kb)}
var info=document.getElementById('info');if(!info){info=document.createElement('div');info.id='info';info.style.cssText='text-align:center;margin:6px 0';document.querySelector('.wrap').appendChild(info)}
function pick(){var i=Math.floor(Math.random()*words.length);word=words[i].toUpperCase();guesses=[];wrong=0;over=false;won=false;render();renderKB()}
function drawGallows(n){var g=['  +---+','  |   |','  O   |',' /\\\\|  |',' / \\\\  |','========='];var lines=[];for(var i=0;i<6;i++){if(i===1&&n>=1)lines.push('  |   |');else if(i===2&&n>=2)lines.push('  O   |');else if(i===3&&n>=3)lines.push(' /\\\\|  |');else if(i===4&&n>=4)lines.push(' / \\\\  |');else if(i===5&&n>=5)lines.push('=========');
else lines.push(g[i])}return lines.join('\\n')}
function render(){var d='';for(var i=0;i<word.length;i++){if(guesses.indexOf(word[i])>=0)d+=word[i]+' ';else d+'_ '}d=d.trim();var status=over?(won?'YOU WIN!':'GAME OVER!'):'Wrong: '+wrong+'/'+max;gallows.innerHTML='<pre style="margin:0;font-size:15px;color:rgba(255,255,255,.7)">'+drawGallows(wrong)+'</pre><div style="margin:8px 0;font-size:22px;letter-spacing:4px;color:#6c5ce7">'+d+'</div><div style="font-size:12px;color:'+(over?(won?'#00b894':'#e17055'):'rgba(255,255,255,.6)')+'">'+status+'</div>'}
function renderKB(){kb.innerHTML='';var letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';for(var i=0;i<letters.length;i++){var ch=letters[i];var b=document.createElement('button');b.textContent=ch;b.style.cssText='width:30px;height:28px;border:0;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;color:#fff;background:'+(guesses.indexOf(ch)>=0?(word.indexOf(ch)>=0?'#00b894':'#e17055'):'#6c5ce7')+';opacity:'+(guesses.indexOf(ch)>=0?'0.4':'1')+';pointer-events:'+(guesses.indexOf(ch)>=0||over?'none':'auto');b.onclick=function(){guess(this.textContent)};kb.appendChild(b)}}
function guess(ch){if(over||guesses.indexOf(ch)>=0)return;guesses.push(ch);if(word.indexOf(ch)<0)wrong++;check();render();renderKB()}
function check(){var all=true;for(var i=0;i<word.length;i++){if(guesses.indexOf(word[i])<0){all=false;break}}if(all){won=true;over=true}if(wrong>=max)over=true}
document.addEventListener('keydown',function(e){var c=e.key.toUpperCase();if(c.length===1&&c>='A'&&c<='Z')guess(c)});
pick();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Hangman', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Hangman' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['hangman']
export default handler
