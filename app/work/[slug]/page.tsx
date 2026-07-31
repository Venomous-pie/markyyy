import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import { getProjects, getProjectBySlug, getAdjacentProjects } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  return (
    <main>
      {/* CASE HERO */}
      <div className="wrap" style={{ paddingTop: 'max(140px, 18vh)', paddingBottom: 'var(--space-xl)' }}>
        <p className="eyebrow" style={{ marginBottom: 'var(--space-8)' }}>
          <span className="dot" />
          {project.category} — {project.year}
        </p>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontWeight: 500,
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          marginBottom: 'var(--space-md)',
        }}>
          {project.title}
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'var(--muted)', maxWidth: '55ch', lineHeight: 1.6 }}>
          {project.longDescription}
        </p>
      </div>

      {/* HERO IMAGE */}
      <div className="wrap">
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="case-hero-img"
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* CASE BODY */}
      <div className="wrap">
        <div className="case-body">
          {/* CONTENT */}
          <div className="case-content">
            <ScrollReveal>
              <h2>The Challenge</h2>
              <p>{project.challenge}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2>The Solution</h2>
              <p>{project.solution}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2>The Outcome</h2>
              <p>{project.outcome}</p>
            </ScrollReveal>

            {/* GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-xl)' }}>
                {project.gallery.map((img, i) => (
                  <ScrollReveal key={img} delay={0.1}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <Image src={img} alt={`${project.title} detail`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 960px) 100vw, 66vw" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
            
            {/* VIDEO EMBED */}
            {project.videoUrl && (
              <ScrollReveal delay={0.1}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginTop: 'var(--space-xl)', borderRadius: 'var(--radius-md)' }}>
                  <iframe src={project.videoUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allowFullScreen />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="case-sidebar">
            <div className="case-meta-item">
              <p className="eyebrow">Category</p>
              <p>{project.category}</p>
            </div>
            <div className="case-meta-item">
              <p className="eyebrow">Year</p>
              <p>{project.year}</p>
            </div>
            <div className="case-meta-item">
              <p className="eyebrow">Services</p>
              <div className="work-tags" style={{ marginTop: 'var(--space-3)', marginBottom: 0 }}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* CASE NAV */}
        <nav className="case-nav">
          <div className="case-nav-item">
            {prev && (
              <>
                <p className="eyebrow">← Previous</p>
                <Link href={`/work/${prev.slug}`}>{prev.title}</Link>
              </>
            )}
          </div>
          <div className="case-nav-item next">
            {next && (
              <>
                <p className="eyebrow">Next →</p>
                <Link href={`/work/${next.slug}`}>{next.title}</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
