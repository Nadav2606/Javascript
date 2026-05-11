export class UI {
  constructor() {
    this.homeScreen = document.getElementById("homeScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.endScreen = document.getElementById("endScreen");
    this.playerSectionName = document.getElementById("playerSectionName");

    this.playerNameInput = document.getElementById("playerNameInput");
    this.startingPointsInput = document.getElementById("startingPointsInput");
    this.playerNameDisplay = document.getElementById("playerNameDisplay");

    this.playerPointsDisplay = document.getElementById("playerPointsDisplay");
    this.dealerPointsDisplay = document.getElementById("dealerPointsDisplay");
    this.currentBetDisplay = document.getElementById("currentBetDisplay");

    this.dealerCards = document.getElementById("dealerCards");
    this.playerCards = document.getElementById("playerCards");

    this.dealerScoreDisplay = document.getElementById("dealerScoreDisplay");
    this.playerScoreDisplay = document.getElementById("playerScoreDisplay");

    this.messageDisplay = document.getElementById("messageDisplay");

    this.startGameBtn = document.getElementById("startGameBtn");
    this.hitBtn = document.getElementById("hitBtn");
    this.standBtn = document.getElementById("standBtn");
    this.doubleBtn = document.getElementById("doubleBtn");
    this.newGameBtn = document.getElementById("newGameBtn");
    this.backHomeBtn = document.getElementById("backHomeBtn");
    this.soundBtn = document.getElementById("soundBtn");

    this.betButtons = document.querySelectorAll(".betBtn");

    this.endTitle = document.getElementById("endTitle");
    this.endText = document.getElementById("endText");
  }

  showGameScreen() {
    this.homeScreen.classList.add("hidden");
    this.endScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
  }

  showHomeScreen() {
    this.gameScreen.classList.add("hidden");
    this.endScreen.classList.add("hidden");
    this.homeScreen.classList.remove("hidden");
  }

  showEndScreen(title, text) {
    this.gameScreen.classList.add("hidden");
    this.homeScreen.classList.add("hidden");
    this.endScreen.classList.remove("hidden");

    this.endTitle.textContent = title;
    this.endText.textContent = text;
  }

  renderPoints(playerPoints, dealerPoints, currentBet) {
    this.playerPointsDisplay.textContent = playerPoints;
    this.dealerPointsDisplay.textContent = dealerPoints;
    this.currentBetDisplay.textContent = currentBet;
  }

  renderName(name) {
    this.playerNameDisplay.textContent = name;
    this.playerSectionName.textContent = name;
  }

  renderHands(playerHand, dealerHand, playerScore, dealerScore, options = {}) {
    const { hideDealerCard = false, hidePlayerSecondCard = false } = options;

    this.playerCards.innerHTML = "";
    this.dealerCards.innerHTML = "";

    playerHand.forEach((card, index) => {
      if (hidePlayerSecondCard && index === 1) {
        this.playerCards.appendChild(this.createBackCard());
      } else {
        this.playerCards.appendChild(this.createCardElement(card));
      }
    });

    dealerHand.forEach((card, index) => {
      if (hideDealerCard && index === 1) {
        this.dealerCards.appendChild(this.createBackCard());
      } else {
        this.dealerCards.appendChild(this.createCardElement(card));
      }
    });

    this.playerScoreDisplay.textContent = hidePlayerSecondCard
      ? "ניקוד: ?"
      : `ניקוד: ${playerScore}`;
    this.dealerScoreDisplay.textContent = hideDealerCard
      ? "ניקוד: ?"
      : `ניקוד: ${dealerScore}`;
  }

  createCardElement(card) {
    const div = document.createElement("div");
    const isRed = card.suit === "♥" || card.suit === "♦";

    div.className = `card ${isRed ? "red" : ""}`;

    div.innerHTML = `
      <span class="top">${card.value}${card.suit}</span>
      <span>${card.suit}</span>
      <span class="bottom">${card.value}${card.suit}</span>
    `;

    return div;
  }

  createBackCard() {
    const div = document.createElement("div");
    div.className = "card back";
    div.textContent = "★";
    return div;
  }

  setMessage(text) {
    this.messageDisplay.textContent = text;
  }

  setSoundButton(isOn) {
    this.soundBtn.textContent = isOn ? "🔊 Sound On" : "🔇 Sound Off";
  }

  enableBetting(enabled) {
    this.betButtons.forEach((btn) => (btn.disabled = !enabled));
  }

  enableActions({
    hit = false,
    stand = false,
    double = false,
    newGame = false,
  }) {
    this.hitBtn.disabled = !hit;
    this.standBtn.disabled = !stand;
    this.doubleBtn.disabled = !double;
    this.newGameBtn.disabled = !newGame;
  }
}
