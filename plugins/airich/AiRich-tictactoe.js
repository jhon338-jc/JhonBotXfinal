import { sendAiRich, shell } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var board=[' ',' ',' ',' ',' ',' ',' ',' ',' '],turn='X',over=false,winner='';
var ui=document.getElementById('ttui');if(!ui){ui=document.createElement('div');ui.id='ttui';ui.style.cssText='text-align:center';document.querySelector('.wrap').appendChild(ui)}
function render(){var h='<div id="ttstatus" style="margin-bottom:10px;font-size:14px;color:'+(over?(winner?'#00b894':'rgba(255,255,255,.5)'):'rgba(255,255,255,.7)')+';font-weight:bold">'+(over?(winner?(winner==='X'?'YOU WIN!':'AI WINS!'):'DRAW!'):'Your turn (X)')+'</div>';
h+='<div style="display:inline-grid;grid-template-columns:repeat(3,80px);gap:6px">';
for(var i=0;i<9;i++){h+='<div class="ttc" data-i="'+i+'" style="width:80px;height:80px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;cursor:'+(board[i]===' '&&!over?'pointer':'default')+';color:'+(board[i]==='X'?'#6c5ce7':board[i]==='O'?'#e17055':'rgba(255,255,255,.2)')+'">'+(board[i]===' '?' ':board[i])+'</div>'}
h+='</div>';h+='<button id="ttr" style="margin-top:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:8px 20px;color:#fff;font-size:12px;cursor:pointer">RESET</button>';ui.innerHTML=h;
var cells=document.querySelectorAll('.ttc');for(var i=0;i<cells.length;i++){cells[i].onclick=function(){play(parseInt(this.getAttribute('data-i')))}}
document.getElementById('ttr').onclick=function(){board=[' ',' ',' ',' ',' ',' ',' ',' ',' '];turn='X';over=false;winner='';render()}}
function win(b,p){var w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(var i=0;i<w.length;i++){if(b[w[i][0]]===p&&b[w[i][1]]===p&&b[w[i][2]]===p)return true}return false}
function empty(){var e=[];for(var i=0;i<9;i++)if(board[i]===' ')e.push(i);return e}
function play(i){if(board[i]!==' '||over||turn!=='X')return;board[i]='X';
if(win(board,'X')){over=true;winner='X';render();return}if(empty().length===0){over=true;render();return}
turn='O';render();setTimeout(aiMove,400)}
function aiMove(){if(over)return;var e=empty();if(!e.length)return;
for(var i=0;i<e.length;i++){var b2=board.slice();b2[e[i]]='O';if(win(b2,'O')){board[e[i]]='O';if(win(board,'O')){over=true;winner='O'}turn='X';render();return}}
for(var i=0;i<e.length;i++){var b2=board.slice();b2[e[i]]='X';if(win(b2,'X')){board[e[i]]='O';turn='X';render();return}}
if(board[4]===' '){board[4]='O';turn='X';render();return}
var corners=[0,2,6,8].filter(function(c){return board[c]===' '});
if(corners.length){board[corners[Math.floor(Math.random()*corners.length)]]='O';turn='X';render();return}
board[e[Math.floor(Math.random()*e.length)]]='O';
if(win(board,'O')){over=true;winner='O'}turn='X';render()}
render();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Tic-Tac-Toe', tag: 'GAME', icon: '', html: '', script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Tic-Tac-Toe' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['tictactoe']
export default handler
