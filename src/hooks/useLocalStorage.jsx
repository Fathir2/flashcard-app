import { useState, useEffect } from 'react';
import StorageManager from '../utils/storage';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    return StorageManager.getItem(key, initialValue);
  });

  // Update localStorage when value changes
  useEffect(() => {
    StorageManager.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;