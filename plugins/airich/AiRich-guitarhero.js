import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),cw=c.width,ch=c.height;
var lanes=4,lw=cw/lanes,hz=ch-60;
var notes=[],score=0,combo=0,maxc=0,over=false,started=false,tick=0,spawnRate=30,spawnCD=0;
var lcolors=['#e17a7a','#fdcb6e','#6c5ce7','#00b894'];
var lkeys=[String.fromCharCode(68),String.fromCharCode(70),String.fromCharCode(74),String.fromCharCode(75)];
var pressed=[false,false,false,false],flash=[0,0,0,0];
var noteh=18,notev=3;
function mkNote(){var li=Math.floor(Math.random()*lanes);notes.push({lane:li,y:-noteh,active:true})}
function hit2(li){var best=null,bd=999;for(var i=0;i<notes.length;i++){var n=notes[i];if(!n.active||n.lane!==li)continue;var d=Math.abs(n.y-hz);if(d<bd){bd=d;best=i}}
if(best!==null&&bd<35){notes[best].active=false;score+=10*(1+Math.floor(combo/10));combo++;flash[li]=8}else{combo=0}if(combo>maxc)maxc=combo}
function draw(){x.clearRect(0,0,cw,ch);
var gd=x.createLinearGradient(0,0,0,ch);gd.addColorStop(0,'#0f0f1e');gd.addColorStop(1,'#1a1a2e');x.fillStyle=gd;x.fillRect(0,0,cw,ch);
for(var i=0;i<lanes;i++){x.fillStyle='rgba(255,255,255,.03)';x.fillRect(i*lw,0,lw,ch);x.strokeStyle='rgba(255,255,255,.06)';x.beginPath();x.moveTo(i*lw,0);x.lineTo(i*lw,ch);x.stroke()}
x.fillStyle='rgba(255,255,255,.12)';x.fillRect(0,hz-4,cw,8);
for(var i=0;i<lanes;i++){var bx=i*lw+lw/2;if(flash[i]>0){x.fillStyle=lcolors[i];x.globalAlpha=flash[i]/8*0.5;x.beginPath();x.arc(bx,hz,22,0,Math.PI*2);x.fill();flash[i]--}x.globalAlpha=1;
x.fillStyle='rgba(255,255,255,.08)';x.beginPath();x.arc(bx,hz,16,0,Math.PI*2);x.fill();
x.strokeStyle='rgba(255,255,255,.3)';x.lineWidth=2;x.beginPath();x.arc(bx,hz,16,0,Math.PI*2);x.stroke();
x.fillStyle=pressed[i]?lcolors[i]:'rgba(255,255,255,.15)';x.font='bold 11px Arial';x.textAlign='center';x.fillText(lkeys[i],bx,hz+28);x.textAlign='left'}
for(var i=0;i<notes.length;i++){var n=notes[i];if(!n.active)continue;var ny=n.y,nx=n.lane*lw+lw/2;
var ng=x.createLinearGradient(nx-12,ny-4,nx-12,ny+noteh);ng.addColorStop(0,lcolors[n.lane]);ng.addColorStop(1,'rgba(255,255,255,.1)');x.fillStyle=ng;
x.beginPath();x.roundRect(nx-14,ny-2,28,noteh,6);x.fill();x.strokeStyle='rgba(255,255,255,.2)';x.stroke()}
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 11px Arial';x.fillText('SCORE '+score,10,18);x.fillText('COMBO x'+combo,cw/2,18);x.fillText('BEST '+maxc,cw-70,18);
if(combo>=10){x.fillStyle='rgba(108,92,231,.15)';x.font='bold 10px Arial';x.textAlign='center';x.fillText('FIRE! x'+combo,cw/2,ch/2);x.textAlign='left'}
if(!started){x.fillStyle='rgba(15,15,25,.5)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('GUITAR HERO',cw/2,ch/2-15);x.font='12px Arial';x.fillText('D F J K - hit notes!',cw/2,ch/2+5);x.fillText('Tap when note reaches line',cw/2,ch/2+22);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.7)';x.fillRect(0,0,cw,ch);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('GAME OVER',cw/2,ch/2-15);x.font='13px Arial';x.fillText('Score: '+score+' | Max Combo: '+maxc,cw/2,ch/2+5);x.fillText('Tap to restart',cw/2,ch/2+25);x.textAlign='left'}}
function loop(){if(!started||over){requestAnimationFrame(loop);return}
tick++;spawnCD--;if(spawnCD<=0){mkNote();spawnCD=Math.max(12,spawnRate-Math.floor(score/100))}
for(var i=0;i<notes.length;i++){notes[i].y+=notev}
for(var i=notes.length-1;i>=0;i--){if(notes[i].y>ch+20){if(notes[i].active){combo=0}notes.splice(i,1)}}
draw();requestAnimationFrame(loop)}
function tap(lane){if(over)return;if(!started){started=true;spawnCD=30;return}hit2(lane)}
function init2(){over=false;started=false;notes=[];score=0;combo=0;maxc=0;tick=0;spawnCD=0;flash=[0,0,0,0];pressed=[false,false,false,false];draw()}
c.addEventListener('pointerdown',function(e){e.preventDefault();var r=c.getBoundingClientRect();var sx=c.width/r.width;var px=(e.clientX-r.left)*sx;var li=Math.floor(px/lw);if(li>=0&&li<lanes){tap(li);pressed[li]=true}});
c.addEventListener('pointerup',function(){pressed=[false,false,false,false]});
document.addEventListener('keydown',function(e){var ki=lkeys.indexOf(String.fromCharCode(e.keyCode));if(ki>=0){tap(ki);pressed[ki]=true}});
document.addEventListener('keyup',function(e){var ki=lkeys.indexOf(String.fromCharCode(e.keyCode));if(ki>=0)pressed[ki]=false});
draw();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Guitar Hero', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Guitar Hero' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['guitarhero']
export default handler
