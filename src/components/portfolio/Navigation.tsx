'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavigationProps {
  sections: { id: string; label: string }[];
  githubUrl: string;
  email?: string;
}

export function Navigation({ sections, githubUrl: _githubUrl, email }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(14,14,12,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,235,225,0.08)' : '1px solid transparent',
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-sm font-medium tracking-wide"
          style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), DM Sans, sans-serif' }}
        >
          Hafsa Shahid
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {sections.slice(1).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="px-3 py-1.5 rounded text-sm transition-all duration-200"
              style={{
                color: activeSection === section.id ? 'var(--ed-text)' : 'var(--ed-muted)',
                background: activeSection === section.id ? 'rgba(240,235,225,0.08)' : 'transparent',
                fontFamily: 'var(--font-sans), sans-serif',
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="text-sm transition-opacity hover:opacity-60"
          style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}
        >
          Say hello
        </a>
      </div>
    </motion.header>
  );
}
