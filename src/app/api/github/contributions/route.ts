import { NextRequest, NextResponse } from 'next/server';
import { getRecentContributions } from '@/lib/github/github-api';
import { siteConfig } from '@/lib/site-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username') || siteConfig.githubUsername;

  try {
    const contributions = await getRecentContributions(username);
    return NextResponse.json(contributions, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch contribution data.',
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
