'use client';

import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface ResumeSectionProps {
  resumeUrl: string;
}

export function ResumeSection({ resumeUrl }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            View or download my professional resume
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {/* PDF Viewer */}
          <div className="relative w-full aspect-[1/1.4] md:aspect-[1/1.3] bg-portfolio-bg rounded-lg overflow-hidden mb-6">
            <iframe
              src={`${resumeUrl}#view=fitH`}
              className="w-full h-full"
              title="Resume"
            />
            <div className="absolute inset-0 pointer-events-none border border-portfolio-primary/20 rounded-lg" />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={resumeUrl}
              download
              className="flex items-center gap-2 px-6 py-3 bg-portfolio-primary text-white rounded-lg font-medium transition-all hover:shadow-glow-primary btn-glow"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-portfolio-primary text-portfolio-primary rounded-lg font-medium transition-all hover:bg-portfolio-primary/10 hover:border-portfolio-highlight"
            >
              <ExternalLink className="w-5 h-5" />
              Open in New Tab
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
