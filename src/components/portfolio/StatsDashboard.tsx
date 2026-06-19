'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

interface Stats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
}

interface StatsDashboardProps {
  username: string;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const steps = 50;
    const step = value / steps;
    let current = 0;
    let i = 0;
    const id = setInterval(() => {
      i++;
      current = Math.min(Math.round(step * i), value);
      setDisplay(current);
      if (i >= steps) clearInterval(id);
    }, 2000 / steps);
    return () => clearInterval(id);
  }, [value]);
  return <>{display.toLocaleString()}</>;
};

const statItems = (stats: Stats) => [
  { label: 'Repositories', value: stats.totalRepos },
  { label: 'Total Stars', value: stats.totalStars },
  { label: 'Followers', value: stats.followers },
  { label: 'Contributions', value: stats.totalContributions },
  { label: 'Current Streak', value: stats.currentStreak, suffix: ' days' },
  { label: 'Longest Streak', value: stats.longestStreak, suffix: ' days' },
];

export function StatsDashboard({ username }: StatsDashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalRepos: 0, totalStars: 0, totalForks: 0, followers: 0,
    following: 0, currentStreak: 0, longestStreak: 0, totalContributions: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/github/stats?username=${username}`, { cache: 'no-store' });
        const data = await res.json();
        if (res.ok && isActive) { setStats((p) => ({ ...p, ...data })); setError(null); }
        else if (!res.ok) throw new Error(data.error || 'Failed to fetch stats.');
      } catch (err) {
        if (isActive) setError(err instanceof Error ? err.message : 'Failed to fetch stats.');
      }
    };
    fetch_();
    const id = window.setInterval(fetch_, siteConfig.refreshIntervalMs);
    return () => { isActive = false; window.clearInterval(id); };
  }, [username]);

  return (
    <section id="stats" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-12"
        >
          GitHub Stats
        </motion.p>

        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(180,80,80,0.1)', border: '1px solid rgba(180,80,80,0.2)', color: '#f08080', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: 'var(--ed-border)' }}>
          {statItems(stats).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="px-5 py-6"
              style={{ background: 'var(--ed-bg)' }}
            >
              <div
                className="text-3xl font-semibold mb-1"
                style={{ fontFamily: 'var(--font-serif), Playfair Display, serif', color: 'var(--ed-text)' }}
              >
                <AnimatedNumber value={item.value} />{item.suffix || ''}
              </div>
              <div className="text-xs" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
