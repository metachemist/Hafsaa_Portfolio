'use client';

import { HeroSection } from '@/components/portfolio/HeroSection';
import { EducationSection } from '@/components/portfolio/EducationSection';
import { TechStackSection } from '@/components/portfolio/TechStackSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { StatsDashboard } from '@/components/portfolio/StatsDashboard';
import { ContributionHeatmap } from '@/components/portfolio/ContributionHeatmap';
import { ActivityFeed } from '@/components/portfolio/ActivityFeed';
import { FunFactsSection } from '@/components/portfolio/FunFactsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Navigation } from '@/components/portfolio/Navigation';
import { Footer } from '@/components/portfolio/Footer';
import { siteConfig } from '@/lib/site-config';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'education', label: 'About' },
  { id: 'techstack', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  return (
    <main style={{ background: 'var(--ed-bg)', minHeight: '100vh' }}>
      <Navigation sections={sections} githubUrl={siteConfig.githubUrl} email={siteConfig.email} />

      <HeroSection
        name={siteConfig.name}
        title={siteConfig.role}
        bio={siteConfig.bio}
        avatarUrl={siteConfig.avatarUrl}
        githubUrl={siteConfig.githubUrl}
        resumeUrl={siteConfig.resumeUrl}
      />

      <EducationSection />

      <TechStackSection username={siteConfig.githubUsername} />

      <ProjectsSection username={siteConfig.githubUsername} />

      <StatsDashboard username={siteConfig.githubUsername} />

      <ContributionHeatmap username={siteConfig.githubUsername} />

      <ActivityFeed username={siteConfig.githubUsername} />

      <FunFactsSection />

      <ContactSection
        email={siteConfig.email}
        github={siteConfig.githubUrl}
        linkedin={siteConfig.linkedinUrl}
        location={siteConfig.location}
      />

      <Footer name={siteConfig.name} />
    </main>
  );
}
