export class DeckApi {
  constructor() {
    this.deckId = null;
  }

  async createDeck() {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await response.json();
    this.deckId = data.deck_id;
  }

  async drawCards(count = 1) {
    if (!this.deckId) {
      await this.createDeck();
    }

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${count}`);
    const data = await response.json();

    if (!data.success || data.remaining < 10) {
      await this.createDeck();
      return this.drawCards(count);
    }

    return data.cards.map((card) => ({
      value: this.normalizeValue(card.value),
      suit: this.normalizeSuit(card.suit),
      image: card.image,
      code: card.code
    }));
  }

  normalizeValue(value) {
    const values = {
      ACE: "A",
      KING: "K",
      QUEEN: "Q",
      JACK: "J"
    };

    return values[value] || value;
  }

  normalizeSuit(suit) {
    const suits = {
      HEARTS: "♥",
      DIAMONDS: "♦",
      CLUBS: "♣",
      SPADES: "♠"
    };

    return suits[suit] || suit;
  }
}
