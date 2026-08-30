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
  { id: 'projects', label: 'Work' },
  { id: 'techstack', label: 'Skills' },
  { id: 'education', label: 'Background' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  return (
    <main style={{ background: 'var(--ed-bg)', minHeight: '100vh' }}>
      <Navigation sections={sections} />

      <HeroSection
        name={siteConfig.name}
        title={siteConfig.role}
        bio={siteConfig.bio}
        avatarUrl={siteConfig.avatarUrl}
        githubUrl={siteConfig.githubUrl}
        resumeUrl={siteConfig.resumeUrl}
      />

      {/* Proof of work first: projects earn the interview. */}
      <ProjectsSection username={siteConfig.githubUsername} />

      {/* Skills land harder once the recruiter has seen them used above. */}
      <TechStackSection />

      {/* GitHub activity as a credibility booster, grouped together. */}
      <StatsDashboard username={siteConfig.githubUsername} />

      <ContributionHeatmap username={siteConfig.githubUsername} />

      <ActivityFeed username={siteConfig.githubUsername} />

      {/* Supporting credentials after the case is made. */}
      <EducationSection />

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
