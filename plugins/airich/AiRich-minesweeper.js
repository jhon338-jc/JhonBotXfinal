import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var wrap=document.querySelector('.wrap');
var ROWS=9,COLS=9,MINES=10;
var board=[],revealed=[],flagged=[],over=false,won=false,flagMode=false,first=true,remaining;
var info=document.createElement('div');info.style.cssText='display:flex;gap:8px;margin-bottom:8px;align-items:center;flex-wrap:wrap';
info.innerHTML='<span class="big" id="msg">Minesweeper</span><span class="chip" id="mcount">Mines: 10</span><button id="flagbtn" class="btn" style="background:rgba(255,255,255,.15);font-size:11px">Flag: OFF</button><button id="newm" class="btn" style="background:#6c5ce7;font-size:11px">New Game</button>';
wrap.appendChild(info);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(9,1fr);gap:2px;width:100%;max-width:360px;margin:0 auto;background:rgba(255,255,255,.1);padding:4px;border-radius:8px;aspect-ratio:1';
wrap.appendChild(grid);
function init(){board=[];revealed=[];flagged=[];over=false;won=false;first=true;flagMode=false;document.getElementById('flagbtn').textContent='Flag: OFF';document.getElementById('mcount').textContent='Mines: 10';document.getElementById('msg').textContent='Minesweeper';for(var r=0;r<ROWS;r++){board[r]=[];revealed[r]=[];flagged[r]=[];for(var c=0;c<COLS;c++){board[r][c]=0;revealed[r][c]=false;flagged[r][c]=false}}remaining=ROWS*COLS-MINES;render()}
function placeMines(sr,sc){var placed=0,guard=0;while(placed<MINES&&guard<200){guard++;var r=Math.floor(Math.random()*ROWS),c=Math.floor(Math.random()*COLS);if(board[r][c]===-1)continue;if(Math.abs(r-sr)<=1&&Math.abs(c-sc)<=1)continue;board[r][c]=-1;placed++}for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){if(board[r][c]===-1)continue;var n=0;for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){var nr=r+dr,nc=c+dc;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&board[nr][nc]===-1)n++}board[r][c]=n}}
function reveal(r,c){if(r<0||r>=ROWS||c<0||c>=COLS)return;if(revealed[r][c]||flagged[r][c])return;revealed[r][c]=true;remaining--;if(board[r][c]===-1){over=true;loser();return}if(board[r][c]===0){for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++)reveal(r+dr,c+dc)}}function flood(){}
function revealAll(){for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++)revealed[r][c]=true}
function loser(){document.getElementById('msg').textContent='Boom! You hit a mine';revealAll();render();setTimeout(function(){var v=confirm('Game Over! Play again?');if(v)init()},200)}
function render(){grid.innerHTML='';document.getElementById('mcount').textContent='Mines: '+(MINES-Object.keys(flagged).filter(function(k){return flagged[parseInt(k.split(',')[0])][parseInt(k.split(',')[1])]}).length);for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;justify-content:center;aspect-ratio:1;font-size:14px;font-weight:bold;border-radius:3px;cursor:pointer;background:rgba(255,255,255,'+(revealed[r][c]?0.1:0.06)+');border:'+(revealed[r][c]?'1px solid rgba(255,255,255,.08)':'1px solid rgba(255,255,255,.15)');if(revealed[r][c]){if(board[r][c]===-1){d.textContent='\\u{1F4A3}';d.style.background='rgba(225,122,122,.4)'}else if(board[r][c]>0){d.textContent=board[r][c];d.style.color=el('#0af')}else{d.textContent=''}}else if(flagged[r][c]){d.textContent='\\u{1F6A9}';d.style.color='#f66'}d.dataset.r=r;d.dataset.c=c;d.addEventListener('click',function(e){var r2=parseInt(e.target.dataset.r),c2=parseInt(e.target.dataset.c);if(over||won)return;if(flagMode){flagged[r2][c2]=!flagged[r2][c2]}else{if(first){placeMines(r2,c2);first=false;remaining--;if(board[r2][c2]!==-1)reveal(r2,c2)}else{reveal(r2,c2)}if(remaining<=0&&!over){won=true;document.getElementById('msg').textContent='You Win!';render();return}}render()});grid.appendChild(d)}document.getElementById('flagbtn').style.background=flagMode?'#e17a7a':'rgba(255,255,255,.15)'}
function el(c){return c}
document.getElementById('flagbtn').addEventListener('click',function(){flagMode=!flagMode;document.getElementById('flagbtn').textContent=flagMode?'Flag: ON':'Flag: OFF';render()});
document.getElementById('newm').addEventListener('click',function(){init()});
init();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Minesweeper', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Minesweeper' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['minesweeper']
export default handler