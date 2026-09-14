import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var W=c.width,H=c.height;
var cellW=Math.floor(Math.min(30,W/15)),ox=Math.floor((W-13*cellW)/2),oy=Math.floor((H-13*cellW)/2)-20;
var N=4,TOK=4;
var p1=[],p2=[],turn=0,state='roll',dice=6,rolling=false,winner='',selCast=[];
function posOf(i){var k=i%13;if(i<=12)return{x:ox+k*cellW,y:oy+12*cellW};if(i<=25)return{x:ox+12*cellW,y:oy+(11-(i-13))*cellW};if(i<=38)return{x:ox+(12-(i-26))*cellW,y:oy};return{x:ox,y:oy+(i-39)*cellW}}
function newGame(){p1=[];p2=[];for(var i=0;i<N;i++){p1.push({dist:0,home:false,start:0});p2.push({dist:0,home:false,start:39})}turn=0;state='roll';dice=6;rolling=false;winner='';selCast=[]}
function cur(){return turn===0?p1:p2}
function opp(){return turn===0?p2:p1}
function cellOf(t){return t.home?999:t.start+t.dist}
function len(t){var l=51;return t.start===0?l:l}
function dest(t,d){var raw=t.dist+d;if(raw>=51){t.home=true;t.dist=0;return}var p=(t.start+raw)%52;cur().forEach(function(u){if(u!==t&&!u.home&&(u.start+u.dist)%52===p){u.dist=0}});t.dist=raw}
function canMove(t,d){if(t.home)return false;var mm=d;return true}
function hasMove(d){return cur().some(function(t){return !t.home})}
function rolle(){if(state!=='roll'||winner)return;state='mov';rolling=true;var tick=0;var iv=setInterval(function(){tick++;dice=Math.floor(Math.random()*6)+1;if(tick>=12){clearInterval(iv);rolling=false;dice=tick;resolve(dice)}},60)}
function resolve(d){dice=d;var arr=cur();var possible=false;arr.forEach(function(t){if(t.home)return;if(t.dist+d>=50){possible=true}else if(!arr.some(function(u){return u!==t&&!u.home&&(u.start+u.dist)%52===(t.start+t.dist+d)%52})){possible=true}if(t.dist===0&&d===6&&arr.some(function(u){return u.start===t.start&&u.dist===0})){possible=true}});if(!possible||arr.every(function(t){return t.dist===0&&d!==6})){state='roll';if(d!==6)turnSwitch();else state='roll';return}state='sel';selCast=arr.map(function(t,i){return i});draw()}
function pickIdx(px,py){var arr=cur();for(var i=0;i<arr.length;i++){var t=arr[i],p=posOf((t.start+t.dist)%52);if(Math.abs(px-p.x)<cellW*.5&&Math.abs(py-p.y)<cellW*.5)return i}return -1}
function pick(i){if(state!=='sel'||winner||turn!==0)return;var t=cur()[i];if(t.home)return;doMove(i)}
function doMove(i){var t=cur()[i];if(!t.home&&t.dist+dice>=50){t.home=true;t.dist=0;land()}else if(t.dist===0&&dice===6&&cur().filter(function(u){return u.start===t.start&&u.dist===0}).length>1){t.dist=0;t.dist=preSpawn(t)}else{t.dist+=dice;land()}}
function preSpawn(t){return 0}
function land(){if(!winner&&cellofcapture()){}if(turn===1)aiMove();afterTurn()}
function cellofcapture(){var arr=cur(),op=opp();for(var i=0;i<arr.length;i++){for(var j=0;j<op.length;j++){if(!arr[i].home&&!op[j].home&&(arr[i].start+arr[i].dist)%52===(op[j].start+op[j].dist)%52){op[j].dist=0;return true}}}return false}
function afterTurn(){if(cur().every(function(t){return t.home})){winner=turn===0?'You Win!':'AI Wins!';state='roll';return}if(dice===6){state='roll';draw();if(turn===1)setTimeout(aiRoll,700);return}turnSwitch();state='roll';draw();if(turn===1)setTimeout(aiRoll,700)}
function turnSwitch(){turn=turn===0?1:0}
function aiRoll(){if(winner)return;rolling=true;var tick=0;var iv=setInterval(function(){tick++;dice=Math.floor(Math.random()*6)+1;if(tick>=12){clearInterval(iv);dice=tick;resolve(dice)}},60)}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,W,H);var size=13*cellW;x.fillStyle='rgba(255,255,255,.03)';x.fillRect(ox,oy,size,size);x.strokeStyle='rgba(255,255,255,.15)';x.strokeRect(ox,oy,size,size);for(var i=0;i<52;i++){var p=posOf(i),al=activeAt(i);x.fillStyle=al.length?0:'rgba(255,255,255,.06)';x.fillStyle=al.length?'rgba(255,255,255,.1)':'rgba(255,255,255,.06)';x.fillRect(p.x,p.y,cellW-2,cellW-2);x.strokeStyle='rgba(255,255,255,.08)';x.strokeRect(p.x,p.y,cellW-2,cellW-2);activeAt(i).forEach(function(t,tk){var col=turn===0&&t.owner===0?'#e17a7a':t.owner===0?'#a33':'#6c5ce7';own=0;x.fillStyle=t.owner===0?'#e17a7a':'#6c5ce7';x.beginPath();x.arc(p.x+cellW/2,p.y+cellW/2,cellW*.18,0,Math.PI*2);x.fill();x.strokeStyle='rgba(0,0,0,.5)';x.stroke()})}x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('LUDO - You (red) vs AI (blue)',ox,oy-8);x.fillText(winner?winner:(state==='roll'?'Tap dice to roll':(state==='mov'||rolling?'Rolling...':'Tap a red token to move '+dice)),ox,oy-8+16+12);x.fillStyle='rgba(255,255,255,.5)';x.font='11px Arial';x.fillText('Red home: '+homeCount(0)+'  Blue home: '+homeCount(1),ox,oy+12*cellW+18);var dpos={x:ox+size-24,y:oy+size+28};x.fillStyle='#6c5ce7';x.beginPath();x.arc(dpos.x,dpos.y,20,0,Math.PI*2);x.fill();x.fillStyle='rgba(255,255,255,.25)';x.beginPath();x.arc(dpos.x,dpos.y,12,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.font='bold 16px Arial';x.textAlign='center';x.fillText(String(dice),dpos.x,dpos.y+6);x.textAlign='left'}
function own(){}
function activeAt(i){var out=[];p1.forEach(function(t){if(!t.home&&(t.start+t.dist)%52===i&&t.owner===0){t.owner=0;out.push(t)}});p2.forEach(function(t){if(!t.home&&(t.start+t.dist)%52===i){t.owner=1;out.push(t)}});return out}
function homeCount(owner){return (owner===0?p1:p2).filter(function(t){return t.home}).length}
c.addEventListener('pointerdown',function(e){e.preventDefault();var rect=c.getBoundingClientRect();var px=(e.clientX-rect.left)*(W/rect.width),py=(e.clientY-rect.top)*(H/rect.height);if(winner){newGame();return}var size=13*cellW,dpos={x:ox+size-24,y:oy+size+28};if(Math.abs(px-dpos.x)<24&&Math.abs(py-dpos.y)<24){if(state==='roll')rolle();else if(state==='sel'&&turn===0&&!rolling)pick(pickIdx(px,py));return}if(state==='sel'&&turn===0&&!rolling){var i=pickIdx(px,py);if(i>=0)pick(i)}});
(function loop(){requestAnimationFrame(loop);draw()})();
function stroken(){}
newGame();draw();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Ludo', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Ludo' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['ludo']
export default handler