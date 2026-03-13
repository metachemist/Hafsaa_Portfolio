import { NextRequest, NextResponse } from 'next/server';
import { detectTechStack, getAllRepos } from '@/lib/github/github-api';
import { siteConfig } from '@/lib/site-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username') || siteConfig.githubUsername;

  try {
    const repos = await getAllRepos(username);
    const techStack = await detectTechStack(repos);

    return NextResponse.json(techStack, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error detecting tech stack:', error);
    return NextResponse.json(
      { error: 'Failed to detect tech stack' },
      { status: 500 }
    );
  }
}
