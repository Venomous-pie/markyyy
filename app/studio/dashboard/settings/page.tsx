'use client';

import { useState, useEffect } from 'react';
import ImagePositionControl from '@/components/ImagePositionControl';

interface SiteSettings {
  studioName: string;
  tagline: string;
  email: string;
  phone: string;
  socials: { instagram: string; behance: string; linkedin: string };
  manifesto: string;
  testimonial: { quote: string; author: string; role: string };
  ctaHeadline: string;
  ctaAvailability: string;
  footerBio: string;
  heroRole: string;
  heroLocation: string;
  heroVolume: string;
  heroSub: string;
  heroImage?: string;
  heroImagePosition?: string;
}

const fieldStyle = {
  width: '100%', background: 'rgba(252,252,254,0.06)', border: '1px solid rgba(222,225,234,0.12)',
  borderRadius: '6px', padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#FCFCFE', outline: 'none',
} as const;

const labelStyle = { display: 'block', fontFamily: 'Space Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(252,252,254,0.4)', marginBottom: '8px' };
const sectionStyle = { background: 'rgba(252,252,254,0.03)', border: '1px solid rgba(222,225,234,0.08)', borderRadius: '12px', padding: '24px', marginBottom: '16px' };

export default function SettingsPage() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(setForm);
  }, []);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) setSaved(true);
    setSaving(false);
  };

  if (!form) return <div style={{ padding: 'var(--space-10)', color: 'rgba(252,252,254,0.5)' }}>Loading settings...</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid rgba(222,225,234,0.08)' }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.35)', marginBottom: 'var(--space-3)' }}>Studio Panel</p>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>Site Settings</h1>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: saved ? '#16a34a' : 'var(--blue)', color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', transition: 'background 0.3s ease' }}>
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
        {/* BASICS */}
        <div style={sectionStyle}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Basic Info</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Studio Name</label>
              <input style={fieldStyle} value={form.studioName} onChange={e => { setSaved(false); setForm({ ...form, studioName: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Contact Email</label>
              <input style={fieldStyle} value={form.email} onChange={e => { setSaved(false); setForm({ ...form, email: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone</label>
              <input style={fieldStyle} value={form.phone} onChange={e => { setSaved(false); setForm({ ...form, phone: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Footer Bio</label>
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.footerBio} onChange={e => { setSaved(false); setForm({ ...form, footerBio: e.target.value }); }} />
            </div>
          </div>
        </div>

        {/* SOCIALS */}
        <div style={sectionStyle}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Social Links</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            {['instagram', 'behance', 'linkedin'].map((social) => (
              <div key={social}>
                <label style={labelStyle}>{social}</label>
                <input style={fieldStyle} value={form.socials[social as keyof typeof form.socials]} onChange={e => { setSaved(false); setForm({ ...form, socials: { ...form.socials, [social]: e.target.value } }); }} placeholder={`https://${social}.com/...`} />
              </div>
            ))}
          </div>
        </div>

        {/* HERO COPY */}
        <div style={sectionStyle}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Homepage Hero Copy</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Role Label</label>
              <input style={fieldStyle} value={form.heroRole} onChange={e => { setSaved(false); setForm({ ...form, heroRole: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Location / Availability Label</label>
              <input style={fieldStyle} value={form.heroLocation} onChange={e => { setSaved(false); setForm({ ...form, heroLocation: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Subtext / Introduction</label>
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.heroSub} onChange={e => { setSaved(false); setForm({ ...form, heroSub: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Floating Media Image URL</label>
              <input style={{...fieldStyle, marginBottom: '12px'}} value={form.heroImage || ''} onChange={e => { setSaved(false); setForm({ ...form, heroImage: e.target.value }); }} placeholder="/sample_2.jpg or /uploads/my-image.jpg" />
              {form.heroImage && (
                <div style={{ width: '200px' }}>
                  <ImagePositionControl 
                    src={form.heroImage} 
                    position={form.heroImagePosition} 
                    onChange={(pos) => { setSaved(false); setForm({ ...form, heroImagePosition: pos }); }} 
                    aspectRatio="3/4"
                  />
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'rgba(252,252,254,0.4)', marginTop: '8px' }}>Click image to set focal point</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div style={sectionStyle}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Footer Call to Action</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Headline (Use \n for line breaks)</label>
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.ctaHeadline} onChange={e => { setSaved(false); setForm({ ...form, ctaHeadline: e.target.value }); }} />
            </div>
            <div>
              <label style={labelStyle}>Availability / Eyebrow Text</label>
              <input style={fieldStyle} value={form.ctaAvailability} onChange={e => { setSaved(false); setForm({ ...form, ctaAvailability: e.target.value }); }} />
            </div>
          </div>
        </div>
        
        {/* OTHERS */}
        <div style={sectionStyle}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Manifesto & Testimonial</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Manifesto Quote</label>
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.manifesto} onChange={e => { setSaved(false); setForm({ ...form, manifesto: e.target.value }); }} />
            </div>
            <div style={{ borderTop: '1px solid rgba(252,252,254,0.1)', paddingTop: '16px', marginTop: '8px' }}>
              <label style={labelStyle}>Testimonial Quote</label>
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px', marginBottom: '12px' }} value={form.testimonial.quote} onChange={e => { setSaved(false); setForm({ ...form, testimonial: { ...form.testimonial, quote: e.target.value } }); }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Author</label>
                  <input style={fieldStyle} value={form.testimonial.author} onChange={e => { setSaved(false); setForm({ ...form, testimonial: { ...form.testimonial, author: e.target.value } }); }} />
                </div>
                <div>
                  <label style={labelStyle}>Role</label>
                  <input style={fieldStyle} value={form.testimonial.role} onChange={e => { setSaved(false); setForm({ ...form, testimonial: { ...form.testimonial, role: e.target.value } }); }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div style={{ ...sectionStyle, border: '1px solid rgba(255,100,100,0.2)', background: 'rgba(255,50,50,0.02)' }}>
          <p style={{ ...labelStyle, fontSize: '0.72rem', color: '#ff6b6b', marginBottom: '16px' }}>Security</p>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formObj = e.target as HTMLFormElement;
            const currentPassword = (formObj.elements.namedItem('currentPassword') as HTMLInputElement).value;
            const newPassword = (formObj.elements.namedItem('newPassword') as HTMLInputElement).value;
            
            setSaving(true);
            const res = await fetch('/api/auth/password', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ currentPassword, newPassword }),
            });
            
            if (res.ok) {
              alert('Password updated successfully!');
              formObj.reset();
            } else {
              const data = await res.json();
              alert(data.error || 'Failed to update password');
            }
            setSaving(false);
          }}>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Current Password</label>
                <input name="currentPassword" type="password" style={fieldStyle} required />
              </div>
              <div>
                <label style={labelStyle}>New Password</label>
                <input name="newPassword" type="password" style={fieldStyle} required minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={saving} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(255,100,100,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,100,100,0.2)', padding: '10px 24px', borderRadius: 'var(--radius-pill)', cursor: 'pointer', transition: 'background 0.3s ease' }}>
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
