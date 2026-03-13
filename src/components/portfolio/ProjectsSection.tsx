'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, Clock, Code } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { siteConfig } from '@/lib/site-config';

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

interface ProjectsSectionProps {
  username: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    Java: '#b07219',
    'C++': '#f34b7d',
    Go: '#00add8',
    Rust: '#dea584',
    Ruby: '#cc342d',
    PHP: '#4f5d95',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Shell: '#89e051',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass rounded-xl p-5 flex flex-col h-full card-hover group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-portfolio-highlight transition-colors line-clamp-1">
          {project.name}
        </h3>
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-portfolio-highlight transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm flex-grow mb-4 line-clamp-2">
        {project.description || 'No description available'}
      </p>

      {/* Topics */}
      {project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs bg-portfolio-primary/20 text-portfolio-accent rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {/* Language */}
          {project.language && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: languageColors[project.language] || '#858585',
                }}
              />
              <span>{project.language}</span>
            </div>
          )}

          {/* Stars */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{project.stargazers_count}</span>
          </div>

          {/* Forks */}
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{project.forks_count}</span>
          </div>
        </div>

        {/* Updated time */}
        <div className="flex items-center gap-1 text-xs">
          <Clock className="w-3 h-3" />
          <span>{formatDistanceToNow(new Date(project.pushed_at), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Homepage link */}
      {project.homepage && (
        <a
          href={project.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm text-portfolio-highlight hover:underline flex items-center gap-1"
        >
          <Code className="w-4 h-4" />
          View Demo
        </a>
      )}
    </motion.div>
  );
};

export function ProjectsSection({ username }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'starred' | 'recent'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/github/repos?username=${username}`, {
          cache: 'no-store',
        });
        const data = await response.json();

        if (response.ok) {
          if (!isActive) {
            return;
          }

          setProjects(data);
          setError(null);
          return;
        }

        throw new Error(data.error || 'Failed to fetch projects.');
      } catch (error) {
        console.error('Failed to fetch projects:', error);

        if (isActive) {
          setError(error instanceof Error ? error.message : 'Failed to fetch projects.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    const intervalId = window.setInterval(fetchProjects, siteConfig.refreshIntervalMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [username]);

  const filteredProjects = projects
    .filter((p) => !p.fork && !p.archived)
    .sort((a, b) => {
      if (filter === 'starred') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (filter === 'recent') {
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      }
      return 0;
    })
    .slice(0, 6);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            A selection of my open-source projects and contributions
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center gap-2">
            {(['all', 'starred', 'recent'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-portfolio-primary text-white'
                    : 'bg-portfolio-section text-muted-foreground hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Projects' : f === 'starred' ? 'Most Starred' : 'Recently Updated'}
              </button>
            ))}
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-5 animate-pulse">
                <div className="h-6 bg-portfolio-section rounded w-1/2 mb-3" />
                <div className="h-4 bg-portfolio-section rounded w-full mb-2" />
                <div className="h-4 bg-portfolio-section rounded w-3/4 mb-4" />
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-portfolio-section rounded-full w-16" />
                  <div className="h-6 bg-portfolio-section rounded-full w-20" />
                </div>
                <div className="h-4 bg-portfolio-section rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-portfolio-primary text-portfolio-primary rounded-lg font-medium transition-all hover:bg-portfolio-primary/10 hover:border-portfolio-highlight"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
