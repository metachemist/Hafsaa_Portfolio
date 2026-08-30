import { GraphQLClient, gql } from 'graphql-request';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_REST_API = 'https://api.github.com';
const GITHUB_ACCEPT_HEADER = 'application/vnd.github+json';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#cc342d',
  PHP: '#4f5d95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Jupyter: '#F37626',
};

const getGitHubToken = (): string | null => process.env.GITHUB_TOKEN || null;

const createRestHeaders = (headers?: HeadersInit): HeadersInit => {
  const token = getGitHubToken();

  return {
    Accept: GITHUB_ACCEPT_HEADER,
    'User-Agent': 'portfolio-app',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
};

const createGraphQLClient = () => {
  const token = getGitHubToken();

  if (!token) {
    throw new Error('GITHUB_TOKEN is required for contribution data.');
  }

  return new GraphQLClient(GITHUB_GRAPHQL_API, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const fetchGitHubREST = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${GITHUB_REST_API}${endpoint}`, {
    ...options,
    cache: 'no-store',
    headers: createRestHeaders(options.headers),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Like fetchGitHubREST, but resolves to `fallback` instead of throwing when the
 * request fails. Used for supplementary activity data (commits, stars, forks)
 * where a single forbidden or empty endpoint should not fail the whole feed —
 * e.g. the stargazers endpoint returns 403 for fine-grained personal access
 * tokens, and /commits returns 409 for empty repositories.
 */
const fetchGitHubRESTSafe = async <T>(
  endpoint: string,
  fallback: T,
  options: RequestInit = {}
): Promise<T> => {
  try {
    return await fetchGitHubREST(endpoint, options);
  } catch (error) {
    console.warn(`GitHub REST request failed for ${endpoint}:`, error);
    return fallback;
  }
};;

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  license: { name: string } | null;
}

export interface ContributionData {
  totalContributions: number;
  weeks: {
    firstDay: string;
    contributionDays: {
      contributionCount: number;
      date: string;
      weekday: number;
    }[];
  }[];
}

interface ContributionRange {
  from: string;
  to: string;
}

export interface GitHubActivity {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string };
  repo: { name: string; url: string };
  created_at: string;
  payload: Record<string, unknown>;
}

interface GitHubCommitAuthor {
  login?: string;
  avatar_url?: string;
}

interface GitHubCommitItem {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
      name: string;
    };
  };
  author: GitHubCommitAuthor | null;
}

interface GitHubStargazerItem {
  starred_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubForkItem {
  id: number;
  created_at: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  contributionsByYear: { year: number; count: number }[];
  languages: { name: string; color: string; size: number }[];
}

export async function getUser(username: string): Promise<GitHubUser> {
  return fetchGitHubREST(`/users/${username}`);
}

export async function getReposPage(
  username: string,
  page: number,
  perPage: number = 100,
  sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'updated',
  direction: 'asc' | 'desc' = 'desc'
): Promise<GitHubRepo[]> {
  return fetchGitHubREST(
    `/users/${username}/repos?per_page=${perPage}&page=${page}&sort=${sort}&direction=${direction}`
  );
}

export async function getRepos(
  username: string,
  perPage: number = 100,
  sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'updated',
  direction: 'asc' | 'desc' = 'desc'
): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const batch = await getReposPage(username, page, Math.min(perPage, 100), sort, direction);
    repos.push(...batch);

    if (batch.length < Math.min(perPage, 100) || repos.length >= perPage) {
      break;
    }

    page += 1;
  }

  return repos.slice(0, perPage);
}

export async function getAllRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const batch = await getReposPage(username, page);
    repos.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return repos;
}

export async function getRecentRepoActivity(username: string): Promise<GitHubActivity[]> {
  const repos = await getRepos(username, 8, 'pushed', 'desc');
  const ownedRepos = repos.filter((repo) => !repo.fork && !repo.archived && !repo.disabled);
  const recentRepos = ownedRepos.slice(0, 5);

  const activityGroups = await Promise.all(
    recentRepos.map(async (repo) => {
      const [commits, stargazers, forks] = await Promise.all([
        getRepoCommits(repo.full_name),
        getRepoStargazers(repo.full_name),
        getRepoForks(repo.full_name),
      ]);

      const commitActivities: GitHubActivity[] = commits.map((commit) => ({
        id: `commit-${repo.id}-${commit.sha}`,
        type: 'PushEvent',
        actor: {
          login: commit.author?.login || commit.commit.author.name || username,
          avatar_url: commit.author?.avatar_url || '',
        },
        repo: {
          name: repo.full_name,
          url: repo.html_url,
        },
        created_at: commit.commit.author.date,
        payload: {
          commits: [
            {
              message: commit.commit.message.split('\n')[0],
              sha: commit.sha,
            },
          ],
          commitUrl: commit.html_url,
        },
      }));

      const starActivities: GitHubActivity[] = stargazers.map((star) => ({
        id: `star-${repo.id}-${star.user.login}-${star.starred_at}`,
        type: 'WatchEvent',
        actor: {
          login: star.user.login,
          avatar_url: star.user.avatar_url,
        },
        repo: {
          name: repo.full_name,
          url: repo.html_url,
        },
        created_at: star.starred_at,
        payload: {},
      }));

      const forkActivities: GitHubActivity[] = forks.map((fork) => ({
        id: `fork-${fork.id}`,
        type: 'ForkEvent',
        actor: {
          login: fork.owner.login,
          avatar_url: fork.owner.avatar_url,
        },
        repo: {
          name: repo.full_name,
          url: repo.html_url,
        },
        created_at: fork.created_at,
        payload: {
          forkee: {
            full_name: fork.full_name,
            html_url: fork.html_url,
          },
        },
      }));

      return [...commitActivities, ...starActivities, ...forkActivities];
    })
  );

  return activityGroups
    .flat()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 12);
}

async function getRepoCommits(fullName: string): Promise<GitHubCommitItem[]> {
  return fetchGitHubRESTSafe(`/repos/${fullName}/commits?per_page=5`, []);
}

async function getRepoStargazers(fullName: string): Promise<GitHubStargazerItem[]> {
  return fetchGitHubRESTSafe(`/repos/${fullName}/stargazers?per_page=5`, [], {
    headers: {
      Accept: 'application/vnd.github.star+json',
    },
  });
}

async function getRepoForks(fullName: string): Promise<GitHubForkItem[]> {
  return fetchGitHubRESTSafe(`/repos/${fullName}/forks?sort=newest&per_page=5`, []);
}

const CONTRIBUTIONS_QUERY = gql`
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function getContributions(
  username: string,
  year: number
): Promise<ContributionData> {
  const from = new Date(Date.UTC(year, 0, 1)).toISOString();
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();

  return getContributionsForRange(username, { from, to });
}

export async function getRecentContributions(username: string): Promise<ContributionData> {
  const today = new Date();
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59)
  );
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);

  while (start.getUTCDay() !== 0) {
    start.setUTCDate(start.getUTCDate() - 1);
  }

  return getContributionsForRange(username, {
    from: start.toISOString(),
    to: end.toISOString(),
  });
}

