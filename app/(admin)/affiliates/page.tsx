import React from 'react';

export default function AffiliatesPage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Affiliates & Referrals</h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Invite your network and unlock exclusive rewards.</p>
      </div>

      {/* Main Referral Banner */}
      <div style={{ 
        backgroundColor: '#ebf5ff', 
        border: '1px solid #bfdbfe', 
        borderRadius: '16px', 
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#3b82f6', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'white'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e3a8a', margin: '0 0 16px 0' }}>
          Share with a friend, earn 60 minutes!
        </h2>
        <p style={{ fontSize: '15px', color: '#3b82f6', margin: '0 0 32px 0', maxWidth: '600px', lineHeight: '1.6' }}>
          When your friend signs up for an active AI Pilots subscription using your unique referral link below, we will instantly credit your account with 60 complimentary rollover minutes!
        </p>

        {/* Unique Link Input */}
        <div style={{ display: 'flex', width: '100%', maxWidth: '500px', gap: '8px' }}>
          <input 
            type="text" 
            readOnly 
            value="https://aipilots.site/?ref=777-chanise" 
            style={{ 
              flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #93c5fd', 
              backgroundColor: '#fff', color: '#1e3a8a', fontSize: '14px', fontWeight: '500', outline: 'none'
            }} 
          />
          <button style={{ 
            padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff', 
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', 
            cursor: 'pointer', transition: 'background-color 0.2s', whiteSpace: 'nowrap'
          }}>
            Copy Link
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 20px 0' }}>Your Progress</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Friends Invited</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>0</div>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free Minutes Earned</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#22c55e' }}>0</div>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Payouts</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>$0.00</div>
        </div>

      </div>

    </div>
  );
}
