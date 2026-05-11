const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlay = false;
let interval;
function playAuto() {
  if (!isAutoPlay) {
    interval = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      clearInterval();
    }, 500);
    isAutoPlay = true;
  } else {
    clearInterval(interval);
    isAutoPlay = false;
  }
}

document.body.addEventListener(`keydown`, (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

document.querySelector(".js-rock").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".js-paper").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".js-scissors").addEventListener("click", () => {
  playGame("scissors");
});

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "you lose";
    } else if (computerMove === "scissors") {
      result = "you win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissors") {
      result = "you lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = "you win";
    } else if (computerMove === "scissors") {
      result = "tie";
    }
  }

  if (result === "you win") {
    score.wins += 1;
  } else if (result === "you lose") {
    score.losses += 1;
  } else if (result === "tie") {
    score.ties += 1;
  }

  console.log(score);

  localStorage.setItem("score", JSON.stringify(score));

  gameRest();

  document.querySelector(".js-picks").innerHTML = `
  You Picked
  <img class="pick" src="./images/${playerMove}-emoji.png"/>
  Computer Picked
  <img class="pick" src="./images/${computerMove}-emoji.png"/>`;

  document.querySelector(".js-result").innerHTML = result;
}

function gameRest() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses ${score.losses}, Ties: ${score.ties}`;
}
