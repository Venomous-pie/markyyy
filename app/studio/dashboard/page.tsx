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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .dash-header {
            margin-bottom: var(--space-10);
            padding-bottom: var(--space-8);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .dash-welcome {
            font-family: var(--mono);
            font-size: 0.72rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(252,252,254,0.35);
            margin-bottom: var(--space-3);
          }
          .dash-title {
            font-family: var(--display);
            font-size: clamp(2rem, 4vw, 3.5rem);
            font-weight: 500;
            letter-spacing: -0.02em;
            line-height: 1.1;
            background: linear-gradient(135deg, #FCFCFE 0%, #A0A5C0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .dash-stats {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: var(--space-5);
            margin-bottom: var(--space-10);
          }
          .stat-card {
            background: rgba(252,252,254,0.02);
            border: 1px solid rgba(255,255,255,0.04);
            border-radius: 16px;
            padding: var(--space-6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            transform: translateY(20px);
            min-width: 0;
          }
          .stat-card:nth-child(1) { animation-delay: 0.1s; }
          .stat-card:nth-child(2) { animation-delay: 0.2s; }
          .stat-card:nth-child(3) { animation-delay: 0.3s; }
          .stat-card:nth-child(4) { animation-delay: 0.4s; }
          .stat-card:hover {
            transform: translateY(-4px);
            background: rgba(252,252,254,0.04);
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          .stat-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
          }
          .stat-card:hover::before { opacity: 1; }
          .stat-label {
            font-family: var(--mono);
            font-size: 0.65rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(252,252,254,0.4);
            margin-bottom: var(--space-3);
          }
          .stat-value {
            font-family: var(--display);
            font-size: 1.8rem;
            font-weight: 500;
            letter-spacing: -0.02em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #FCFCFE;
          }
          .quick-actions {
            margin-bottom: var(--space-12);
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.3s;
            opacity: 0;
          }
          .qa-title {
            font-family: var(--mono);
            font-size: 0.72rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(252,252,254,0.35);
            margin-bottom: var(--space-6);
          }
          .qa-buttons {
            display: flex;
            gap: var(--space-4);
            flex-wrap: wrap;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: var(--space-3);
            font-family: var(--mono);
            font-size: 0.8rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: linear-gradient(135deg, var(--blue), var(--blue-deep));
            color: #fff;
            padding: var(--space-4) var(--space-8);
            border-radius: var(--radius-pill);
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 15px rgba(30,58,240,0.3);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .btn-primary:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 25px rgba(30,58,240,0.4);
          }
          .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: var(--space-3);
            font-family: var(--mono);
            font-size: 0.8rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: rgba(252,252,254,0.03);
            color: rgba(252,252,254,0.7);
            border: 1px solid rgba(252,252,254,0.12);
            padding: var(--space-4) var(--space-8);
            border-radius: var(--radius-pill);
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .btn-secondary:hover {
            background: rgba(252,252,254,0.08);
            color: #fff;
            transform: translateY(-2px);
            border-color: rgba(252,252,254,0.2);
          }
          .project-list-wrapper {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.4s;
            opacity: 0;
          }
          .pl-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-6);
          }
          .pl-title {
            font-family: var(--mono);
            font-size: 0.72rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(252,252,254,0.35);
          }
          .pl-link {
            font-family: var(--mono);
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--blue);
            text-decoration: none;
            transition: opacity 0.3s ease;
          }
          .pl-link:hover { opacity: 0.7; }
          .pl-items {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .pl-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-4) var(--space-5);
            background: rgba(252,252,254,0.02);
            border: 1px solid rgba(255,255,255,0.03);
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            min-width: 0;
          }
          .pl-item:hover {
            background: rgba(252,252,254,0.05);
            border-color: rgba(255,255,255,0.08);
            transform: translateX(4px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .pl-item-content {
            display: flex;
            align-items: center;
            gap: var(--space-5);
            min-width: 0;
            flex: 1;
          }
          .pl-item-img {
            width: 44px;
            height: 44px;
            border-radius: 8px;
            background: rgba(252,252,254,0.08);
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
            border: 1px solid rgba(255,255,255,0.05);
          }
          .pl-item-title {
            font-family: var(--display);
            font-size: 1.1rem;
            font-weight: 500;
            color: #FCFCFE;
            margin-bottom: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .pl-item-meta {
            font-family: var(--mono);
            font-size: 0.65rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(252,252,254,0.4);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .pl-item-actions {
            display: flex;
            align-items: center;
            gap: var(--space-5);
          }
          .pl-featured {
            font-family: var(--mono);
            font-size: 0.6rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            background: rgba(30,58,240,0.15);
            border: 1px solid rgba(30,58,240,0.3);
            color: rgba(180,195,255,1);
            padding: 4px 10px;
            border-radius: 99px;
            box-shadow: 0 0 10px rgba(30,58,240,0.2);
          }
          .pl-arrow {
            color: rgba(252,252,254,0.3);
            font-size: 1rem;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
          }
          .pl-item:hover .pl-arrow {
            transform: translateX(4px);
            color: #FCFCFE;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 767px) {
            .dash-header {
              margin-bottom: var(--space-6);
              padding-bottom: var(--space-6);
            }
            .dash-title {
              font-size: clamp(1.8rem, 8vw, 2.2rem);
            }
            .dash-stats {
              grid-template-columns: 1fr 1fr;
              gap: var(--space-3);
              margin-bottom: var(--space-8);
            }
            .stat-card {
              padding: var(--space-4);
              border-radius: 12px;
            }
            .stat-value {
              font-size: 1.3rem;
            }
            .stat-label {
              font-size: 0.58rem;
            }
            .quick-actions {
              margin-bottom: var(--space-8);
            }
            .qa-buttons {
              flex-direction: column;
              gap: var(--space-3);
            }
            .btn-primary, .btn-secondary {
              width: 100%;
              justify-content: center;
              padding: 12px var(--space-4);
              font-size: 0.75rem;
            }
            .pl-item {
              padding: var(--space-3) var(--space-4);
            }
            .pl-item-content {
              gap: var(--space-3);
            }
            .pl-item-img {
              width: 32px;
              height: 32px;
            }
            .pl-item-title {
              font-size: 0.95rem;
            }
            .pl-item-meta {
              font-size: 0.6rem;
            }
            .pl-featured {
              display: none;
            }
          }
        `
      }} />
      <div>
        {/* HEADER */}
        <div className="dash-header">
          <p className="dash-welcome">
            Welcome back
          </p>
          <h1 className="dash-title">
            {settings.studioName} Studio
          </h1>
        </div>

        {/* STATS */}
        <div className="dash-stats">
          {stats.map(({ label, value }) => (
            <div key={label} className="stat-card">
              <p className="stat-label">
                {label}
              </p>
              <p className="stat-value">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <p className="qa-title">
            Quick Actions
          </p>
          <div className="qa-buttons">
            <Link href="/studio/dashboard/projects/new" className="btn-primary">
              + Add New Project
            </Link>
            <Link href="/studio/dashboard/settings" className="btn-secondary">
              ◌ Edit Site Settings
            </Link>
          </div>
        </div>

        {/* PROJECT LIST */}
        <div className="project-list-wrapper">
          <div className="pl-header">
            <p className="pl-title">
              All Projects ({projects.length})
            </p>
            <Link href="/studio/dashboard/projects" className="pl-link">
              Manage All →
            </Link>
          </div>
          <div className="pl-items">
            {projects.map((p) => (
              <Link key={p.slug} href={`/studio/dashboard/projects/${p.slug}`} className="pl-item">
                <div className="pl-item-content">
                  <div className="pl-item-img" style={{ backgroundImage: p.image ? `url(${p.image})` : undefined }} />
                  <div>
                    <p className="pl-item-title">{p.title}</p>
                    <p className="pl-item-meta">{p.category} — {p.year}</p>
                  </div>
                </div>
                <div className="pl-item-actions">
                  {p.featured && (
                    <span className="pl-featured">
                      Featured
                    </span>
                  )}
                  <span className="pl-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
