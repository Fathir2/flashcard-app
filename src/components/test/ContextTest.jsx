// src/components/test/ContextTest.jsx - Debug Version
import { useEffect } from 'react';
import { useFlashCard } from '../../context/FlashContext';

const ContextTest = () => {
  const {
    decks,
    cards,
    loading,
    error,
    createDeck,
    createCard,
    totalDecks,
    totalCards
  } = useFlashCard();

  // Log initial state saat component mount
  useEffect(() => {
    console.clear(); // Clear console dulu
    console.log('🧪 CONTEXT TEST - Initial Mount');
    console.log('=================================');
    console.log('Decks:', decks);
    console.log('Cards:', cards);
    console.log('Total Decks:', totalDecks);
    console.log('Total Cards:', totalCards);
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('=================================');
  }, []); // Empty dependency - hanya run sekali saat mount

  // Log setiap kali state berubah
  useEffect(() => {
    if (decks.length > 0) { // Hindari log saat initial empty state
      console.log('📊 STATE CHANGED:');
      console.log('Decks count:', decks.length);
      console.log('Cards count:', totalCards);
      console.log('Current decks:', decks.map(d => d.name));
    }
  }, [decks, totalCards]); // Log saat decks atau cards berubah

  const handleCreateTestDeck = async () => {
    console.log('🚀 CREATING TEST DECK...');
    try {
      const newDeck = await createDeck({
        name: 'Test Deck ' + Date.now(),
        description: 'Testing context at ' + new Date().toLocaleTimeString(),
        category: 'general'
      });
      console.log('✅ SUCCESS! New deck created:', newDeck);
    } catch (error) {
      console.error('❌ ERROR creating deck:', error);
    }
  };

  const handleCreateTestCard = async () => {
    if (decks.length === 0) {
      console.warn('⚠️ No decks available. Create deck first.');
      return;
    }

    const firstDeck = decks[0];
    console.log('🃏 CREATING TEST CARD for deck:', firstDeck.name);
    
    try {
      const newCard = await createCard(firstDeck.id, {
        front: 'Test Question ' + Date.now(),
        back: 'Test Answer ' + Date.now(),
        hints: ['Test hint'],
        tags: ['test'],
        difficulty: 1
      });
      console.log('✅ SUCCESS! New card created:', newCard);
    } catch (error) {
      console.error('❌ ERROR creating card:', error);
    }
  };

  const handleLogCurrentState = () => {
    console.log('📋 CURRENT STATE DUMP:');
    console.table(decks); // Table format lebih mudah dibaca
    console.log('Cards detail:', cards);
    console.log('localStorage decks:', JSON.parse(localStorage.getItem('flashcards:decks') || '[]'));
    console.log('localStorage cards:', JSON.parse(localStorage.getItem('flashcards:cards') || '{}'));
  };

  if (loading) return <div>⏳ Loading context...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">🧪 Context Test Panel</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-100 p-3 rounded">
          <h3 className="font-semibold">📊 Stats</h3>
          <p>Total Decks: {totalDecks}</p>
          <p>Total Cards: {totalCards}</p>
        </div>
        
        <div className="bg-green-100 p-3 rounded">
          <h3 className="font-semibold">🎛️ Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={handleCreateTestDeck}
              className="block w-full bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              ➕ Create Test Deck
            </button>
            <button 
              onClick={handleCreateTestCard}
              className="block w-full bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              🃏 Create Test Card
            </button>
            <button 
              onClick={handleLogCurrentState}
              className="block w-full bg-purple-500 text-white px-3 py-1 rounded text-sm"
            >
              🔍 Log Current State
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded">
        <h3 className="font-semibold mb-2">📚 Current Decks:</h3>
        {decks.length === 0 ? (
          <p className="text-gray-500">No decks available</p>
        ) : (
          decks.map(deck => (
            <div key={deck.id} className="border-l-4 border-blue-500 pl-3 mb-2">
              <h4 className="font-medium">{deck.name}</h4>
              <p className="text-sm text-gray-600">{deck.description}</p>
              <p className="text-xs text-gray-500">
                Cards: {cards[deck.id]?.length || 0} | Category: {deck.category}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        💡 Check browser console for detailed logs
      </div>
    </div>
  );
};

export default ContextTest;