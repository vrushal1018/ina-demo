import { NextResponse } from 'next/server';
import { getActiveJobs } from '@/data/jobs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const jobs = getActiveJobs();
    return NextResponse.json(
      {
        success: true,
        jobs,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve jobs.' },
      { status: 500 }
    );
  }
}

