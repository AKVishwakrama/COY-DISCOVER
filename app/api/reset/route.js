import { NextResponse } from 'next/server';
import { reset } from '../../../lib/db';

export const dynamic = 'force-dynamic';

// POST /api/reset -> demo helper. Wipes swipes + matches so you can run the demo again.
// Set DISABLE_RESET=1 to turn it off.
export async function POST() {
  if (process.env.DISABLE_RESET) return NextResponse.json({ error: 'Disabled.' }, { status: 403 });
  reset();
  return NextResponse.json({ ok: true });
}
