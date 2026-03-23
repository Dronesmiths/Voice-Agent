import React from 'react';

export default function BillingPage() {
  return (
    <div className="layout-content fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Subscription & Billing</h1>
          <p className="page-subtitle">Activate your AI Voice Agent and manage your monthly recurring subscription.</p>
        </div>
      </header>

      <div className="pricing-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className="pricing-card" style={{
          background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)', width: '100%', maxWidth: '460px',
          textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
        }}>
          <div className="pricing-badge" style={{ 
            background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', 
            padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', 
            fontWeight: '600', display: 'inline-block', marginBottom: '20px'
          }}>
            Most Popular
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '10px' }}>AI Pilot Activation</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.95rem' }}>
            Full access to your custom AI receptionist, Vapi routing, and live CRM integrations.
          </p>
          
          <div className="price" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '30px', color: 'var(--text-primary)' }}>
            $1<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/mo</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', textAlign: 'left' }}>
            {[
              'Unlimited autonomous answering', 
              'Pabbly Connect CRM integration', 
              'Google Calendar appointment booking', 
              'Advanced phone routing rules'
            ].map((feature, i) => (
              <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <a 
            href="https://payments.pabbly.com/subscribe/69bca151d205d17e78d1a81f/monthly-voice-agent-access" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', textDecoration: 'none', display: 'block', fontWeight: '500' }}
          >
            Subscribe Now
          </a>
          <p style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Secure recurring checkout via Pabbly Payments
          </p>
        </div>
      </div>
    </div>
  );
}
