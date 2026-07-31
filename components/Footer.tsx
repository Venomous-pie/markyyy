import Link from 'next/link';
import { getSettings } from '@/lib/content';

export default async function Footer({ page = 'Homepage' }: { page?: string }) {
  const settings = await getSettings();
  
  return (
    <footer id="about">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{settings.studioName}</h4>
            <p style={{ maxWidth: '28ch', color: 'var(--muted)' }}>
              {settings.footerBio}
            </p>
          </div>
          <div className="footer-col">
            <h4>Sitemap</h4>
            <Link href="/work">Work</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={settings.socials.behance} target="_blank" rel="noopener noreferrer">Behance</a>
            <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}>{settings.phone}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 markyyy. — All rights reserved</span>
          <span>Site v.01 — {page}</span>
        </div>
      </div>
    </footer>
  );
}
