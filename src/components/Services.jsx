import { useEffect, useRef } from 'react';
import { Heart, Brain, Activity, Smile, Stethoscope, ArrowRight, Baby } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <div
      className="service-card bg-card dark:bg-dark-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 bg-primary-2/20 dark:bg-primary-2/30 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-primary dark:text-primary-2" />
      </div>
      <h3 className="text-xl font-bold text-text dark:text-dark-text mb-4">{title}</h3>
      <p className="text-muted dark:text-dark-text/70 mb-6 leading-relaxed">{description}</p>
      <button className="inline-flex items-center text-primary dark:text-primary-2 font-semibold hover:gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
        Saiba Mais
        <ArrowRight className="ml-1 w-4 h-4" />
      </button>
    </div>
  );
};

export const Services = ({ t }) => {
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

  const services = [
    {
      icon: Heart,
      title: t.services?.cardiology?.title,
      description: t.services?.cardiology?.description
    },
    {
      icon: Brain,
      title: t.services?.neurology?.title,
      description: t.services?.neurology?.description
    },
    {
      icon: Activity,
      title: t.services?.physiotherapy?.title,
      description: t.services?.physiotherapy?.description
    },
    {
      icon: Smile,
      title: t.services?.psychology?.title,
      description: t.services?.psychology?.description
    },
    {
      icon: Stethoscope,
      title: t.services?.generalMedicine?.title,
      description: t.services?.generalMedicine?.description
    },
    {
      icon: Baby,
      title: t.services?.pediatrics?.title,
      description: t.services?.pediatrics?.description
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white dark:bg-dark-bg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-2 mb-4">
            {t.services?.title}
          </h2>
          <p className="text-lg text-muted dark:text-dark-text/70 max-w-2xl mx-auto">
            {t.services?.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            service.title && (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};
