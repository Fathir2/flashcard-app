// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useFlashCard } from '../context/FlashContext';
import { CompactFlashCard } from '../components/flashcard/FlashCardVariants';
import { useState, useEffect } from 'react';

const Home = () => {
  const { decks, cards, totalDecks, totalCards } = useFlashCard();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
  };

  // Get sample card untuk hero section
  const getSampleCard = () => {
    if (totalCards > 0) {
      const firstDeck = decks[0];
      const deckCards = cards[firstDeck.id] || [];
      if (deckCards.length > 0) {
        return deckCards[0];
      }
    }
    
    return {
      id: 'demo',
      front: 'What is a FlashCard?',
      back: 'A powerful learning tool that helps you memorize information through active recall and spaced repetition.',
      hints: ['Learning tool', 'Memory technique'],
      tags: ['education', 'memory'],
      difficulty: 2
    };
  };

  const sampleCard = getSampleCard();

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Greeting */}
            <div className="text-blue-600 text-lg font-medium animate-fade-in">
              {getGreeting()}
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-black text-gray-800 leading-tight">
                Learn Smarter with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                  FlashCards
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Master any subject with our intelligent flashcard system. 
                Create, study, and track your progress with advanced spaced repetition algorithms.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {totalDecks}
                </div>
                <div className="text-sm text-gray-600 font-medium">Active Decks</div>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  {totalCards}
                </div>
                <div className="text-sm text-gray-600 font-medium">Total Cards</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/create"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Your First Deck
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              {totalDecks > 0 && (
                <Link
                  to="/study"
                  className="group px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Studying
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              )}
              
              <Link
                to="/test-flashcard"
                className="group px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
              >
                Test FlashCard
              </Link>
            </div>
          </div>

          {/* Right: Enhanced FlashCard Demo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 rounded-full blur-3xl scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-indigo-200/30 to-blue-200/30 rounded-full blur-2xl scale-125 animate-pulse animation-delay-1000"></div>
              
              {/* FlashCard with glow effect */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <CompactFlashCard 
                  card={sampleCard}
                  onFlip={(flipped) => console.log('Hero card flipped:', flipped)}
                />
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-9 -right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
                🎯 Try me!
              </div>
              <div className="absolute -bottom-6 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse shadow-lg">
                ✨ Interactive
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative z-10 bg-white/60 backdrop-blur-lg border-y border-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our FlashCards?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of science-backed learning techniques and modern design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Enhanced */}
            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-50">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">Smart Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced spaced repetition algorithm adapts to your learning pace and optimizes review timing for maximum retention.
              </p>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-green-50">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-green-700 transition-colors duration-300">Beautiful Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Elegant flip animations and modern UI make studying enjoyable and engaging, keeping you motivated to learn.
              </p>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-purple-50">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed statistics and progress tracking help you stay motivated and focused on your learning goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Decks Section */}
      {decks.length > 0 && (
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Learning Journey</h2>
                <p className="text-gray-600">Continue where you left off</p>
              </div>
              <Link
                to="/manage"
                className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors duration-300"
              >
                View All Decks
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {decks.slice(0, 3).map((deck, index) => {
                const deckCards = cards[deck.id] || [];
                return (
                  <div 
                    key={deck.id} 
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 p-8 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                        {deck.name}
                      </h3>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {deckCards.length} cards
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{deck.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-lg">📚</span>
                        <span className="capitalize font-medium">{deck.category}</span>
                      </div>
                      <Link
                        to={`/study`}
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        <span className="flex items-center gap-2">
                          Study Now
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Final CTA Section */}
      <div className="relative z-10 bg-transparent text-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-gray-800 mb-12 leading-relaxed">
              Join thousands of students who have already revolutionized their study habits with our intelligent flashcard system.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/create"
                className="group px-10 py-5 bg-blue-600 hover:bg-blue-700 font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl"
              >
                <span className="flex items-center text-gray-200 justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Deck
                </span>
              </Link>
              
              <Link
                to="/manage"
                className="group px-10 py-5 bg-gray-700 hover:bg-gray-600 font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl"
              >
                <span className="flex items-center justify-center text-gray-200 gap-3">
                  <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage Existing
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;