import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
var c=document.getElementById('game'),x=c.getContext('2d'),pw=90,ph=12,bx=280,by=300,bs=5,bvx=3,bvy=-4,br=6;
var px=235,py=340,lives=3,score=0,bricks=[],rows=5,cols=8,bw=62,bh=18,btop=40,gw=false,started=false,over=false;
var bw2=c.width/cols;
var cols2=['#e17a7a','#fdcb6e','#00b894','#6c5ce7','#74b9ff'];
function mkbricks(){bricks=[];for(var r=0;r<rows;r++)for(var col=0;col<cols;col++)bricks.push({x:col*bw2+2,y:r*bh+btop,w:bw2-4,h:bh-3,col:cols2[r],alive:true})}
function draw(){x.clearRect(0,0,c.width,c.height);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(10,0,c.width-20,2);
for(var i=0;i<bricks.length;i++){var b=bricks[i];if(!b.alive)continue;x.fillStyle=b.col;x.beginPath();x.roundRect(b.x,b.y,b.w,b.h,4);x.fill();x.strokeStyle='rgba(255,255,255,.2)';x.stroke()}
x.fillStyle='#a29bfe';x.beginPath();x.roundRect(px,py,pw,ph,6);x.fill();
var gd=x.createRadialGradient(bx,by,0,bx,by,br);gd.addColorStop(0,'#fff');gd.addColorStop(1,'#ddd');x.fillStyle=gd;x.beginPath();x.arc(bx,by,br,0,Math.PI*2);x.fill();
x.fillStyle='rgba(255,255,255,.7)';x.font='bold 11px Arial';x.fillText('LIVES '+lives+'  |  SCORE '+score,10,18);
if(!started){x.fillStyle='rgba(255,255,255,.5)';x.font='13px Arial';x.textAlign='center';x.fillText('Tap to launch',c.width/2,c.height/2+30);x.textAlign='left'}
if(over){x.fillStyle='rgba(15,15,25,.8)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font='bold 20px Arial';x.textAlign='center';x.fillText('GAME OVER - Score: '+score,c.width/2,c.height/2);x.font='13px Arial';x.fillText('Tap to restart',c.width/2,c.height/2+24);x.textAlign='left'}}
function loop(){if(over||!started){requestAnimationFrame(loop);return}
bx+=bvx;by+=bvy;
if(bx-br<=0){bx=br;bvx=Math.abs(bvx)}if(bx+br>=c.width){bx=c.width-br;bvx=-Math.abs(bvx)}
if(by-br<=0){by=br;bvy=Math.abs(bvy)}
if(by+br>=py&&bx>=px&&bx<=px+pw&&bvy>0){bvy=-Math.abs(bvy);var off=(bx-(px+pw/2))/(pw/2);bvx=off*4;if(Math.abs(bvx)<1)bvx=1;if(Math.abs(bvx)>6)bvx=6*bvx/Math.abs(bvx)}
if(by+br>c.height+20){lives--;if(lives<=0)over=true;bx=px+pw/2;by=300;bvx=3;bvy=-4;started=false}
for(var i=0;i<bricks.length;i++){var b=bricks[i];if(!b.alive)continue;if(bx+br>b.x&&bx-br<b.x+b.w&&by+br>b.y&&by-br<b.y+b.h){b.alive=false;bvy=-bvy;score+=10;var bc=1;for(var j=0;j<bricks.length;j++)if(bricks[j].alive)bc++;if(bc===0){mkbricks();bx=px+pw/2;by=300;bvx=3;bvy=-4;started=false}break}}
draw();requestAnimationFrame(loop)}
function reset(){over=false;started=false;bx=px+pw/2;by=300;bvx=3;bvy=-4;lives=3;score=0;mkbricks()}
function launch(){if(over){reset();return}if(!started){started=true;bvy=-Math.abs(bvy)}}
c.addEventListener('pointerdown',function(e){e.preventDefault();var r=c.getBoundingClientRect();var sx=c.width/r.width;px=(e.clientX-r.left)*sx-pw/2;launch()});
c.addEventListener('pointermove',function(e){if(over)return;var r=c.getBoundingClientRect();var sx=c.width/r.width;px=(e.clientX-r.left)*sx-pw/2;if(px<0)px=0;if(px+pw>c.width)px=c.width-pw});
document.addEventListener('keydown',function(e){if(e.code==='ArrowLeft'){px-=15;if(px<0)px=0}if(e.code==='ArrowRight'){px+=15;if(px+pw>c.width)px=c.width-pw}if(e.code==='Space'){e.preventDefault();launch()}});
mkbricks();loop();
`

let handler = async (m, { conn }) => {
    try {
        const html = shell({ title: 'Breakout', tag: 'GAME', icon: '', html: stage(560, 360), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Breakout' })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
    }
}

handler.command = ['breakout']
export default handler
