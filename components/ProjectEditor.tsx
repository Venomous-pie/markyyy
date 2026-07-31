'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  videoUrl: string;
  challenge: string;
  solution: string;
  outcome: string;
  featured: boolean;
  order: number;
}

interface ProjectEditorProps {
  project: Project;
  isNew?: boolean;
}

const CATEGORIES = ['Brand Identity', 'Editorial Design', 'Packaging', 'Art Direction', 'Web & Digital', 'Motion', 'Print'];

const fieldStyle = {
  width: '100%',
  background: 'rgba(252,252,254,0.06)',
  border: '1px solid rgba(222,225,234,0.12)',
  borderRadius: '6px',
  padding: '12px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  color: '#FCFCFE',
  outline: 'none',
} as const;

const labelStyle = {
  display: 'block',
  fontFamily: 'Space Mono, monospace',
  fontSize: '0.68rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'rgba(252,252,254,0.4)',
  marginBottom: '8px',
};

const sectionStyle = {
  background: 'rgba(252,252,254,0.03)',
  border: '1px solid rgba(222,225,234,0.08)',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '16px',
};

export default function ProjectEditor({ project: initial, isNew = false }: ProjectEditorProps) {
  const [form, setForm] = useState<Project>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const set = (key: keyof Project, value: unknown) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const url = isNew ? '/api/projects' : `/api/projects/${initial.slug}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSaved(true);
      if (isNew) {
        const data = await res.json();
        router.push(`/studio/dashboard/projects/${data.slug}`);
      }
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/projects/${initial.slug}`, { method: 'DELETE' });
    router.push('/studio/dashboard/projects');
  };

  const uploadImage = async (file: File, field: 'image' | 'gallery') => {
    setUploading(true);
    try {
      // 1. Check which upload provider is active
      const configRes = await fetch('/api/upload');
      const { provider } = await configRes.json();

      let finalUrl = '';

      if (provider === 'vercel-blob') {
        // Use client-side upload to bypass 4.5MB Serverless Function limits
        const { upload } = await import('@vercel/blob/client');
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        finalUrl = newBlob.url;
      } else {
        // Local Fallback
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error || `Upload failed with status ${res.status}`);
        }
        
        if (data && data.url) {
          finalUrl = data.url;
        } else {
          throw new Error('No URL returned from server');
        }
      }

      if (finalUrl) {
        if (field === 'image') {
          set('image', finalUrl);
        } else {
          set('gallery', [...form.gallery, finalUrl]);
        }
      }

    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Image upload failed. The file might be too large.');
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    set('tags', form.tags.filter((t) => t !== tag));
  };

  const removeGalleryImage = (url: string) => {
    set('gallery', form.gallery.filter((u) => u !== url));
  };

  return (
    <div>
      {/* TOOLBAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid rgba(222,225,234,0.08)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <button onClick={() => router.push('/studio/dashboard/projects')} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(252,252,254,0.4)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '8px', padding: 0 }}>
            ← Back to Projects
          </button>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, letterSpacing: '-0.02em' }}>
            {isNew ? 'New Project' : form.title}
          </h1>
        </div>
        <div className="editor-actions">
          {!isNew && (
            <button onClick={handleDelete} disabled={deleting} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,120,120,0.9)', padding: '10px 20px', borderRadius: 'var(--radius-pill)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {deleting ? 'Deleting…' : 'Delete Project'}
            </button>
          )}
          {!isNew && (
            <a href={`/work/${initial.slug}`} target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(252,252,254,0.08)', border: '1px solid rgba(252,252,254,0.12)', color: 'rgba(252,252,254,0.7)', padding: '10px 20px', borderRadius: 'var(--radius-pill)', textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center' }}>
              ↗ View Live
            </a>
          )}
          <button onClick={handleSave} disabled={saving} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: saved ? '#16a34a' : 'var(--blue)', color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', transition: 'background 0.3s ease', whiteSpace: 'nowrap' }}>
            {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <style>{`
        .editor-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .editor-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .editor-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            margin-top: 8px;
          }
          .editor-actions > :last-child {
            grid-column: 1 / -1;
          }
          .editor-actions > * {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
      <div className="editor-grid">
        {/* MAIN COLUMN */}
        <div>
          {/* BASICS */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Basic Info</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Project Title</label>
                <input style={fieldStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Nova — Brand Identity" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select style={{ ...fieldStyle, appearance: 'none' }} value={form.category} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input style={fieldStyle} value={form.year} onChange={e => set('year', e.target.value)} placeholder="2026" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>URL Slug</label>
                <input style={fieldStyle} value={form.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="brand-identity-nova" />
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'rgba(252,252,254,0.25)', marginTop: '6px' }}>URL: /work/{form.slug}</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTIONS */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Descriptions</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Short Description <span style={{ color: 'rgba(252,252,254,0.2)' }}>(shown on homepage cards)</span></label>
                <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={e => set('description', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Long Description <span style={{ color: 'rgba(252,252,254,0.2)' }}>(intro paragraph on case study page)</span></label>
                <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }} value={form.longDescription} onChange={e => set('longDescription', e.target.value)} />
              </div>
            </div>
          </div>

          {/* CASE STUDY CONTENT */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Case Study Content</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {([['challenge', 'The Challenge'], ['solution', 'The Solution'], ['outcome', 'The Outcome']] as const).map(([key, heading]) => (
                <div key={key}>
                  <label style={labelStyle}>{heading}</label>
                  <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '100px' }} value={form[key]} onChange={e => set(key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* MEDIA */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Media</p>

            {/* Hero Image */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Hero / Cover Image</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {form.image && (
                  <div style={{ position: 'relative', width: '120px', height: '80px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={form.image} alt="Hero" fill style={{ objectFit: 'cover' }} sizes="120px" />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <input type="text" style={{ ...fieldStyle, marginBottom: '8px' }} value={form.image} onChange={e => set('image', e.target.value)} placeholder="/sample_1.jpg or /uploads/my-image.jpg" />
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'image')} />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(252,252,254,0.08)', border: '1px solid rgba(252,252,254,0.12)', color: 'rgba(252,252,254,0.6)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}>
                    {uploading ? 'Uploading…' : '↑ Upload Image'}
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Gallery Images <span style={{ color: 'rgba(252,252,254,0.2)' }}>(shown on case study page)</span></label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {form.gallery.map((url) => (
                  <div key={url} style={{ position: 'relative' }}>
                    <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                      <Image src={url} alt="Gallery" fill style={{ objectFit: 'cover' }} sizes="80px" />
                    </div>
                    <button onClick={() => removeGalleryImage(url)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                  </div>
                ))}
                <input ref={galleryFileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => {
                  if (e.target.files) {
                    Array.from(e.target.files).forEach(f => uploadImage(f, 'gallery'));
                  }
                }} />
                <button onClick={() => galleryFileRef.current?.click()} style={{ width: '80px', height: '60px', borderRadius: '4px', background: 'rgba(252,252,254,0.06)', border: '1px dashed rgba(252,252,254,0.15)', color: 'rgba(252,252,254,0.4)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>

            {/* Video */}
            <div>
              <label style={labelStyle}>Video URL <span style={{ color: 'rgba(252,252,254,0.2)' }}>(YouTube or Vimeo embed URL)</span></label>
              <input style={fieldStyle} value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ position: 'sticky', top: '24px' }}>
          {/* Status */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Status</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div
                onClick={() => set('featured', !form.featured)}
                style={{
                  width: '44px', height: '24px',
                  borderRadius: '99px',
                  background: form.featured ? 'var(--blue)' : 'rgba(252,252,254,0.12)',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '18px', height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  top: '3px',
                  left: form.featured ? '23px' : '3px',
                  transition: 'left 0.2s ease',
                }} />
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'rgba(252,252,254,0.7)', letterSpacing: '0.04em' }}>
                Featured on Homepage
              </span>
            </label>
          </div>

          {/* Tags */}
          <div style={sectionStyle}>
            <p style={{ ...labelStyle, fontSize: '0.72rem', color: 'var(--blue)', marginBottom: '16px' }}>Tags</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {form.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(30,58,240,0.15)', border: '1px solid rgba(30,58,240,0.25)', color: 'rgba(180,195,255,0.9)', padding: '4px 10px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {tag}
                  <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontSize: '0.85rem', lineHeight: 1, opacity: 0.6 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                style={{ ...fieldStyle, flex: 1, fontSize: '0.85rem', padding: '8px 12px' }}
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag…"
              />
              <button onClick={addTag} style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', background: 'rgba(252,252,254,0.08)', border: '1px solid rgba(252,252,254,0.12)', color: 'rgba(252,252,254,0.7)', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* Save */}
          <button onClick={handleSave} disabled={saving} style={{ width: '100%', fontFamily: 'var(--mono)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: saved ? '#16a34a' : 'var(--blue)', color: '#fff', padding: 'var(--space-5)', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', transition: 'background 0.3s ease' }}>
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
