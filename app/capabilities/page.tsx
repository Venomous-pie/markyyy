import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Capabilities',
  description: 'Services offered by markyyy. — brand identity, editorial design, packaging, art direction, and digital design.',
};

const capabilities = [
  {
    num: '01',
    name: 'Brand Identity',
    tag: 'Logo, System, Guidelines',
    description: 'We build brand systems that are coherent, scalable, and distinctly alive. From strategy and naming through to final brand guidelines, every element is designed to work harder the more it is used.',
  },
  {
    num: '02',
    name: 'Editorial Design',
    tag: 'Layout, Typography',
    description: 'Publications, reports, and editorial content elevated through rigorous typographic systems and compositional thinking. Every spread is designed to be read and remembered.',
  },
  {
    num: '03',
    name: 'Packaging',
    tag: 'Structure, Print',
    description: 'Structural packaging and labeling that understands the shelf, the hand, and the unboxing moment. We design for sustainability without compromising on tactile quality.',
  },
  {
    num: '04',
    name: 'Art Direction',
    tag: 'Campaigns, Photography',
    description: 'Creative direction for campaigns, shoots, and multi-channel rollouts. We connect visual thinking to narrative strategy and ensure every image earns its place.',
  },
  {
    num: '05',
    name: 'Web & Digital',
    tag: 'Sites, Interfaces',
    description: 'Digital experiences designed with the same editorial rigour as our print work. From portfolio sites to complex platforms, we design systems that scale beautifully.',
  },
];

export default async function CapabilitiesPage() {
  const settings = await getSettings();
  return (
    <main>
      {/* PAGE HERO */}
      <div className="wrap page-hero">
        <p className="eyebrow"><span className="dot" />Services</p>
        <h1>What we<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>do best</em></h1>
        <p>Design is not decoration. Every service we offer is built around a core belief: that visual communication, done with rigour and intention, changes how the world perceives your work.</p>
      </div>

      {/* CAPABILITIES LIST */}
      <section className="capabilities wrap" style={{ paddingTop: 'var(--space-xl)' }}>
        <ul className="cap-list">
          {capabilities.map(({ num, name, tag }) => (
            <li key={num} className="cap-row">
              <span className="cap-num">{num}</span>
              <span className="cap-name">{name}</span>
              <span className="cap-tag">{tag}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* EXPANDED DESCRIPTIONS */}
      <section className="wrap" style={{ padding: 'var(--space-xxl) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: 'var(--space-lg)' }}>
          {capabilities.map(({ num, name, tag, description }, i) => (
            <ScrollReveal key={num} delay={i * 0.08}>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)' }}>
                <p className="eyebrow" style={{ marginBottom: 'var(--space-5)' }}>
                  <span className="dot" />{num} — {tag}
                </p>
                <h2 style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  letterSpacing: '-0.02em',
                  marginBottom: 'var(--space-6)',
                  lineHeight: 1.1,
                }}>
                  {name}
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '1rem' }}>{description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(80px, 12vw, 160px) 0' }}>
        <div className="wrap">
          <ScrollReveal>
            <p className="eyebrow" style={{ color: 'rgba(252,252,254,0.5)', marginBottom: 'var(--space-xl)' }}>
              <span className="dot" />How we work
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-lg)' }}>
            {[
              { step: '01', title: 'Discovery', desc: 'We listen before we speak. Every engagement begins with a research phase — stakeholder interviews, competitive mapping, and audience analysis.' },
              { step: '02', title: 'Strategy', desc: 'We translate research into a creative brief that defines the position, the tone, and the visual territory we will explore.' },
              { step: '03', title: 'Design', desc: 'Iterative exploration and refinement in close collaboration with your team. We show our thinking, not just our output.' },
              { step: '04', title: 'Deliver', desc: 'Comprehensive handoff including brand guidelines, file libraries, and training. We build systems you can own and operate.' },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 0.1}>
                <div style={{ borderTop: '1px solid rgba(252,252,254,0.15)', paddingTop: 'var(--space-8)' }}>
                  <p className="eyebrow" style={{ color: 'rgba(252,252,254,0.4)', marginBottom: 'var(--space-5)' }}>{step}</p>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 'var(--space-5)' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'rgba(252,252,254,0.6)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
