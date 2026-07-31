import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/session';
import { put } from '@vercel/blob';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  // Tell the client which upload method to use
  return NextResponse.json({
    provider: process.env.BLOB_READ_WRITE_TOKEN ? 'vercel-blob' : 'local'
  });
}

export async function POST(req: NextRequest) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentType = req.headers.get('content-type') || '';

  // 1. Client-Side Vercel Blob Upload (Handles large files > 4.5MB)
  if (contentType.includes('application/json')) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Vercel Blob is not configured' }, { status: 400 });
    }

    try {
      const body = (await req.json()) as HandleUploadBody;
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname) => {
          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          // Log completion if needed
        },
      });
      return NextResponse.json(jsonResponse);
    } catch (error) {
      console.error('Vercel Blob Client Upload Error:', error);
      return NextResponse.json({ error: 'Failed to authorize upload' }, { status: 500 });
    }
  }

  // 2. Local Fallback (Direct file upload)
  if (contentType.includes('multipart/form-data')) {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      
      return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
      console.error('Local Upload Error:', error);
      return NextResponse.json({ error: 'Local upload failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
}
