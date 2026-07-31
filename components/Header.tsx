'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/work', label: 'Work' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header id="site-header" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav-inner">
        <Link href="/" className="logotype">
          markyyy<span className="dot" />
        </Link>

        <nav id="site-nav" ref={navRef} className={menuOpen ? 'open' : ''}>
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href || pathname.startsWith(href + '/') ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="nav-cta mobile" onClick={() => setMenuOpen(false)}>
            <span className="dot" /> Start a project
          </Link>
        </nav>

        <Link href="/contact" className="nav-cta">
          <span className="dot" /> Start a project
        </Link>

        <button
          className={`menu-toggle${menuOpen ? ' active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
