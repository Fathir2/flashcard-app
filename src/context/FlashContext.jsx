// src/context/FlashContext.jsxF
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { flashCardReducer, initialState } from './FlashCardReducer';
import { DECK_ACTIONS, CARD_ACTIONS, UI_ACTIONS } from './actionTypes';
import StorageManager from '../utils/storage';
import { DEFAULT_DECKS } from '../data/defaultDecks';
import { SAMPLE_CARDS } from '../data/sampleCards';

// Create Context
const FlashCardContext = createContext();

// Custom hook untuk menggunakan context
// eslint-disable-next-line react-refresh/only-export-components
export const useFlashCard = () => {
  const context = useContext(FlashCardContext);
  if (!context) {
    throw new Error('useFlashCard must be used within a FlashCardProvider');
  }
  return context;
};

// Provider Component
export const FlashCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flashCardReducer, initialState);

  // Initialize data saat pertama kali load
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      // Load decks dari localStorage
      let decks = StorageManager.getAllDecks();
      
      // Jika belum ada decks, gunakan default data
      if (decks.length === 0) {
        // Save default decks ke localStorage
        DEFAULT_DECKS.forEach(deck => {
          const savedDeck = StorageManager.saveDeck({
            ...deck,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          
          // Save sample cards untuk default deck
          if (SAMPLE_CARDS[deck.id]) {
            SAMPLE_CARDS[deck.id].forEach(card => {
              StorageManager.saveCard(savedDeck.id, {
                ...card,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              });
            });
          }
        });
        
        decks = StorageManager.getAllDecks();
      }

      dispatch({ type: DECK_ACTIONS.LOAD_DECKS, payload: decks });

      // Load cards untuk setiap deck
      const allCards = {};
      decks.forEach(deck => {
        const deckCards = StorageManager.getCardsForDeck(deck.id);
        allCards[deck.id] = deckCards;
      });

      // Load cards satu per satu
      Object.entries(allCards).forEach(([deckId, cards]) => {
        dispatch({ 
          type: CARD_ACTIONS.LOAD_CARDS, 
          payload: { deckId, cards }
        });
      });

    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // DECK ACTIONS
  const createDeck = async (deckData) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      const newDeck = {
        ...deckData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const savedDeck = StorageManager.saveDeck(newDeck);
      dispatch({ type: DECK_ACTIONS.ADD_DECK, payload: savedDeck });
      
      return savedDeck;
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateDeck = async (deckId, updates) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      const existingDeck = StorageManager.getDeck(deckId);
      if (!existingDeck) {
        throw new Error('Deck not found');
      }

      const updatedDeck = {
        ...existingDeck,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const savedDeck = StorageManager.saveDeck(updatedDeck);
      dispatch({ type: DECK_ACTIONS.UPDATE_DECK, payload: savedDeck });
      
      return savedDeck;
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteDeck = async (deckId) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      // Delete dari localStorage
      StorageManager.deleteDeck(deckId);
      
      // Delete semua cards dalam deck
      const cards = StorageManager.getCardsForDeck(deckId);
      cards.forEach(card => {
        StorageManager.deleteCard(deckId, card.id);
      });

      dispatch({ type: DECK_ACTIONS.DELETE_DECK, payload: deckId });
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const setActiveDeck = (deckId) => {
    dispatch({ type: DECK_ACTIONS.SET_ACTIVE_DECK, payload: deckId });
  };

  // CARD ACTIONS
  const createCard = async (deckId, cardData) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      const newCard = {
        ...cardData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const savedCard = StorageManager.saveCard(deckId, newCard);
      dispatch({ 
        type: CARD_ACTIONS.ADD_CARD, 
        payload: { deckId, card: savedCard }
      });
      
      return savedCard;
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateCard = async (deckId, cardId, updates) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      const deckCards = StorageManager.getCardsForDeck(deckId);
      const existingCard = deckCards.find(card => card.id === cardId);
      
      if (!existingCard) {
        throw new Error('Card not found');
      }

      const updatedCard = {
        ...existingCard,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const savedCard = StorageManager.saveCard(deckId, updatedCard);
      dispatch({ 
        type: CARD_ACTIONS.UPDATE_CARD, 
        payload: { deckId, card: savedCard }
      });
      
      return savedCard;
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteCard = async (deckId, cardId) => {
    try {
      dispatch({ type: UI_ACTIONS.SET_LOADING, payload: true });
      
      StorageManager.deleteCard(deckId, cardId);
      dispatch({ 
        type: CARD_ACTIONS.DELETE_CARD, 
        payload: { deckId, cardId }
      });
    } catch (error) {
      dispatch({ type: UI_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // UTILITY FUNCTIONS
  const getDeckById = (deckId) => {
    return state.decks.find(deck => deck.id === deckId);
  };

  const getCardsForDeck = (deckId) => {
    return state.cards[deckId] || [];
  };

  const getActiveDeck = () => {
    return state.activeDeckId ? getDeckById(state.activeDeckId) : null;
  };

  const clearError = () => {
    dispatch({ type: UI_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    ...state,
    
    // Deck actions
    createDeck,
    updateDeck,
    deleteDeck,
    setActiveDeck,
    
    // Card actions
    createCard,
    updateCard,
    deleteCard,
    
    // Utilities
    getDeckById,
    getCardsForDeck,
    getActiveDeck,
    clearError,
    
    // Computed values
    totalDecks: state.decks.length,
    totalCards: Object.values(state.cards).flat().length
  };

  return (
    <FlashCardContext.Provider value={value}>
      {children}
    </FlashCardContext.Provider>
  );
};

export default FlashCardContext;