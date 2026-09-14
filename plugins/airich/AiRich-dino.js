import { sendAiRich, shell, stage } from '../../lib/airich.js'
import { log, COLORS } from '../../lib/rgb.js'

const GAME_JS = `
const s=document.createElement('style');s.textContent='.overlay{position:absolute;inset:0;background:rgba(15,15,25,.6);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font:bold 22px Arial;border-radius:12px}.ms{font-size:13px;color:#ddd;margin-top:8px;font-weight:normal}';document.head.appendChild(s);
const box=document.createElement('div');box.style.cssText='position:relative';
document.querySelector('.wrap').appendChild(box);box.appendChild(document.getElementById('game'));
const ov=document.createElement('div');ov.className='overlay';ov.innerHTML='<div>DINO RUNNER</div><div class="ms">Tap / Space untuk lompat</div>';box.appendChild(ov);
const c=document.getElementById('game'),x=c.getContext('2d');
const GY=170;let d,o,clouds,particles,speed,score,best=0,gameOver,playing=false,last,runT,spawnTimer,milestone;
function reset(){d={x:55,y:132,w:27,h:30,vy:0,jumping:false};o=[];clouds=[{x:120,y:32,w:44,s:.35},{x:300,y:52,w:60,s:.22},{x:460,y:26,w:36,s:.4}];particles=[];score=0;speed=5;gameOver=false;runT=0;spawnTimer=80}
function burst(px,py,n,col,spd){for(let i=0;i<n;i++)particles.push({x:px,y:py,vx:(Math.random()-.5)*spd,vy:-Math.random()*spd,life:1,col,size:2+Math.random()*2})}
function jump(){if(!playing){playing=true;ov.remove();reset();requestAnimationFrame(loop);return}if(gameOver){gameOver=false;reset();return}if(!d.jumping){d.jumping=true;d.vy=-13}}
function cactus(){let h=24+Math.random()*24;o.push({x:c.width+20,y:GY-h,w:15+Math.random()*5,h});if(Math.random()<.2)o.push({x:c.width+50,y:GY-(20+Math.random()*18),w:15,h:20+Math.random()*18})}
function hit(a,b){return a.x+4<b.x+b.w&&a.x+a.w-4>b.x&&a.y+4<b.y+b.h&&a.y+a.h>b.y}
function draw(){x.clearRect(0,0,c.width,c.height);x.fillStyle='rgba(255,255,255,.35)';clouds.forEach(q=>x.fillRect(q.x,q.y,q.w,5));x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=2;x.setLineDash([10,8]);x.lineDashOffset=-runT*speed*.6;x.beginPath();x.moveTo(0,GY);x.lineTo(c.width,GY);x.stroke();x.setLineDash([]);x.fillStyle='#eaeaea';x.fillRect(d.x,d.y,27,30);x.fillRect(d.x+22,d.y+5,13,18);x.fillStyle='#6c5ce7';x.fillRect(d.x+29,d.y+8,4,4);x.fillStyle='#eaeaea';x.fillRect(d.x+5,d.y+30,6,d.jumping?0:8);x.fillRect(d.x+20,d.y+30,6,d.jumping?0:8);o.forEach(q=>{x.fillStyle='#e17a7a';x.fillRect(q.x,q.y,q.w,q.h);x.fillRect(q.x-6,q.y+8,6,5);x.fillRect(q.x+q.w,q.y+12,6,5)});particles.forEach(p=>{x.fillStyle='rgba('+p.col+','+Math.max(p.life,0)+')';x.fillRect(p.x,p.y,p.size,p.size)});x.fillStyle='rgba(255,255,255,.7)';x.font='bold 12px Arial';x.fillText('SCORE '+String(Math.floor(score)).padStart(5,'0'),c.width-110,20);x.fillText('BEST '+String(Math.floor(best)).padStart(5,'0'),c.width-110,34)}
function loop(t){if(!last)last=t;let dt=Math.min((t-last)/16.67,2);last=t;runT+=dt;if(!gameOver){d.y+=d.vy*dt;d.vy+=.75*dt;if(d.y>=132){d.y=132;d.vy=0;d.jumping=false}spawnTimer-=dt;if(spawnTimer<=0){cactus();spawnTimer=Math.max(38,62-speed*1.4)+Math.random()*30}o.forEach(q=>q.x-=speed*dt);o=o.filter(q=>q.x>-40);clouds.forEach(q=>{q.x-=q.s*dt;if(q.x<-80)q.x=c.width+Math.random()*100});particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.3*dt;p.life-=.03*dt});particles=particles.filter(p=>p.life>0);speed=Math.min(11,speed+.0018*dt);score+=dt*.6;if(score>best)best=score;for(const q of o)if(hit(d,q)){gameOver=true;burst(d.x+13,d.y+15,18,'255,90,90',5)}}draw();requestAnimationFrame(loop)}
document.addEventListener('pointerdown',e=>{e.preventDefault();jump()});
document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();jump()}});
`

let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🦖', key: m.key } })
    try {
        const html = shell({ title: 'Dino Runner', tag: 'GAME', icon: '🦖', html: stage(560, 200), script: GAME_JS })
        await sendAiRich(conn, m.chat, html, { title: 'Dino Runner' })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        console.error(log('AIRICH', e?.message || e, COLORS.error))
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}

handler.command = ['dino', 'dinorun', 'dinorunner']
export default handler