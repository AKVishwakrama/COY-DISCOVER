import { NextResponse } from 'next/server';
import { getFeed } from '../../../lib/db';

export const dynamic = 'force-dynamic'; // never cache: the feed changes after every swipe

// GET /feed -> profiles the user has not swiped on yet
export async function GET() {
  return NextResponse.json({ profiles: getFeed() });
}
