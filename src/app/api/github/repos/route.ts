import { NextRequest, NextResponse } from 'next/server';
import { getAllRepos } from '@/lib/github/github-api';
import { siteConfig } from '@/lib/site-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username') || siteConfig.githubUsername;
  const perPage = parseInt(searchParams.get('per_page') || '100');

  try {
    const repos = await getAllRepos(username);

    const sortedRepos = repos
      .filter((repo) => !repo.fork && !repo.archived && !repo.disabled)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, perPage);

    return NextResponse.json(sortedRepos, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
