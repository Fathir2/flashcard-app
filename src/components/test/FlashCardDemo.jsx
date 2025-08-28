// src/components/test/FlashCardDemo.jsx - Fixed Spacing Version
import FlashCard from '../flashcard/FlashCard';
import { useFlashCard } from '../../context/FlashContext';

const FlashCardDemo = () => {
  const { decks, cards } = useFlashCard();

  // Enhanced sample data dengan content yang lebih menarik
  const sampleCards = [
    {
      id: 'sample-1',
      front: 'What makes a great user interface?',
      back: 'A great UI combines intuitive navigation, visual hierarchy, consistent design patterns, and delightful interactions that serve user needs.',
      hints: ['Think about user experience', 'Visual design principles', 'User psychology'],
      tags: ['design', 'ui', 'ux', 'principles'],
      difficulty: 3
    },
    {
      id: 'sample-2', 
      front: '¿Cuál es el secreto de la felicidad?',
      back: 'La felicidad viene de valorar las pequeñas cosas, mantener relaciones significativas y encontrar propósito en lo que hacemos.',
      hints: ['Spanish philosophy', 'Life wisdom', 'Gratitude'],
      tags: ['spanish', 'philosophy', 'happiness', 'wisdom'],
      difficulty: 2
    },
    {
      id: 'sample-3',
      front: 'How do neural networks learn?',
      back: 'Neural networks learn through backpropagation - adjusting weights based on prediction errors, gradually improving accuracy through iterative training.',
      hints: ['Machine learning concept', 'Mathematical optimization', 'Pattern recognition'],
      tags: ['ai', 'machine-learning', 'neural-networks', 'algorithms'],
      difficulty: 4
    },
    {
      id: 'sample-4',
      front: 'What is React?',
      back: 'A JavaScript library for building user interfaces.',
      hints: ['JavaScript', 'Library', 'UI'],
      tags: ['react', 'js'],
      difficulty: 2
    },
    {
      id: 'sample-5',
      front: 'How does the Virtual DOM work in React?',
      back: 'React creates a virtual representation of the DOM in memory. When state changes, React compares the new virtual DOM with the previous one and updates only the changed elements in the real DOM.',
      hints: ['Virtual representation', 'Diffing algorithm', 'Performance optimization'],
      tags: ['react', 'virtual-dom', 'performance'],
      difficulty: 3
    },
    {
      id: 'sample-6',
      front: 'Explain the complete lifecycle of a React component from creation to destruction, including all lifecycle methods and hooks equivalents',
      back: 'React component lifecycle consists of three main phases: Mounting (constructor, componentDidMount, useEffect with empty dependency), Updating (componentDidUpdate, useEffect with dependencies, shouldComponentUpdate, getSnapshotBeforeUpdate), and Unmounting (componentWillUnmount, useEffect cleanup function). During mounting, the component is created and inserted into the DOM. During updating, the component re-renders when props or state change. During unmounting, the component is removed from the DOM and cleanup operations are performed. Modern React uses hooks like useEffect, useState, useLayoutEffect, and useMemo to replicate lifecycle behavior in functional components.',
      hints: ['Three phases: mounting, updating, unmounting', 'Lifecycle methods vs hooks', 'DOM insertion and removal', 'State and props changes'],
      tags: ['react', 'lifecycle', 'hooks', 'components', 'advanced'],
      difficulty: 5
    }
  ];

  // Get real cards from context atau gunakan enhanced sample
  const getTestCards = () => {
    if (decks.length > 0) {
      const firstDeck = decks[0];
      const deckCards = cards[firstDeck.id] || [];
      if (deckCards.length > 0) {
        // Mix real cards dengan sample cards untuk testing
        return [...deckCards.slice(0, 3), ...sampleCards.slice(0, 3)];
      }
    }
    return sampleCards;
  };

  const testCards = getTestCards();

  const handleFlip = (isFlipped, cardId) => {
    console.log(`🃏 Card ${cardId} ${isFlipped ? 'flipped to back' : 'flipped to front'}`);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            FlashCard Component Showcase
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our enhanced FlashCard component with beautiful animations, modern design, and intelligent features.
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">{decks.length}</div>
                <div className="text-sm text-gray-600">Available Decks</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">
                  {Object.values(cards).flat().length}
                </div>
                <div className="text-sm text-gray-600">Total Cards</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">{testCards.length}</div>
                <div className="text-sm text-gray-600">Demo Cards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Length Demo - Fixed spacing */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Auto Text Sizing Demo</h2>
            <p className="text-gray-600">See how text size adapts to content length (Medium size cards)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCards.slice(3).map((card) => {
              const lengthLabel = card.front.length < 30 ? 'Short' : 
                                 card.front.length < 80 ? 'Medium' : 'Long';
              const lengthColor = card.front.length < 30 ? 'bg-green-100 text-green-800' : 
                                 card.front.length < 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
              
              return (
                <div key={card.id} className="text-center">
                  <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${lengthColor}`}>
                      {lengthLabel} Text ({card.front.length} chars)
                    </span>
                  </div>
                  <FlashCard 
                    card={card}
                    size="medium"
                    className="mb-24"
                    onFlip={(flipped) => handleFlip(flipped, card.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Size Comparison with Same Content - Fixed spacing */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Size Comparison</h2>
            <p className="text-gray-600">Same content, different card sizes - notice text auto-adjustment</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Small */}
            <div className="text-center">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Small Card
                </span>
              </div>
              <FlashCard 
                card={testCards[1]}
                size="small"
                onFlip={(flipped) => handleFlip(flipped, `small-${testCards[1].id}`)}
              />
            </div>

            {/* Medium */}
            <div className="text-center">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Medium Card
                </span>
              </div>
              <FlashCard 
                card={testCards[1]}
                size="medium"
                className="mb-24"
                onFlip={(flipped) => handleFlip(flipped, `medium-${testCards[1].id}`)}
              />
            </div>

            {/* Large */}
            <div className="text-center">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Large Card
                </span>
              </div>
              <FlashCard 
                card={testCards[1]}
                size="large"
                onFlip={(flipped) => handleFlip(flipped, `large-${testCards[1].id}`)}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Size Variants Demo - Fixed spacing */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Interactive Card Gallery</h2>
            <p className="text-gray-600">Explore different card contents and styles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCards.slice(0, 3).map((card) => (
              <div key={card.id} className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Difficulty: {card.difficulty}/5
                  </div>
                </div>
                <FlashCard
                  card={card}
                  size="medium"
                  className="mb-24"
                  onFlip={(flipped) => handleFlip(flipped, card.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights - Adjusted spacing */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Component Features</h2>
            <p className="text-gray-600">What makes our FlashCard component special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Auto Text Sizing</h3>
              <p className="text-sm text-gray-600">Automatically adjusts text size based on content length</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m11 0h-4a1 1 0 00-1 1v4m0 11v-4a1 1 0 011-1h4M4 20h4a1 1 0 001-1v-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multiple Sizes</h3>
              <p className="text-sm text-gray-600">Small, medium, and large variants available</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smooth Animations</h3>
              <p className="text-sm text-gray-600">Delightful flip animations with 3D effects</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Rich Content</h3>
              <p className="text-sm text-gray-600">Supports hints, tags, and difficulty levels</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default FlashCardDemo;