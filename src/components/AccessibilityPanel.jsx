import { useState, useEffect, useRef } from 'react';
import { Accessibility, X, Plus, Minus, Contrast, ZapOff, Type, Volume2 } from 'lucide-react';
import { accessibilityManager } from '../utils/accessibility';

export const AccessibilityPanel = ({ t, accessibilitySettings, accessibilityActions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const cleanup = accessibilityManager.trapFocus(panelRef.current);

      const handleEscape = () => setIsOpen(false);
      panelRef.current?.addEventListener('escapepressed', handleEscape);

      return () => {
        cleanup();
        panelRef.current?.removeEventListener('escapepressed', handleEscape);
      };
    }
  }, [isOpen]);

  const toggleTextToSpeech = () => {
    const mainContent = document.querySelector('main')?.textContent || '';
    accessibilityActions.toggleTextToSpeech(mainContent);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label={t.accessibility.open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={panelRef}
            className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-md shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            <div className="bg-primary dark:bg-primary/90 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 id="accessibility-title" className="font-semibold text-lg">
                {t.accessibility.title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t.accessibility.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-card dark:bg-dark-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-primary dark:text-primary-2" />
                  <span className="text-text dark:text-dark-text font-medium">
                    {t.accessibility.font}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={accessibilityActions.decreaseFontSize}
                    disabled={accessibilitySettings.fontSize === 0}
                    className="p-2 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-primary dark:text-primary-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={t.accessibility.decreaseFont}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-muted dark:text-dark-text/70 w-8 text-center">
                    {accessibilitySettings.fontSize + 1}
                  </span>
                  <button
                    onClick={accessibilityActions.increaseFontSize}
                    disabled={accessibilitySettings.fontSize === 2}
                    className="p-2 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-primary dark:text-primary-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={t.accessibility.increaseFont}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={accessibilityActions.toggleHighContrast}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  accessibilitySettings.highContrast
                    ? 'bg-primary text-white'
                    : 'bg-card dark:bg-dark-bg text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10'
                }`}
                role="switch"
                aria-checked={accessibilitySettings.highContrast}
              >
                <div className="flex items-center gap-3">
                  <Contrast className="w-5 h-5" />
                  <span className="font-medium">{t.accessibility.highContrast}</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.highContrast ? 'bg-white/30' : 'bg-primary/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      accessibilitySettings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </button>

              <button
                onClick={accessibilityActions.toggleReducedMotion}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  accessibilitySettings.reducedMotion
                    ? 'bg-primary text-white'
                    : 'bg-card dark:bg-dark-bg text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10'
                }`}
                role="switch"
                aria-checked={accessibilitySettings.reducedMotion}
              >
                <div className="flex items-center gap-3">
                  <ZapOff className="w-5 h-5" />
                  <span className="font-medium">{t.accessibility.disableAnimations}</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.reducedMotion ? 'bg-white/30' : 'bg-primary/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      accessibilitySettings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </button>

              <button
                onClick={accessibilityActions.toggleReadableFont}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  accessibilitySettings.readableFont
                    ? 'bg-primary text-white'
                    : 'bg-card dark:bg-dark-bg text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10'
                }`}
                role="switch"
                aria-checked={accessibilitySettings.readableFont}
              >
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5" />
                  <span className="font-medium">{t.accessibility.readableFont}</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.readableFont ? 'bg-white/30' : 'bg-primary/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      accessibilitySettings.readableFont ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </button>

              <button
                onClick={toggleTextToSpeech}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  accessibilitySettings.textToSpeech
                    ? 'bg-primary text-white'
                    : 'bg-card dark:bg-dark-bg text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10'
                }`}
                role="switch"
                aria-checked={accessibilitySettings.textToSpeech}
              >
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">{t.accessibility.textToSpeech}</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    accessibilitySettings.textToSpeech ? 'bg-white/30' : 'bg-primary/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      accessibilitySettings.textToSpeech ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};