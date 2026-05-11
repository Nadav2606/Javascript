const width = 20;
const hight = 20.5;

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

const snake = [3, 2, 1, 0];
let direction = "right";
let head = snake[0];
let interval;
let random;
let isGameOver = false;

const rBoundaries = [];
const lBoundaries = [];

for (let i = 1; i <= hight; i++) {
  rBoundaries.push(i * width - 1);
  lBoundaries.push((i - 1) * width);
}

function creatBoard() {
  for (let i = 0; i <= width * hight; i++) {
    const div = document.createElement("div");
    board.appendChild(div);
    div.innerHTML = i;
  }

  randPlaceFruit();
  color();
}

function color() {
  const divs = board.querySelectorAll("div");

  divs.forEach((div) => div.classList.remove("snake", "head"));

  snake.forEach((element) => divs[element].classList.add("snake"));
  divs[head].classList.add("head");
}

function autoMove() {
  clearInterval(interval);
  interval = setInterval(() => move(direction), 300);
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      move("up");
      break;

    case "ArrowRight":
      move("right");
      break;

    case "ArrowLeft":
      move("left");
      break;

    case "ArrowDown":
      move("down");
      break;
  }
});

function move(dir) {
  if (isGameOver) {
    return;
  }
  const divs = board.querySelectorAll("div");
  switch (dir) {
    case "up":
      if (direction === "down") return;
      head -= width;
      if (head < 0) return gameOver();
      if (!divs[head]) {
        gameOver();
      }

      break;

    case "right":
      if (direction === "left") return;
      head++;
      if (rBoundaries.includes(head)) return gameOver();
      head++;
      break;

    case "left":
      if (direction === "right") return;
      head--;
      if (lBoundaries.includes(head)) return gameOver();

      break;

    case "down":
      if (direction === "up") return;
      head += width;
      if (head < 0) return gameOver();
      if (!divs[head]) {
        gameOver();
      }

      break;
  }

  if (snake.includes(head)) {
    gameOver();
  }

  direction = dir;
  snake.unshift(head);
  if (random === head) {
    randPlaceFruit();
  } else {
    snake.pop();
  }
  color();
  autoMove();
}
function gameOver() {
  playSound("./audio/game-over.mp3");
  clearInterval(interval);
  isGameOver = true;
  document.getElementById("game-over-popup").classList.remove("hidden");
}

function randPlaceFruit() {
  random = Math.floor(Math.random() * width * hight);

  if (snake.includes(random)) {
    randPlaceFruit();
  } else {
    const divs = board.querySelectorAll("div");
    divs.forEach((div) => div.classList.remove("apple"));
    divs[random].classList.add("apple");
  }
}

function playSound(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.volume = 0.2;
  audio.play();
}

function resetGame(params) {
  location.reload();
  // setTimeout(() => {
  // }, 3000);
}
