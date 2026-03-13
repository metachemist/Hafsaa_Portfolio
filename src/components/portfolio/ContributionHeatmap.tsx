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

const getContributionLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const formatMonthLabels = (weeks: ContributionWeek[]) => {
  let lastRenderedMonth = '';

  return weeks.map((week, weekIndex) => {
    const firstDay = new Date(`${week.firstDay}T00:00:00Z`);
    const monthLabel = firstDay.toLocaleString('en-US', {
      month: 'short',
      timeZone: 'UTC',
    });
    const shouldRender = weekIndex === 0 || monthLabel !== lastRenderedMonth;

    if (shouldRender) {
      lastRenderedMonth = monthLabel;
    }

    return shouldRender ? monthLabel : '';
  });
};

const ContributionCell = ({ day, delay }: { day: ContributionDay; delay: number }) => {
  const levelColors = [
    'bg-[#161b22]',
    'bg-[#0e4429]',
    'bg-[#006d32]',
    'bg-[#26a641]',
    'bg-[#39d353]',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.16, delay }}
      whileHover={{ scale: 1.25, zIndex: 10 }}
      className={`h-[11px] w-[11px] rounded-[2px] ${levelColors[day.level]} relative cursor-pointer transition-transform group`}
      title={`${day.count} contributions on ${day.date}`}
    >
      <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
        {day.count} contributions on {day.date}
      </div>
    </motion.div>
  );
};

export function ContributionHeatmap({ username }: ContributionHeatmapProps) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchContributions = async () => {
      try {
        const response = await fetch(`/api/github/contributions?username=${username}`, {
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch contributions.');
        }

        const weeks: ContributionWeek[] = (result.weeks as ApiContributionWeek[]).map((week) => ({
          firstDay: week.firstDay,
          days: Array.from({ length: 7 }).map((_, dayIndex) => {
            const day = week.contributionDays[dayIndex];

            if (!day) {
              return {
                date: '',
                count: 0,
                level: 0 as const,
              };
            }

            return {
              date: day.date,
              count: day.contributionCount,
              level: getContributionLevel(day.contributionCount),
            };
          }),
        }));

        if (!isActive) {
          return;
        }

        setData({
          weeks,
          totalContributions: result.totalContributions || 0,
        });
        setError(null);
      } catch (error) {
        console.error('Failed to fetch contributions:', error);

        if (!isActive) {
          return;
        }

        setError(
          error instanceof Error ? error.message : 'Failed to fetch contributions.'
        );
        setData(null);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchContributions();
    const intervalId = window.setInterval(fetchContributions, siteConfig.refreshIntervalMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [username]);

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="glass rounded-2xl p-8 animate-pulse">
            <div className="h-8 w-1/3 rounded bg-portfolio-section mb-8" />
            <div className="h-32 rounded bg-portfolio-section" />
          </div>
        </div>
      </section>
    );
  }

  const monthLabels = data ? formatMonthLabels(data.weeks) : [];
  const weekCount = data?.weeks.length ?? 0;
  const weekGridTemplate = data
    ? { gridTemplateColumns: `repeat(${weekCount}, 11px)` }
    : undefined;

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Contribution Activity
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Last 12 months, rendered to match GitHub&apos;s profile graph
          </p>
        </motion.div>

        {error && (
          <div className="glass rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center text-amber-100">
            {error}
          </div>
        )}

        {!error && data && (
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass inline-block max-w-full overflow-x-auto rounded-2xl px-3 py-3 sm:px-4 sm:py-4"
            >
              <div className="w-fit min-w-max">
              <div
                className="mb-1.5 grid gap-0.5 pl-6"
                style={weekGridTemplate}
              >
                {monthLabels.map((month, index) => (
                  <div
                    key={`${month}-${index}`}
                    className="w-[11px] overflow-visible text-[10px] leading-none text-muted-foreground"
                  >
                    {month}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                <div className="flex flex-col gap-0.5 pr-1">
                  {DAYS.map((day, index) => (
                    <div
                      key={day}
                      className="flex h-[11px] items-center text-[10px] leading-none text-muted-foreground"
                      style={{ visibility: index % 2 === 1 ? 'visible' : 'hidden' }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div
                  className="grid gap-0.5"
                  style={weekGridTemplate}
                >
                  {data.weeks.map((week, weekIndex) => (
                    <div key={week.firstDay} className="grid gap-0.5">
                      {week.days.map((day, dayIndex) => (
                        <ContributionCell
                          key={`${week.firstDay}-${dayIndex}`}
                          day={day}
                          delay={weekIndex * 0.008 + dayIndex * 0.004}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="text-base font-bold text-portfolio-highlight">
                    {data.totalContributions.toLocaleString()}
                  </span>{' '}
                  contributions in the last year
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-3 w-3 rounded-[2px] ${
                        level === 0
                          ? 'bg-[#161b22]'
                          : level === 1
                          ? 'bg-[#0e4429]'
                          : level === 2
                          ? 'bg-[#006d32]'
                          : level === 3
                          ? 'bg-[#26a641]'
                          : 'bg-[#39d353]'
                      }`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
