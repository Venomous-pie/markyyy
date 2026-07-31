'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const styles = `
  .studio-layout { display: flex; flex-direction: column; min-height: 100vh; background: #0E0F14; }
  .studio-sidebar { 
    width: 100%; border-right: none; border-bottom: 1px solid rgba(222,225,234,0.08); 
    background: #12131A; padding: var(--space-5) var(--space-5) 0; 
    position: sticky; top: 0; z-index: 50; display: flex; flex-direction: column;
  }
  .studio-sidebar-top { display: flex; justify-content: space-between; align-items: flex-start; }
  
  .studio-logo {
    font-family: var(--display); font-size: 1.4rem; font-weight: 600; color: #FCFCFE;
    letter-spacing: -0.01em; display: flex; align-items: baseline; gap: 2px; text-decoration: none;
  }
  .studio-logo .dot { display: inline-block; width: 0.16em; height: 0.16em; border-radius: 50%; background: var(--blue); margin-bottom: 2px; }
  .studio-label {
    font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(252,252,254,0.3); margin-top: 4px;
  }
  
  .studio-nav-wrapper { 
    display: flex; overflow-x: auto; gap: 8px; margin-top: var(--space-4); 
    padding-bottom: var(--space-4); scrollbar-width: none; 
  }
  .studio-nav-wrapper::-webkit-scrollbar { display: none; }
  
  .studio-nav-link { 
    display: flex; align-items: center; gap: 8px; padding: 10px 14px; 
    border-radius: 6px; font-family: var(--mono); font-size: 0.75rem; 
    letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; text-decoration: none;
  }
  
  .studio-mobile-logout {
    font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(252,252,254,0.4); background: rgba(252,252,254,0.05); border: 1px solid rgba(252,252,254,0.1); 
    border-radius: 4px; padding: 6px 10px; cursor: pointer;
  }
  
  .studio-main { margin-left: 0; flex: 1; padding: var(--space-5); color: #FCFCFE; overflow-x: hidden; }
  .studio-footer { display: none; }
  
  @media (min-width: 768px) {
    .studio-layout { flex-direction: row; }
    .studio-sidebar { 
      width: 260px; height: 100vh; position: fixed; 
      padding: var(--space-8); border-right: 1px solid rgba(222,225,234,0.08); 
      border-bottom: none;
    }
    .studio-sidebar-top { flex-direction: column; align-items: flex-start; margin-bottom: var(--space-10); }
    .studio-label { margin-top: var(--space-8); padding-bottom: var(--space-6); border-bottom: 1px solid rgba(252,252,254,0.06); width: 100%; }
    .studio-mobile-logout { display: none; }
    
    .studio-nav-wrapper { flex-direction: column; overflow-x: visible; margin-top: 0; padding-bottom: 0; width: 100%; flex: 1; }
    .studio-nav-link { font-size: 0.8rem; padding: var(--space-3) var(--space-4); margin-bottom: 4px; }
    .studio-main { margin-left: 260px; padding: var(--space-10); }
    .studio-footer { display: flex; flex-direction: column; gap: var(--space-4); border-top: 1px solid rgba(252,252,254,0.06); padding-top: var(--space-6); margin-top: auto; width: 100%; }
  }
`;

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
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="studio-layout">
        {/* SIDEBAR / TOPNAV */}
        <aside className="studio-sidebar">
          <div className="studio-sidebar-top">
            <div>
              <Link href="/" className="studio-logo">
                markyyy<span className="dot" />
              </Link>
              <p className="studio-label">Studio Panel</p>
            </div>
            <button onClick={handleLogout} disabled={loggingOut} className="studio-mobile-logout">
              {loggingOut ? '...' : 'Sign Out'}
            </button>
          </div>

          <nav className="studio-nav-wrapper">
            {navItems.map(({ href, label, icon }) => {
              const active = href === '/studio/dashboard'
                ? pathname === href
                : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="studio-nav-link"
                  style={{
                    color: active ? '#fff' : 'rgba(252,252,254,0.45)',
                    background: active ? 'rgba(30,58,240,0.2)' : 'transparent',
                    border: active ? '1px solid rgba(30,58,240,0.3)' : '1px solid transparent',
                  }}
                >
                  <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="studio-footer">
            <Link href="/" target="_blank" style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', textDecoration: 'none',
            }}>
              ↗ View Portfolio
            </Link>
            <button onClick={handleLogout} disabled={loggingOut} style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', background: 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
            }}>
              {loggingOut ? 'Signing out…' : '← Sign Out'}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="studio-main">
          {children}
        </main>
      </div>
    </>
  );
}
