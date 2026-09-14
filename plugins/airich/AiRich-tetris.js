import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var COLS=10,ROWS=20,CS=Math.floor(c.width/COLS);
var board=[],piece,pieceX,pieceY,pieceR,dropT=0,dropI=500,score=0,level=1,lines=0,over=false,paused=false,started=false;
var SHAPES=[[[1,1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[1,1],[1,1]],[[0,1,1],[1,1,0]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,0]]];
var COLORS_A=['#00f0f0','#f0a000','#0000f0','#f0f000','#00f000','#a000f0','#f00000'];
var boardY=40;
for(var r=0;r<ROWS;r++){board[r]=[];for(var cc=0;cc<COLS;cc++)board[r][cc]=0}
function rot(shape){var n=shape.length,m=shape[0].length,r=[];for(var i=0;i<m;i++){r[i]=[];for(var j=0;j<n;j++)r[i][j]=shape[n-1-j][i]}return r}
function fits(shape,px,py){for(var r=0;r<shape.length;r++)for(var c=0;c<shape[r].length;c++){if(!shape[r][c])continue;var nx=px+c,ny=py+r;if(nx<0||nx>=COLS||ny>=ROWS)return false;if(ny>=0&&board[ny][nx])return false}return true}
function spawn(){piece=Math.floor(Math.random()*7);pieceX=Math.floor((COLS-4)/2);pieceY=-1;pieceR=0;if(!fits(shape(),pieceX,pieceY))over=true}
function shape(){var s=SHAPES[piece];for(var i=0;i<pieceR;i++)s=rot(s);return s}
function lock(){var s=shape();for(var r=0;r<s.length;r++)for(var c=0;c<s[r].length;c++){if(!s[r][c])continue;var ny=pieceY+r;if(ny>=0)board[ny][pieceX+c]=piece+1}clearLines();spawn()}
function clearLines(){var cleared=0;for(var r=ROWS-1;r>=0;r--){var full=true;for(var c=0;c<COLS;c++)if(!board[r][c]){full=false;break}if(full){board.splice(r,1);var row=[];for(var c=0;c<COLS;c++)row.push(0);board.unshift(row);cleared++;r++}}if(cleared){var pts=[0,100,300,500,800];score+=pts[cleared]*level;lines+=cleared;level=Math.floor(lines/10)+1;dropI=Math.max(50,500-level*40)}}
function ghost(){var gy=pieceY;while(fits(shape(),pieceX,gy+1))gy++;return gy}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,c.width,c.height);x.fillStyle='rgba(255,255,255,.04)';for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++){x.strokeStyle='rgba(255,255,255,.06)';x.strokeRect(cc*CS,boardY+r*CS,CS,CS)}for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++)if(board[r][cc]){x.fillStyle=COLORS_A[board[r][cc]-1];x.fillRect(cc*CS+1,boardY+r*CS+1,CS-2,CS-2)}if(!over&&started){var gg=ghost(),s=shape();x.globalAlpha=.3;for(var r=0;r<s.length;r++)for(var c=0;c<s[r].length;c++)if(s[r][c]){x.fillStyle=COLORS_A[piece];x.fillRect((pieceX+c)*CS+1,boardY+(gg+r)*CS+1,CS-2,CS-2)}x.globalAlpha=1;for(var r=0;r<s.length;r++)for(var c=0;c<s[r].length;c++)if(s[r][c]){x.fillStyle=COLORS_A[piece];x.fillRect((pieceX+c)*CS+1,boardY+(pieceY+r)*CS+1,CS-2,CS-2)}}x.fillStyle='rgba(255,255,255,.7)';x.font='bold 13px Arial';x.fillText('SCORE '+score+'  LVL '+level+'  LINES '+lines,8,22);if(!started&&!over){x.fillStyle='rgba(255,255,255,.85)';x.font='bold 20px Arial';x.textAlign='center';x.fillText('TETRIS',c.width/2,c.height/2-10);x.font='13px Arial';x.fillText('Tap or Space to Start',c.width/2,c.height/2+14);x.textAlign='left'}if(over){x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,boardY,c.width,c.height-boardY);x.fillStyle='#fff';x.font='bold 22px Arial';x.textAlign='center';x.fillText('GAME OVER',c.width/2,c.height/2-10);x.font='13px Arial';x.fillText('Tap to Restart',c.width/2,c.height/2+14);x.textAlign='left'}if(paused&&!over){x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,boardY,c.width,c.height-boardY);x.fillStyle='#fff';x.font='bold 18px Arial';x.textAlign='center';x.fillText('PAUSED',c.width/2,c.height/2);x.textAlign='left'}}
var lastT;function loop(t){if(!lastT)lastT=t;var dt=t-lastT;lastT=t;if(started&&!over&&!paused){dropT+=dt;if(dropT>=dropI){dropT=0;if(fits(shape(),pieceX,pieceY+1))pieceY++;else lock()}}draw();requestAnimationFrame(loop)}
function doStart(){if(over){for(var r=0;r<ROWS;r++)for(var cc=0;cc<COLS;cc++)board[r][cc]=0;score=0;level=1;lines=0;dropI=500;over=false}if(!started){started=true;spawn();requestAnimationFrame(loop)}}
function moveLR(dx){if(!started||over)return;var nx=pieceX+dx;if(fits(shape(),nx,pieceY))pieceX=nx}
function rotateP(){if(!started||over)return;var nr=(pieceR+1)%4;var s=SHAPES[piece];for(var i=0;i<nr;i++)s=rot(s);if(fits(s,pieceX,pieceY))pieceR=nr;else if(fits(s,pieceX-1,pieceY)){pieceR=nr;pieceX--}else if(fits(s,pieceX+1,pieceY)){pieceR=nr;pieceX++}else if(fits(s,pieceX-2,pieceY)){pieceR=nr;pieceX-=2}else if(fits(s,pieceX+2,pieceY)){pieceR=nr;pieceX+=2}}
function hardDrop(){if(!started||over)return;while(fits(shape(),pieceX,pieceY+1))pieceY++;lock()}
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();doStart();return}if(e.code==='KeyP'){paused=!paused;return}if(e.code==='ArrowLeft'){e.preventDefault();moveLR(-1)}if(e.code==='ArrowRight'){e.preventDefault();moveLR(1)}if(e.code==='ArrowUp'){e.preventDefault();rotateP()}if(e.code==='ArrowDown'){e.preventDefault();if(fits(shape(),pieceX,pieceY+1))pieceY++}if(e.code==='KeyZ'){e.preventDefault();hardDrop()}});
var tx;document.addEventListener('pointerdown',function(e){if(e.target===c){doStart();tx={x:e.clientX,y:e.clientY,t:Date.now()}}});
document.addEventListener('pointerup',function(e){if(!tx||e.target!==c)return;var dx=e.clientX-tx.x,dy=e.clientY-tx.y,dt=Date.now()-tx.t;tx=null;if(dt<200&&Math.abs(dx)<15&&Math.abs(dy)<15){doStart();return}if(Math.abs(dx)>Math.abs(dy)){moveLR(dx>0?1:-1)}else{if(dy>0)hardDrop();else rotateP()}});
draw();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Tetris', tag: 'GAME', icon: '', html: stage(560, 460), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Tetris' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['tetris']
export default handler
