// src/components/flashcard/FlashCardVariants.jsx
import FlashCard from './FlashCard';

// Compact FlashCard untuk list views
export const CompactFlashCard = ({ card, ...props }) => {
  return (
    <div className="compact-flashcard">
      <FlashCard
        card={card}
        size="small"
        showControls={false}
        className="mx-auto"
        {...props}
      />
    </div>
  );
};

// Study Mode FlashCard dengan additional controls
export const StudyFlashCard = ({ 
  card, 
  onKnowIt, 
  onDontKnow,
  ...props 
}) => {
  return (
    <div className="study-flashcard">
      <FlashCard
        card={card}
        size="large"
        showControls={false}
        className="mx-auto mb-6"
        {...props}
      />
      
      {/* Study Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onDontKnow?.(card.id)}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Don't Know
        </button>
        <button
          onClick={() => onKnowIt?.(card.id)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Know It!
        </button>
      </div>
    </div>
  );
};

// Preview FlashCard untuk forms/editing
export const PreviewFlashCard = ({ cardData, ...props }) => {
  const previewCard = {
    id: 'preview',
    front: cardData?.front || 'Enter your question...',
    back: cardData?.back || 'Enter your answer...',
    hints: cardData?.hints || [],
    tags: cardData?.tags || [],
    difficulty: cardData?.difficulty || 1
  };

  return (
    <div className="preview-flashcard">
      <div className="mb-3 text-center">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
          Preview
        </span>
      </div>
      <FlashCard
        card={previewCard}
        size="medium"
        showControls={true}
        className="mx-auto opacity-90"
        {...props}
      />
    </div>
  );
};

// Loading FlashCard skeleton
export const FlashCardSkeleton = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-64 h-40",
    medium: "w-80 h-48", 
    large: "w-96 h-64"
  };

  return (
    <div className={`flashcard-skeleton ${sizeClasses[size]} rounded-2xl mx-auto`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      </div>
    </div>
  );
};

// Error FlashCard untuk error states
export const ErrorFlashCard = ({ error = "Failed to load card", size = "medium" }) => {
  const sizeClasses = {
    small: "w-64 h-40",
    medium: "w-80 h-48", 
    large: "w-96 h-64"
  };

  return (
    <div className={`${sizeClasses[size]} rounded-2xl mx-auto bg-red-50 border-2 border-red-200 flex items-center justify-center p-6`}>
      <div className="text-center">
        <div className="text-red-500 mb-2">
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="text-red-700 text-sm font-medium">
          {error}
        </div>
      </div>
    </div>
  );
};
