export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: 'Hafsa Shahid',
  role: 'AI Engineer & Automation Specialist',
  bio: 'AI Fullstack Engineer shipping LLM-powered applications, autonomous agents, and n8n automation pipelines to production. Proficient in TypeScript, Python, Next.js, FastAPI, and PostgreSQL, with deep hands-on experience in RAG, prompt engineering, agentic workflows, and multi-platform API integration.',
  email: 'hafsa@brainlytics.net',
  location: 'Karachi, Pakistan',
  githubUsername: 'metachemist',
  linkedinUrl: 'https://www.linkedin.com/in/hafsashahid03/',
  githubUrl: 'https://github.com/metachemist',
  avatarUrl: '/images/avatar-v2.jpeg',
  faviconUrl: '/images/favicon.png',
  resumeUrl: '/resume.pdf',
  refreshIntervalMs: 60_000,
} as const;

export const currentContributionYear = new Date().getUTCFullYear();