async function getContributionsForRange(
  username: string,
  range: ContributionRange
): Promise<ContributionData> {
  const client = createGraphQLClient();
  const data = await client.request<{
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionData;
      };
    } | null;
  }>(CONTRIBUTIONS_QUERY, {
    username,
    from: range.from,
    to: range.to,
  });

  if (!data.user?.contributionsCollection?.contributionCalendar) {
    throw new Error(`Unable to load contribution data for ${username}.`);
  }

  return data.user.contributionsCollection.contributionCalendar;
}

const getStreaks = (days: { date: string; count: number }[]) => {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let currentStreak = 0;
  let runningStreak = 0;

  for (const day of sortedDays) {
    if (day.count > 0) {
      runningStreak += 1;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else {
      runningStreak = 0;
    }
  }

  const today = new Date();
  const todayIso = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
    .toISOString()
    .slice(0, 10);

  for (let index = sortedDays.length - 1; index >= 0; index -= 1) {
    const day = sortedDays[index];

    if (day.date > todayIso) {
      continue;
    }

    if (day.date === todayIso && day.count === 0) {
      continue;
    }

    if (day.count === 0) {
      break;
    }

    currentStreak += 1;
  }

  return { currentStreak, longestStreak };
};

export async function getMultiYearContributions(username: string): Promise<{
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  contributionsByYear: { year: number; count: number }[];
}> {
  const currentYear = new Date().getUTCFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const results = await Promise.all(years.map((year) => getContributions(username, year)));
  const allDays: { date: string; count: number }[] = [];

  const contributionsByYear = results.map((data, index) => {
    for (const week of data.weeks) {
      for (const day of week.contributionDays) {
        allDays.push({ date: day.date, count: day.contributionCount });
      }
    }

    return {
      year: years[index],
      count: data.totalContributions,
    };
  });

  const totalContributions = contributionsByYear.reduce((sum, year) => sum + year.count, 0);
  const { currentStreak, longestStreak } = getStreaks(allDays);

  return { totalContributions, currentStreak, longestStreak, contributionsByYear };
}

export async function getUserStats(username: string): Promise<GitHubStats> {
  const [user, repos, contributions] = await Promise.all([
    getUser(username),
    getAllRepos(username),
    getMultiYearContributions(username),
  ]);

  let totalStars = 0;
  let totalForks = 0;
  const languageMap = new Map<string, { name: string; color: string; size: number }>();

  for (const repo of repos) {
    if (repo.fork || repo.archived || repo.disabled) {
      continue;
    }

    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      const existing = languageMap.get(repo.language);

      if (existing) {
        existing.size += 1;
      } else {
        languageMap.set(repo.language, {
          name: repo.language,
          color: languageColors[repo.language] || '#858585',
          size: 1,
        });
      }
    }
  }

  const languages = Array.from(languageMap.values())
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  return {
    totalStars,
    totalForks,
    totalRepos: repos.filter((repo) => !repo.fork && !repo.archived && !repo.disabled).length,
    followers: user.followers,
    following: user.following,
    totalContributions: contributions.totalContributions,
    currentStreak: contributions.currentStreak,
    longestStreak: contributions.longestStreak,
    contributionsByYear: contributions.contributionsByYear,
    languages,
  };
}
