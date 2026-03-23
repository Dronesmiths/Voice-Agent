import React from 'react';

export default function ProfilePage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>Profile Settings</h1>
      </div>

      {/* Main Settings Card */}
      <div style={{ 
        display: 'flex', 
        backgroundColor: '#fff', 
        border: '1px solid #e2e8f0', 
        borderRadius: '16px', 
        overflow: 'hidden',
        minHeight: '600px',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        
        {/* Left Side Navigation */}
        <div style={{ width: '280px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '32px 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Account</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.4' }}>Manage your account info.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', 
              padding: '10px 16px', backgroundColor: '#e2e8f0', color: '#0f172a', 
              borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Profile
            </div>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', 
              padding: '10px 16px', color: '#475569', 
              borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Security
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1, padding: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 32px 0' }}>Profile details</h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Row 1: Avatar */}
            <div style={{ display: 'flex', padding: '24px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '200px', fontSize: '14px', fontWeight: '600', color: '#0f172a', paddingTop: '10px' }}>
                Profile
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef08a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontSize: '20px' }}>👨‍🚀</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>Brian Smith</span>
              </div>
              <div style={{ paddingTop: '10px' }}>
                <a href="#" style={{ fontSize: '13px', fontWeight: '500', color: '#2563eb', textDecoration: 'none' }}>Update profile</a>
              </div>
            </div>

            {/* Row 2: Emails */}
            <div style={{ display: 'flex', padding: '24px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '200px', fontSize: '14px', fontWeight: '500', color: '#475569', paddingTop: '2px' }}>
                Email addresses
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#0f172a' }}>dronesmiths2@gmail.com</span>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>Primary</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add email address
                </div>
              </div>
              <div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </div>
            </div>

            {/* Row 3: Connected Accounts */}
            <div style={{ display: 'flex', padding: '24px 0' }}>
              <div style={{ width: '200px', fontSize: '14px', fontWeight: '500', color: '#475569', paddingTop: '2px' }}>
                Connected accounts
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#0f172a' }}>Google <span style={{ color: '#94a3b8' }}>•</span> dronesmiths2@gmail.com</span>
              </div>
              <div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
