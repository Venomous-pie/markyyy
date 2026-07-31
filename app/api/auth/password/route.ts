import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { readContent, writeContent, getPassword } from '@/lib/content';
import { revalidatePath } from 'next/cache';

export async function PUT(req: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (currentPassword !== await getPassword()) {
    return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
  }

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
  }

  const content = await readContent();
  content.studioPassword = newPassword;
  await writeContent(content);

  return NextResponse.json({ ok: true });
}
