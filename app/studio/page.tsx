'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/studio/dashboard');
    } else {
      setError('Incorrect password. Try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8)',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--paper)',
          letterSpacing: '-0.01em',
          marginBottom: 'var(--space-12)',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
        }}>
          markyyy<span style={{ display: 'inline-block', width: '0.16em', height: '0.16em', borderRadius: '50%', background: 'var(--blue)', marginBottom: '3px' }} />
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(252,252,254,0.05)',
          border: '1px solid rgba(252,252,254,0.1)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-10)',
        }}>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(252,252,254,0.4)',
            marginBottom: 'var(--space-8)',
          }}>
            Owner Access Only
          </p>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: '2rem',
            fontWeight: 500,
            color: 'var(--paper)',
            letterSpacing: '-0.02em',
            marginBottom: 'var(--space-8)',
          }}>
            Studio Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(252,252,254,0.5)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(252,252,254,0.08)',
                    border: '1px solid rgba(252,252,254,0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-5) var(--space-6)',
                    fontFamily: 'var(--body)',
                    fontSize: '1rem',
                    color: 'var(--paper)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(252,252,254,0.15)')}
                />
              </div>

              {error && (
                <p style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                  color: '#ff5f57',
                  letterSpacing: '0.04em',
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-3)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: loading ? 'var(--blue-deep)' : 'var(--blue)',
                  color: '#fff',
                  border: 'none',
                  padding: 'var(--space-5) var(--space-8)',
                  borderRadius: 'var(--radius-pill)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s ease',
                  width: '100%',
                }}
              >
                {loading ? 'Verifying…' : 'Enter Studio'}
              </button>
            </div>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: 'var(--space-8)',
          fontFamily: 'var(--mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(252,252,254,0.2)',
        }}>
          Session expires after 8 hours
        </p>
      </div>
    </div>
  );
}
