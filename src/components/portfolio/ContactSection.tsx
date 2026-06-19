'use client';

import { motion } from 'framer-motion';

interface ContactSectionProps {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export function ContactSection({ email, github, linkedin, location }: ContactSectionProps) {
  const links = [
    { label: 'Email', value: email, href: `mailto:${email}` },
    { label: 'GitHub', value: 'github.com/metachemist', href: github },
    { label: 'LinkedIn', value: 'linkedin.com/in/hafsashahid03', href: linkedin },
    { label: 'Location', value: location, href: undefined },
  ];

  return (
    <section id="contact" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-8"
            >
              Contact
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-5xl md:text-6xl font-semibold mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-serif), Playfair Display, serif', color: 'var(--ed-text)' }}
            >
              Thank you.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: '1.75', maxWidth: '380px' }}
            >
              I'm always open to new projects, collaborations, or just a conversation about technology and design.
            </motion.p>

            <motion.a
              href={`mailto:${email}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-block px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
              style={{
                background: 'var(--ed-text)',
                color: 'var(--ed-bg)',
                fontFamily: 'var(--font-sans), sans-serif',
              }}
            >
              Say hello →
            </motion.a>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-8"
            >
              Links
            </motion.p>

            <div className="space-y-0" style={{ borderTop: '1px solid var(--ed-border)' }}>
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid var(--ed-border)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                    {link.label}
                  </span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif' }}
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif' }}>
                      {link.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
