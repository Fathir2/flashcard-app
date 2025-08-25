import { describe, it, expect, beforeEach } from "vitest";
import StorageManager from "./storage";

// Mock localStorage dulu
beforeEach(() => {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = String(value);
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };
});

describe("StorageManager", () => {
  it("should save and get a deck", () => {
    const testDeck = {
      name: "Test Deck",
      description: "Test Description",
      category: "test",
    };

    const savedDeck = StorageManager.saveDeck(testDeck);
    const allDecks = StorageManager.getAllDecks();

    expect(savedDeck).toHaveProperty("id");
    expect(allDecks).toContainEqual(savedDeck);
  });

  it("should save and get cards", () => {
    const testDeck = StorageManager.saveDeck({ name: "Deck", category: "test" });
    const card = { front: "Q", back: "A", hints: ["h"], tags: ["t"] };

    StorageManager.saveCard(testDeck.id, card);

    const deckCards = StorageManager.getCardsForDeck(testDeck.id);
    expect(deckCards.length).toBe(1);
    expect(deckCards[0]).toHaveProperty("id");
  });

  it("should update card stats", () => {
    const testDeck = StorageManager.saveDeck({ name: "Deck", category: "test" });
    const card = { front: "Q", back: "A" };
    StorageManager.saveCard(testDeck.id, card);

    const deckCards = StorageManager.getCardsForDeck(testDeck.id);
    const cardId = deckCards[0].id;

    StorageManager.updateCardStats(cardId, { correctCount: 1, incorrectCount: 0 });

    const cardStats = StorageManager.getCardStats(cardId);
    expect(cardStats.correctCount).toBe(1);
  });
});
