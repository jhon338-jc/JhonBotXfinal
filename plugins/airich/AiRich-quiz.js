import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var QS=[
{q:'What planet is known as the Red Planet?',a:['Venus','Mars','Jupiter','Saturn'],c:1},
{q:'How many continents are there on Earth?',a:['5','6','7','8'],c:2},
{q:'What is the chemical symbol for water?',a:['H2O','CO2','NaCl','O2'],c:0},
{q:'Which animal is known as the King of the Jungle?',a:['Tiger','Bear','Lion','Elephant'],c:2},
{q:'What is the largest ocean on Earth?',a:['Atlantic','Indian','Arctic','Pacific'],c:3},
{q:'How many sides does a hexagon have?',a:['5','6','7','8'],c:1},
{q:'What gas do plants absorb?',a:['Oxygen','Nitrogen','Carbon Dioxide','Helium'],c:2},
{q:'Who painted the Mona Lisa?',a:['Picasso','Van Gogh','Da Vinci','Monet'],c:2},
{q:'What is the speed of light approx?',a:['300k km/s','150k km/s','500k km/s','100k km/s'],c:0},
{q:'Which element has atomic number 1?',a:['Helium','Oxygen','Carbon','Hydrogen'],c:3},
{q:'What year did WWII end?',a:['1943','1944','1945','1946'],c:2},
{q:'What is the hardest natural substance?',a:['Gold','Iron','Diamond','Quartz'],c:2},
{q:'How many bones are in the human body?',a:['106','206','306','406'],c:1},
{q:'Which planet has the most moons?',a:['Jupiter','Saturn','Uranus','Neptune'],c:1},
{q:'What is the capital of Japan?',a:['Seoul','Beijing','Bangkok','Tokyo'],c:3}
];
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
var pool,qi,score,answered,totalQ=10;
var BOX=document.createElement('div');document.querySelector('.wrap').appendChild(BOX);
function start(){pool=shuffle(QS.slice()).slice(0,totalQ);qi=0;score=0;answered=false;render()}
function render(){
if(qi>=pool.length){
BOX.innerHTML='<div style="text-align:center"><div style="font-size:36px;margin:16px 0">'+(score>=8?'\uD83C\uDFC6':score>=5?'\uD83C\uDF1F':'\uD83D\uDE14')+'</div><div style="font-size:22px;font-weight:bold;color:#fff">'+score+' / '+totalQ+'</div><div style="font-size:12px;color:rgba(255,255,255,.5);margin:6px 0">'+(score>=8?'Amazing!':score>=5?'Good job!':'Keep trying!')+'</div><button id="again" style="padding:10px 24px;border:0;border-radius:10px;background:#6c5ce7;color:#fff;font-size:13px;font-weight:bold;cursor:pointer;margin-top:8px">Play Again</button></div>';
document.getElementById('again').onclick=start;return}
var item=pool[qi];answered=false;
var h='<div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:6px">Question '+(qi+1)+'/'+totalQ+' | Score: '+score+'</div>';
h+='<div style="font-size:14px;font-weight:bold;color:#fff;margin-bottom:10px">'+item.q+'</div>';
for(var i=0;i<item.a.length;i++){
h+='<button class="ab" data-i="'+i+'" style="display:block;width:100%;padding:10px;margin:4px 0;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.06);color:#fff;font-size:12px;text-align:left;cursor:pointer">'+item.a[i]+'</button>'}
BOX.innerHTML=h;
BOX.querySelectorAll('.ab').forEach(function(b){b.onclick=function(){
if(answered)return;answered=true;
var idx=parseInt(b.getAttribute('data-i'));
var btns=BOX.querySelectorAll('.ab');
btns.forEach(function(btn,j){btn.style.pointerEvents='none';
if(j===item.c)btn.style.cssText+='background:rgba(46,204,113,.3);border-color:#2ecc71';
else if(j===idx&&j!==item.c)btn.style.cssText+='background:rgba(231,76,60,.3);border-color:#e74c3c'});
if(idx===item.c)score++;
setTimeout(function(){qi++;render()},800)}})}
start();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '❓', key: m.key } })
    try {
        const html = shell({ title: 'Quiz', tag: 'GAME', icon: '❓', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Quiz' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['quiz']
export default handler
