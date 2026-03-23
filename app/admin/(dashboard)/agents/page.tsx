/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ActiveAgents() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/metrics')
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = '/admin/login';
            throw new Error('Unauthorized');
          }
          throw new Error('Failed to fetch telemetry');
        }
        return res.json();
      })
      .then(data => {
        setMetrics(data.metrics);
        setIsLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>Synchronizing with Vapi Core...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Active AI Agents</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>
            Live aggregate telemetry and billing metrics across all provisioned client agents.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', fontWeight: '600' }}>Master Organization Cost</p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>${metrics?.totalCost || '0.00'}</div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '8px 0 0 0' }}>Billed via Vapi.ai API</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', fontWeight: '600' }}>Total Minutes Processed</p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f8fafc' }}>{metrics?.totalMinutes || 0}</div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '8px 0 0 0' }}>Human effort saved globally</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', fontWeight: '600' }}>Total Inbound Hooks</p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f8fafc' }}>{metrics?.totalCalls || 0}</div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '8px 0 0 0' }}>Raw triggers received</p>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', fontWeight: '600' }}>Completed Conversations</p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>{metrics?.completedCalls || 0}</div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '8px 0 0 0' }}>Successfully resolved logic paths</p>
        </div>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#0f172a', border: '1px dashed #334155', borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Global Agent Diagnostics and Server Tuning capabilities will be available in the V2 rollout.</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
