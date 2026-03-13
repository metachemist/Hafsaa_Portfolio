'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, FileText, ExternalLink, Download, Eye } from 'lucide-react';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  githubUrl: string;
  resumeUrl?: string;
}

export function HeroSection({
  name,
  title,
  bio,
  avatarUrl,
  githubUrl,
  resumeUrl,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-portfolio-primary/50 glow-primary">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-portfolio-highlight/30"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                <span className="gradient-text">{name}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-6"
              >
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xl md:text-2xl text-portfolio-highlight font-medium">
                  {title}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-muted-foreground text-lg max-w-xl mb-8"
              >
                {bio}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <a
                  href="#projects"
                  className="group relative px-6 py-3 bg-portfolio-primary text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-glow-primary btn-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-transparent border border-portfolio-primary text-portfolio-primary rounded-lg font-medium transition-all duration-300 hover:bg-portfolio-primary/10 hover:border-portfolio-highlight hover:shadow-glow-primary"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    GitHub
                  </span>
                </a>

                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 bg-portfolio-section border border-portfolio-accent text-white rounded-lg font-medium transition-all duration-300 hover:bg-portfolio-accent/20 hover:shadow-glow-accent"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Resume
                    </span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-portfolio-primary/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-portfolio-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
