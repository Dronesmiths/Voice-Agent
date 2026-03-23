/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function VoiceAgentPage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>Personal Robot</h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
          Talk to your personal robot, it knows you and grows as you speak to it 🤯
        </p>
      </div>

      {/* Filter Input */}
      <div style={{ marginBottom: '32px', width: '250px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        </div>
        <input 
          type="text" 
          placeholder="Search robots..." 
          style={{
            width: '100%',
            padding: '10px 16px 10px 36px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            color: '#0f172a'
          }}
        />
      </div>

      {/* Robot Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Don Card */}
        <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>Don</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>(+16617439600)</p>
            </div>
            <div style={{ 
              backgroundColor: '#dcfce7', color: '#166534', 
              padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' 
            }}>
              Active
            </div>
          </div>
          
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0', flex: 1 }}>
            To capture caller information, answer basic questions, and make sure your message reaches Don promptly.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
              borderRadius: '24px', fontSize: '14px', fontWeight: '600', color: '#0f172a', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call
            </button>
          </div>
        </div>

        {/* Brian Card */}
        <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>Brian</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>(+16619936669)</p>
            </div>
            <div style={{ 
              backgroundColor: '#dcfce7', color: '#166534', 
              padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' 
            }}>
              Active
            </div>
          </div>
          
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0', flex: 1 }}>
            To gather caller details, understand their needs, answer basic questions, and forward messages to Brian so he can respond quickly — whether it's about...
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
              borderRadius: '24px', fontSize: '14px', fontWeight: '600', color: '#0f172a', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
