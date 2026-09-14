import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var board=[],solution=[],puzzle=[],selected=null,errors=0,completed=false,digits=false;
var wrap=document.querySelector('.wrap');
var info=document.createElement('div');info.style.cssText='display:flex;gap:8px;margin-bottom:8px;align-items:center;flex-wrap:wrap';
info.innerHTML='<span class="big">Errors: <span id="err" style="color:#e17a7a">0</span></span><button id="hintbtn" class="btn" style="background:#6c5ce7;font-size:11px">Hint</button><button id="checkbtn" class="btn" style="background:#27ae60;font-size:11px">Check</button><button id="newbtn" class="btn" style="background:#e17a7a;font-size:11px">New</button>';
wrap.appendChild(info);
var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(9,1fr);gap:1px;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);border-radius:8px;overflow:hidden;width:100%;aspect-ratio:1;max-width:400px;margin:0 auto';
wrap.appendChild(grid);
var dpad=document.createElement('div');dpad.style.cssText='display:flex;gap:4px;margin-top:10px;justify-content:center;flex-wrap:wrap';
wrap.appendChild(dpad);
function genSudoku(){var b=[];for(var i=0;i<9;i++){b[i]=[];for(var j=0;j<9;j++)b[i][j]=0}fillBoard(b);return b}
function fillBoard(b){for(var i=0;i<9;i++)for(var j=0;j<9;j++){if(b[i][j]===0){var nums=shuffle([1,2,3,4,5,6,7,8,9]);for(var n=0;n<nums.length;n++){if(isValid(b,i,j,nums[n])){b[i][j]=nums[n];if(fillBoard(b))return true;b[i][j]=0}}return false}}return true}
function isValid(b,r,c,n){for(var i=0;i<9;i++){if(b[r][i]===n||b[i][c]===n)return false}var br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;for(var i=br;i<br+3;i++)for(var j=bc;j<bc+3;j++)if(b[i][j]===n)return false;return true}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function makePuzzle(sol,rem){var p=[];for(var i=0;i<9;i++){p[i]=[];for(var j=0;j<9;j++)p[i][j]=sol[i][j]}var cells=[];for(var i=0;i<9;i++)for(var j=0;j<9;j++)cells.push([i,j]);shuffle(cells);var ct=0;for(var i=0;i<cells.length&&ct<rem;i++){var r=cells[i][0],c2=cells[i][1];p[r][c2]=0;ct++}return p}
function render(){grid.innerHTML='';for(var r=0;r<9;r++)for(var c=0;c<9;c++){var d=document.createElement('div');d.style.cssText='display:flex;align-items:center;justify-content:center;font-size:clamp(12px,3vw,18px);font-weight:bold;background:rgba(0,0,0,.25);aspect-ratio:1;cursor:pointer;color:'+(puzzle[r][c]!==0?(solution[r][c]===puzzle[r][c]?'#6c5ce7':'#e17a7a'):'rgba(255,255,255,.7)')+(r%3===0&&r!==0?';border-top:2px solid rgba(255,255,255,.25)':'')+(c%3===0&&c!==0?';border-left:2px solid rgba(255,255,255,.25)':'')+(selected&&selected[0]===r&&selected[1]===c?';background:rgba(108,92,231,.35)':'')+(puzzle[r][c]===0?'':'')+';transition:background .15s';d.textContent=puzzle[r][c]||'';d.dataset.r=r;d.dataset.c=c;d.addEventListener('click',cellClick);grid.appendChild(d)}}
function cellClick(e){var r=parseInt(e.target.dataset.r),c=parseInt(e.target.dataset.c);if(puzzle[r][c]!==0&&solution[r][c]===puzzle[r][c])return;selected=[r,c];digits=!digits;render()}
function numClick(n){if(!selected)return;var r=selected[0],c=selected[1];if(puzzle[r][c]!==0&&solution[r][c]===puzzle[r][c])return;puzzle[r][c]=n;if(n!==solution[r][c]&&n!==0)errors++;document.getElementById('err').textContent=errors;checkWin();render()}
function checkWin(){for(var r=0;r<9;r++)for(var c=0;c<9;c++)if(puzzle[r][c]!==solution[r][c])return;completed=true;setTimeout(function(){alert('Congratulations! Sudoku solved!')},100)}
function hint(){if(!selected)return;var r=selected[0],c=selected[1];puzzle[r][c]=solution[r][c];render()}
for(var n=1;n<=9;n++){var b=document.createElement('button');b.className='btn';b.style.cssText='background:rgba(255,255,255,.12);font-size:16px;width:36px;height:36px;padding:0';b.textContent=n;b.dataset.n=n;b.addEventListener('click',function(){numClick(parseInt(this.dataset.n))});dpad.appendChild(b)}
var eraser=document.createElement('button');eraser.className='btn';eraser.style.cssText='background:rgba(255,255,255,.12);font-size:14px;width:36px;height:36px;padding:0';eraser.textContent='X';eraser.addEventListener('click',function(){numClick(0)});dpad.appendChild(eraser);
document.getElementById('hintbtn').addEventListener('click',hint);
document.getElementById('checkbtn').addEventListener('click',function(){for(var r=0;r<9;r++)for(var c=0;c<9;c++){if(puzzle[r][c]===0||puzzle[r][c]===solution[r][c])continue}render()});
document.getElementById('newbtn').addEventListener('click',function(){init()});
function init(){solution=genSudoku();puzzle=makePuzzle(solution,40);selected=null;errors=0;completed=false;document.getElementById('err').textContent='0';render()}
init();
`
let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Sudoku', tag: 'GAME', icon: '9', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Sudoku' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}
handler.command = ['sudoku']
export default handler
