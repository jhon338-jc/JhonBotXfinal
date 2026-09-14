import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var B,R=0,turn=1,won=false,over=false;
var cv=document.getElementById('game'),cx=cv.getContext('2d');
var CW=cv.width,CH=cv.height,COLS=7,ROWS=6;
var CW2=Math.floor(CW/COLS),CH2=Math.floor((CH-50)/ROWS),TOP=50;
function init(){B=[];for(var c=0;c<COLS;c++){B[c]=[];for(var r=0;r<ROWS;r++)B[c][r]=0}turn=1;won=false;over=false;R=0;draw()}
function draw(){cx.clearRect(0,0,CW,CH);cx.fillStyle='#1a1b4e';cx.fillRect(0,0,CW,CH);cx.fillStyle='#2d2e80';cx.fillRect(0,TOP,CW,CH-TOP);cx.strokeStyle='rgba(255,255,255,.15)';cx.lineWidth=2;for(var c=0;c<=COLS;c++){cx.beginPath();cx.moveTo(c*CW2,TOP);cx.lineTo(c*CW2,CH);cx.stroke()}for(var r=0;r<=ROWS;r++){cx.beginPath();cx.moveTo(0,TOP+r*CH2);cx.lineTo(CW,TOP+r*CH2);cx.stroke()}
var cols=[0,0,0,0,0,0,0];for(var c=0;c<COLS;c++)for(var r=0;r<ROWS;r++)if(B[c][r])cols[c]=Math.max(cols[c],B[c][r]);
for(var c=0;c<COLS;c++){var cl=cols[c]?c*CW2+CW2/2:-100;if(cl<-50)continue;cx.fillStyle='rgba(255,255,255,.4)';cx.beginPath();cx.arc(cl,24,12,0,Math.PI*2);cx.fill();cx.fillStyle=turn===1?'#e74c3c':'#f1c40f';cx.beginPath();cx.arc(cl,24,10,0,Math.PI*2);cx.fill()}
for(var c=0;c<COLS;c++)for(var r=0;r<ROWS;r++){var x=c*CW2+CW2/2,y=TOP+r*CH2+CH2/2;if(B[c][r]===1){cx.fillStyle='#e74c3c';cx.beginPath();cx.arc(x,y,Math.min(CW2,CH2)/2-6,0,Math.PI*2);cx.fill()}else if(B[c][r]===2){cx.fillStyle='#f1c40f';cx.beginPath();cx.arc(x,y,Math.min(CW2,CH2)/2-6,0,Math.PI*2);cx.fill()}}
if(over){cx.fillStyle='rgba(0,0,0,.5)';cx.fillRect(0,0,CW,CH);cx.fillStyle='#fff';cx.font='bold 20px Arial';cx.textAlign='center';cx.fillText(won?'Player '+won+' Wins!':'Draw!',CW/2,CH/2);cx.font='13px Arial';cx.fillText('Tap to play again',CW/2,CH/2+24);cx.textAlign='left'}}
function drop(c){if(over||c<0||c>=COLS)return false;for(var r=ROWS-1;r>=0;r--){if(!B[c][r]){B[c][r]=turn;R++;if(check(c,r,turn)){won=turn;over=true}else if(R>=COLS*ROWS)over=true;else turn=turn===1?2:1;draw();return true}}return false}
function check(c,r,p){var d=[[1,0],[0,1],[1,1],[1,-1]];for(var i=0;i<d.length;i++){var cnt=1;for(var s=1;s<4;s++){var nc=c+d[i][0]*s,nr=r+d[i][1]*s;if(nc>=0&&nc<COLS&&nr>=0&&nr<ROWS&&B[nc][nr]===p)cnt++;else break}for(var s=1;s<4;s++){var nc=c-d[i][0]*s,nr=r-d[i][1]*s;if(nc>=0&&nc<COLS&&nr>=0&&nr<ROWS&&B[nc][nr]===p)cnt++;else break}if(cnt>=4)return true}return false}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();return}var rect=cv.getBoundingClientRect();var x=(e.clientX-rect.left)/(rect.width/CW);var col=Math.floor(x/CW2);drop(col)});
init();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } })
    try {
        const html = shell({ title: 'Connect 4', tag: 'GAME', icon: '🔴', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Connect 4' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['connect4']
export default handler
