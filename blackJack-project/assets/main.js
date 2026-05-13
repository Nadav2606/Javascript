import { DeckApi } from "./api.js";
import { UI } from "./ui.js";

class Player {
  constructor(name, points = 1000) {
    this.name = name;
    this.points = points;
    this.hand = [];
  }

  addCard(card) {
    this.hand.push(card);
  }

  resetHand() {
    this.hand = [];
  }

  getScore() {
    let score = 0;
    let aces = 0;

    this.hand.forEach((card) => {
      if (["K", "Q", "J"].includes(card.value)) {
        score += 10;
      } else if (card.value === "A") {
        score += 11;
        aces++;
      } else {
        score += Number(card.value);
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  }
}

class SoundManager {
  constructor() {
    this.soundEnabled = false;
    this.musicEnabled = false;

    this.backgroundMusic = new Audio("./sounds/backgroundMusic.mp3");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.35;

    this.sounds = {
      card: new Audio("./sounds/hit.mp3"),
      win: new Audio("./sounds/win.mp3"),
      lose: new Audio("./sounds/lose.mp3"),
      draw: new Audio("./sounds/draw.m4a"),
      blackjack: new Audio("./sounds/win.mp3"),
    };
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;

    if (this.musicEnabled) {
      this.backgroundMusic.play().catch(() => {});
    } else {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }

    return this.musicEnabled;
  }

  play(name) {
    if (!this.soundEnabled || !this.sounds[name]) return;

    this.sounds[name].currentTime = 0;
    this.sounds[name].play().catch(() => {});
  }
}

class BlackjackGame {
  constructor() {
    this.api = new DeckApi();
    this.ui = new UI();
    this.sound = new SoundManager();

    this.player = null;
    this.dealer = new Player("Dealer", 1000);

    this.currentBet = 0;
    this.roundActive = false;
    this.finalGameOver = false;

    this.bindEvents();
  }

  bindEvents() {
    this.ui.saveNameBtn.addEventListener("click", () => this.startGame());

    this.ui.playerNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") this.startGame();
    });

    this.ui.betButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.addBet(Number(button.dataset.bet)),
      );
    });

    this.ui.clearBetBtn.addEventListener("click", () => this.clearBet());
    this.ui.startRoundBtn.addEventListener("click", () => this.startRound());

    this.ui.hitBtn.addEventListener("click", () => this.hit());
    this.ui.standBtn.addEventListener("click", () => this.stand());
    this.ui.doubleBtn.addEventListener("click", () => this.doubleBet());

    this.ui.newGameBtn.addEventListener("click", () => this.resetGame());

    this.ui.soundToggleBtn.addEventListener("click", () => {
      const isOn = this.sound.toggleSound();
      this.ui.soundToggleBtn.textContent = isOn ? "Sound ON" : "Sound OFF";
    });

    this.ui.musicToggleBtn.addEventListener("click", () => {
      const isOn = this.sound.toggleMusic();
      this.ui.musicToggleBtn.textContent = isOn ? "Music ON" : "Music OFF";
    });

    this.ui.nextRoundBtn.addEventListener("click", () => {
      this.ui.hideResultScreen();

      if (this.finalGameOver) {
        this.resetGame();
      } else {
        this.prepareNextRound();
      }
    });
  }

  async startGame() {
    const playerName = this.ui.playerNameInput.value.trim() || "Player";

    this.player = new Player(playerName, 1000);
    this.dealer = new Player("Dealer", 1000);
    this.currentBet = 0;
    this.roundActive = false;
    this.finalGameOver = false;

    await this.api.createDeck();

    this.ui.showGameScreen(playerName);
    this.ui.clearTable();
    this.ui.showBetting();
    this.ui.enableBettingButtons();
    this.ui.disableGameButtons();
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.setMessage("Bets on");
  }

  addBet(amount) {
    if (this.roundActive) return;

    if (this.player.points < amount) {
      this.ui.setMessage("Not enough points");
      return;
    }

    this.player.points -= amount;
    this.currentBet += amount;
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.setMessage("Press Start Round when ready");
  }

  clearBet() {
    if (this.roundActive) return;

    this.player.points += this.currentBet;
    this.currentBet = 0;
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.setMessage("Bets OFF");
  }

  async startRound() {
    if (this.roundActive || this.currentBet <= 0) return;

    this.roundActive = true;
    this.ui.hideBetting();
    this.ui.disableBettingButtons();

    this.player.resetHand();
    this.dealer.resetHand();
    this.ui.clearTable();
    this.ui.setMessage("Dealing cards...");

    const cards = await this.api.drawCards(4);

    this.player.addCard(cards[0]);
    this.sound.play("card");
    this.renderHiddenDealer();
    await this.wait(300);

    this.dealer.addCard(cards[1]);
    this.sound.play("card");
    this.renderHiddenDealer();
    await this.wait(300);

    this.player.addCard(cards[2]);
    this.sound.play("card");
    this.renderHiddenDealer();
    await this.wait(300);

    this.dealer.addCard(cards[3]);
    this.sound.play("card");
    this.renderHiddenDealer();

    // ניצחון אוטומטי בקבלת 21 בשני הקלפים הראשונים
    if (this.player.getScore() === 21) {
      this.ui.disableGameButtons();
      this.ui.setMessage("BlackJack Win");
      this.sound.play("blackjack");

      setTimeout(() => {
        this.finishRound("blackjack");
      }, 1500);

      return;
    }

    const canDouble = this.player.points >= this.currentBet;
    this.ui.enableGameButtons(canDouble);
    this.ui.setMessage("Hit, Stand or x2");
  }

  async hit() {
    if (!this.roundActive) return;

    this.ui.doubleBtn.disabled = true;

    const [card] = await this.api.drawCards(1);
    this.player.addCard(card);
    this.sound.play("card");
    this.renderHiddenDealer();

    if (this.player.getScore() === 21) {
      this.ui.disableGameButtons();
      this.ui.setMessage("BlackJack Win");
      this.sound.play("blackjack");

      setTimeout(() => {
        this.finishRound("blackjack");
      }, 1500);

      return;
    }

    if (this.player.getScore() > 21) {
      this.ui.disableGameButtons();
      this.ui.setMessage("Bust");
      setTimeout(() => this.finishRound("lose"), 1500);
    }
  }

  async stand() {
    if (!this.roundActive) return;

    this.ui.disableGameButtons();
    this.ui.setMessage("Dealer turn...");

    await this.dealerTurn();

    const result = this.getRoundResult();
    setTimeout(() => this.finishRound(result), 1600);
  }

  async doubleBet() {
    if (!this.roundActive) return;

    if (this.player.points < this.currentBet) {
      this.ui.setMessage("Not enough points to double");
      return;
    }

    this.player.points -= this.currentBet;
    this.currentBet *= 2;
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );

    this.ui.disableGameButtons();
    this.ui.setMessage("Double bet. One card only.");

    const [card] = await this.api.drawCards(1);
    this.player.addCard(card);
    this.sound.play("card");
    this.renderHiddenDealer();

    if (this.player.getScore() === 21) {
      this.ui.setMessage("BlackJack Win");
      this.sound.play("blackjack");
      setTimeout(() => this.finishRound("blackjack"), 1500);
      return;
    }

    if (this.player.getScore() > 21) {
      setTimeout(() => this.finishRound("lose"), 1500);
      return;
    }

    await this.dealerTurn();

    const result = this.getRoundResult();
    setTimeout(() => this.finishRound(result), 1600);
  }

  async dealerTurn() {
    this.renderAllCards();

    while (this.dealer.getScore() < 17) {
      await this.wait(700);

      const [card] = await this.api.drawCards(1);
      this.dealer.addCard(card);
      this.sound.play("card");
      this.renderAllCards();
    }
  }

  getRoundResult() {
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    if (playerScore > 21) return "lose";
    if (dealerScore > 21) return "win";
    if (playerScore > dealerScore) return "win";
    if (playerScore < dealerScore) return "lose";
    return "draw";
  }

  finishRound(result) {
    this.roundActive = false;
    this.renderAllCards();

    let title = "";
    let text = "";
    let type = "";

    if (result === "blackjack") {
      const winAmount = this.currentBet * 2;
      this.player.points += winAmount;
      this.dealer.points -= this.currentBet;

      title = "BlackJack Win";
      text = `You won ${this.currentBet} points!`;
      type = "win";
      this.sound.play("win");
    } else if (result === "win") {
      const winAmount = this.currentBet * 2;
      this.player.points += winAmount;
      this.dealer.points -= this.currentBet;

      title = "You Win";
      text = `You won ${this.currentBet} points!`;
      type = "win";
      this.sound.play("win");
    } else if (result === "lose") {
      this.dealer.points += this.currentBet;

      title = "You Lose";
      text = `You lost ${this.currentBet} points.`;
      type = "lose";
      this.sound.play("lose");
    } else {
      this.player.points += this.currentBet;

      title = "Draw";
      text = "NO wins bets returned.";
      type = "draw";
      this.sound.play("draw");
    }

    this.currentBet = 0;
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.disableGameButtons();

    this.finalGameOver = this.player.points <= 0 || this.dealer.points <= 0;

    if (this.player.points <= 0) {
      title = "Game Over";
      text = "You are Bankrupt!.";
      type = "lose";
    }

    if (this.dealer.points <= 0) {
      title = "Lucky Winner🥇🥇🥇";
      text = "Dealer is Bankrupt!";
      type = "win";
    }

    this.ui.setMessage(title);

    setTimeout(() => {
      this.ui.showResultScreen(type, title, text, this.finalGameOver);
    }, 700);
  }

  prepareNextRound() {
    this.ui.clearTable();
    this.ui.showBetting();
    this.ui.enableBettingButtons();
    this.ui.updatePoints(
      this.player.points,
      this.dealer.points,
      this.currentBet,
    );
    this.ui.setMessage("Place your bet");
  }

  renderHiddenDealer() {
    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      true,
    );
  }

  renderAllCards() {
    this.ui.renderHands(
      this.player.hand,
      this.dealer.hand,
      this.player.getScore(),
      this.dealer.getScore(),
      false,
    );
  }

  resetGame() {
    this.currentBet = 0;
    this.roundActive = false;
    this.finalGameOver = false;

    this.ui.hideResultScreen();
    this.ui.gameScreen.classList.remove("active");
    this.ui.nameScreen.classList.add("active");
    this.ui.playerNameInput.value = "";
    this.ui.clearTable();
    this.ui.disableGameButtons();
    this.ui.showBetting();
    this.ui.setMessage("Place your bet");
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

new BlackjackGame();
