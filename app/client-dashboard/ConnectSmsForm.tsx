"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ConnectSmsForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        style={{
          padding: '10px 20px', 
          borderRadius: '8px', 
          background: '#ef4444', 
          color: '#ffffff', 
          fontWeight: '600', 
          fontSize: '14px', 
          textDecoration: 'none',
          border: '1px solid #dc2626',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s',
          cursor: 'pointer',
          boxShadow: '0 0 14px rgba(239, 68, 68, 0.7)',
          animation: 'pulse 2s infinite'
        }}
      >
        <span style={{ fontSize: '16px' }}>🚨</span>
        Connect SMS Alerts
        
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
        `}</style>
      </button>
    );
  }

  const handleSave = async () => {
    if (!phone) return alert('Please enter your cell phone number');
    setLoading(true);
    try {
      await axios.post('/api/user/save-phone', { phone });
      router.refresh();
      setIsOpen(false);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed to save phone number');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', background: '#fef2f2', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fca5a5', width: '100%' }}>
      <input 
         type="tel" 
         placeholder="Your cell number" 
         value={phone} 
         onChange={(e) => setPhone(e.target.value)}
         disabled={loading}
         style={{ flex: '1', minWidth: '130px', padding: '8px', borderRadius: '6px', border: '1px solid #f87171', outline: 'none', fontSize: '13px' }}
      />
      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={handleSave} disabled={loading} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 2px 4px rgba(220,38,38,0.2)' }}>
          {loading ? '...' : 'Save'}
        </button>
        <button onClick={() => setIsOpen(false)} disabled={loading} style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', cursor: 'pointer', fontSize: '13px', fontWeight: '600', padding: '8px 12px', borderRadius: '6px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
