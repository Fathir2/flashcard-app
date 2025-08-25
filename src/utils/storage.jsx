const STORAGE_KEYS = {
  DECKS: "flashcards:decks",
  CARDS: "flashcards:cards",
  SETTINGS: "flashcards:settings",
  STATS: "flashcards:statistics",
};

class StorageManager {
  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage Error:", error);
      return false;
    }
  }

  static getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Storage Error:", error);
      return defaultValue;
    }
  }

  static saveDeck(deck) {
    const decks = this.getItem(STORAGE_KEYS.DECKS, []);
    const newDeck = { ...deck };

    if (!newDeck.id) {
      newDeck.id = crypto.randomUUID();
    }

    const existingIndex = decks.findIndex((d) => d.id === newDeck.id);

    if (existingIndex >= 0) {
      decks[existingIndex] = newDeck;
    } else {
      decks.push(newDeck);
    }

    this.setItem(STORAGE_KEYS.DECKS, decks);
    return newDeck;
  }

  static getDeck(deckId) {
    const decks = this.getItem(STORAGE_KEYS.DECKS, []);
    return decks.find((deck) => deck.id === deckId) || null;
  }

  static getAllDecks() {
    return this.getItem(STORAGE_KEYS.DECKS, []);
  }

  static deleteDeck(deckId) {
    const decks = this.getItem(STORAGE_KEYS.DECKS, []);
    const filteredDecks = decks.filter((deck) => deck.id !== deckId);
    return this.setItem(STORAGE_KEYS.DECKS, filteredDecks);
  }

  static saveCard(deckId, card) {
    const cards = this.getItem(STORAGE_KEYS.CARDS, {});
    if (!cards[deckId]) {
      cards[deckId] = [];
    }

    const newCard = { ...card };
    if (!newCard.id) {
      newCard.id = crypto.randomUUID();
    }

    const deckCards = cards[deckId];
    const existingIndex = deckCards.findIndex((c) => c.id === newCard.id);

    if (existingIndex >= 0) {
      deckCards[existingIndex] = newCard;
    } else {
      deckCards.push(newCard);
    }

    cards[deckId] = deckCards;
    this.setItem(STORAGE_KEYS.CARDS, cards);
    return newCard;
  }

  static getCardsForDeck(deckId) {
    const cards = this.getItem(STORAGE_KEYS.CARDS, {});
    return cards[deckId] || [];
  }

  static deleteCard(deckId, cardId) {
    const cards = this.getItem(STORAGE_KEYS.CARDS, {});
    if (!cards[deckId]) return true;

    cards[deckId] = cards[deckId].filter((card) => card.id !== cardId);
    return this.setItem(STORAGE_KEYS.CARDS, cards);
  }

  static updateCardStats(cardId, stats) {
    const allStats = this.getItem(STORAGE_KEYS.STATS, {});
    allStats[cardId] = {
      ...allStats[cardId],
      ...stats,
      lastReviewed: new Date().toISOString(),
    };
    return this.setItem(STORAGE_KEYS.STATS, allStats);
  }

  static getCardStats(cardId) {
    const allStats = this.getItem(STORAGE_KEYS.STATS, {});
    return (
      allStats[cardId] || {
        correctCount: 0,
        incorrectCount: 0,
        lastReviewed: null,
      }
    );
  }
}

export default StorageManager;
