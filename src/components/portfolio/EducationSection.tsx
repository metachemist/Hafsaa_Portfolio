'use client';

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Karachi',
    period: '2022 – Present',
    detail: 'Final year. Coursework covers data structures, algorithms, databases, networks, and software engineering.',
  },
];

const certifications = [
  {
    title: 'IBM Generative AI Engineering',
    issuer: 'Coursera',
    period: '2025 – Present',
    status: 'In Progress',
    skills: ['Generative AI', 'LLM', 'Prompt Engineering', 'IBM Watson'],
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Coursera',
    period: '2023',
    status: 'Completed',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
];

const languages = [
  { name: 'Urdu', level: 'Native' },
  { name: 'English', level: 'Professional' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Education */}
          <div>
            <motion.p {...fadeUp(0)} className="section-label mb-8">Education</motion.p>

            <div className="space-y-8">
              {education.map((item, i) => (
                <motion.div key={i} {...fadeUp(0.08 * i)}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="text-xl font-semibold leading-snug"
                      style={{ fontFamily: 'var(--font-serif), Playfair Display, serif', color: 'var(--ed-text)' }}
                    >
                      {item.institution}
                    </h3>
                    <span className="shrink-0 text-xs mt-1" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--ed-accent)', fontFamily: 'var(--font-sans), sans-serif' }}>
                    {item.degree}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: '1.7' }}>
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.p {...fadeUp(0.1)} className="section-label mt-14 mb-8">Certifications</motion.p>

            <div className="space-y-6">
              {certifications.map((cert, i) => (
                <motion.div key={i} {...fadeUp(0.08 + i * 0.08)}>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4
                      className="text-base font-semibold"
                      style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif' }}
                    >
                      {cert.title}
                    </h4>
                    <span
                      className="shrink-0 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: cert.status === 'Completed'
                          ? 'rgba(100,200,100,0.1)'
                          : 'rgba(201,184,150,0.1)',
                        color: cert.status === 'Completed' ? '#6dbb6d' : 'var(--ed-accent)',
                        border: `1px solid ${cert.status === 'Completed' ? 'rgba(100,200,100,0.2)' : 'rgba(201,184,150,0.2)'}`,
                        fontFamily: 'var(--font-sans), sans-serif',
                      }}
                    >
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                    {cert.issuer} · {cert.period}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="ed-tag">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <motion.p {...fadeUp(0.05)} className="section-label mb-8">Languages</motion.p>

            <div className="space-y-6">
              {languages.map((lang, i) => (
                <motion.div key={i} {...fadeUp(0.08 + i * 0.08)} className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--ed-border)' }}>
                  <span
                    className="text-2xl font-semibold"
                    style={{ fontFamily: 'var(--font-serif), Playfair Display, serif', color: 'var(--ed-text)' }}
                  >
                    {lang.name}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
