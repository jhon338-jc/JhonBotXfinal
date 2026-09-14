import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d');
var W=c.width,H=c.height;
var PATH=[],start=[],homeStart=[],cellW=24;
var p1=[],p2=[],turn=0,moved=0,dice=0,diceAnim=0,rolling=false,winner='',state='roll';
var colors2=['#e17a7a','#6c5ce7'];
function buildPath(){PATH=[];start=[];homeStart=[];for(var i=0;i<52;i++)PATH.push({x:0,y:0});for(var i=0;i<52;i++){var a=i%13;a--;var r=a;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;if(a<0)a=13;a--;}PATH[i]={x:0,y:0}}
function cellsX(i){return 14+i*cellW}
function wk(cell){var p=cell;var strides=[];
var segs=[[0,0],[6,0],[13,0]];return p}
function moveTokens(){}
function brd(){x.fillStyle=BK();x.fillRect(0,0,W,H)}
function BK(){return '#2d3436'}
function drawBoard(){cellW=Math.floor(Math.min(W/15,H/15/2)*2);var gx=18,gy=18;x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=2;var gridW=cellW*13;x.fillStyle='rgba(255,255,255,.03)';x.fillRect(gx,gy,gridW,gridW);x.strokeRect(gx,gy,gridW,gridW);for(var i=0;i<52;i++){var col=i%13,row=Math.floor(i/13);var cx=gx+col*cellW,cy=gy+row*cellW;var px=cx+cellW/2,py=cy+cellW/2;var active=[];for(var t=0;t<p1.length;t++)if(p1[t].pos===i)active.push(['#e17a7a','#a33',t]);for(var t=0;t<p2.length;t++)if(p2[t].pos===i)active.push(['#6c5ce7','#334',t]);x.fillStyle=active.length?'#0f1023':'rgba(255,255,255,.06)';x.fillRect(cx,cy,cellW-2,cellW-2);x.strokeStyle='rgba(255,255,255,.1)';x.strokeRect(cx,cy,cellW-2,cellW-2);active.forEach(function(a,t){var ang=(a[2])*Math.PI+Math.PI/2;var tx=px+Math.cos(ang)*cellW*.22+((t%2)*4-2),ty=py+Math.sin(ang)*cellW*.22+((t%2)*4-2);x.fillStyle=a[0];x.beginPath();x.arc(tx,ty,cellW*.16,0,Math.PI*2);x.fill();x.strokeStyle='rgba(0,0,0,.4)';x.stroke()})}}
function BFS(){}
function draw(){x.fillStyle='#0f1023';x.fillRect(0,0,W,H);drawBoard();var dStr=rolling?Math.floor(Math.random()*6)+1:dice;x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText(winner?winner:(state==='roll'?'Roll the dice!':'Move a token '+turnName()+' ('+dStr+')'),12,16);x.fillStyle=colors2[0];x.fillRect(12,26,7,7);x.font='11px Arial';x.fillText('You: '+movedP(p1)+' steps home   AI: '+movedP(p2),24,34);x.fillStyle='rgba(255,255,255,.5)';x.font='12px Arial';x.textAlign='center';var bx=W-60;x.fillStyle='#6c5ce7';x.beginPath();x.arc(bx,H/2,26,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.font='bold 24px Arial';x.fillText(String(dStr),bx,H/2+9);if(winner){x.fillStyle='rgba(0,0,0,.6)';x.fillRect(0,H/2-40,W,80);x.fillStyle='#fff';x.font='bold 20px Arial';x.fillText(winner,W/2,H/2);x.font='12px Arial';x.fillText('Tap to restart',W/2,H/2+22)}x.textAlign='left'}
function turnName(){return turn===0?'Your':'AI'}
function movedP(p){var s=0;for(var i=0;i<p.length;i++)if(p[i].home)s++;return s}
function roll(){if(state!=='roll'||winner)return;state='mov';rolling=true;var t=0;var iv=setInterval(function(){t++;diceAnim=Math.floor(Math.random()*6)+1;if(t>14){clearInterval(iv);rolling=false;dice=diceAnim;afterRoll()}},60)}
function afterRoll(){var legal=[],arr=turn===0?p1:p2;for(var i=0;i<arr.length;i++){var np=arr[i].pos+dice;var proceed=true;if(arr[i].home)continue;if(np>=51){for(var k=0;k<P2H();k++){if(np-(k*4)+1>=51){proceed=true}}np=127;if(arr[i].pos+dice===55){arr[i].home=true;np=-1}}if(proceed&&np!==127){legal.push(i);if(killCheck(i,np))legal.push(i)}}if(!legal.length){state='roll';turn=turn===0?1:0;if(dice===6)turn=turn===0?1:0;draw();setTimeout(function(){state='roll';if(turn===0)draw()},300);return}state='sel';draw()}
function P2H(){return 6}
function killCheck(i,np){if(np>51)return false;var a=turn===0?p1:p2,b=turn===0?p2:p1,v=i===0?np:np+0;for(var t=0;t<b.length;t++){if(!a[i].home&&!b[t].home&&b[t].pos===np&&!b[t].safe){b[t].pos=0;b[t].home=false;return true}}return false}
function drawTy(){}
function sel(i){if(state!=='sel'||winner)return;var arr=turn===0?p1:p2;var np=arr[i].pos+dice;if(np>=39+12&&!arr[i].home){np=arr[i].pos+dice-1;if(np>=51){arr[i].home=true;np=-1}}if(!arr[i].home&&arr[i].pos>=52){arr[i].home=true}wp(arr,i,np)}
function wp(arr,i,np){arr[i].last=np;arr[i].home=arr[i].home||np===-1;arr[i].pos=np<0?0:np;if(!arr[i].home)dx(arr,i);state='roll';if(dice===6){turn=turn;}else turn=turn===0?1:0;checkWin();draw()}
function dx(arr,i){var p=arr[i];if(p.pos>51)p.home=true;p.pos=Math.min(p.pos,50)}
function checkWin(){for(var i=0;i<p1.length;i++)if(!p1[i].home){if(turn===0){if(movedP(p1)>=4)winner='You Win!'}else if(movedP(p2)>=4)winner='AI Wins!'}}
function newGame(){p1=[];p2=[];for(var i=0;i<4;i++){p1.push({pos:0,home:false,safe:i===0});p2.push({pos:0,home:false,safe:i===0})}turn=0;state='roll';winner='';dice=0;rolling=false;draw()}
c.addEventListener('pointerdown',function(e){e.preventDefault();if(winner){newGame();return}if(state==='roll'){roll();return}if(state==='sel'&&turn===0){roll()}draw()});
(function loop(){draw();requestAnimationFrame(loop)})();
newGame();
`
let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🎲', key: m.key } })
    try {
        const html = shell({ title: 'Ludo', tag: 'GAME', icon: '🎲', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Ludo' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}
handler.command = ['ludo']
export default handler