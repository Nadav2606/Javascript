import { API } from "./api.js";
import { UI } from "./UI.js";

const api = new API();

// SOUND

const backgroundMusic = new Audio("./sounds/backgroundMusic.mp3");
const startSound = new Audio("./sounds/hit.mp3");
const winSound = new Audio("./sounds/win.mp3");
const lossSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/tie.m4a");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

let soundEnabled = false;

// CLASSES

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCard(card) {
    this.hand.push(card);
  }

  clearHand() {
    this.hand = [];
  }

  getScore() {
    let score = 0;
    let aces = 0;

    for (const card of this.hand) {
      if (["J", "Q", "K"].includes(card.value)) {
        score += 10;
      } else if (card.value === "A") {
        score += 11;
        aces++;
      } else {
        score += Number(card.value);
      }
    }

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  }
}

class BlackjackGame {
  constructor() {
    this.deckId = null;

    this.player = new Player("Player");
    this.dealer = new Player("Dealer");

    this.isGameOver = true;
    this.resultMessage = "";

    this.stats = {
      wins: 0,
      losses: 0,
      draws: 0,
    };
  }

  saveData() {
    api.saveGame({
      playerName: this.player.name,
      stats: this.stats,
      soundEnabled,
    });
  }

  loadData() {
    const data = api.loadGame();

    if (!data) return;

    this.player.name = data.playerName || "Player";
    this.stats = data.stats || this.stats;
    soundEnabled = data.soundEnabled || false;
  }

  async startGame() {
    this.deckId = await api.createDeck();

    this.player.clearHand();
    this.dealer.clearHand();

    this.resultMessage = "";
    this.isGameOver = false;

    const playerCards = await api.drawCards(this.deckId, 2);
    const dealerCards = await api.drawCards(this.deckId, 2);

    playerCards.forEach((card) => this.player.addCard(card));
    dealerCards.forEach((card) => this.dealer.addCard(card));

    if (soundEnabled) {
      startSound.play();
    }

    this.checkAutomatic21();

    UI.render(this);
  }

  checkAutomatic21() {
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    if (playerScore === 21 && dealerScore === 21) {
      this.stats.draws++;
      this.resultMessage = "Double Blackjack! Tie";
      this.isGameOver = true;

      if (soundEnabled) {
        drawSound.play();
      }

      this.saveData();
      return true;
    }

    if (playerScore === 21) {
      this.stats.wins++;
      this.resultMessage = `${this.player.name} Got Blackjack! YOU Win!`;
      this.isGameOver = true;

      if (soundEnabled) {
        winSound.play();
      }

      this.saveData();
      return true;
    }

    if (dealerScore === 21) {
      this.stats.losses++;
      this.resultMessage = "Dealer got Blackjack! You Lose!";
      this.isGameOver = true;

      if (soundEnabled) {
        lossSound.play();
      }

      this.saveData();
      return true;
    }

    return false;
  }

  async hit() {
    if (this.isGameOver) return;

    const cards = await api.drawCards(this.deckId, 1);

    this.player.addCard(cards[0]);

    if (soundEnabled) {
      startSound.play();
    }

    if (this.player.getScore() === 21) {
      this.stats.wins++;
      this.resultMessage = `${this.player.name} Got Blackjack! YOU Win!`;
      this.isGameOver = true;

      if (soundEnabled) {
        winSound.play();
      }

      this.saveData();
      UI.render(this);
      return;
    }

    if (this.player.getScore() > 21) {
      this.finishGame();
    }

    UI.render(this);
  }

  async stand() {
    if (this.isGameOver) return;

    while (this.dealer.getScore() < 17) {
      const cards = await api.drawCards(this.deckId, 1);

      this.dealer.addCard(cards[0]);

      if (soundEnabled) {
        startSound.play();
      }

      if (this.dealer.getScore() === 21) {
        this.stats.losses++;
        this.resultMessage = "Dealer got Blackjack! You Lose!";
        this.isGameOver = true;

        if (soundEnabled) {
          lossSound.play();
        }

        this.saveData();
        UI.render(this);
        return;
      }
    }

    this.finishGame();

    UI.render(this);
  }

  finishGame() {
    this.isGameOver = true;

    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    if (playerScore > 21 || (dealerScore > playerScore && dealerScore <= 21)) {
      this.stats.losses++;
      this.resultMessage = "Dealer Wins!";

      if (soundEnabled) {
        lossSound.play();
      }
    } else if (dealerScore > 21 || playerScore > dealerScore) {
      this.stats.wins++;
      this.resultMessage = `${this.player.name} Wins!`;

      if (soundEnabled) {
        winSound.play();
      }
    } else {
      this.stats.draws++;
      this.resultMessage = "Draw!";

      if (soundEnabled) {
        drawSound.play();
      }
    }

    this.saveData();
  }

  resetScore() {
    this.stats = {
      wins: 0,
      losses: 0,
      draws: 0,
    };

    this.saveData();

    UI.render(this);
  }
}

// INIT

document.addEventListener("DOMContentLoaded", () => {
  const game = new BlackjackGame();

  game.loadData();

  UI.render(game);
  UI.updateSoundButton(soundEnabled);

  if (game.player.name !== "Player") {
    UI.showGameScreen(game.player.name);
  }

  document.getElementById("save-name-btn").addEventListener("click", () => {
    const input = document.getElementById("player-name-input");

    const name = input.value.trim() || "Player";

    game.player.name = name;

    game.saveData();

    UI.showGameScreen(name);

    UI.render(game);
  });

  document.getElementById("start-btn").addEventListener("click", async () => {
    await game.startGame();
  });

  document.getElementById("hit-btn").addEventListener("click", async () => {
    await game.hit();
  });

  document.getElementById("stand-btn").addEventListener("click", async () => {
    await game.stand();
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    game.resetScore();
  });

  document.getElementById("sound-toggle").addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }

    game.saveData();

    UI.updateSoundButton(soundEnabled);
  });

  window.game = game;
});
