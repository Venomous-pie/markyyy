'use client';

import { useEffect } from 'react';
import SmartImage from '@/components/SmartImage';
import { motion, useScroll, useTransform, stagger, animate } from 'framer-motion';
import { useRef } from 'react';

interface HeroProps {
  role: string;
  location: string;
  volume: string;
  sub: string;
  image?: string;
  imagePosition?: string;
}

export default function HeroSection({ role, location, volume, sub, image, imagePosition }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const floatingY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const spans = document.querySelectorAll('.hero-line > span');
    animate(
      spans as unknown as string,
      { y: ['110%', '0%'] },
      {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: stagger(0.15, { startDelay: 0.1 }),
      }
    );
  }, []);

  return (
    <section className="hero wrap" ref={heroRef} id="top">
      <div className="hero-meta">
        <p className="eyebrow">
          <span className="dot pulse" />
          <span className="label">{role}</span> — {location}
        </p>
        <p className="eyebrow">{volume}</p>
      </div>

      <h1 className="hero-headline">
        <span className="hero-line"><span>Design that</span></span>
        <span className="hero-line"><span>gives brands</span></span>
        <span className="hero-line">
          <span>
            <em>something to say</em>
            <span className="dot cursor" />
          </span>
        </span>
      </h1>

      <motion.div
        ref={floatingRef}
        className="hero-floating-media"
        style={{ y: floatingY }}
      >
        <SmartImage
          src={image || "/sample_2.jpg"}
          alt="Editorial design showcase"
          fill
          objectPosition={imagePosition}
          priority
        />
      </motion.div>

      <div className="hero-foot">
        <p className="hero-sub">
          {sub}
        </p>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="stem" />
        </div>
      </div>
    </section>
  );
}
