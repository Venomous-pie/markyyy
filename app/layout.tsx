import type { Metadata } from 'next';
import { Fraunces, Inter, Space_Mono } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--display',
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--mono',
  weight: ['400', '700'],
  display: 'swap',
});

import PublicLayout from '@/components/PublicLayout';
import Blinders from '@/components/Blinders';

export const metadata: Metadata = {
  title: {
    default: 'markyyy. — Graphic Design Portfolio',
    template: '%s — markyyy.',
  },
  description:
    'markyyy. is a graphic design practice building identities, editorial systems, and visual worlds for clients who want to be looked at twice.',
  openGraph: {
    siteName: 'markyyy.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        <Blinders />
        <PublicLayout
          header={<Header />}
          footer={<Footer />}
        >
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}
