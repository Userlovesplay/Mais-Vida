import { useEffect, useRef } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import img1 from '../assets/img/photo-6823568.webp';
import img2 from '../assets/img/photo-4101143.jpeg';
import img3 from '../assets/img/photo-5858265.jpeg';


const BlogCard = ({ title, excerpt, image, date, readTime, readMoreText, delay }) => {
  return (
    <article
      className="blog-card bg-card dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted dark:text-dark-text/60 mb-3">
          <span className="inline-flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </span>
          <span className="inline-flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold text-text dark:text-dark-text mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted dark:text-dark-text/70 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <button className="inline-flex items-center text-primary dark:text-primary-2 font-semibold hover:gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
          {readMoreText}
          <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export const Blog = ({ t }) => {
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

  const blogPosts = [
    {
      title: t.blogPosts.post1.title,
      excerpt: t.blogPosts.post1.excerpt,
      image: img1,
      date: '15 Mar 2025',
      readTime: '5 min',
      readMoreText: t.blogPosts.post1.readMore
    },
    {
      title: t.blogPosts.post2.title,
      excerpt: t.blogPosts.post2.excerpt,
      image: img2,
      date: '10 Mar 2025',
      readTime: '7 min',
      readMoreText: t.blogPosts.post2.readMore
    },
    {
      title: t.blogPosts.post3.title,
      excerpt: t.blogPosts.post3.excerpt,
      image: img3,
      date: '5 Mar 2025',
      readTime: '6 min',
      readMoreText: t.blogPosts.post3.readMore
    }
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white dark:bg-dark-bg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-2 mb-4">
            {t.blog.title}
          </h2>
          <p className="text-lg text-muted dark:text-dark-text/70 max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};