import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'markyyy. is an independent graphic design practice focused on identity, editorial, and art direction for brands that believe how you look is part of what you say.',
};

export default async function AboutPage() {
  const settings = await getSettings();
  
  return (
    <main>
      {/* PAGE HERO */}
      <div className="wrap page-hero">
        <p className="eyebrow"><span className="dot" />Studio</p>
        <h1>Design as a<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>language</em></h1>
        <p>markyyy. is an independent graphic design practice. We believe that how a brand looks is inseparable from what it says — and that the best visual work changes how an audience thinks, not just what they see.</p>
      </div>

      {/* INTRO SECTION */}
      <section className="wrap" style={{ paddingTop: 'var(--space-xxl)', paddingBottom: 'var(--space-xxl)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
          <ScrollReveal>
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <Image src="/sample_1.jpg" alt="Studio work" fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div style={{ paddingTop: 'var(--space-lg)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-8)' }}>
                <span className="dot" />Our Practice
              </p>
              <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 'var(--space-8)', fontStyle: 'italic' }}>
                "We are not decorators. We are visual thinkers who happen to work with type, image, and form."
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1rem', marginBottom: 'var(--space-6)' }}>
                Founded with the belief that small, independent studios can produce work that competes with anyone, markyyy. has built a reputation for craft, rigour, and creative partnership.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1rem', marginBottom: 'var(--space-6)' }}>
                We work with clients across brand strategy, editorial publishing, packaging, and digital platforms. Our projects range from six-week identity sprints to multi-year brand partnerships.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1rem' }}>
                Based across time zones. Working with clients who want to be looked at twice.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: 'var(--paper-dim)', padding: 'var(--space-xxl) 0' }}>
        <div className="wrap">
          <ScrollReveal>
            <p className="eyebrow" style={{ marginBottom: 'var(--space-xl)' }}>
              <span className="dot" />What we believe
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'var(--space-lg)' }}>
            {[
              { title: 'Craft over speed', desc: 'Every decision — a typeface, a margin, a colour — deserves considered attention. We do not rush craft.' },
              { title: 'Strategy before aesthetics', desc: 'Beautiful work that does not communicate anything is decoration. We start with the brief and let the aesthetic follow.' },
              { title: 'Collaboration, not submission', desc: 'The best outcomes come from genuine creative partnership. We push back. We ask hard questions. We expect the same.' },
              { title: 'Longevity over trend', desc: 'We design systems that age well. Trends are interesting references; they are not foundations.' },
              { title: 'Transparency in process', desc: 'No black boxes. You see the thinking, not just the output. That is how trust is built.' },
              { title: 'Sustainability in practice', desc: 'From the materials we specify to the clients we choose, we think about the longer impact of what we make.' },
            ].map(({ title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.07}>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 'var(--space-5)' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="wrap" style={{ paddingTop: 'var(--space-xxl)', paddingBottom: 'var(--space-xxl)', borderBottom: '1px solid var(--line)' }}>
        <ScrollReveal>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="dot" />Recognition
          </p>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-8)' }}>
          {[
            { award: 'Type Directors Club', project: 'Twice Magazine Redesign', year: '2025' },
            { award: 'D&AD — Wood Pencil', project: 'Verdant Packaging System', year: '2025' },
            { award: 'Brand New Awards', project: 'Nova Identity', year: '2026' },
            { award: 'AIGA 50 Books / 50 Covers', project: 'Twice Vol. 3', year: '2025' },
          ].map(({ award, project, year }, i) => (
            <ScrollReveal key={award} delay={i * 0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <p className="eyebrow">{year}</p>
                <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {award}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{project}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

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
