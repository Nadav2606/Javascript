export class DeckAPI {
  constructor() {
    this.deck = [];
    this.deckId = null;
  }

  async createDeck() {
    try {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await response.json();

      if (!data.success) {
        throw new Error("Deck API failed");
      }

      this.deckId = data.deck_id;
      return data.deck_id;
    } catch (error) {
      console.warn("API לא זמין, משתמש בחבילת קלפים מקומית");
      this.deckId = null;
      this.createLocalDeck();
      return null;
    }
  }

  async drawCards(count = 1) {
    if (this.deckId) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${count}`);
      const data = await response.json();

      return data.cards.map(card => ({
        value: this.convertValue(card.value),
        suit: this.convertSuit(card.suit),
        image: card.image
      }));
    }

    return this.drawLocalCards(count);
  }

  convertValue(value) {
    const values = {
      ACE: "A",
      KING: "K",
      QUEEN: "Q",
      JACK: "J"
    };

    return values[value] || value;
  }

  convertSuit(suit) {
    const suits = {
      HEARTS: "♥",
      DIAMONDS: "♦",
      CLUBS: "♣",
      SPADES: "♠"
    };

    return suits[suit] || suit;
  }

  createLocalDeck() {
    const suits = ["♥", "♦", "♣", "♠"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    this.deck = [];

    for (const suit of suits) {
      for (const value of values) {
        this.deck.push({ value, suit });
      }
    }

    this.deck.sort(() => Math.random() - 0.5);
  }

  drawLocalCards(count) {
    return this.deck.splice(0, count);
  }
}
