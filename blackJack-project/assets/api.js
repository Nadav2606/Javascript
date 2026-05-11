export class API {
  constructor() {
    this.baseUrl = "https://deckofcardsapi.com/api/deck";
    this.storageKey = "blackjack_data";
  }

  async createDeck() {
    const response = await fetch(
      `${this.baseUrl}/new/shuffle/?deck_count=1`
    );

    const data = await response.json();

    return data.deck_id;
  }

  async drawCards(deckId, count = 1) {
    const response = await fetch(
      `${this.baseUrl}/${deckId}/draw/?count=${count}`
    );

    const data = await response.json();

    return data.cards.map((card) => ({
      value: this.convertValue(card.value),
      suit: this.convertSuit(card.suit),
    }));
  }

  convertValue(value) {
    if (value === "ACE") return "A";
    if (value === "KING") return "K";
    if (value === "QUEEN") return "Q";
    if (value === "JACK") return "J";

    return value;
  }

  convertSuit(suit) {
    const suits = {
      SPADES: "♠",
      HEARTS: "♥",
      DIAMONDS: "♦",
      CLUBS: "♣",
    };

    return suits[suit];
  }

  saveGame(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  loadGame() {
    const data = localStorage.getItem(this.storageKey);

    return data ? JSON.parse(data) : null;
  }
}
