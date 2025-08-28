// src/pages/TestForm.jsx
import { useState } from 'react';
import { useFlashCard } from '../context/FlashContext';
import FlashCardForm from '../components/flashcard/FlashCardForm';

const TestForm = () => {
  const { decks, cards } = useFlashCard();
  const [testMode, setTestMode] = useState('create'); // 'create' or 'edit'
  const [selectedCard, setSelectedCard] = useState(null);
  const [lastCreatedCard, setLastCreatedCard] = useState(null);

  // Get sample card untuk edit testing
  const getSampleCardForEdit = () => {
    if (decks.length > 0) {
      const firstDeck = decks[0];
      const deckCards = cards[firstDeck.id] || [];
      if (deckCards.length > 0) {
        return { card: deckCards[0], deckId: firstDeck.id };
      }
    }
    return null;
  };

  const handleFormSubmit = (result) => {
    console.log('Form submitted successfully:', result);
    setLastCreatedCard(result);
    
    // Show success message
    alert(`Card ${testMode === 'edit' ? 'updated' : 'created'} successfully!`);
  };

  const handleFormCancel = () => {
    console.log('Form cancelled');
    setTestMode('create');
    setSelectedCard(null);
  };

  const startEditTest = () => {
    const sampleData = getSampleCardForEdit();
    if (sampleData) {
      setSelectedCard(sampleData.card);
      setTestMode('edit');
    } else {
      alert('No cards available for editing. Create some cards first!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header with Mode Switcher */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">FlashCard Form Testing</h1>
          <p className="text-gray-600 mb-6">Test the create and edit functionality</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => {
                setTestMode('create');
                setSelectedCard(null);
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                testMode === 'create'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Test Create Mode
            </button>
            
            <button
              onClick={startEditTest}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                testMode === 'edit'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Test Edit Mode
            </button>
          </div>
          
          {/* Current Stats */}
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span className="bg-white px-3 py-1 rounded-full border">
              📚 Decks: {decks.length}
            </span>
            <span className="bg-white px-3 py-1 rounded-full border">
              🃏 Total Cards: {Object.values(cards).flat().length}
            </span>
          </div>
        </div>

        {/* Form Component */}
        <div className="mb-8">
          {testMode === 'create' ? (
            <FlashCardForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              mode="create"
            />
          ) : (
            selectedCard && (
              <FlashCardForm
                initialCard={selectedCard}
                deckId={getSampleCardForEdit()?.deckId}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                mode="edit"
              />
            )
          )}
        </div>

        {/* Success Display */}
        {lastCreatedCard && (
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last {testMode === 'edit' ? 'Updated' : 'Created'} Card:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Question:</strong> {lastCreatedCard.front}
              </div>
              <div>
                <strong>Answer:</strong> {lastCreatedCard.back}
              </div>
              <div>
                <strong>Difficulty:</strong> {lastCreatedCard.difficulty}/5
              </div>
              <div>
                <strong>Tags:</strong> {lastCreatedCard.tags.join(', ') || 'None'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestForm;