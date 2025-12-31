// ================= BACKGROUND SWITCH =================
const backgrounds = ['file_000000005fec71f4bce8f49c9e1c62bf.png','file_0000000094c8720a8cdf77247033c208 (1).png']; // replace with your images
let currentBg = 0;
const bgDiv = document.querySelector('.background');

function switchBackground() {
  currentBg = (currentBg + 1) % backgrounds.length;
  bgDiv.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
}

// Switch every 2 minutes (120000 ms)
setInterval(switchBackground, 120000);

// ================= SNOW EFFECT =================
const canvas = document.createElement('canvas');
canvas.id = 'snow';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const mp = 100;
let particles = [];

for(let i=0; i<mp; i++){
  particles.push({x:Math.random()*W, y:Math.random()*H, r:Math.random()*4+1, d:Math.random()*mp});
}

let angle = 0;

function draw() {
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for(let p of particles){
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
  }
  ctx.fill();
  update();
}

function update() {
  angle += 0.01;
  for(let p of particles){
    p.y += Math.cos(angle + p.d) + 1 + p.r/2;
    p.x += Math.sin(angle) * 2;
    if(p.x > W+5 || p.x < 0 || p.y > H){
      p.x = Math.random()*W;
      p.y = -10;
    }
  }
}

setInterval(draw, 33);

window.addEventListener('resize', ()=>{
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});