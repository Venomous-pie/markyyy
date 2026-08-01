'use client';

import { useState } from 'react';

export default function ContactForm({ targetEmail }: { targetEmail: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{ padding: 'var(--space-xl)', background: 'var(--paper-dim)', borderRadius: 'var(--radius-md)', textAlign: 'center', gridColumn: '1 / -1' }}>
        <span className="dot pulse" style={{ display: 'block', margin: '0 auto var(--space-8)' }} />
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
          Message received.
        </h3>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
          We will be in touch within 2 business days. In the meantime, feel free to explore our work.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* FormSubmit Configuration */}
      <input type="hidden" name="_subject" value="New Project Brief Submission" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="box" />

      {error && (
        <div className="form-field full" style={{ color: '#ff6b6b', background: 'rgba(255,100,100,0.1)', padding: '12px', borderRadius: '4px' }}>
          There was an error sending your message. Please try again or email us directly.
        </div>
      )}

      <div className="form-field">
        <label htmlFor="name">Your Name</label>
        <input id="name" name="name" type="text" placeholder="Sarah Jenkins" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" type="email" placeholder="sarah@company.com" required />
      </div>
      <div className="form-field full">
        <label htmlFor="company">Company / Brand</label>
        <input id="company" name="company" type="text" placeholder="Horizon Inc." />
      </div>
      <div className="form-field full">
        <label htmlFor="service">Service</label>
        <select id="service" name="service">
          <option value="">Select a service</option>
          <option>Brand Identity</option>
          <option>Editorial Design</option>
          <option>Packaging</option>
          <option>Art Direction</option>
          <option>Web & Digital</option>
          <option>Multiple / Not sure yet</option>
        </select>
      </div>
      <div className="form-field full">
        <label htmlFor="budget">Budget Range</label>
        <select id="budget" name="budget">
          <option value="">Select a range</option>
          <option>Under $10k</option>
          <option>$10k — $25k</option>
          <option>$25k — $50k</option>
          <option>$50k — $100k</option>
          <option>$100k+</option>
        </select>
      </div>
      <div className="form-field full">
        <label htmlFor="brief">Project Brief</label>
        <textarea id="brief" name="brief" placeholder="Tell us about your project, your timeline, and what success looks like for you..." required />
      </div>
      <div className="full">
        <button type="submit" className="form-submit" disabled={submitting}>
          <span className="dot" style={{ background: '#fff' }} /> {submitting ? 'Sending...' : 'Send Brief'}
        </button>
      </div>
    </form>
  );
}
