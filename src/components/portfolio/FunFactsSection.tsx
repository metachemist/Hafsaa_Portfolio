'use client';

import { motion } from 'framer-motion';

const facts = [
  { n: '01', text: 'I started coding during lockdown and have not stopped since.' },
  { n: '02', text: 'I am equally fascinated by design and algorithms — the UI is part of the logic.' },
  { n: '03', text: "Karachi's traffic taught me asynchronous thinking long before I wrote async/await." },
  { n: '04', text: 'I name my projects like they are children — carefully, then immediately second-guess it.' },
  { n: '05', text: "My debugging process: search the error → Stack Overflow → GitHub issues → realize it was a typo." },
];

export function FunFactsSection() {
  return (
    <section id="funfacts" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif), Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600,
            color: 'var(--ed-text)',
            lineHeight: 1,
            marginBottom: '3rem',
          }}
        >
          Fun Facts.
        </motion.h2>

        <div className="space-y-0" style={{ borderTop: '1px solid var(--ed-border)' }}>
          {facts.map((fact, i) => (
            <motion.div
              key={fact.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-8 py-5"
              style={{ borderBottom: '1px solid var(--ed-border)' }}
            >
              <span
                className="text-xs shrink-0 w-6 mt-0.5"
                style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-mono), monospace', opacity: 0.5 }}
              >
                {fact.n}
              </span>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif', maxWidth: '560px', lineHeight: '1.7' }}
              >
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
