import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.errors.nameRequired;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t.contact.errors.emailInvalid;
    }

    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.contact.errors.phoneInvalid;
    }

    if (!formData.consent) {
      newErrors.consent = t.contact.errors.consentRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
        consent: false
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-card dark:bg-dark-card"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-2 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted dark:text-dark-text/70">
              {t.contact.subtitle}
            </p>
          </div>

          {submitSuccess && (
            <div
              className="mb-6 p-4 bg-primary-2/20 border border-primary-2 rounded-lg flex items-start gap-3 fade-up"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-text dark:text-dark-text">{t.contact.success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 fade-up" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
              >
                {t.contact.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-primary/20 dark:border-primary-2/20 focus:ring-primary'
                } bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 transition-colors`}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
                >
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-primary/20 dark:border-primary-2/20 focus:ring-primary'
                  } bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 transition-colors`}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
                >
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.contact.phonePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-primary/20 dark:border-primary-2/20 focus:ring-primary'
                  } bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 transition-colors`}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
                >
                  {t.contact.date}
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-primary-2/20 bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
                >
                  {t.contact.time}
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-primary-2/20 bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-text dark:text-dark-text mb-2"
              >
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-primary-2/20 bg-white dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-primary/20 dark:border-primary-2/20 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  aria-invalid={errors.consent ? 'true' : 'false'}
                />
                <span className="text-sm text-muted dark:text-dark-text/70 group-hover:text-text dark:group-hover:text-dark-text transition-colors">
                  {t.contact.consent}
                </span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.consent}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  {t.contact.submit}
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
