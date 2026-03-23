import React from 'react';

export default function ContactsPage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Phone Book</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
            borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import Contacts
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', 
            borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#fff', cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(59,130,246,0.3)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Contact
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '32px', position: 'relative', width: '300px' }}>
        <div style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input 
          type="text" 
          placeholder="Search contacts by name..." 
          style={{
            width: '100%',
            padding: '10px 16px 10px 36px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            color: '#0f172a',
            backgroundColor: '#fff'
          }}
        />
      </div>

      {/* Contacts Table */}
      <div style={{ width: '100%', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px 8px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</th>
              <th style={{ padding: '16px 8px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</th>
              <th style={{ padding: '16px 8px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relationship</th>
              <th style={{ padding: '16px 8px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Details</th>
              <th style={{ padding: '16px 8px' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '20px 8px', fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>Brian</td>
              <td style={{ padding: '20px 8px', fontSize: '14px', color: '#475569' }}>+16619936669</td>
              <td style={{ padding: '20px 8px', fontSize: '14px', color: '#475569' }}>family</td>
              <td style={{ padding: '20px 8px', fontSize: '14px', color: '#475569' }}></td>
              <td style={{ padding: '20px 8px', textAlign: 'right' }}>
                <button style={{ 
                  padding: '6px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
                  borderRadius: '16px', fontSize: '13px', fontWeight: '500', color: '#475569', cursor: 'pointer',
                  marginRight: '12px'
                }}>
                  Edit
                </button>
                <button style={{ 
                  padding: '6px 16px', backgroundColor: '#ef4444', border: 'none', 
                  borderRadius: '16px', fontSize: '13px', fontWeight: '500', color: '#fff', cursor: 'pointer'
                }}>
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
