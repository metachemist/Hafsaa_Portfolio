'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  githubUrl: string;
  resumeUrl?: string;
}

export function HeroSection({ name, title, bio, avatarUrl, githubUrl, resumeUrl }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20">
      <div className="container mx-auto max-w-6xl">

        {/* Editorial masthead: huge "Portfolio" title */}
        <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--ed-border)' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="section-label mb-5"
          >
            Portfolio — {siteConfig.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            style={{
              fontFamily: 'var(--font-serif), Playfair Display, Georgia, serif',
              fontSize: 'clamp(5rem, 13vw, 12rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--ed-text)',
            }}
          >
            Portfolio
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-4"
          >
            <span
              style={{
                fontFamily: 'var(--font-serif), Playfair Display, serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ed-text)',
              }}
            >
              {name}
            </span>
            <span style={{ color: 'var(--ed-border-strong)', fontSize: '1rem' }}>—</span>
            <span
              style={{
                fontFamily: 'var(--font-sans), DM Sans, sans-serif',
                fontSize: '0.875rem',
                color: 'var(--ed-muted)',
              }}
            >
              {title}
            </span>
          </motion.div>
        </div>

        {/* Two columns: circular photo (left) | Hello intro (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">

          {/* Left: circular portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-start"
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: 'clamp(200px, 25vw, 300px)',
                height: 'clamp(200px, 25vw, 300px)',
                borderRadius: '50%',
                border: '1px solid var(--ed-border-strong)',
                flexShrink: 0,
              }}
            >
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Hello, + bio + links */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              style={{
                fontFamily: 'var(--font-serif), Playfair Display, serif',
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 600,
                lineHeight: 1,
                color: 'var(--ed-text)',
                marginBottom: '1.5rem',
              }}
            >
              Hello,
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-sans), DM Sans, sans-serif',
                fontSize: '0.9375rem',
                color: 'var(--ed-muted)',
                lineHeight: 1.8,
                maxWidth: '480px',
                marginBottom: '2.5rem',
              }}
            >
              {bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                style={{
                  background: 'var(--ed-text)',
                  color: 'var(--ed-bg)',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                View Work
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: '1px solid var(--ed-border-strong)',
                  color: 'var(--ed-text)',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.25rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                GitHub
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: '1px solid var(--ed-border)',
                    color: 'var(--ed-muted)',
                    fontFamily: 'var(--font-sans), sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.25rem',
                    textDecoration: 'none',
                    transition: 'opacity 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Resume ↗
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--ed-muted))' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
