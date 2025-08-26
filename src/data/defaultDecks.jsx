// src/data/defaultDecks.jsx
export const DEFAULT_DECKS = [
  {
    id: 'default-1',
    name: 'Getting Started',
    description: 'Learn the basics with this sample deck',
    category: 'general',
    color: 'blue',
    createdAt: null, // Will be set when saving
    updatedAt: null
  },
  {
    id: 'default-2', 
    name: 'Spanish Basics',
    description: 'Common Spanish words and phrases',
    category: 'language',
    color: 'green',
    createdAt: null,
    updatedAt: null
  }
];

export const DECK_CATEGORIES = [
  { id: 'general', name: 'General', icon: '📚' },
  { id: 'language', name: 'Languages', icon: '🌍' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'math', name: 'Mathematics', icon: '🔢' },
  { id: 'history', name: 'History', icon: '📜' },
  { id: 'geography', name: 'Geography', icon: '🗺️' },
  { id: 'programming', name: 'Programming', icon: '💻' },
  { id: 'other', name: 'Other', icon: '📂' }
];

export const DECK_TEMPLATE = {
  name: '',
  description: '',
  category: 'general',
  color: 'blue',
  createdAt: null,
  updatedAt: null
};

export const CARD_TEMPLATE = {
  front: '',
  back: '',
  hints: [],
  tags: [],
  difficulty: 1, // 1-5 scale
  createdAt: null,
  updatedAt: null
};