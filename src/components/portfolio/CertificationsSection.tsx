'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  status: 'completed' | 'in-progress';
  credentialUrl?: string;
  description?: string;
  skills?: string[];
}

const certifications: Certification[] = [
  {
    title: 'IBM RAG and Agentic AI Professional Certificate',
    issuer: 'IBM / Coursera',
    date: '2025',
    status: 'completed',
    description: 'Built end-to-end RAG pipelines from document ingestion and embedding to vector retrieval and LLM-grounded response generation. Built multi-agent systems using LangGraph and CrewAI with orchestration patterns like reflection, memory, and conditional logic. Completed a capstone designing a production-style multimodal RAG system combining structured data, retrieval evaluation strategies, and agentic workflows.',
    skills: ['RAG', 'LangGraph', 'CrewAI', 'MCP Servers', 'Vector Search', 'Agentic AI'],
  },
  {
    title: 'Generative AI: Prompt Engineering Basics',
    issuer: 'IBM / Coursera',
    date: '2025',
    status: 'completed',
    description: 'Learned zero-shot and few-shot prompting techniques to improve LLM output reliability. Practiced advanced methods: Chain-of-Thought, Tree-of-Thought, and Interview Pattern for structured, context-aware responses. Explored IBM Watson Prompt Lab, Spellbook, and Dust through hands-on labs.',
    skills: ['Prompt Engineering', 'Chain-of-Thought', 'Few-Shot Learning', 'IBM Watson', 'LLMs'],
  },
];

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass relative overflow-hidden rounded-xl p-4 md:p-5 card-hover group"
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            cert.status === 'completed'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-portfolio-highlight/20 text-portfolio-highlight border border-portfolio-highlight/30'
          }`}
        >
          {cert.status === 'completed' ? 'Completed' : 'In Progress'}
        </span>
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-portfolio-primary to-portfolio-accent flex items-center justify-center mb-3 group-hover:shadow-glow-primary transition-shadow">
        <Award className="w-5 h-5 text-white" />
      </div>

      {/* Title */}
      <h3 className="mb-1.5 text-base md:text-lg font-bold text-white group-hover:text-portfolio-highlight transition-colors">
        {cert.title}
      </h3>

      {/* Issuer & Date */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Building className="w-4 h-4" />
          <span>{cert.issuer}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{cert.date}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        {cert.description}
      </p>

      {/* Skills */}
      {cert.skills && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] bg-portfolio-section border border-portfolio-primary/30 text-portfolio-accent rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Credential link */}
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-portfolio-highlight text-sm hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          View Credential
        </a>
      )}
    </motion.div>
  );
};

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional certifications and courses that enhance my skills and knowledge
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>

        {/* Future certifications hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Continuously learning and expanding my expertise in AI, cloud computing, and web development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
