'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

interface ApiContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ApiContributionWeek {
  firstDay: string;
  contributionDays: ApiContributionDay[];
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  firstDay: string;
  days: ContributionDay[];
}

interface ContributionData {
  weeks: ContributionWeek[];
  totalContributions: number;
}

interface ContributionHeatmapProps {
  username: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const cellColors = [
  'rgba(240,235,225,0.04)',
  'rgba(201,184,150,0.2)',
  'rgba(201,184,150,0.4)',
  'rgba(201,184,150,0.7)',
  '#c9b896',
];

const formatMonthLabels = (weeks: ContributionWeek[]) => {
  let last = '';
  return weeks.map((week, i) => {
    const d = new Date(`${week.firstDay}T00:00:00Z`);
    const m = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const show = i === 0 || m !== last;
    if (show) last = m;
    return show ? m : '';
  });
};

export function ContributionHeatmap({ username }: ContributionHeatmapProps) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/github/contributions?username=${username}`, { cache: 'no-store' });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to fetch contributions.');
        const weeks: ContributionWeek[] = (result.weeks as ApiContributionWeek[]).map((week) => ({
          firstDay: week.firstDay,
          days: Array.from({ length: 7 }).map((_, dayIdx) => {
            const day = week.contributionDays[dayIdx];
            if (!day) return { date: '', count: 0, level: 0 as const };
            return { date: day.date, count: day.contributionCount, level: getLevel(day.contributionCount) };
          }),
        }));
        if (isActive) { setData({ weeks, totalContributions: result.totalContributions || 0 }); setError(null); }
      } catch (err) {
        if (isActive) { setError(err instanceof Error ? err.message : 'Failed to fetch.'); setData(null); }
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetch_();
    const id = window.setInterval(fetch_, siteConfig.refreshIntervalMs);
    return () => { isActive = false; window.clearInterval(id); };
  }, [username]);

  if (loading) {
    return (
      <section className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="section-label mb-12">Contributions</p>
          <div className="h-32 rounded-lg animate-pulse" style={{ background: 'var(--ed-surface)' }} />
        </div>
      </section>
    );
  }

  const monthLabels = data ? formatMonthLabels(data.weeks) : [];
  const weekCount = data?.weeks.length ?? 0;
  const gridStyle = data ? { gridTemplateColumns: `repeat(${weekCount}, 11px)` } : undefined;

  return (
    <section className="py-24 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-12"
        >
          Contribution Activity
        </motion.p>

        {error && (
          <div
            className="p-4 rounded-lg text-sm"
            style={{ background: 'rgba(180,80,80,0.1)', border: '1px solid rgba(180,80,80,0.2)', color: '#f08080', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            {error}
          </div>
        )}

        {!error && data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-x-auto"
          >
            <div className="inline-block min-w-max">
              {/* Month labels */}
              <div className="mb-1.5 grid gap-0.5 pl-6" style={gridStyle}>
                {monthLabels.map((m, i) => (
                  <div key={i} className="w-[11px] overflow-visible text-[10px] leading-none" style={{ color: 'var(--ed-muted)' }}>
                    {m}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-0.5 pr-1">
                  {DAYS.map((day, i) => (
                    <div
                      key={day}
                      className="flex h-[11px] items-center text-[10px] leading-none"
                      style={{ color: 'var(--ed-muted)', visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Cells */}
                <div className="grid gap-0.5" style={gridStyle}>
                  {data.weeks.map((week) => (
                    <div key={week.firstDay} className="grid gap-0.5">
                      {week.days.map((day, di) => (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px] relative cursor-default group"
                          style={{ background: cellColors[day.level] }}
                          title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
                <span>
                  <span style={{ color: 'var(--ed-text)', fontWeight: 600 }}>
                    {data.totalContributions.toLocaleString()}
                  </span>{' '}
                  contributions in the last year
                </span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  {cellColors.map((c, i) => (
                    <div key={i} className="h-3 w-3 rounded-[2px]" style={{ background: c }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
