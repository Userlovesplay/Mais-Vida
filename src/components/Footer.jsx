import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import logoMaisVida from '../assets/favicon/logo-MaisVida.png';

export const Footer = ({ t }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-primary dark:bg-primary/95 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src={logoMaisVida}
                alt="Mais Vida Logo"
                className="h-[180px] w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              {t.footer.aboutText}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{t.footer.addressLine1}</p>
                  <p>{t.footer.addressLine2}</p>
                  <p>{t.footer.addressLine3}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+551133334444" className="hover:text-white transition-colors">
                  +55 (11) 3333-4444
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:contato@maisvida.com" className="hover:text-white transition-colors">
                  contato@maisvida.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('team')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t.nav.team}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.social}</h3>
            <div className="flex gap-4 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Facebook da Mais Vida"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Instagram da Mais Vida"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Twitter da Mais Vida"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="LinkedIn da Mais Vida"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-2">
                {t.hours.title}
              </p>
              <p className="text-white/90">{t.hours.weekdays}</p>
              <p className="text-white/90">{t.hours.saturday}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t.footer.newsletter}</h3>
            <p className="text-white/80 mb-4">{t.footer.newsletterText}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-white/90 text-primary rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                {t.footer.subscribe}
                <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm text-center md:text-left">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <button className="text-white/70 hover:text-white transition-colors">
              {t.footer.privacy}
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};