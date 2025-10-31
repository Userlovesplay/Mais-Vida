import { useState, useEffect } from 'react';
import { accessibilityManager } from '../utils/accessibility';
import { storage } from '../utils/storage';

export const useAccessibility = () => {
  const [settings, setSettings] = useState(() => {
    return storage.get('accessibilitySettings', {
      fontSize: 0,
      highContrast: false,
      reducedMotion: false,
      readableFont: false,
      textToSpeech: false
    });
  });

  useEffect(() => {
    storage.set('accessibilitySettings', settings);

    accessibilityManager.fontSize.set(settings.fontSize);
    accessibilityManager.toggleHighContrast(settings.highContrast);
    accessibilityManager.toggleReducedMotion(settings.reducedMotion);
    accessibilityManager.toggleReadableFont(settings.readableFont);
  }, [settings]);

  const increaseFontSize = () => {
    const newLevel = accessibilityManager.fontSize.increase();
    setSettings(prev => ({ ...prev, fontSize: newLevel }));
  };

  const decreaseFontSize = () => {
    const newLevel = accessibilityManager.fontSize.decrease();
    setSettings(prev => ({ ...prev, fontSize: newLevel }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleReadableFont = () => {
    setSettings(prev => ({ ...prev, readableFont: !prev.readableFont }));
  };

  const toggleTextToSpeech = (text) => {
    const newState = !settings.textToSpeech;
    setSettings(prev => ({ ...prev, textToSpeech: newState }));
    accessibilityManager.textToSpeech.toggle(newState, text);
  };

  return {
    settings,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleReadableFont,
    toggleTextToSpeech
  };
};
