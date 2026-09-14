import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var B,turn=1,sel=null,valid=[],cw,ch,bs,ox,oy,captR,captB,over=false;
var cv=document.getElementById('game'),cx=cv.getContext('2d');
cw=cv.width;ch=cv.height;bs=Math.floor(Math.min(cw,ch-40)/8);
ox=Math.floor((cw-bs*8)/2);oy=Math.floor((ch-bs*8)/2)+20;
function init(){B=[];for(var r=0;r<8;r++){B[r]=[];for(var c=0;c<8;c++){if(r<3)B[r][c]=(r+c)%2===1?2:0;else if(r>4)B[r][c]=(r+c)%2===1?1:0;else B[r][c]=0}}turn=1;sel=null;valid=[];captR=0;captB=0;over=false;draw()}
var DIRS=[[-1,-1],[-1,1],[1,-1],[1,1]];
function isRed(p){return p===1||p===3}
function isBlk(p){return p===2||p===4}
function isKing(p){return p===3||p===4}
function dirs(r,c){var p=B[r][c];if(isKing(p))return DIRS;return isRed(p)?[[-1,-1],[-1,1]]:[[1,-1],[1,1]]}
function getMoves(r,c){var moves=[],caps=[];dirs(r,c).forEach(function(d){var nr=r+d[0],nc=c+d[1];if(nr<0||nr>7||nc<0||nc>7)return;if(B[nr][nc]===0){moves.push({r:nr,c:nc,jump:false})}else{var ep=B[nr][nc],er=isRed(ep),eb=isBlk(ep),pr=isRed(B[r][c]);if((pr&&eb)||(!pr&&er)){var jr=nr+d[0],jc=nc+d[1];if(jr>=0&&jr<=7&&jc>=0&&jc<=7&&B[jr][jc]===0)caps.push({r:jr,c:jc,jump:true,cr:nr,cc:nc})}}});return caps.length?caps:moves}
function draw(){cx.clearRect(0,0,cw,ch);cx.fillStyle='#1a1b4e';cx.fillRect(0,0,cw,ch);for(var r=0;r<8;r++)for(var c=0;c<8;c++){cx.fillStyle=(r+c)%2===0?'#3a3b8a':'#292b6a';cx.fillRect(ox+c*bs,oy+r*bs,bs,bs)}
if(sel){cx.fillStyle='rgba(108,92,231,.35)';cx.fillRect(ox+sel.c*bs,oy+sel.r*bs,bs,bs);valid.forEach(function(mv){cx.fillStyle='rgba(76,175,80,.45)';cx.fillRect(ox+mv.c*bs,oy+mv.r*bs,bs,bs)})}
for(var r=0;r<8;r++)for(var c=0;c<8;c++){var p=B[r][c];if(!p)continue;var pxx=ox+c*bs+bs/2,pyy=oy+r*bs+bs/2,rd=bs/2-6;cx.fillStyle=isRed(p)?'#e74c3c':'#222';cx.beginPath();cx.arc(pxx,pyy,rd,0,Math.PI*2);cx.fill();cx.strokeStyle='rgba(255,255,255,.35)';cx.lineWidth=2;cx.stroke();if(isKing(p)){cx.fillStyle='#f1c40f';cx.beginPath();cx.arc(pxx,pyy,rd/2.6,0,Math.PI*2);cx.fill()}}
cx.fillStyle='rgba(255,255,255,.65)';cx.font='bold 13px Arial';cx.textAlign='center';cx.fillText((turn===1?'Red':'Black')+' Turn | Captured R:'+captB+' B:'+captR,cw/2,16);if(over){cx.fillStyle='rgba(0,0,0,.55)';cx.fillRect(0,0,cw,ch);cx.fillStyle='#fff';cx.font='bold 20px Arial';cx.fillText(captR>=12?'Red Wins!':'Black Wins!',cw/2,ch/2);cx.font='13px Arial';cx.fillText('Tap to restart',cw/2,ch/2+22)}cx.textAlign='left'}
function doMove(fr,fc,tr,tc,mv){var p=B[fr][fc];B[tr][tc]=p;B[fr][fc]=0;if(mv.jump){B[mv.cr][mv.cc]=0;if(isRed(p))captR++;else captB++}if(isRed(p)&&tr===0)B[tr][tc]=3;if(isBlk(p)&&tr===7)B[tr][tc]=4;
var again=false;if(mv.jump){var m2=getMoves(tr,tc);m2.forEach(function(m){if(m.jump)again=true})}if(again){sel={r:tr,c:tc};valid=getMoves(tr,tc);draw();return}sel=null;valid=[];if(captR>=12||captB>=12){over=true;draw();return}turn=turn===1?2:1;draw()}
cv.addEventListener('pointerdown',function(e){e.preventDefault();if(over){init();return}var rect=cv.getBoundingClientRect();var mx=(e.clientX-rect.left)/(rect.width/cw),my=(e.clientY-rect.top)/(rect.height/ch);var c=Math.floor((mx-ox)/bs),r=Math.floor((my-oy)/bs);if(c<0||c>7||r<0||r>7)return;
if(sel){var mv=null;valid.forEach(function(m){if(m.r===r&&m.c===c)mv=m});if(mv){doMove(sel.r,sel.c,r,c,mv);return}}
var p=B[r][c];if((turn===1&&isRed(p))||(turn===2&&isBlk(p))){sel={r:r,c:c};valid=getMoves(r,c);draw()}});
init();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Checkers', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Checkers' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['checkers']
export default handler