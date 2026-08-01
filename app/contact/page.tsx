import { getSettings } from '@/lib/content';
import ContactForm from './ContactForm';

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <main>
      {/* FULL-SCREEN HERO CTA */}
      <section className="cta" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <p className="eyebrow">
            <span className="dot pulse" />{settings.ctaAvailability}
          </p>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontWeight: 500,
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            marginBottom: 'var(--space-12)',
            whiteSpace: 'pre-wrap',
          }}>
            {settings.ctaHeadline}<span className="dot" />
          </h1>
          <a href={`mailto:${settings.email}`} className="cta-btn">
            <span className="dot" /> {settings.email}
          </a>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="wrap" style={{ paddingTop: 'var(--space-xxl)', paddingBottom: 'var(--space-xxl)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'var(--space-xxl)', alignItems: 'start' }}>

          {/* FORM */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 'var(--space-8)' }}>
              <span className="dot" />Send us a brief
            </p>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-xl)',
              lineHeight: 1,
            }}>
              Tell us about<br />your project
            </h2>

            <ContactForm targetEmail={settings.email} />
          </div>

          {/* CONTACT INFO */}
          <div style={{ paddingTop: 'var(--space-xl)' }}>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Email</p>
              <a href={`mailto:${settings.email}`} style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 500, letterSpacing: '-0.01em', transition: 'color 0.3s ease' }}>
                {settings.email}
              </a>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Phone</p>
              <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                {settings.phone}
              </a>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Elsewhere</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {Object.entries(settings.socials).map(([platform, link]) => (
                  <a key={platform} href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem', color: 'var(--muted)', transition: 'color 0.2s ease', textTransform: 'capitalize' }}>
                    {platform} →
                  </a>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--space-8)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Response Time</p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We reply to all enquiries within 2 business days. For urgent projects, mention it in your brief.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
