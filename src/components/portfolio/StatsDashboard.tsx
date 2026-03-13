'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitFork, Star, Users, BookOpen, TrendingUp, Flame } from 'lucide-react';
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
  contributionsByYear?: { year: number; count: number }[];
}

interface StatsDashboardProps {
  username: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  delay,
  color = 'primary',
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  delay: number;
  color?: 'primary' | 'highlight' | 'accent';
}) => {
  const colorClasses = {
    primary: 'from-portfolio-primary to-portfolio-accent',
    highlight: 'from-portfolio-highlight to-portfolio-primary',
    accent: 'from-portfolio-accent to-portfolio-highlight',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass rounded-xl p-4 md:p-5 card-hover"
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-lg bg-gradient-to-br p-2.5 ${colorClasses[color]}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <motion.p
            className="text-xl md:text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <AnimatedNumber value={value} />
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), value);
      setDisplayValue(current);
      if (step >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
};

export function StatsDashboard({ username }: StatsDashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    followers: 0,
    following: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalContributions: 0,
    contributionsByYear: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/github/stats?username=${username}`, {
          cache: 'no-store',
        });
        const data = await response.json();

        if (response.ok) {
          if (!isActive) {
            return;
          }

          setStats((prev) => ({ ...prev, ...data }));
          setError(null);
          return;
        }

        throw new Error(data.error || 'Failed to fetch GitHub stats.');
      } catch (error) {
        console.error('Failed to fetch stats:', error);

        if (isActive) {
          setError(error instanceof Error ? error.message : 'Failed to fetch GitHub stats.');
        }
      }
    };

    fetchStats();
    const intervalId = window.setInterval(fetchStats, siteConfig.refreshIntervalMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [username]);

  return (
    <section id="stats" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            GitHub Stats
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Live statistics from GitHub, refreshed every minute
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            {error}
          </div>
        )}

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard
            icon={BookOpen}
            label="Repositories"
            value={stats.totalRepos}
            delay={0.1}
            color="primary"
          />
          <StatCard
            icon={Star}
            label="Total Stars"
            value={stats.totalStars}
            delay={0.2}
            color="highlight"
          />
          <StatCard
            icon={GitFork}
            label="Total Forks"
            value={stats.totalForks}
            delay={0.3}
            color="accent"
          />
          <StatCard
            icon={Users}
            label="Followers"
            value={stats.followers}
            delay={0.4}
            color="primary"
          />
        </div>

        <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          <StatCard
            icon={TrendingUp}
            label="Total Contributions"
            value={stats.totalContributions}
            delay={0.5}
            color="highlight"
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={stats.currentStreak}
            delay={0.6}
            color="accent"
          />
          <StatCard
            icon={TrendingUp}
            label="Longest Streak"
            value={stats.longestStreak}
            delay={0.7}
            color="primary"
          />
        </div>

      </div>
    </section>
  );
}
