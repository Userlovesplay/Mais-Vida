import { useState, useEffect, useRef } from 'react';
import { X, Calendar } from 'lucide-react';
import { accessibilityManager } from '../utils/accessibility';
import cardiologistaImg from '../assets/team/Cardiologista.png';
import neurologistaImg from '../assets/team/Neurologista.png';
import fisioterapeutaImg from '../assets/team/Fisioterapeuta.png';
import psicologoImg from '../assets/team/Psicólogo.png';

const TeamMember = ({ name, role, specialty, image, bio, onClick, t }) => {
  return (
    <div
      className="team-card bg-card dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer fade-up"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View profile of Dr. ${name}`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`Dr. ${name}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text dark:text-dark-text mb-2">{t.team.prefix} {name}</h3>
        <p className="text-muted dark:text-dark-text/70 mb-3">{role}</p>
        <div className="flex flex-wrap gap-2">
          {specialty.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-2/20 dark:bg-primary-2/30 text-primary dark:text-primary-2 text-sm rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamModal = ({ member, onClose, t }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const cleanup = accessibilityManager.trapFocus(modalRef.current);
    const handleEscape = () => onClose();
    modalRef.current?.addEventListener('escapepressed', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      cleanup();
      document.body.style.overflow = '';
      modalRef.current?.removeEventListener('escapepressed', handleEscape);
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={member.image}
            alt={`Dr. ${member.name}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-dark-bg/90 rounded-full hover:bg-white dark:hover:bg-dark-bg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text dark:text-dark-text" />
          </button>
        </div>
        <div className="p-8">
          <h2 id="modal-title" className="text-3xl font-bold text-text dark:text-dark-text mb-2">
            {t.team.prefix} {member.name}
          </h2>
          <p className="text-lg text-muted dark:text-dark-text/70 mb-4">{member.role}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {member.specialty.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-2/20 dark:bg-primary-2/30 text-primary dark:text-primary-2 text-sm rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-text dark:text-dark-text leading-relaxed">{member.bio}</p>
          </div>
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Calendar className="mr-2 w-5 h-5" />
            {t.team.schedule}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Team = ({ t }) => {
  const [selectedMember, setSelectedMember] = useState(null);
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

  const teamMembers = [
    {
      name: t.teamMembers.member1.name,
      role: t.teamMembers.member1.role,
      specialty: t.teamMembers.member1.specialty,
      image: cardiologistaImg,
      bio: t.teamMembers.member1.bio
    },
    {
      name: t.teamMembers.member2.name,
      role: t.teamMembers.member2.role,
      specialty: t.teamMembers.member2.specialty,
      image: neurologistaImg,
      bio: t.teamMembers.member2.bio
    },
    {
      name: t.teamMembers.member3.name,
      role: t.teamMembers.member3.role,
      specialty: t.teamMembers.member3.specialty,
      image: fisioterapeutaImg,
      bio: t.teamMembers.member3.bio
    },
    {
      name: t.teamMembers.member4.name,
      role: t.teamMembers.member4.role,
      specialty: t.teamMembers.member4.specialty,
      image: psicologoImg,
      bio: t.teamMembers.member4.bio
    }
  ];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-card dark:bg-dark-card"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-2 mb-4">
            {t.team.title}
          </h2>
          <p className="text-lg text-muted dark:text-dark-text/70 max-w-2xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              {...member}
              onClick={() => setSelectedMember(member)}
              t={t}
            />
          ))}
        </div>
      </div>
      {selectedMember && (
        <TeamModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          t={t}
        />
      )}
    </section>
  );
};