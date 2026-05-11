const amount = 12;
const numbers = [];

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(6, 1fr)`;
for (let i = 1; i <= amount; i++) {
  numbers.push(i, i);
}

for (let i = 1; i <= amount * 2; i++) {
  const rand = Math.floor(Math.random() * numbers.length);
  const div = document.createElement("div");
  div.innerHTML = `<span>${numbers[rand]}</span>`;
  board.appendChild(div);
  numbers.splice(rand, 1);

  div.addEventListener("click", (event) => {
    const cardEvent = event.currentTarget;
    if (
      cardEvent.classList.contains("hidden") ||
      cardEvent.classList.contains("showing")
    ) {
      return;
    }

    if (board.querySelectorAll(".showing").length === 2) {
      return;
    }

    event.target.classList.add("showing");
    playSound("./sound/woosh.mp3");
    chackForMatch();
  });
}

function chackForMatch() {
  const cards = board.querySelectorAll(".showing");

  if (cards.length === 2) {
    const first = cards[0];
    const second = cards[1];

    if (first.textContent === second.textContent) {
      setTimeout(() => {
        first.classList.remove("showing");
        second.classList.remove("showing");

        first.classList.add("hidden");
        second.classList.add("hidden");
        playSound("./sound/success-1.mp3");
        celebration();
      }, 1500);
    } else {
      setTimeout(() => {
        first.classList.remove("showing");
        second.classList.remove("showing");
      }, 1500);
    }
  }
}

function playSound(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.volume = 0.2;
  audio.play();
}
//יצירת מופע  new JSConfetti()
function celebration(params) {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
}
