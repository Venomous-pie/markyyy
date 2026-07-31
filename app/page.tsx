import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ScrollReveal from '@/components/ScrollReveal';
import { getFeaturedProjects, getSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'markyyy. — Graphic Design Portfolio',
  description: 'markyyy. is a graphic design practice building identities, editorial systems, and visual worlds for clients who want to be looked at twice.',
};

export default async function Home() {
  const projects = await getFeaturedProjects();
  const settings = await getSettings();
  
  return (
    <main id="top">
      <HeroSection 
        role={settings.heroRole}
        location={settings.heroLocation}
        volume={settings.heroVolume}
        sub={settings.heroSub}
      />

      {/* MANIFESTO */}
      <section className="manifesto wrap">
        <ScrollReveal>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {settings.manifesto}
          </p>
        </ScrollReveal>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="wrap section-head">
          <div>
            <p className="eyebrow">04 Case Studies</p>
            <h2>Featured Work</h2>
          </div>
          <p className="eyebrow" style={{ color: 'var(--ink)' }}>2024 — 2026</p>
        </div>

        <div className="work-container">
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
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="capabilities wrap">
        <div className="section-head" style={{ paddingTop: 0, marginBottom: 0, borderBottom: 'none' }}>
          <div>
            <p className="eyebrow">Services</p>
            <h2>Capabilities</h2>
          </div>
        </div>
        <ul className="cap-list">
          {[
            { num: '01', name: 'Brand Identity', tag: 'Logo, System, Guidelines' },
            { num: '02', name: 'Editorial Design', tag: 'Layout, Typography' },
            { num: '03', name: 'Packaging', tag: 'Structure, Print' },
            { num: '04', name: 'Art Direction', tag: 'Campaigns, Photography' },
            { num: '05', name: 'Web & Digital', tag: 'Sites, Interfaces' },
          ].map(({ num, name, tag }) => (
            <li key={num} className="cap-row">
              <span className="cap-num">{num}</span>
              <span className="cap-name">{name}</span>
              <span className="cap-tag">{tag}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div className="wrap">
          <span className="dot" />
          <blockquote style={{ whiteSpace: 'pre-wrap' }}>
            "{settings.testimonial.quote}"
          </blockquote>
          <cite>— {settings.testimonial.author}, {settings.testimonial.role}</cite>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta">
        <div className="wrap">
          <p className="eyebrow">
            <span className="dot pulse" />{settings.ctaAvailability}
          </p>
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
