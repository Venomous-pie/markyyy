'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/studio/dashboard', label: 'Overview', icon: '◈' },
  { href: '/studio/dashboard/projects', label: 'Projects', icon: '◻' },
  { href: '/studio/dashboard/settings', label: 'Settings', icon: '◌' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/studio');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0E0F14', display: 'flex' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        background: '#12131A',
        borderRight: '1px solid rgba(222,225,234,0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-8)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 50,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--display)',
          fontSize: '1.4rem',
          fontWeight: 600,
          color: '#FCFCFE',
          letterSpacing: '-0.01em',
          marginBottom: 'var(--space-10)',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
          textDecoration: 'none',
        }}>
          markyyy<span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', borderRadius: '50%', background: 'var(--blue)', marginBottom: '2px' }} />
        </Link>

        {/* Studio Label */}
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(252,252,254,0.3)',
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-6)',
          borderBottom: '1px solid rgba(252,252,254,0.06)',
        }}>
          Studio Panel
        </p>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {navItems.map(({ href, label, icon }) => {
            const active = href === '/studio/dashboard'
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: '6px',
                  marginBottom: '4px',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: active ? '#fff' : 'rgba(252,252,254,0.45)',
                  background: active ? 'rgba(30,58,240,0.2)' : 'transparent',
                  border: active ? '1px solid rgba(30,58,240,0.3)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(252,252,254,0.06)', paddingTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Link href="/" target="_blank" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(252,252,254,0.35)',
            textDecoration: 'none',
          }}>
            ↗ View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(252,252,254,0.35)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
            }}
          >
            {loggingOut ? 'Signing out…' : '← Sign Out'}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: '260px', flex: 1, padding: 'var(--space-10)', color: '#FCFCFE' }}>
        {children}
      </main>
    </div>
  );
}
