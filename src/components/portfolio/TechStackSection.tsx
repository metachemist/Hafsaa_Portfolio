'use client';

import { motion } from 'framer-motion';
import {
  // Frontend
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiShadcnui,
  SiAngular,
  SiHtml5,
  SiCss,
  // Backend
  SiFastapi,
  SiNodedotjs,
  // Languages
  SiTypescript,
  SiJavascript,
  SiPython,
  SiC,
  SiCplusplus,
  // Database
  SiPostgresql,
  SiPrisma,
  // AI/ML
  SiOpenai,
  SiClaude,
  // Cloud & DevOps
  SiVercel,
  SiDocker,
  // Tools
  SiGit,
  SiGithub,
  SiLinux,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';

// Custom Qdrant icon component
const QdrantIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

interface Tech {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// All technologies from resume - no duplicates, with official icons
const resumeTechStack: Tech[] = [
  // Frontend
  { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
  { name: 'TailwindCSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'ShadCN UI', category: 'Frontend', icon: SiShadcnui, color: '#ffffff' },
  { name: 'Angular', category: 'Frontend', icon: SiAngular, color: '#DD0031' },
  { name: 'HTML5', category: 'Frontend', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', category: 'Frontend', icon: SiCss, color: '#1572B6' },
  
  // Backend
  { name: 'FastAPI', category: 'Backend', icon: SiFastapi, color: '#009688' },
  { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#339933' },
  
  // Languages
  { name: 'TypeScript', category: 'Languages', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', category: 'Languages', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', category: 'Languages', icon: SiPython, color: '#3776AB' },
  { name: 'Java', category: 'Languages', icon: FaJava, color: '#007396' },
  { name: 'JavaFX', category: 'Languages', icon: FaJava, color: '#007396' },
  { name: 'C', category: 'Languages', icon: SiC, color: '#A8B9CC' },
  { name: 'C++', category: 'Languages', icon: SiCplusplus, color: '#00599C' },
  
  // Database
  { name: 'Neon DB', category: 'Database', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Prisma', category: 'Database', icon: SiPrisma, color: '#2D3748' },
  { name: 'Qdrant', category: 'Database', icon: QdrantIcon, color: '#E43B44' },
  
  // AI/ML
  { name: 'OpenAI', category: 'AI/ML', icon: SiOpenai, color: '#412991' },
  { name: 'Claude Code', category: 'AI/ML', icon: SiClaude, color: '#D97757' },
  { name: 'Agents SDK', category: 'AI/ML', icon: SiOpenai, color: '#10A37F' },
  
  // Cloud & DevOps
  { name: 'Vercel', category: 'Cloud', icon: SiVercel, color: '#ffffff' },
  { name: 'Docker', category: 'DevOps', icon: SiDocker, color: '#2496ED' },
  
  // Tools
  { name: 'Git', category: 'Tools', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', category: 'Tools', icon: SiGithub, color: '#ffffff' },
  { name: 'Linux', category: 'Tools', icon: SiLinux, color: '#FCC624' },
];

interface TechStackSectionProps {
  username: string;
}

const TechIcon = ({ tech, delay }: { tech: Tech; delay: number }) => {
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, type: 'spring' }}
      whileHover={{ scale: 1.15, y: -5 }}
      className="flex flex-col items-center gap-1.5 p-2.5 glass rounded-lg cursor-pointer group"
    >
      <div 
        className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:scale-110 flex items-center justify-center"
        style={{ color: tech.color }}
      >
        <Icon className="w-full h-full" />
      </div>
      <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-white transition-colors text-center">
        {tech.name}
      </span>
    </motion.div>
  );
};

export function TechStackSection({ username }: TechStackSectionProps) {
  // Group by category and ensure no duplicates by name
  const groupedTech = resumeTechStack.reduce((acc, tech) => {
    const category = tech.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    // Avoid duplicates by name across all categories
    const exists = Object.values(acc).some((techs) => 
      techs.some((t: Tech) => t.name === tech.name)
    );
    if (!exists) {
      acc[category].push(tech);
    }
    return acc;
  }, {} as Record<string, Tech[]>);

  // Define category order
  const categoryOrder = ['Frontend', 'Backend', 'Languages', 'Database', 'AI/ML', 'Cloud', 'DevOps', 'Tools'];

  return (
    <section id="techstack" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies I work with from my resume and GitHub projects
          </p>
        </motion.div>

        <div className="space-y-8">
          {categoryOrder.map((category, catIndex) => {
            const techs = groupedTech[category];
            if (!techs || techs.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-portfolio-highlight mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-portfolio-primary rounded-full" />
                  {category}
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {techs.map((tech, index) => (
                    <TechIcon
                      key={tech.name}
                      tech={tech}
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
