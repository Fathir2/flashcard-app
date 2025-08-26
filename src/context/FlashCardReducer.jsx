// src/context/flashCardReducer.js
import { DECK_ACTIONS, CARD_ACTIONS, UI_ACTIONS } from './actionTypes';

export const initialState = {
  decks: [],
  cards: {}, // Format: { deckId: [cards...] }
  activeDeckId: null,
  loading: false,
  error: null
};

export function flashCardReducer(state, action) {
  switch (action.type) {
    // DECK ACTIONS
    case DECK_ACTIONS.LOAD_DECKS:
      return {
        ...state,
        decks: action.payload,
        loading: false
      };

    case DECK_ACTIONS.ADD_DECK:
      return {
        ...state,
        decks: [...state.decks, action.payload],
        loading: false
      };

    case DECK_ACTIONS.UPDATE_DECK:
      return {
        ...state,
        decks: state.decks.map(deck =>
          deck.id === action.payload.id ? action.payload : deck
        ),
        loading: false
      };

    case DECK_ACTIONS.DELETE_DECK: {
      // buang entry cards untuk deck yang dihapus
      const { [action.payload]: _deletedCards, ...remainingCards } = state.cards;

      return {
        ...state,
        decks: state.decks.filter(deck => deck.id !== action.payload),
        cards: remainingCards,
        activeDeckId: state.activeDeckId === action.payload ? null : state.activeDeckId,
        loading: false
      };
    }

    case DECK_ACTIONS.SET_ACTIVE_DECK:
      return {
        ...state,
        activeDeckId: action.payload
      };

    // CARD ACTIONS
    case CARD_ACTIONS.LOAD_CARDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.deckId]: action.payload.cards
        },
        loading: false
      };

    case CARD_ACTIONS.ADD_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.deckId]: [
            ...(state.cards[action.payload.deckId] || []),
            action.payload.card
          ]
        },
        loading: false
      };

    case CARD_ACTIONS.UPDATE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.deckId]: (state.cards[action.payload.deckId] ?? []).map(card =>
            card.id === action.payload.card.id ? action.payload.card : card
          )
        },
        loading: false
      };

    case CARD_ACTIONS.DELETE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.deckId]: (state.cards[action.payload.deckId] ?? []).filter(
            card => card.id !== action.payload.cardId
          )
        },
        loading: false
      };

    // UI ACTIONS
    case UI_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case UI_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case UI_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}
