export class UI {
  constructor() {
    this.nameScreen = document.getElementById("name-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.resultScreen = document.getElementById("result-screen");

    this.playerNameInput = document.getElementById("player-name-input");
    this.saveNameBtn = document.getElementById("save-name-btn");

    this.playerTitle = document.getElementById("player-title");
    this.playerScoreTitle = document.getElementById("player-score-title");

    this.playerPoints = document.getElementById("player-points");
    this.dealerPoints = document.getElementById("dealer-points");
    this.currentBet = document.getElementById("current-bet");

    this.bettingArea = document.getElementById("betting-area");
    this.betButtons = document.querySelectorAll(".chip");
    this.clearBetBtn = document.getElementById("clear-bet-btn");
    this.startRoundBtn = document.getElementById("start-round-btn");

    this.dealerCards = document.getElementById("dealer-cards");
    this.playerCards = document.getElementById("player-cards");
    this.dealerScore = document.getElementById("dealer-score");
    this.playerScore = document.getElementById("player-score");

    this.messageBox = document.getElementById("message-box");

    this.hitBtn = document.getElementById("hit-btn");
    this.standBtn = document.getElementById("stand-btn");
    this.doubleBtn = document.getElementById("double-btn");
    this.newGameBtn = document.getElementById("new-game-btn");

    this.soundToggleBtn = document.getElementById("sound-toggle-btn");
    this.musicToggleBtn = document.getElementById("music-toggle-btn");

    this.resultTitle = document.getElementById("result-title");
    this.resultText = document.getElementById("result-text");
    this.nextRoundBtn = document.getElementById("next-round-btn");
  }

  showGameScreen(playerName) {
    this.nameScreen.classList.remove("active");
    this.gameScreen.classList.add("active");
    this.playerTitle.textContent = playerName;
    this.playerScoreTitle.innerHTML = `${playerName} <span id="player-score">0</span>`;
    this.playerScore = document.getElementById("player-score");
  }

  updatePoints(playerPoints, dealerPoints, currentBet) {
    this.playerPoints.textContent = playerPoints;
    this.dealerPoints.textContent = dealerPoints;
    this.currentBet.textContent = currentBet;
    this.startRoundBtn.disabled = currentBet <= 0;
  }

  showBetting() {
    this.bettingArea.classList.remove("hidden");
  }

  hideBetting() {
    this.bettingArea.classList.add("hidden");
  }

  clearTable() {
    this.dealerCards.innerHTML = "";
    this.playerCards.innerHTML = "";
    this.dealerScore.textContent = "0";
    this.playerScore.textContent = "0";
  }

  renderHands(playerCards, dealerCards, playerScore, dealerScore, hideDealerSecondCard = false) {
    this.playerCards.innerHTML = "";
    this.dealerCards.innerHTML = "";

    dealerCards.forEach((card, index) => {
      if (hideDealerSecondCard && index === 1) {
        this.dealerCards.appendChild(this.createHiddenCard());
      } else {
        this.dealerCards.appendChild(this.createCardElement(card));
      }
    });

    playerCards.forEach((card) => {
      this.playerCards.appendChild(this.createCardElement(card));
    });

    this.playerScore.textContent = playerScore;
    this.dealerScore.textContent = hideDealerSecondCard ? "?" : dealerScore;
  }

  createCardElement(card) {
    const div = document.createElement("div");
    const isRed = card.suit === "♥" || card.suit === "♦";

    div.className = `card ${isRed ? "red" : "black"}`;
    div.innerHTML = `
      <div class="card-top">${card.value}${card.suit}</div>
      <div class="card-center">${card.suit}</div>
      <div class="card-bottom">${card.value}${card.suit}</div>
    `;

    return div;
  }

  createHiddenCard() {
    const div = document.createElement("div");
    div.className = "card hidden-card";
    div.textContent = "?";
    return div;
  }

  setMessage(message) {
    this.messageBox.textContent = message;
  }

  enableGameButtons(canDouble = true) {
    this.hitBtn.disabled = false;
    this.standBtn.disabled = false;
    this.doubleBtn.disabled = !canDouble;
  }

  disableGameButtons() {
    this.hitBtn.disabled = true;
    this.standBtn.disabled = true;
    this.doubleBtn.disabled = true;
  }

  enableBettingButtons() {
    this.betButtons.forEach((btn) => btn.disabled = false);
    this.clearBetBtn.disabled = false;
  }

  disableBettingButtons() {
    this.betButtons.forEach((btn) => btn.disabled = true);
    this.clearBetBtn.disabled = true;
    this.startRoundBtn.disabled = true;
  }

  showResultScreen(type, title, text, isFinal = false) {
    this.resultScreen.className = `result-screen active ${type}`;
    this.resultTitle.textContent = title;
    this.resultText.textContent = text;
    this.nextRoundBtn.textContent = isFinal ? "New Game" : "Next Round";
  }

  hideResultScreen() {
    this.resultScreen.className = "result-screen";
  }
}
