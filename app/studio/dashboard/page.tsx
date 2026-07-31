import { getProjects, getSettings } from '@/lib/content';
import Link from 'next/link';

export default async function DashboardPage() {
  const projects = await getProjects();
  const settings = await getSettings();
  const featured = projects.filter((p) => p.featured).length;

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Featured on Home', value: featured },
    { label: 'Studio Email', value: settings.email },
    { label: 'Availability', value: settings.ctaAvailability },
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 'var(--space-10)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid rgba(222,225,234,0.08)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', marginBottom: 'var(--space-3)' }}>
          Welcome back
        </p>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>
          {settings.studioName} Studio
        </h1>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
        {stats.map(({ label, value }) => (
          <div key={label} style={{
            background: 'rgba(252,252,254,0.04)',
            border: '1px solid rgba(222,225,234,0.08)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
          }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', marginBottom: 'var(--space-3)' }}>
              {label}
            </p>
            <p style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', marginBottom: 'var(--space-6)' }}>
          Quick Actions
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Link href="/studio/dashboard/projects/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
            fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--blue)', color: '#fff', padding: 'var(--space-4) var(--space-8)',
            borderRadius: 'var(--radius-pill)', textDecoration: 'none', transition: 'background 0.3s ease',
          }}>
            + Add New Project
          </Link>
          <Link href="/studio/dashboard/settings" style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
            fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'rgba(252,252,254,0.08)', color: 'rgba(252,252,254,0.7)',
            border: '1px solid rgba(252,252,254,0.12)',
            padding: 'var(--space-4) var(--space-8)', borderRadius: 'var(--radius-pill)', textDecoration: 'none',
          }}>
            ◌ Edit Site Settings
          </Link>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)' }}>
            All Projects ({projects.length})
          </p>
          <Link href="/studio/dashboard/projects" style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--blue)', textDecoration: 'none' }}>
            Manage All →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/studio/dashboard/projects/${p.slug}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-5) var(--space-6)',
              background: 'rgba(252,252,254,0.03)',
              border: '1px solid rgba(222,225,234,0.06)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(252,252,254,0.08)', backgroundImage: p.image ? `url(${p.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 500, color: '#FCFCFE', marginBottom: '2px' }}>{p.title}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)' }}>{p.category} — {p.year}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                {p.featured && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(30,58,240,0.2)', border: '1px solid rgba(30,58,240,0.3)', color: 'rgba(180,195,255,0.9)', padding: '3px 10px', borderRadius: '99px' }}>
                    Featured
                  </span>
                )}
                <span style={{ color: 'rgba(252,252,254,0.3)', fontSize: '0.9rem' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
