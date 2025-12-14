/* ===== Luces ===== */
const wire = document.getElementById("wire");
const colors = ["#ff4d4d", "#2ee59d", "#ffcf5a", "#7ad7ff"];
const bulbs = 25;

for (let i = 0; i < bulbs; i++) {
  const b = document.createElement("div");
  b.className = "bulb";
  b.style.left = (i * (100 / (bulbs - 1))) + "%";
  b.style.background = colors[i % colors.length];
  b.style.animationDelay = Math.random() + "s";
  wire.appendChild(b);
}

/* ===== Contador ===== */
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

function nextChristmas() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 11, 25);
  if (now > target) target = new Date(now.getFullYear() + 1, 11, 25);
  return target;
}

let target = nextChristmas();

function updateCountdown() {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return;

  const sec = Math.floor(diff / 1000);
  d.textContent = Math.floor(sec / 86400);
  h.textContent = Math.floor(sec % 86400 / 3600);
  m.textContent = Math.floor(sec % 3600 / 60);
  s.textContent = sec % 60;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ===== Toast ===== */
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

document.getElementById("btnSurprise").onclick = () =>
  showToast("🎄 Que esta Navidad te traiga paz y cero bugs");

/* ===== Modo noche ===== */
document.getElementById("btnNight").onclick = () =>
  document.body.classList.toggle("night");

/* ===== Nieve ===== */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let flakes = [];
let paused = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

for (let i = 0; i < 150; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    vy: Math.random() + 0.5
  });
}

function drawSnow() {
  if (paused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.vy;
    if (f.y > canvas.height) f.y = 0;
  });

  requestAnimationFrame(drawSnow);
}
drawSnow();

document.getElementById("btnSnow").onclick = () => {
  paused = !paused;
  if (!paused) drawSnow();
};
