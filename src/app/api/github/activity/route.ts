import { NextRequest, NextResponse } from 'next/server';
import { getRecentRepoActivity } from '@/lib/github/github-api';
import { siteConfig } from '@/lib/site-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username') || siteConfig.githubUsername;

  try {
    const events = await getRecentRepoActivity(username);

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}
