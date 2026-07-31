import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isOwner: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'markyyy-studio-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireOwner(): Promise<boolean> {
  const session = await getSession();
  return !!session.isOwner;
}
