import { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { storage } from '../utils/storage';

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    return storage.get('language', 'pt');
  });

  useEffect(() => {
    storage.set('language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en-US';
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return { language, t, toggleLanguage };
};
