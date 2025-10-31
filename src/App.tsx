import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { useAccessibility } from './hooks/useAccessibility';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Footer } from './components/Footer';

function App() {
  const { language, t, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const accessibilityHook = useAccessibility();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>

      <Header
        t={t}
        language={language}
        toggleLanguage={toggleLanguage}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main id="main">
        <Hero t={t} />
        <Services t={t} />
        <Team t={t} />
        <Blog t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />

      <ChatWidget t={t} />

      <AccessibilityPanel
        t={t}
        accessibilitySettings={accessibilityHook.settings}
        accessibilityActions={{
          increaseFontSize: accessibilityHook.increaseFontSize,
          decreaseFontSize: accessibilityHook.decreaseFontSize,
          toggleHighContrast: accessibilityHook.toggleHighContrast,
          toggleReducedMotion: accessibilityHook.toggleReducedMotion,
          toggleReadableFont: accessibilityHook.toggleReadableFont,
          toggleTextToSpeech: accessibilityHook.toggleTextToSpeech,
        }}
      />
    </>
  );
}

export default App;
