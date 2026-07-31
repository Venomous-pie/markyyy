import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /studio/dashboard routes
  if (pathname.startsWith('/studio/dashboard')) {
    const res = NextResponse.next();

    const session = await getIronSession<SessionData>(req, res, {
      password: process.env.SESSION_SECRET as string,
      cookieName: 'markyyy-studio-session',
    });

    if (!session.isOwner) {
      return NextResponse.redirect(new URL('/studio', req.url));
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/dashboard/:path*'],
};
