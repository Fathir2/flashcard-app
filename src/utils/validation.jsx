// src/utils/validation.jsx
export const validateCard = (cardData) => {
  const errors = {};

  // Validate front (question)
  if (!cardData.front?.trim()) {
    errors.front = 'Question is required';
  } else if (cardData.front.trim().length < 3) {
    errors.front = 'Question must be at least 3 characters long';
  } else if (cardData.front.length > 250) {
    errors.front = 'Question is too long (max 250 characters)';
  }

  // Validate back (answer)
  if (!cardData.back?.trim()) {
    errors.back = 'Answer is required';
  } else if (cardData.back.trim().length < 2) {
    errors.back = 'Answer must be at least 2 characters long';
  } else if (cardData.back.length > 500) {
    errors.back = 'Answer is too long (max 500 characters)';
  }

  // Validate difficulty
  if (!cardData.difficulty || cardData.difficulty < 1 || cardData.difficulty > 5) {
    errors.difficulty = 'Difficulty must be between 1 and 5';
  }

  // Validate deck selection
  if (!cardData.deckId?.trim()) {
    errors.deckId = 'Please select a deck';
  }

  // Validate hints (optional)
  if (cardData.hints && cardData.hints.length > 5) {
    errors.hints = 'Maximum 5 hints allowed';
  }

  // Validate individual hint length
  if (cardData.hints) {
    cardData.hints.forEach((hint, index) => {
      if (hint.length > 100) {
        errors.hints = `Hint ${index + 1} is too long (max 100 characters)`;
      }
    });
  }

  // Validate tags (optional)
  if (cardData.tags && cardData.tags.length > 10) {
    errors.tags = 'Maximum 10 tags allowed';
  }

  // Validate individual tag length
  if (cardData.tags) {
    cardData.tags.forEach((tag, index) => {
      if (tag.length > 20) {
        errors.tags = `Tag ${index + 1} is too long (max 20 characters)`;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDeck = (deckData) => {
  const errors = {};

  // Validate name
  if (!deckData.name?.trim()) {
    errors.name = 'Deck name is required';
  } else if (deckData.name.trim().length < 3) {
    errors.name = 'Deck name must be at least 3 characters long';
  } else if (deckData.name.length > 50) {
    errors.name = 'Deck name is too long (max 50 characters)';
  }

  // Validate description
  if (deckData.description && deckData.description.length > 200) {
    errors.description = 'Description is too long (max 200 characters)';
  }

  // Validate category
  if (!deckData.category?.trim()) {
    errors.category = 'Please select a category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, ''); // Remove potentially dangerous characters
};

export const formatTag = (tag) => {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, '') // Only allow alphanumeric, dash, underscore
    .slice(0, 20); // Limit length
};

export const validateFormField = (field, value, rules = {}) => {
  const errors = [];

  // Required validation
  if (rules.required && !value?.trim()) {
    errors.push(`${field} is required`);
    return errors;
  }

  if (!value?.trim()) return errors; // Skip other validations if empty and not required

  // Min length validation
  if (rules.minLength && value.trim().length < rules.minLength) {
    errors.push(`${field} must be at least ${rules.minLength} characters long`);
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`${field} is too long (max ${rules.maxLength} characters)`);
  }

  // Custom pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || `${field} format is invalid`);
  }

  return errors;
};