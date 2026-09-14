import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),sz=Math.min(c.width/8,c.height/8),ox=(c.width-8*sz)/2,oy=(c.height-8*sz)/2;
var board=[],sel=null,turn='w',over2=false,stack=[];
function initB(){board=[];for(var i=0;i<8;i++){board[i]=[];for(var j=0;j<8;j++)board[i][j]=null}
var ord=['R','N','B','Q','K','B','N','R'];for(var i=0;i<8;i++){board[0][i]={t:ord[i],c:'b'};board[6][i]={t:ord[i],c:'w'};board[1][i]={t:'P',c:'b'};board[7][i]={t:ord[i],c:'w'};board[1][i]={t:'P',c:'b'}}
board[7][0]={t:'R',c:'w'};board[7][1]={t:'N',c:'w'};board[7][2]={t:'B',c:'w'};board[7][3]={t:'Q',c:'w'};board[7][4]={t:'K',c:'w'};board[7][5]={t:'B',c:'w'};board[7][6]={t:'N',c:'w'};board[7][7]={t:'R',c:'w'}
board[0][0]={t:'R',c:'b'};board[0][1]={t:'N',c:'b'};board[0][2]={t:'B',c:'b'};board[0][3]={t:'Q',c:'b'};board[0][4]={t:'K',c:'b'};board[0][5]={t:'B',c:'b'};board[0][6]={t:'N',c:'b'};board[0][7]={t:'R',c:'b'}
for(var i=0;i<8;i++){board[6][i]={t:ord[i],c:'w'};board[1][i]={t:'P',c:'b'}}}
var uni={K:String.fromCharCode(9812),Q:String.fromCharCode(9813),R:String.fromCharCode(9814),B:String.fromCharCode(9815),N:String.fromCharCode(9816),P:String.fromCharCode(9817),k:String.fromCharCode(9818),q:String.fromCharCode(9819),r:String.fromCharCode(9820),b:String.fromCharCode(9821),n:String.fromCharCode(9822),p:String.fromCharCode(9823)};
function gk(p){return p?(p.c==='w'?p.t.toUpperCase():p.t.toLowerCase()):null}
function draw(){x.clearRect(0,0,c.width,c.height);
for(var r=0;r<8;r++)for(var cl=0;cl<8;cl++){var isB=(r+cl)%2===0;x.fillStyle=isB?'rgba(255,255,255,.1)':'rgba(255,255,255,.04)';x.fillRect(ox+cl*sz,oy+r*sz,sz,sz);
var p=board[r][cl];if(p){var pc=p.c==='w'?'#fff':'#555';x.font='bold '+sz*0.7+'px Arial';x.fillStyle=pc;x.textAlign='center';x.textBaseline='middle';x.fillText(uni[gk(p)],ox+cl*sz+sz/2,oy+r*sz+sz/2)}
if(sel&&sel[0]===r&&sel[1]===cl){x.strokeStyle='#6c5ce7';x.lineWidth=3;x.strokeRect(ox+cl*sz+2,oy+r*sz+2,sz-4,sz-4)}}
var mv=getMoves(sel);if(mv)for(var i=0;i<mv.length;i++){x.fillStyle='rgba(108,92,231,.35)';x.beginPath();x.arc(ox+mv[i][1]*sz+sz/2,oy+mv[i][0]*sz+sz/2,sz*0.18,0,Math.PI*2);x.fill()}
x.fillStyle='rgba(255,255,255,.6)';x.font='bold 11px Arial';x.textAlign='left';x.textBaseline='top';x.fillText((turn==='w'?'WHITE':'BLACK')+(over2?' - GAME OVER':' - your turn'),ox,4)}
function getMoves(s){if(!s)return null;var p=board[s[0]][s[1]];if(!p)return null;var m=[],r=s[0],cl=s[1],c=p.c,t=p.t;
function ok(r2,c2){if(r2<0||r2>7||c2<0||c2>7)return false;var t2=board[r2][c2];return!t2||t2.c!==c}
function addIf(r2,c2){if(ok(r2,c2))m.push([r2,c2])}
function addLine(dr,dc){for(var i=1;i<8;i++){var nr=r+dr*i,nc=cl+dc*i;if(nr<0||nr>7||nc<0||nc>7)break;if(!board[nr][nc])m.push([nr,nc]);else{if(board[nr][nc].c!==c)m.push([nr,nc]);break}}}
var pt=c==='w'?-1:1;
if(t==='P'){if(ok(r+pt,cl)&&!board[r+pt][cl])m.push([r+pt,cl]);if((c==='w'&&r===6||c==='b'&&r===1)&&!board[r+pt][cl]&&!board[r+pt*2][cl])m.push([r+pt*2,cl]);if(ok(r+pt,cl+1)&&board[r+pt][cl+1])m.push([r+pt,cl+1]);if(ok(r+pt,cl-1)&&board[r+pt][cl-1])m.push([r+pt,cl-1])}
if(t==='N'){var nd=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];for(var i=0;i<nd.length;i++)addIf(r+nd[i][0],cl+nd[i][1])}
if(t==='R'||t==='Q'){addLine(0,1);addLine(0,-1);addLine(1,0);addLine(-1,0)}
if(t==='B'||t==='Q'){addLine(1,1);addLine(1,-1);addLine(-1,1);addLine(-1,-1)}
if(t==='K'){for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++)if(dr||dc)addIf(r+dr,cl+dc)}
return m}
function doMove(fr,fc,tr,tc){var cap=board[tr][tc];var pc=board[fr][fc];board[tr][tc]=pc;board[fr][fc]=null;
if(pc.t==='P'&&(tr===0||tr===7))board[tr][tc]={t:'Q',c:pc.c};
stack.push({fr:fr,fc:fc,tr:tr,tc:tc,cap:cap,piece:pc});
turn=turn==='w'?'b':'w';sel=null;var kc=turn==='w'?'K':'k';var found=false;for(var r=0;r<8;r++)for(var cl=0;cl<8;cl++){var p=board[r][cl];if(p&&gk(p)===kc)found=true}
if(!found)over2=true;draw()}
c.addEventListener('pointerdown',function(e){e.preventDefault();if(over2)return;var r2=c.getBoundingClientRect();var sx=c.width/r2.width,sy=c.height/r2.height;
var mx=(e.clientX-r2.left)*sx,my=(e.clientY-r2.top)*sy;var cl=Math.floor((mx-ox)/sz),r=Math.floor((my-oy)/sz);
if(cl<0||cl>7||r<0||r>7)return;if(sel){var mv=getMoves(sel);var valid=false;if(mv)for(var i=0;i<mv.length;i++)if(mv[i][0]===r&&mv[i][1]===cl)valid=true;
if(valid)doMove(sel[0],sel[1],r,cl);else{var p=board[r][cl];if(p&&p.c===turn)sel=[r,cl];else sel=null}}else{var p=board[r][cl];if(p&&p.c===turn)sel=[r,cl]}draw()});
initB();draw();
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '♟️', key: m.key } })
    try {
        const html = shell({ title: 'Chess', tag: 'GAME', icon: '♟️', html: stage(560, 560), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Chess' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['chess']
export default handler
