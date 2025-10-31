export const accessibilityManager = {
  fontSize: {
    levels: ['100%', '112%', '125%'],
    current: 0,

    increase: function() {
      if (this.current < this.levels.length - 1) {
        this.current++;
        document.documentElement.style.fontSize = this.levels[this.current];
        return this.current;
      }
      return this.current;
    },

    decrease: function() {
      if (this.current > 0) {
        this.current--;
        document.documentElement.style.fontSize = this.levels[this.current];
        return this.current;
      }
      return this.current;
    },

    set: function(level) {
      if (level >= 0 && level < this.levels.length) {
        this.current = level;
        document.documentElement.style.fontSize = this.levels[this.current];
      }
    }
  },

  toggleHighContrast: (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  },

  toggleReducedMotion: (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  },

  toggleReadableFont: (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('readable-font');
    } else {
      document.documentElement.classList.remove('readable-font');
    }
  },

  textToSpeech: {
    synthesis: window.speechSynthesis,
    utterance: null,
    speaking: false,

    speak: function(text) {
      if (this.synthesis && text) {
        this.stop();
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.lang = 'pt-BR';
        this.utterance.rate = 0.9;
        this.utterance.pitch = 1;

        this.utterance.onstart = () => {
          this.speaking = true;
        };

        this.utterance.onend = () => {
          this.speaking = false;
        };

        this.synthesis.speak(this.utterance);
      }
    },

    stop: function() {
      if (this.synthesis) {
        this.synthesis.cancel();
        this.speaking = false;
      }
    },

    toggle: function(enabled, text) {
      if (enabled && text) {
        this.speak(text);
      } else {
        this.stop();
      }
    }
  },

  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }

      if (e.key === 'Escape') {
        element.dispatchEvent(new CustomEvent('escapepressed'));
      }
    };

    element.addEventListener('keydown', handleTab);

    return () => {
      element.removeEventListener('keydown', handleTab);
    };
  }
};
