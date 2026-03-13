'use client';

import { motion } from 'framer-motion';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-portfolio-primary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm"
          >
            © {currentYear} {name}. All rights reserved.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm flex items-center gap-2"
          >
            Built with{' '}
            <span className="text-portfolio-highlight">Next.js</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-portfolio-accent">Tailwind CSS</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-portfolio-primary">Framer Motion</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
