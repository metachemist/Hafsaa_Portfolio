'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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

const activityLabel = (a: Activity): { verb: string; detail?: string } => {
  switch (a.type) {
    case 'PushEvent': {
      const n = a.payload.commits?.length || 0;
      return { verb: `Pushed ${n} commit${n !== 1 ? 's' : ''} to`, detail: a.payload.commits?.[0]?.message };
    }
    case 'PullRequestEvent':
      return { verb: `${a.payload.action === 'opened' ? 'Opened' : a.payload.action === 'closed' ? 'Closed' : 'Updated'} a pull request in`, detail: a.payload.pull_request ? `#${a.payload.pull_request.number}: ${a.payload.pull_request.title}` : undefined };
    case 'IssuesEvent':
      return { verb: `${a.payload.action === 'opened' ? 'Opened' : 'Closed'} an issue in` };
    case 'CreateEvent':
      return { verb: a.payload.ref ? `Created branch ${a.payload.ref} in` : 'Created repository' };
    case 'WatchEvent':
      return { verb: 'Starred' };
    case 'ForkEvent':
      return { verb: 'Forked' };
    default:
      return { verb: 'Updated' };
  }
};

const typeSymbol: Record<string, string> = {
  PushEvent: '↑',
  PullRequestEvent: '⤢',
  IssuesEvent: '◎',
  CreateEvent: '+',
  WatchEvent: '★',
  ForkEvent: '⑂',
};

export function ActivityFeed({ username }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/github/activity?username=${username}`, { cache: 'no-store' });
        const data = await res.json();
        if (res.ok && isActive) { setActivities(data.slice(0, 6)); setError(null); }
        else if (!res.ok) throw new Error(data.error || 'Failed to fetch activities.');
      } catch (err) {
        if (isActive) setError(err instanceof Error ? err.message : 'Failed to fetch activities.');
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetch_();
    const id = window.setInterval(fetch_, siteConfig.refreshIntervalMs);
    return () => { isActive = false; window.clearInterval(id); };
  }, [username]);

  const repoUrl = (a: Activity) =>
    a.repo.url.startsWith('https://api.github.com/repos/')
      ? a.repo.url.replace('https://api.github.com/repos/', 'https://github.com/')
      : a.repo.url || `https://github.com/${a.repo.name}`;

  return (
    <section id="activity" className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-12"
        >
          Recent Activity
        </motion.p>

        {error && (
          <div
            className="p-4 rounded-lg text-sm mb-6"
            style={{ background: 'rgba(180,80,80,0.1)', border: '1px solid rgba(180,80,80,0.2)', color: '#f08080', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg animate-pulse"
                style={{ background: 'var(--ed-surface)', border: '1px solid var(--ed-border)' }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-0" style={{ borderTop: '1px solid var(--ed-border)' }}>
            {activities.map((activity, i) => {
              const { verb, detail } = activityLabel(activity);
              const symbol = typeSymbol[activity.type] || '·';
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: '1px solid var(--ed-border)' }}
                >
                  <span
                    className="text-sm mt-0.5 w-4 text-center shrink-0"
                    style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-mono), monospace' }}
                  >
                    {symbol}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                      {verb}{' '}
                      <a
                        href={repoUrl(activity)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-60"
                        style={{ color: 'var(--ed-text)' }}
                      >
                        {activity.repo.name}
                      </a>
                    </p>
                    {detail && (
                      <p
                        className="text-xs mt-0.5 truncate"
                        style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', opacity: 0.7 }}
                      >
                        {detail}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-xs shrink-0"
                    style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif', opacity: 0.6 }}
                  >
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
