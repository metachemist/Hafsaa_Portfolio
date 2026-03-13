'use client';

import { ParticleBackground } from '@/components/portfolio/ParticleBackground';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { StatsDashboard } from '@/components/portfolio/StatsDashboard';
import { ContributionHeatmap } from '@/components/portfolio/ContributionHeatmap';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { TechStackSection } from '@/components/portfolio/TechStackSection';
import { CertificationsSection } from '@/components/portfolio/CertificationsSection';
import { ActivityFeed } from '@/components/portfolio/ActivityFeed';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Navigation } from '@/components/portfolio/Navigation';
import { Footer } from '@/components/portfolio/Footer';
import { CatCursor } from '@/components/portfolio/CatCursor';
import { siteConfig } from '@/lib/site-config';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'projects', label: 'Projects' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-portfolio-bg overflow-x-hidden">
      {/* Animated background particles */}
      <ParticleBackground />

      {/* Animated cursor companion */}
      <CatCursor size={38} />

      {/* Navigation */}
      <Navigation sections={sections} githubUrl={siteConfig.githubUrl} />

      {/* Hero Section */}
      <HeroSection
        name={siteConfig.name}
        title={siteConfig.role}
        bio={siteConfig.bio}
        avatarUrl={siteConfig.avatarUrl}
        githubUrl={siteConfig.githubUrl}
        resumeUrl={siteConfig.resumeUrl}
      />

      {/* GitHub Stats Dashboard */}
      <StatsDashboard username={siteConfig.githubUsername} />

      {/* Contribution Heatmap */}
      <ContributionHeatmap username={siteConfig.githubUsername} />

      {/* Projects Section */}
      <ProjectsSection username={siteConfig.githubUsername} />

      {/* Tech Stack */}
      <TechStackSection username={siteConfig.githubUsername} />

      {/* Certifications */}
      <CertificationsSection />

      {/* Activity Feed */}
      <ActivityFeed username={siteConfig.githubUsername} />

      {/* Contact Section */}
      <ContactSection
        email={siteConfig.email}
        github={siteConfig.githubUrl}
        linkedin={siteConfig.linkedinUrl}
        location={siteConfig.location}
      />

      {/* Footer */}
      <Footer name={siteConfig.name} />
    </main>
  );
}
