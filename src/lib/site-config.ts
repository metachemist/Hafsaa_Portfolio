export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: 'Hafsa Shahid',
  role: 'Software Developer & AI Engineer',
  bio: 'A fourth-year computer science student at the University of Karachi with hands-on experience in front-end development and modern web technologies. Passionate about building responsive and scalable user interfaces using Next.js, TailwindCSS, and TypeScript. Currently exploring Cloud Applied and Generative AI Engineering.',
  email: 'hafsahere01@gmail.com',
  location: 'Karachi, Pakistan',
  githubUsername: 'metachemist',
  linkedinUrl: 'https://www.linkedin.com/in/hafsashahid03/',
  githubUrl: 'https://github.com/metachemist',
  avatarUrl: '/images/avatar.jpeg',
  resumeUrl: '/resume.pdf',
  refreshIntervalMs: 60_000,
} as const;

export const currentContributionYear = new Date().getUTCFullYear();
