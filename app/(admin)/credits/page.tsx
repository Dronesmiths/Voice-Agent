import React from 'react';

export default function CreditsPage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Credits</h1>
      </div>

      {/* Available Credits Dashboard Panel */}
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '32px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', 
            borderRadius: '6px', fontSize: '12px', fontWeight: '500', color: '#475569', cursor: 'pointer'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Refresh
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: '500', marginBottom: '20px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Available Credits
        </div>
        <div style={{ fontSize: '36px', fontWeight: '700', color: '#2563eb', marginBottom: '12px' }}>
          0
        </div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>
          Use credits to unlock voice recordings, additional minutes, and more add-ons.
        </div>
      </div>

      {/* Top Credit Purchasing Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {[
          { title: '10 credits', amount: '10', url: 'https://payments.pabbly.com/subscribe/69bf0537d205d17e78d73b74/ai-pilots-voice-agent-10-credits' },
          { title: '50 credits', amount: '50', popular: true, url: 'https://payments.pabbly.com/subscribe/69bf0e34d205d17e78d73ef0/copy-of-ai-pilots-voice-agent-50-credits' },
          { title: '100 credits', amount: '100', url: 'https://payments.pabbly.com/subscribe/69bf0e5dd205d17e78d73f01/copy-of-copy-of-ai-pilots-voice-agent-100-credits' },
          { title: '500 credits', amount: '500', url: 'https://payments.pabbly.com/subscribe/69bf0e88d205d17e78d73f0f/copy-of-copy-of-copy-of-ai-pilots-voice-agent-500-credits' }
        ].map((tier, i) => (
          <div key={i} style={{ 
            padding: '24px', backgroundColor: '#fff', border: tier.popular ? '2px solid #3b82f6' : '1px solid #e2e8f0', 
            borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: tier.popular ? '0 8px 24px rgba(59,130,246,0.1)' : '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>{tier.title}</h3>
            <ul style={{ padding: 0, margin: '0 0 24px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                Save on minutes, credits unlock low rates
              </li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                Download voice recordings using credits
              </li>
              <li style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                Instantly added to your balance
              </li>
            </ul>
            <a 
              href={tier.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
              width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', 
              border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: '500', 
              cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', textDecoration: 'none'
            }}>
              Buy {tier.amount} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        ))}
      </div>

      {/* Buy Minutes Section */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '20px' }}>Buy minutes</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {[
          { name: 'Starter', min: '50 min', cost: '10', rate: '0.200' },
          { name: 'Essentials', min: '125 min', cost: '25', rate: '0.200' },
          { name: 'Growth', min: '260 min', cost: '50', rate: '0.192', active: true },
          { name: 'Pro', min: '550 min', cost: '100', rate: '0.182' },
          { name: 'Scale', min: '1380 min', cost: '250', rate: '0.181' },
          { name: 'Enterprise', min: '2770 min', cost: '500', rate: '0.181' }
        ].map((pack, i) => (
          <div key={i} style={{ 
            padding: '24px', backgroundColor: '#fff', border: pack.active ? '2px solid #3b82f6' : '1px solid #e2e8f0', 
            borderRadius: '16px', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>{pack.name}</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{pack.min}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Costs {pack.cost} credits</div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#475569' }}>
                {pack.rate} cr/min
              </div>
            </div>
            
            <button style={{ 
              marginTop: 'auto', width: '100%', padding: '12px', 
              backgroundColor: '#bfdbfe', color: '#1e3a8a', 
              border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: '600', 
              cursor: 'pointer'
            }}>
              Redeem now
            </button>
          </div>
        ))}
      </div>

      {/* Compliance & Billing Disclosures */}
      <div style={{ 
        marginTop: '64px',
        padding: '32px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        color: '#475569',
        fontSize: '13px',
        lineHeight: '1.6'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Billing & Usage Terms
        </h4>
        <p style={{ margin: '0 0 8px 0' }}>
          <strong>Monthly Subscription Minutes:</strong> Your $25/mo core subscription includes up to 100 minutes of AI voice agent talk time. These included minutes reset to 100 at the start of every billing cycle and do not roll over.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Add-On Rollover Credits:</strong> Any top-up packages (e.g., 10, 50, or 100 Credits) purchased individually are permanently banked to your account. These add-on credits never expire and will indefinitely roll over month-to-month. If a payment fails, your active subscription minutes may be frozen, but your purchased add-on credits remain yours.
        </p>
      </div>

    </div>
  );
}
