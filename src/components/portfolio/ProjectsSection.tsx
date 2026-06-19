'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { siteConfig } from '@/lib/site-config';

interface FeaturedProject {
  name: string;
  description: string;
  tags: string[];
  stack: string[];
  highlight: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    name: 'Full-Time Employee: Autonomous AI Agent',
    description:
      'A perception-planning-execution autonomous agent: PM2-managed Python watchers monitor Gmail and file drops, feed a Claude Code planning engine that classifies inputs and drafts action plans, and sync state to an Obsidian vault.',
    tags: ['autonomous-agent', 'python', 'claude-api', 'playwright'],
    stack: ['Python', 'Claude Code', 'Gmail API', 'LinkedIn API', 'Playwright', 'Odoo CRM', 'PM2', 'Docker'],
    highlight: 'Dispatches actions across 6 platforms with file-based human-in-the-loop gating and JSONL audit logging.',
  },
  {
    name: 'AI-Powered B2B Proposal Engine',
    description:
      'RAG-powered proposal generation pipeline in n8n: webhook ingests a client brief → GPT-4o-mini classifies metadata → brief is embedded and matched against a Supabase pgvector store → top-3 results injected as context → GPT-4o outputs a structured JSON proposal.',
    tags: ['n8n', 'rag', 'gpt-4o', 'supabase'],
    stack: ['n8n', 'GPT-4o', 'OpenAI Embeddings', 'Supabase pgvector', 'Google Slides API', 'Drive API', 'Gmail API'],
    highlight: 'Fully automated document delivery: Slides → PDF → Drive → Gmail approve/reject webhook with zero manual formatting.',
  },
  {
    name: 'Advanced B2B Cold Email Outreach Automation',
    description:
      '4-workflow n8n outreach system: daily trigger pulls and filters leads from Google Sheets, injects ICP-specific variables into HTML templates, and sends via Zoho Mail API with day-2 and day-3 follow-ups maintaining thread continuity.',
    tags: ['n8n', 'email-automation', 'oauth2', 'zoho'],
    stack: ['n8n', 'Zoho Mail API', 'Google Sheets', 'OAuth 2.0'],
    highlight: 'Open-tracking webhook writes engagement events and PKT timestamps to CRM; randomized delays eliminate manual outreach effort.',
  },
  {
    name: 'LinkedIn Carousel Automation',
    description:
      '13-node n8n pipeline that parses PDFs via PDF.co API, generates carousel copy with GPT-4o, and uploads to Google Drive — reducing creation time from hours to under 3 minutes with zero manual steps.',
    tags: ['n8n', 'gpt-4o', 'pdf-processing', 'content-automation'],
    stack: ['n8n', 'GPT-4o', 'PDF.co API', 'Google Drive'],
    highlight: 'End-to-end automation: PDF parse → AI copy generation → Drive upload in under 3 minutes.',
  },
];

const FeaturedProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="rounded-lg overflow-hidden"
    style={{ background: 'var(--ed-surface)', border: '1px solid var(--ed-border)' }}
  >
    <div className="h-0.5 w-full" style={{ background: 'var(--ed-accent)' }} />
    <div className="p-6">
      <div className="flex items-start gap-2 mb-1">
        <span
          className="text-xs px-2 py-0.5 rounded shrink-0 mt-0.5"
          style={{ background: 'rgba(var(--ed-accent-rgb, 180,140,100),0.12)', color: 'var(--ed-accent)', border: '1px solid var(--ed-border)', fontFamily: 'var(--font-sans), sans-serif' }}
        >
          Featured
        </span>
      </div>
      <h3
        className="text-lg font-semibold leading-snug mt-2 mb-3"
        style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-serif), Playfair Display, serif' }}
      >
        {project.name}
      </h3>
      <p
        className="text-sm mb-4"
        style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: '1.7' }}
      >
        {project.description}
      </p>
      <p
        className="text-xs mb-5 italic"
        style={{ color: 'var(--ed-text)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: '1.6', opacity: 0.7 }}
      >
        {project.highlight}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="ed-tag">{tag}</span>
        ))}
      </div>
      <div
        className="pt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs"
        style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', borderTop: '1px solid var(--ed-border)' }}
      >
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

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
    .filter((p) => !p.fork && !p.archived && p.name !== 'portfolio')
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

        {/* Featured automation projects from resume */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            Automation & AI Pipelines
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* GitHub repos */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Open Source
        </motion.p>

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
