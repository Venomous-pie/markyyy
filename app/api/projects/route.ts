import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { readContent, writeContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';

export async function GET() {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const content = await readContent();
  return NextResponse.json(content.projects);
}

export async function POST(req: NextRequest) {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const newProject = await req.json();
  const content = await readContent();
  
  if (content.projects.find(p => p.slug === newProject.slug)) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
  }

  content.projects.push(newProject);
  await writeContent(content);
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
