import { NextResponse } from 'next/server';
import { swipe } from '../../../lib/db';

export const dynamic = 'force-dynamic';

// POST /swipe  body: { profileId, direction: "like" | "pass" } -> { match: boolean, profile? }
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body must be JSON.' }, { status: 400 });
  }
  const result = swipe(body?.profileId, body?.direction);
  return NextResponse.json(result.body, { status: result.status });
}
