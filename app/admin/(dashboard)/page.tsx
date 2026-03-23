/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', twilio: '', agentId: '' });

  useEffect(() => {
    fetch(`/api/admin/users?t=${new Date().getTime()}`, { cache: 'no-store' })
      .then(async res => {
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = '/admin/login';
            throw new Error('Unauthorized');
          }
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Fatal Server Error 500: Check Backend Logs');
        }
        return res.json();
      })
      .then(data => {
        setUsers(data.users || []);
        setIsLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadToast = toast.loading('Injecting client into MongoDB...');
    try {
      const res = await fetch('/api/admin/add-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newClient.name,
          email: newClient.email,
          twilioNumber: newClient.twilio,
          vapiAgentId: newClient.agentId
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success('Client injected successfully!', { id: loadToast });
      setUsers([data.client, ...users]);
      setShowAddModal(false);
      setNewClient({ name: '', email: '', twilio: '', agentId: '' });
    } catch (err: any) {
      toast.error(err.message, { id: loadToast });
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>Decrypting global ledger...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Global Clients</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>
            Master overview of all provisioned accounts and digital assets.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
        >
          + Import Legacy Client
        </button>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '12px', width: '400px', border: '1px solid #334155' }}>
            <h2 style={{ color: 'white', marginTop: 0, marginBottom: '20px' }}>Import Legacy Profile</h2>
            <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input required type="email" placeholder="Client Email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
              <input required type="text" placeholder="Client Name" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
              <input type="text" placeholder="Twilio Number (Optional)" value={newClient.twilio} onChange={e => setNewClient({...newClient, twilio: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
              <input required type="text" placeholder="Vapi Agent ID" value={newClient.agentId} onChange={e => setNewClient({...newClient, agentId: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Import Client</button>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: 'transparent', color: '#94a3b8', border: '1px solid #334155', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Twilio Logic</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vapi Agent ID</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cost (Current Cycle)</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No clients found in the database.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #334155', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '500', color: '#f8fafc', marginBottom: '4px' }}>{user.name || 'Unknown'}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#334155', padding: '4px 8px', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace' }}>
                      {user.agents?.[0]?.twilioNumber || user.twilioNumber || 'Pending'}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#cbd5e1', fontFamily: 'monospace' }}>
                        {(user.agents?.[0]?.vapiAgentId || user.vapiAgentId) ? `${(user.agents?.[0]?.vapiAgentId || user.vapiAgentId).substring(0, 8)}...` : 'Pending'}
                      </span>
                      {(user.agents?.[0]?.vapiAgentId || user.vapiAgentId) && (
                        <button 
                          onClick={() => { navigator.clipboard.writeText(user.agents?.[0]?.vapiAgentId || user.vapiAgentId); toast.success('Agent ID Copied!'); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#3b82f6' }}
                          title="Copy Full ID"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600', color: user.metrics?.currentCycleCost > 50 ? '#ef4444' : '#10b981', fontSize: '14px', marginBottom: '4px' }}>
                      ${user.metrics?.currentCycleCost || '0.00'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Next reset: {new Date(new Date(user.metrics?.billingStart).setMonth(new Date(user.metrics?.billingStart).getMonth() + 1)).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', color: '#94a3b8' }}>
                    <div style={{ color: '#cbd5e1', marginBottom: '4px' }}>All-Time: ${user.metrics?.totalCost || '0.00'}</div>
                    <div style={{ fontSize: '11px' }}>Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Legacy'}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Link 
                      href={`/admin/user/${user._id}`}
                      style={{ 
                        backgroundColor: 'transparent', 
                        border: '1px solid #3b82f6', 
                        color: '#3b82f6', 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        display: 'inline-block'
                      }}
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        tbody tr:hover {
          background-color: rgba(51, 65, 85, 0.5);
        }
      `}} />
    </div>
  );
}
