'use client';

import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiShadcnui, SiAngular, SiHtml5, SiCss,
  SiFastapi, SiNodedotjs,
  SiTypescript, SiJavascript, SiPython, SiC, SiCplusplus,
  SiPostgresql, SiPrisma,
  SiOpenai, SiClaude,
  SiVercel, SiDocker,
  SiGit, SiGithub, SiLinux,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const QdrantIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

interface Tech {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const stack: Tech[] = [
  { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
  { name: 'TailwindCSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'ShadCN UI', category: 'Frontend', icon: SiShadcnui, color: '#ffffff' },
  { name: 'Angular', category: 'Frontend', icon: SiAngular, color: '#DD0031' },
  { name: 'HTML5', category: 'Frontend', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', category: 'Frontend', icon: SiCss, color: '#1572B6' },
  { name: 'FastAPI', category: 'Backend', icon: SiFastapi, color: '#009688' },
  { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#339933' },
  { name: 'TypeScript', category: 'Languages', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', category: 'Languages', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', category: 'Languages', icon: SiPython, color: '#3776AB' },
  { name: 'Java', category: 'Languages', icon: FaJava, color: '#007396' },
  { name: 'C', category: 'Languages', icon: SiC, color: '#A8B9CC' },
  { name: 'C++', category: 'Languages', icon: SiCplusplus, color: '#00599C' },
  { name: 'Neon DB', category: 'Database', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Prisma', category: 'Database', icon: SiPrisma, color: '#6366f1' },
  { name: 'Qdrant', category: 'Database', icon: QdrantIcon, color: '#E43B44' },
  { name: 'OpenAI', category: 'AI/ML', icon: SiOpenai, color: '#412991' },
  { name: 'Claude', category: 'AI/ML', icon: SiClaude, color: '#D97757' },
  { name: 'Agents SDK', category: 'AI/ML', icon: SiOpenai, color: '#10A37F' },
  { name: 'Vercel', category: 'Cloud & DevOps', icon: SiVercel, color: '#ffffff' },
  { name: 'Docker', category: 'Cloud & DevOps', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', category: 'Tools', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', category: 'Tools', icon: SiGithub, color: '#ffffff' },
  { name: 'Linux', category: 'Tools', icon: SiLinux, color: '#FCC624' },
];

const categoryOrder = ['Frontend', 'Backend', 'Languages', 'Database', 'AI/ML', 'Cloud & DevOps', 'Tools'];

interface TechStackSectionProps {
  username: string;
}

export function TechStackSection({ username: _username }: TechStackSectionProps) {
  const grouped = categoryOrder.reduce((acc, cat) => {
    acc[cat] = stack.filter((t) => t.category === cat);
    return acc;
  }, {} as Record<string, Tech[]>);

  return (
    <section id="techstack" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
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
          Skills.
        </motion.h2>

        <div className="space-y-10">
          {categoryOrder.map((category, catIdx) => {
            const techs = grouped[category];
            if (!techs?.length) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.06 }}
              >
                <div className="flex items-start gap-8">
                  <div className="hidden md:block w-28 shrink-0 pt-0.5">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}
                    >
                      {category}
                    </span>
                  </div>
                  <div>
                    <p
                      className="block md:hidden text-xs mb-3"
                      style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}
                    >
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech, idx) => {
                        const Icon = tech.icon;
                        return (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.05 + idx * 0.03 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 cursor-default"
                            style={{
                              background: 'var(--ed-surface)',
                              border: '1px solid var(--ed-border)',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border-strong)';
                              (e.currentTarget as HTMLElement).style.background = 'var(--ed-surface-2)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border)';
                              (e.currentTarget as HTMLElement).style.background = 'var(--ed-surface)';
                            }}
                          >
                            <Icon
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: tech.color, opacity: 0.85 }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif' }}
                            >
                              {tech.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
