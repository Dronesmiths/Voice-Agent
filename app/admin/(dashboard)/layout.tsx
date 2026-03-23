'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // In a real app we'd hit a logout API to clear the cookie, but clearing it on the client works for now
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/admin/login';
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <Toaster position="top-right" />
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #334155' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Command Center</h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0' }}>Master Administration</p>
        </div>

        <nav style={{ padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link 
            href="/admin" 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              color: pathname === '/admin' ? '#fff' : '#cbd5e1', 
              backgroundColor: pathname === '/admin' ? '#3b82f6' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: pathname === '/admin' ? '600' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            👥 Global Clients
          </Link>
          
          <Link 
            href="/admin/agents" 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              color: pathname === '/admin/agents' ? '#fff' : '#cbd5e1', 
              backgroundColor: pathname === '/admin/agents' ? '#3b82f6' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: pathname === '/admin/agents' ? '600' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            🤖 Active AI Agents
          </Link>

          <Link 
            href="/admin/settings" 
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              color: pathname === '/admin/settings' ? '#fff' : '#cbd5e1', 
              backgroundColor: pathname === '/admin/settings' ? '#3b82f6' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: pathname === '/admin/settings' ? '600' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            ⚙️ System Settings
          </Link>
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid #334155' }}>
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{ 
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            {isLoggingOut ? 'Signing out...' : '🚪 Emergency Lock'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
