'use client';

import { useState } from 'react';

export default function TranscriptViewer({ transcript, isoDate }: { transcript: string, isoDate: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!transcript) {
    return <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>No transcript generated.</span>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px', color: '#334155' }}>
          {transcript}
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', color: '#0f172a', fontWeight: 600, flexShrink: 0, marginLeft: '16px', transition: 'all 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
        >
          Expand
        </button>
      </div>

      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '90%', maxWidth: '650px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#0f172a', fontWeight: 'bold' }}>Call Transcript</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }} suppressHydrationWarning>
                  {typeof window !== 'undefined' ? new Date(isoDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', cursor: 'pointer', color: '#475569', transition: 'background 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                ×
              </button>
            </div>
            <div style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '12px' }}>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#1e293b', fontSize: '16px', margin: 0 }}>
                {transcript}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
