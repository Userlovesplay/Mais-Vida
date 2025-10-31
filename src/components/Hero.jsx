import { useEffect, useRef } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import photoTeam from '../assets/img/photo-7579831.webp';

export const Hero = ({ t }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up, .slide-left');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-card dark:from-dark-card to-white dark:to-dark-bg pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-primary-2 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted dark:text-dark-text/80 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 border-2 border-primary dark:border-primary-2 text-primary dark:text-primary-2 rounded-lg font-semibold transition-all hover:bg-primary/10 dark:hover:bg-primary-2/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t.hero.ctaSecondary}
                <Users className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="slide-left relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={photoTeam}
                alt="Medical team at Mais Vida clinic"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-2 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('services')}
          className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary-2/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Scroll to services"
        >
          <svg
            className="w-6 h-6 text-primary dark:text-primary-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
