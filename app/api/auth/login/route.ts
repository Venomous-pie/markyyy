import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getPassword } from '@/lib/content';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== await getPassword()) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const session = await getSession();
  session.isOwner = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
