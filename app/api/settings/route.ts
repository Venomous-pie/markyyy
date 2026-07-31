import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { readContent, writeContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';

export async function GET() {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const content = await readContent();
  return NextResponse.json(content.settings);
}

export async function PUT(req: NextRequest) {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const newSettings = await req.json();
  const content = await readContent();
  content.settings = newSettings;
  await writeContent(content);
  revalidatePath('/', 'layout'); // Revalidate everything
  return NextResponse.json({ ok: true });
}
