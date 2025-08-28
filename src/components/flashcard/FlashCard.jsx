// src/components/flashcard/FlashCard.jsx - Auto-sizing Version
import { useState, useEffect, useRef } from 'react';

const FlashCard = ({ 
  card, 
  onFlip = null, 
  showControls = true, 
  className = "",
  size = "medium" 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontTextRef = useRef(null);
  const backTextRef = useRef(null);
  const [frontTextSize, setFrontTextSize] = useState('text-xl');
  const [backTextSize, setBackTextSize] = useState('text-xl');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) {
      onFlip(!isFlipped);
    }
  };

  // Size configurations with better proportions
  const sizeClasses = {
    small: "w-72 h-44",
    medium: "w-80 h-52", 
    large: "w-96 h-60"
  };

  // Function untuk menghitung ukuran teks yang tepat
  const calculateTextSize = (text, containerSize) => {
    if (!text) return 'text-base';
    
    const textLength = text.length;
    
    // Rules berdasarkan ukuran container dan panjang text
    if (containerSize === 'small') {
      if (textLength < 30) return 'text-lg font-medium';
      if (textLength < 60) return 'text-base font-normal';
      if (textLength < 100) return 'text-sm font-normal';
      return 'text-xs font-normal';
    } 
    else if (containerSize === 'medium') {
      if (textLength < 40) return 'text-xl font-medium';
      if (textLength < 80) return 'text-lg font-normal';
      if (textLength < 150) return 'text-base font-normal';
      return 'text-sm font-normal';
    } 
    else { // large
      if (textLength < 50) return 'text-2xl font-medium';
      if (textLength < 100) return 'text-xl font-normal';
      if (textLength < 200) return 'text-lg font-normal';
      return 'text-base font-normal';
    }
  };

  // Calculate text sizes when card or content changes
  useEffect(() => {
    const frontSize = calculateTextSize(card?.front, size);
    const backSize = calculateTextSize(card?.back, size);
    setFrontTextSize(frontSize);
    setBackTextSize(backSize);
  }, [card?.front, card?.back, size]);

  // Function untuk memotong text yang terlalu panjang
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Max text length berdasarkan ukuran card
  const getMaxTextLength = (side) => {
    const limits = {
      small: { front: 120, back: 200 },
      medium: { front: 150, back: 300 },
      large: { front: 200, back: 400 }
    };
    return limits[size]?.[side] || limits.medium[side];
  };

  return (
    <div className={`flashcard-container ${sizeClasses[size]} ${className} mx-auto`}>
      {/* Card wrapper dengan perspective untuk 3D effect */}
      <div 
        className={`
          relative w-full h-full cursor-pointer transition-transform duration-600 ease-out preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          hover:scale-[1.02] transition-all duration-300
        `}
        onClick={handleFlip}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Front Side - Question */}
        <div 
          className={`
            absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-2xl
            bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white
            flex flex-col p-6 md:p-8 border border-white/20
            backdrop-blur-sm
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Question</span>
            </div>

            {/* Difficulty indicator */}
            {card?.difficulty && (
              <div className="flex items-center space-x-1 bg-white/10 rounded-full px-2 py-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      i < card.difficulty 
                        ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Question Content - Auto-sizing */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center w-full">
              <div 
                ref={frontTextRef}
                className={`${frontTextSize} leading-relaxed text-white/95 break-words hyphens-auto`}
                style={{ 
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {card?.front 
                  ? truncateText(card.front, getMaxTextLength('front'))
                  : "Enter your question here..."
                }
              </div>
              
              {/* Show truncation indicator */}
              {card?.front && card.front.length > getMaxTextLength('front') && (
                <div className="mt-2 text-xs text-white/60 italic">
                  Content truncated - flip to see full answer
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end flex-shrink-0 mt-4">
            <div className="text-xs text-white/60 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click to reveal
            </div>
            
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div 
          className={`
            absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-2xl
            bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white
            flex flex-col p-6 md:p-8 border border-white/20
            backdrop-blur-sm rotate-y-180
          `}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Answer</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>

          {/* Answer Content - Auto-sizing dengan scroll untuk konten panjang */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="text-center">
                <div 
                  ref={backTextRef}
                  className={`${backTextSize} leading-relaxed text-white/95 mb-4 break-words hyphens-auto`}
                  style={{ 
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {card?.back || "Enter your answer here..."}
                </div>
                
                {/* Hints - Compact display */}
                {card?.hints && card.hints.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 mt-4">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-300">Hints</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {card.hints.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Tags */}
          <div className="flex justify-between items-end flex-shrink-0 mt-4">
            {/* Tags - Responsive display */}
            {card?.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 max-w-[60%]">
                {card.tags.slice(0, size === 'small' ? 2 : 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white/90 text-xs rounded-full font-medium truncate max-w-20"
                    title={tag}
                  >
                    #{tag}
                  </span>
                ))}
                {card.tags.length > (size === 'small' ? 2 : 3) && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white/90 text-xs rounded-full font-medium">
                    +{card.tags.length - (size === 'small' ? 2 : 3)}
                  </span>
                )}
              </div>
            )}
            
            <div className="text-xs text-white/60 flex items-center ml-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Flip back
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      {showControls && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleFlip}
            className="group inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashCard; 