import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Use Vercel Blob
      const blob = await put(`uploads/${filename}`, file, { access: 'public' });
      return NextResponse.json({ url: blob.url });
    } else {
      // Local Fallback
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      return NextResponse.json({ url: `/uploads/${filename}` });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
