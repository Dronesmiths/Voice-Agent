 
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        toast.success('Access Granted. Redirecting securely...');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Authentication failed.');
        setIsLoading(false);
      }
    } catch (err) {
      toast.error('Network Error.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', padding: '20px' }}>
      <Toaster position="top-center" />
      
      <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#1e293b', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: '#f8fafc', fontSize: '24px', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Command Center</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>Restricted access portal.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Master Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
              placeholder="admin@aipilots.site"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '8px',
              padding: '14px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
          >
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
}
