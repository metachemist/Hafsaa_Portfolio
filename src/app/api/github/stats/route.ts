import { NextRequest, NextResponse } from 'next/server';
import { getUserStats } from '@/lib/github/github-api';
import { siteConfig } from '@/lib/site-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username') || siteConfig.githubUsername;

  try {
    const stats = await getUserStats(username);
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch GitHub stats.',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}
