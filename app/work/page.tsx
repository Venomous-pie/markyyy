import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getProjects, getSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies from markyyy. — brand identity, editorial, packaging, and digital projects from 2024 to 2026.',
};

export default async function WorkPage() {
  const projects = await getProjects();
  const settings = await getSettings();

  return (
    <main>
      {/* PAGE HERO */}
      <div className="wrap page-hero">
        <p className="eyebrow"><span className="dot pulse" />Selected Projects</p>
        <h1>Featured<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Work</em></h1>
        <p>A curated selection of case studies spanning brand identity, editorial design, packaging systems, and digital platforms.</p>
      </div>

      {/* ALL PROJECTS */}
      <div className="work-container" style={{ paddingTop: 'var(--space-xxl)' }}>
        {projects.map((project, i) => (
          <article key={project.slug} className="work-item">
            <ScrollReveal className="work-visual" delay={0.1}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="work-img"
                sizes="(max-width: 860px) 100vw, 58vw"
              />
            </ScrollReveal>
            <ScrollReveal className="work-info" delay={0.25}>
              <p className="eyebrow">
                <span className="dot" />
                {project.category} — {project.year}
              </p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="work-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link href={`/work/${project.slug}`} className="work-link">
                View case study <span className="dot" />
              </Link>
            </ScrollReveal>
          </article>
        ))}
      </div>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <p className="eyebrow"><span className="dot pulse" />{settings.ctaAvailability}</p>
          <h2 style={{ whiteSpace: 'pre-wrap' }}>
            {settings.ctaHeadline}
            <span className="dot" />
          </h2>
          <Link href="/contact" className="cta-btn">
            <span className="dot" /> Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
