export const DEFAULT_DECKS = [
  {
    id: 'default-1',
    name: 'Example Deck',
    description: 'A sample deck to get you started',
    category: 'general',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DECK_TEMPLATE = {
  name: '',
  description: '',
  category: 'general',
  createdAt: null,
  updatedAt: null
};

export const CARD_TEMPLATE = {
  front: '',
  back: '',
  hints: [],
  tags: [],
  createdAt: null,
  updatedAt: null
};