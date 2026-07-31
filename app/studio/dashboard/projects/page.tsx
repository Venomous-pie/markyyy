import { getProjects } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProjectsListPage() {
  const projects = await getProjects();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid rgba(222,225,234,0.08)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', marginBottom: 'var(--space-3)' }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Projects
          </h1>
        </div>
        <Link href="/studio/dashboard/projects/new" style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--blue)', color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', transition: 'background 0.3s ease', textDecoration: 'none' }}>
          + Add New Project
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {projects.map((p) => (
          <div key={p.slug} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
            padding: 'var(--space-5) var(--space-6)',
            background: 'rgba(252,252,254,0.03)',
            border: '1px solid rgba(222,225,234,0.08)',
            borderRadius: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
              <div style={{ width: '60px', height: '45px', borderRadius: '4px', background: 'rgba(252,252,254,0.08)', backgroundImage: p.image ? `url(${p.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 500, color: '#FCFCFE', marginBottom: '4px' }}>{p.title}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.4)' }}>{p.category} — {p.year}</p>
                  {p.featured && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(30,58,240,0.2)', border: '1px solid rgba(30,58,240,0.3)', color: 'rgba(180,195,255,0.9)', padding: '2px 8px', borderRadius: '99px' }}>
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={`/studio/dashboard/projects/${p.slug}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(252,252,254,0.08)', border: '1px solid rgba(252,252,254,0.12)', color: 'rgba(252,252,254,0.8)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', textDecoration: 'none' }}>
                Edit
              </Link>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center', background: 'rgba(252,252,254,0.02)', borderRadius: '8px', border: '1px dashed rgba(252,252,254,0.1)' }}>
            <p style={{ color: 'rgba(252,252,254,0.4)', marginBottom: 'var(--space-4)' }}>No projects found.</p>
            <Link href="/studio/dashboard/projects/new" style={{ color: 'var(--blue)' }}>Create your first project →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
