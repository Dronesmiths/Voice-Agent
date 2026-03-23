import React from 'react';

export default function UsagePage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Usage Overview</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
            borderRadius: '20px', fontSize: '14px', fontWeight: '500', color: '#0f172a', cursor: 'pointer'
          }}>
            Manage Subscription
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '8px 20px', backgroundColor: '#2563eb', border: 'none', 
            borderRadius: '20px', fontSize: '14px', fontWeight: '500', color: '#fff', cursor: 'pointer'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create
          </button>
        </div>
      </div>

      {/* Aggregate Metric Card */}
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Total Usage Across All Forwards
        </div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb', marginBottom: '8px' }}>
          53m 5s
        </div>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Minutes used across all forwarding configurations
        </div>
      </div>

      {/* Filter Input */}
      <div style={{ marginBottom: '24px', width: '250px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '12px', top: '9px', color: '#94a3b8' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        </div>
        <input 
          type="text" 
          placeholder="Filter forwards" 
          style={{
            width: '100%',
            padding: '8px 16px 8px 36px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            color: '#0f172a'
          }}
        />
      </div>

      {/* Agent Usage Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Don Card */}
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
              Don <span style={{ color: '#94a3b8', fontWeight: '500' }}>#1628</span>
            </div>
            <a href="#" style={{ fontSize: '12px', fontWeight: '500', color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Details
            </a>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '4px', marginBottom: '4px' }}>
            0m 0s <span style={{ color: '#cbd5e1' }}>/</span> 50m 0s
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Call count: 0
          </div>
        </div>

        {/* Chanise Card */}
        <div style={{ padding: '20px', border: '1px solid #fee2e2', borderRadius: '12px', backgroundColor: '#fff', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', right: '16px', backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(239,68,68,0.2)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Activate now
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
              Chanise <span style={{ color: '#94a3b8', fontWeight: '500' }}>#1827</span>
            </div>
            <a href="#" style={{ fontSize: '12px', fontWeight: '500', color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Details
            </a>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#ef4444', borderRadius: '4px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '4px' }}>
              50m 0s <span style={{ color: '#cbd5e1' }}>/</span> 50m 0s
            </div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444' }}>
              Fully utilized
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Call count: 0
          </div>
        </div>

        {/* Brian Card */}
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
              Brian <span style={{ color: '#94a3b8', fontWeight: '500' }}>#651</span>
            </div>
            <a href="#" style={{ fontSize: '12px', fontWeight: '500', color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Details
            </a>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
            <div style={{ width: '5%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '4px', marginBottom: '4px' }}>
            3m 5s <span style={{ color: '#cbd5e1' }}>/</span> 100m 0s
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Call count: 51
          </div>
        </div>

      </div>
    </div>
  );
}
