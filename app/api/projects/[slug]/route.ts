import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { readContent, writeContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';

export async function PUT(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const params = await props.params;
  const updatedProject = await req.json();
  const content = await readContent();

  const index = content.projects.findIndex(p => p.slug === params.slug);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  content.projects[index] = updatedProject;
  await writeContent(content);
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  if (!(await requireOwner())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const params = await props.params;
  const content = await readContent();

  const index = content.projects.findIndex(p => p.slug === params.slug);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  content.projects.splice(index, 1);
  await writeContent(content);
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
