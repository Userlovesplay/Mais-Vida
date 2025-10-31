import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import logoMaisVida from '../assets/favicon/logo-MaisVida.png';

export const Header = ({ t, language, toggleLanguage, isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-dark-bg/98 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1"
          >
            <img
              src={logoMaisVida}
              alt="Mais Vida Logo"
              className={`h-40 w-auto transition-all ${isDark ? 'brightness-0 invert' : ''}`}
            />
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary-2 transition-colors font-medium">
              {t.nav.home}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary-2 transition-colors font-medium">
              {t.nav.services}
            </button>
            <button onClick={() => scrollToSection('team')} className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary-2 transition-colors font-medium">
              {t.nav.team}
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary-2 transition-colors font-medium">
              {t.nav.blog}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary-2 transition-colors font-medium">
              {t.nav.contact}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary-2/10 transition-colors"
            >
              <div className="flex items-center gap-1">
                <Globe className="w-5 h-5 text-text dark:text-dark-text" />
                <span className="text-sm font-medium text-text dark:text-dark-text">
                  {language === 'pt' ? 'EN' : 'PT'}
                </span>
              </div>
            </button>

            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary-2/10 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-dark-text" /> : <Moon className="w-5 h-5 text-text" />}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-md transition-all font-semibold"
            >
              {t.nav.bookNow}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary-2/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-text dark:text-dark-text" /> : <Menu className="w-6 h-6 text-text dark:text-dark-text" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary/10 dark:border-primary-2/10">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-left px-4 py-2 text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10 rounded-md">
                {t.nav.home}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left px-4 py-2 text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10 rounded-md">
                {t.nav.services}
              </button>
              <button onClick={() => scrollToSection('team')} className="text-left px-4 py-2 text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10 rounded-md">
                {t.nav.team}
              </button>
              <button onClick={() => scrollToSection('blog')} className="text-left px-4 py-2 text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10 rounded-md">
                {t.nav.blog}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left px-4 py-2 text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary-2/10 rounded-md">
                {t.nav.contact}
              </button>
              <button onClick={() => scrollToSection('contact')} className="mx-4 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-md text-center font-semibold">
                {t.nav.bookNow}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};