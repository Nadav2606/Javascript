export class UI {

  static render(game) {

    this.renderHand(
      document.getElementById("player-hand"),
      game.player.hand
    );

    this.renderHand(
      document.getElementById("dealer-hand"),
      game.dealer.hand
    );

    document.getElementById("player-score").textContent =
      game.player.getScore();

    document.getElementById("dealer-score").textContent =
      game.isGameOver
        ? game.dealer.getScore()
        : "?";

    document.getElementById("result").textContent =
      game.resultMessage;

    document.getElementById("wins").textContent =
      game.stats.wins;

    document.getElementById("losses").textContent =
      game.stats.losses;

    document.getElementById("draws").textContent =
      game.stats.draws;

    document.getElementById("player-name-display").textContent =
      game.player.name;

    document.getElementById("player-title").textContent =
      game.player.name;
  }

  static renderHand(container, hand) {

    container.innerHTML = "";

    hand.forEach((card) => {

      const cardElement = document.createElement("div");

      const isRed =
        card.suit === "♥" || card.suit === "♦";

      cardElement.className =
        `card ${isRed ? "red" : "black"}`;

      cardElement.innerHTML = `
        <div class="card-top">${card.value}${card.suit}</div>
        <div class="card-center">${card.suit}</div>
        <div class="card-bottom">${card.value}${card.suit}</div>
      `;

      container.appendChild(cardElement);
    });
  }

  static updateSoundButton(isOn) {

    const button =
      document.getElementById("sound-toggle");

    button.textContent =
      isOn
        ? "Sound: ON"
        : "Sound: OFF";

    button.classList.toggle("sound-on", isOn);
  }

  static showGameScreen(playerName) {

    document
      .getElementById("welcome-screen")
      .classList.add("hidden");

    document
      .getElementById("game-screen")
      .classList.remove("hidden");

    document.getElementById("player-name-display")
      .textContent = playerName;
  }

  static showMessage(message) {
    document.getElementById("result").textContent =
      message;
  }
}
