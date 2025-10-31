import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return storage.get('darkMode', false);
  });

  useEffect(() => {
    storage.set('darkMode', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleTheme };
};
