import { DeckAPI } from "./api.js";
import { UI } from "./ui.js";

// Local project sounds - make sure these files exist inside a folder named sounds
const backgroundMusic = new Audio("./sounds/backgroundMusic.mp3");
const startSound = new Audio("./sounds/hit.mp3");
const winSound = new Audio("./sounds/win.mp3");
const lossSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/tie.m4a");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

startSound.volume = 0.55;
winSound.volume = 0.65;
lossSound.volume = 0.65;
drawSound.volume = 0.65;

let soundEnabled = false;

function playSound(sound) {
  if (!soundEnabled) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function updateBackgroundMusic() {
  if (soundEnabled) {
    backgroundMusic.play().catch(() => {});
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
}

class Player {
  constructor(name, points) {
    this.name = name;
    this.points = points;
    this.hand = [];
  }

  resetHand() {
    this.hand = [];
  }

  addCards(cards) {
    this.hand.push(...cards);
  }

  getScore() {
    let score = 0;
    let aces = 0;

    for (const card of this.hand) {
      if (["K", "Q", "J"].includes(card.value)) {
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
    this.ui = new UI();
    this.api = new DeckAPI();

    this.player = null;
    this.dealer = new Player("Dealer", 1000);
    this.currentBet = 0;
    this.roundActive = false;
    this.betWasPlaced = false;

    this.connectEvents();
    this.lockBeforeFirstRound();
    this.ui.setSoundButton(soundEnabled);
  }

  connectEvents() {
    this.ui.startGameBtn.addEventListener("click", () => this.startGame());

    this.ui.newGameBtn.addEventListener("click", () => this.startNewRound());

    this.ui.hitBtn.addEventListener("click", () => this.hit());

    this.ui.standBtn.addEventListener("click", () => this.stand());

    this.ui.doubleBtn.addEventListener("click", () => this.doubleBet());

    this.ui.backHomeBtn.addEventListener("click", () => this.backHome());

    this.ui.soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      this.ui.setSoundButton(soundEnabled);
      updateBackgroundMusic();
      playSound(startSound);
    });

    this.ui.betButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const amount = Number(btn.dataset.bet);
        this.placeBet(amount);
      });
    });
  }

  lockBeforeFirstRound() {
    this.ui.enableActions({
      hit: false,
      stand: false,
      double: false,
      newGame: true,
    });
    this.ui.enableBetting(false);
  }

  startGame() {
    const name = this.ui.playerNameInput.value.trim() || "Player";
    const startingPoints = Number(this.ui.startingPointsInput.value);

    this.player = new Player(name, startingPoints);
    this.dealer = new Player("Dealer", 1000);
    this.currentBet = 0;
    this.roundActive = false;
    this.betWasPlaced = false;

    playSound(startSound);

    this.ui.renderName(name);
    this.ui.renderPoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.renderHands([], [], 0, 0);
    this.ui.setMessage("For a new round press New-game");

    this.ui.showGameScreen();
    this.lockBeforeFirstRound();
  }

  async startNewRound() {
    if (this.player.points < 10) {
      this.endWholeGame("Busted! you Lost");
      return;
    }

    if (this.dealer.points <= 0) {
      this.endWholeGame("Dealer is Busted! you Won");
      return;
    }

    this.currentBet = 0;
    this.roundActive = false;
    this.betWasPlaced = false;

    this.player.resetHand();
    this.dealer.resetHand();

    await this.api.createDeck();

    this.player.addCards(await this.api.drawCards(2));
    this.dealer.addCards(await this.api.drawCards(2));

    playSound(startSound);

    this.ui.renderPoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      {
        hideDealerCard: true,
        hidePlayerSecondCard: true,
      },
    );

    this.ui.setMessage("Bets are Open");
    this.ui.enableBetting(true);
    this.ui.enableActions({
      hit: false,
      stand: false,
      double: false,
      newGame: false,
    });
  }

  placeBet(amount) {
    if (this.currentBet + amount > this.player.points) {
      this.ui.setMessage("Not enough points to bet");
      return;
    }

    this.currentBet += amount;
    this.betWasPlaced = true;
    playSound(startSound);

    this.ui.renderPoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );

    this.roundActive = true;

    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      {
        hideDealerCard: true,
        hidePlayerSecondCard: false,
      },
    );

    const playerScore = this.player.getScore();

    if (playerScore === 21) {
      this.finishRound("player");
      return;
    }

    this.ui.setMessage("Bets ON");
    this.ui.enableActions({
      hit: true,
      stand: true,
      double: this.player.points >= this.currentBet * 2,
      newGame: false,
    });
  }

  async hit() {
    if (!this.roundActive || !this.betWasPlaced) return;

    this.player.addCards(await this.api.drawCards(1));
    playSound(startSound);

    const playerScore = this.player.getScore();

    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      playerScore,
      this.dealer.getScore(),
      {
        hideDealerCard: true,
        hidePlayerSecondCard: false,
      },
    );

    if (playerScore === 21) {
      this.finishRound("player");
      return;
    }

    if (playerScore > 21) {
      this.finishRound("dealer");
      return;
    }

    this.ui.enableActions({
      hit: true,
      stand: true,
      double: false,
      newGame: false,
    });
  }

  async stand() {
    if (!this.roundActive || !this.betWasPlaced) return;

    while (this.dealer.getScore() < 17) {
      this.dealer.addCards(await this.api.drawCards(1));
      playSound(startSound);

      this.ui.renderHands(
        this.player.hand,
        this.dealer.hand,
        this.player.getScore(),
        this.dealer.getScore(),
        {
          hideDealerCard: false,
          hidePlayerSecondCard: false,
        },
      );

      await this.delay(450);
    }

    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    if (dealerScore > 21 || playerScore > dealerScore) {
      this.finishRound("player");
    } else if (dealerScore > playerScore) {
      this.finishRound("dealer");
    } else {
      this.finishRound("tie");
    }
  }

  async doubleBet() {
    if (!this.roundActive || !this.betWasPlaced) return;

    if (this.player.points < this.currentBet * 2) {
      this.ui.setMessage("not enough points for that move");
      return;
    }

    this.currentBet *= 2;
    playSound(startSound);

    this.ui.renderPoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );

    this.player.addCards(await this.api.drawCards(1));
    playSound(startSound);

    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      {
        hideDealerCard: true,
        hidePlayerSecondCard: false,
      },
    );

    if (this.player.getScore() > 21) {
      this.finishRound("dealer");
    } else {
      await this.stand();
    }
  }

  finishRound(result) {
    this.roundActive = false;
    this.betWasPlaced = false;

    this.ui.enableBetting(false);
    this.ui.enableActions({
      hit: false,
      stand: false,
      double: false,
      newGame: true,
    });

    if (result === "player") {
      this.player.points += this.currentBet;
      this.dealer.points -= this.currentBet;
      playSound(winSound);
      this.ui.setMessage("YOU WON! press New game for the next bet ");
    } else if (result === "dealer") {
      this.player.points -= this.currentBet;
      this.dealer.points += this.currentBet;
      playSound(lossSound);
      this.ui.setMessage("Dealer WON! Press New game for the next round");
    } else {
      playSound(drawSound);
      this.ui.setMessage("Drew! no wins press New game for the next round ");
    }

    this.ui.renderPoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      {
        hideDealerCard: false,
        hidePlayerSecondCard: false,
      },
    );

    this.checkWholeGameStatus();
  }

  checkWholeGameStatus() {
    if (this.dealer.points <= 0) {
      this.endWholeGame("The Dealer is bankrupt You WON champ🥇");
      return;
    }

    if (this.player.points < 10) {
      this.endWholeGame("You are bankrupt! GAME-OVER for you buddy");
    }
  }

  endWholeGame(title, text) {
    this.ui.showEndScreen(title, text);
  }

  backHome() {
    this.player = null;
    this.dealer = new Player("Dealer", 1000);
    this.currentBet = 0;
    this.roundActive = false;
    this.betWasPlaced = false;

    soundEnabled = false;
    updateBackgroundMusic();
    this.ui.setSoundButton(soundEnabled);

    this.ui.playerNameInput.value = "";
    this.ui.startingPointsInput.value = "500";
    this.ui.showHomeScreen();
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

new BlackjackGame();
