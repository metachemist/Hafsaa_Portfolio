'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, CircleDot, GitBranch, BookOpen, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { siteConfig } from '@/lib/site-config';

interface Activity {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string };
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    action?: string;
    commits?: { message: string; sha: string }[];
    pull_request?: { title: string; number: number };
    issue?: { title: string; number: number };
    ref?: string;
  };
}

interface ActivityFeedProps {
  username: string;
}

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'PushEvent':
      return <GitCommit className="w-5 h-5 text-green-400" />;
    case 'PullRequestEvent':
      return <GitPullRequest className="w-5 h-5 text-purple-400" />;
    case 'IssuesEvent':
      return <CircleDot className="w-5 h-5 text-yellow-400" />;
    case 'CreateEvent':
      return <GitBranch className="w-5 h-5 text-blue-400" />;
    case 'WatchEvent':
      return <Star className="w-5 h-5 text-yellow-400" />;
    case 'ForkEvent':
      return <BookOpen className="w-5 h-5 text-pink-400" />;
    default:
      return <GitCommit className="w-5 h-5 text-muted-foreground" />;
  }
};

const ActivityItem = ({ activity, index }: { activity: Activity; index: number }) => {
  const repoUrl = activity.repo.url.startsWith('https://api.github.com/repos/')
    ? activity.repo.url.replace('https://api.github.com/repos/', 'https://github.com/')
    : activity.repo.url || `https://github.com/${activity.repo.name}`;

  const getActivityText = () => {
    switch (activity.type) {
      case 'PushEvent':
        const commitCount = activity.payload.commits?.length || 0;
        return `${activity.actor.login} pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to`;
      case 'PullRequestEvent':
        return `${activity.actor.login} ${activity.payload.action === 'opened' ? 'opened' : activity.payload.action === 'closed' ? 'closed' : 'updated'} a pull request in`;
      case 'IssuesEvent':
        return `${activity.actor.login} ${activity.payload.action === 'opened' ? 'opened' : activity.payload.action === 'closed' ? 'closed' : 'updated'} an issue in`;
      case 'CreateEvent':
        return activity.payload.ref
          ? `${activity.actor.login} created branch ${activity.payload.ref} in`
          : `${activity.actor.login} created a repository`;
      case 'WatchEvent':
        return `${activity.actor.login} starred`;
      case 'ForkEvent':
        return `${activity.actor.login} forked`;
      default:
        return 'Updated';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 glass rounded-lg card-hover group"
    >
      <div className="p-2 rounded-lg bg-portfolio-section">
        <ActivityIcon type={activity.type} />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm">
          <span className="text-muted-foreground">{getActivityText()}</span>{' '}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-highlight hover:underline font-medium"
          >
            {activity.repo.name}
          </a>
        </p>
        {activity.type === 'PushEvent' && activity.payload.commits && (
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {activity.payload.commits[0]?.message}
          </p>
        )}
        {activity.type === 'PullRequestEvent' && activity.payload.pull_request && (
          <p className="text-xs text-muted-foreground mt-1">
            #{activity.payload.pull_request.number}: {activity.payload.pull_request.title}
          </p>
        )}
        <p className="text-xs text-muted-foreground/70 mt-1">
          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
};

export function ActivityFeed({ username }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/github/activity?username=${username}`, {
          cache: 'no-store',
        });
        const data = await response.json();

        if (response.ok) {
          if (!isActive) {
            return;
          }

          setActivities(data.slice(0, 4));
          setError(null);
          return;
        }

        throw new Error(data.error || 'Failed to fetch activities.');
      } catch (error) {
        console.error('Failed to fetch activities:', error);

        if (isActive) {
          setError(
            error instanceof Error ? error.message : 'Failed to fetch activities.'
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchActivities();
    const intervalId = window.setInterval(fetchActivities, siteConfig.refreshIntervalMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [username]);

  return (
    <section id="activity" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Recent Activity
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Latest updates from my GitHub journey
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-portfolio-section rounded-lg" />
                  <div className="flex-grow">
                    <div className="h-4 bg-portfolio-section rounded w-3/4 mb-2" />
                    <div className="h-3 bg-portfolio-section rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
