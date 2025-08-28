// src/components/flashcard/FlashCardForm.jsx
import { useState, useEffect } from 'react';
import { useFlashCard } from '../../context/FlashContext';
import { PreviewFlashCard } from './FlashCardVariants';
import { validateCard } from '../../utils/validation';

const FlashCardForm = ({ 
  initialCard = null, 
  deckId = null, 
  onSubmit = null,
  onCancel = null,
  mode = 'create' // 'create' or 'edit'
}) => {
  const { createCard, updateCard, decks, cards, getDeckById } = useFlashCard();
  
  // Form state
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    hints: [],
    tags: [],
    difficulty: 1,
    deckId: deckId || ''
  });
  
  const [currentHint, setCurrentHint] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Initialize form dengan data yang ada (untuk edit mode)
  useEffect(() => {
    if (initialCard) {
      setFormData({
        front: initialCard.front || '',
        back: initialCard.back || '',
        hints: initialCard.hints || [],
        tags: initialCard.tags || [],
        difficulty: initialCard.difficulty || 1,
        deckId: deckId || initialCard.deckId || ''
      });
    }
  }, [initialCard, deckId]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error saat user mulai typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Handle hints
  const addHint = () => {
    if (currentHint.trim() && formData.hints.length < 5) {
      setFormData(prev => ({
        ...prev,
        hints: [...prev.hints, currentHint.trim()]
      }));
      setCurrentHint('');
    }
  };

  const removeHint = (index) => {
    setFormData(prev => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index)
    }));
  };

  // Handle tags
  const addTag = () => {
    if (currentTag.trim() && formData.tags.length < 10 && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // Handle Enter key untuk hints dan tags
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'hint') addHint();
      if (type === 'tag') addTag();
    }
  };

  // Validate form
  const validateForm = () => {
    const validation = validateCard(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!formData.deckId) {
      setErrors({ deckId: 'Please select a deck' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const cardData = {
        front: formData.front.trim(),
        back: formData.back.trim(),
        hints: formData.hints,
        tags: formData.tags,
        difficulty: formData.difficulty
      };

      let result;
      if (mode === 'edit' && initialCard) {
        result = await updateCard(formData.deckId, initialCard.id, cardData);
      } else {
        result = await createCard(formData.deckId, cardData);
      }

      // Success callback
      if (onSubmit) {
        onSubmit(result);
      } else {
        // Reset form jika tidak ada callback
        setFormData({
          front: '',
          back: '',
          hints: [],
          tags: [],
          difficulty: 1,
          deckId: formData.deckId // Keep deck selection
        });
      }
      
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to save card' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current deck info
  const currentDeck = formData.deckId ? getDeckById(formData.deckId) : null;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {mode === 'edit' ? 'Edit FlashCard' : 'Create New FlashCard'}
          </h2>
          <p className="text-gray-600">
            {mode === 'edit' 
              ? 'Update your flashcard content below' 
              : 'Fill in the details to create a new flashcard'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Deck Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Deck *
            </label>
            <select
              value={formData.deckId}
              onChange={(e) => handleInputChange('deckId', e.target.value)}
              className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.deckId ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={mode === 'edit' && deckId} // Lock deck selection dalam edit mode
            >
              <option value="">Choose a deck...</option>
              {decks.map(deck => (
                <option key={deck.id} value={deck.id}>
                  {deck.name} ({deck.category})
                </option>
              ))}
            </select>
            {errors.deckId && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {errors.deckId}
              </p>
            )}
          </div>

          {/* Question (Front) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question (Front Side) *
            </label>
            <textarea
              value={formData.front}
              onChange={(e) => handleInputChange('front', e.target.value)}
              placeholder="Enter your question here..."
              rows={3}
              className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.front ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.front ? (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.front}
                </p>
              ) : (
                <div></div>
              )}
              <span className={`text-sm ${formData.front.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                {formData.front.length}/250
              </span>
            </div>
          </div>

          {/* Answer (Back) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Answer (Back Side) *
            </label>
            <textarea
              value={formData.back}
              onChange={(e) => handleInputChange('back', e.target.value)}
              placeholder="Enter the answer here..."
              rows={4}
              className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.back ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.back ? (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.back}
                </p>
              ) : (
                <div></div>
              )}
              <span className={`text-sm ${formData.back.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                {formData.back.length}/500
              </span>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleInputChange('difficulty', level)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 hover:scale-110 ${
                    formData.difficulty === level
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-110'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              1 = Very Easy, 5 = Very Hard
            </p>
          </div>

          {/* Hints Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Hints (Optional)
            </label>
            
            {/* Current hints */}
            {formData.hints.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {formData.hints.map((hint, index) => (
                    <div key={index} className="group flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      <span className="mr-2">💡 {hint}</span>
                      <button
                        type="button"
                        onClick={() => removeHint(index)}
                        className="text-yellow-600 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add hint input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentHint}
                onChange={(e) => setCurrentHint(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'hint')}
                placeholder="Add a helpful hint..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                maxLength={100}
                disabled={formData.hints.length >= 5}
              />
              <button
                type="button"
                onClick={addHint}
                disabled={!currentHint.trim() || formData.hints.length >= 5}
                className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 font-medium"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.hints.length}/5 hints added
            </p>
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tags (Optional)
            </label>
            
            {/* Current tags */}
            {formData.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="group flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <span className="mr-2">#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add tag input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'tag')}
                placeholder="Add tags (e.g., math, science)..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                maxLength={20}
                disabled={formData.tags.length >= 10}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!currentTag.trim() || formData.tags.length >= 10 || formData.tags.includes(currentTag.trim().toLowerCase())}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 font-medium"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.tags.length}/10 tags added
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || !formData.front.trim() || !formData.back.trim()}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {mode === 'edit' ? 'Update Card' : 'Create Card'}
                </>
              )}
            </button>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {errors.submit}
            </div>
          )}
        </form>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Live Preview</h3>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className={`w-5 h-5 transition-transform duration-200 ${showPreview ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Preview Card */}
          {showPreview && (
            <div className="transition-all duration-300">
              <PreviewFlashCard 
                cardData={formData}
                onFlip={(flipped) => console.log('Preview card flipped:', flipped)}
              />
            </div>
          )}
        </div>

        {/* Current Deck Info */}
        {currentDeck && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Deck Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-800">{currentDeck.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-800 capitalize">{currentDeck.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Cards:</span>
                <span className="font-medium text-gray-800">{cards[currentDeck.id]?.length || 0}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Keep questions clear and specific
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Use hints to guide learning, not give away answers
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Add relevant tags for better organization
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Set appropriate difficulty for effective review spacing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlashCardForm;