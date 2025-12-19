const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let direction = "RIGHT";

let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 }
];

let food = randomFood();

document.addEventListener("keydown", keyControl);

function keyControl(e) {
  if (e.key === "ArrowUp") setDir("UP");
  if (e.key === "ArrowDown") setDir("DOWN");
  if (e.key === "ArrowLeft") setDir("LEFT");
  if (e.key === "ArrowRight") setDir("RIGHT");
}

function setDir(dir) {
  if (dir === "UP" && direction !== "DOWN") direction = "UP";
  if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
}

function drawSnake() {
  snake.forEach((part, index) => {
    ctx.beginPath();
    ctx.arc(
      part.x + box / 2,
      part.y + box / 2,
      box / 2 - 2,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = index === 0 ? "#00ff88" : "#009966";
    ctx.fill();
  });
}

function drawFood() {
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 3, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFood();
  drawSnake();

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // Game over conditions
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    snake.some((part, i) => i !== 0 && part.x === headX && part.y === headY)
  ) {
    alert("Game Over 🐍");
    location.reload();
  }

  if (headX === food.x && headY === food.y) {
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
}

setInterval(game, 120);