'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  Shell: '#89e051',
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.a
    href={project.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="group block rounded-lg transition-all duration-200 cursor-pointer overflow-hidden"
    style={{ background: 'var(--ed-surface)', border: '1px solid var(--ed-border)' }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border-strong)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border)';
    }}
  >
    {/* Colour bar by language */}
    <div
      className="h-0.5 w-full"
      style={{ background: project.language ? (languageColors[project.language] || 'var(--ed-accent)') : 'var(--ed-border)' }}
    />

    <div className="p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-lg font-semibold leading-snug"
          style={{
            color: 'var(--ed-text)',
            fontFamily: 'var(--font-serif), Playfair Display, serif',
          }}
        >
          {project.name}
        </h3>
        <span
          className="text-base shrink-0 opacity-0 group-hover:opacity-60 transition-opacity mt-0.5"
          style={{ color: 'var(--ed-muted)' }}
        >
          ↗
        </span>
      </div>

      <p
        className="text-sm mb-5 line-clamp-3"
        style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: '1.7' }}
      >
        {project.description || 'No description available.'}
      </p>

      {project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="ed-tag">{topic}</span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs pt-4" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', borderTop: '1px solid var(--ed-border)' }}>
        {project.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: languageColors[project.language] || '#6b7280' }}
            />
            {project.language}
          </div>
        )}
        {project.stargazers_count > 0 && <span>★ {project.stargazers_count}</span>}
        <span className="ml-auto">{formatDistanceToNow(new Date(project.pushed_at), { addSuffix: true })}</span>
      </div>

      {project.homepage && (
        <p className="mt-3 text-xs" style={{ color: 'var(--ed-accent)', fontFamily: 'var(--font-sans), sans-serif' }}>
          {project.homepage.replace(/^https?:\/\//, '')}
        </p>
      )}
    </div>
  </motion.a>
);

export function ProjectsSection({ username }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'starred' | 'recent'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/github/repos?username=${username}`, { cache: 'no-store' });
        const data = await response.json();
        if (response.ok) {
          if (isActive) { setProjects(data); setError(null); }
          return;
        }
        throw new Error(data.error || 'Failed to fetch projects.');
      } catch (err) {
        if (isActive) setError(err instanceof Error ? err.message : 'Failed to fetch projects.');
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetchProjects();
    const id = window.setInterval(fetchProjects, siteConfig.refreshIntervalMs);
    return () => { isActive = false; window.clearInterval(id); };
  }, [username]);

  const filtered = projects
    .filter((p) => !p.fork && !p.archived)
    .sort((a, b) => {
      if (filter === 'starred') return b.stargazers_count - a.stargazers_count;
      if (filter === 'recent') return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      return 0;
    })
    .slice(0, 4);

  return (
    <section id="projects" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
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
            }}
          >
            Projects.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-1"
          >
            {(['all', 'starred', 'recent'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded text-xs transition-all duration-200"
                style={{
                  background: filter === f ? 'var(--ed-surface-2)' : 'transparent',
                  color: filter === f ? 'var(--ed-text)' : 'var(--ed-muted)',
                  border: filter === f ? '1px solid var(--ed-border-strong)' : '1px solid transparent',
                  fontFamily: 'var(--font-sans), sans-serif',
                }}
              >
                {f === 'all' ? 'All' : f === 'starred' ? 'Starred' : 'Recent'}
              </button>
            ))}
          </motion.div>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(180,80,80,0.1)', border: '1px solid rgba(180,80,80,0.2)', color: '#f08080', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg animate-pulse"
                style={{ background: 'var(--ed-surface)', border: '1px solid var(--ed-border)', height: '180px' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-opacity hover:opacity-60"
            style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            View all repositories on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
