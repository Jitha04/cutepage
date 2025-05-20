const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y, size, speedY, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speedY = speedY;
  this.color = color;

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.font = `${this.size}px serif`;
    ctx.fillText('❤️', this.x, this.y);
  }

  this.update = function() {
    this.y -= this.speedY;
    if (this.y < -50) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initHearts() {
  for (let i = 0; i < 30; i++) {
    let size = 20 + Math.random() * 20;
    hearts.push(new Heart(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      size,
      0.5 + Math.random(),
      `hsl(${Math.random() * 360}, 80%, 70%)`
    ));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

initHearts();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const bubble = document.getElementById('bubble');
bubble.addEventListener('click', () => {
  bubble.classList.add('clicked');
  bubble.textContent = "I love you more! 💖";

  setTimeout(() => {
    bubble.classList.remove('clicked');
    bubble.textContent = "I love you! ❤️";
  }, 1500);
});
