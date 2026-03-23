/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ManageUser() {
  const params = useParams();
  const id = params.id as string;
  
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, calls, assistant } = data || {};
  const initialPrompt = assistant?.model?.messages?.[0]?.content || '';
  const [systemPrompt, setSystemPrompt] = useState(initialPrompt);
  const [isPatching, setIsPatching] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    fetch(`/api/admin/user/${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) window.location.href = '/admin/login';
          throw new Error('Failed to fetch user telemetry');
        }
        return res.json();
      })
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (assistant?.model?.messages?.[0]?.content) {
      setSystemPrompt(assistant.model.messages[0].content);
    }
  }, [assistant]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>Decrypting client mainframe...</p>
      </div>
    );
  }

  if (!data?.user) {
    return <div style={{ color: '#ef4444' }}>Error: Client signature not found.</div>;
  }

  const handlePatchPrompt = async () => {
    if (!systemPrompt.trim()) return toast.error('Prompt cannot be empty');
    setIsPatching(true);
    try {
      const res = await fetch(`/api/admin/user/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterSystemPrompt: systemPrompt })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to patch');
      toast.success('Agent Prompt Overridden Successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsPatching(false);
    }
  };

  const capturedLeads = calls?.filter((c: any) => c.analysis?.structuredData?.is_lead) || [];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          &larr; Back to Global Ledger
        </Link>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>{user.name}</h1>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>
          Master configuration and telemetry portal.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        
        {/* Identity Block */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 20px 0', color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>Client Identity</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Full Name</label>
            <div style={{ color: '#f8fafc', fontSize: '15px' }}>{user.name}</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Account Email</label>
            <div style={{ color: '#f8fafc', fontSize: '15px' }}>{user.email}</div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Joined Date</label>
            <div style={{ color: '#f8fafc', fontSize: '15px' }}>{new Date(user.createdAt).toLocaleString()}</div>
          </div>
        </div>

        {/* API Block */}
        <div style={{ backgroundColor: '#0f172a', border: '1px dashed #3b82f6', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: 0, color: '#f8fafc' }}>API Configuration</h3>
            <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Edit APIs</button>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Twilio Phone Number</label>
            <div style={{ color: '#10b981', fontSize: '15px', fontFamily: 'monospace' }}>{user.twilioNumber || 'None Assigned'}</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Vapi Agent ID</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '14px', fontFamily: 'monospace' }}>{user.vapiAgentId || 'None Assigned'}</span>
              {user.vapiAgentId && (
                <button onClick={() => { navigator.clipboard.writeText(user.vapiAgentId); toast.success('Copied!'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>📋</button>
              )}
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Pabbly Subscription ID</label>
            <div style={{ color: '#cbd5e1', fontSize: '14px', fontFamily: 'monospace' }}>{user.pabblySubscriptionId || 'None'}</div>
          </div>

          <div style={{ borderTop: '1px solid #334155', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 12px 0', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Connected Integrations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>💬</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>WhatsApp API</span>
                </div>
                {user.whatsappApiConnected ? (
                  <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>✓ Connected</span>
                ) : (
                  <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', background: 'rgba(239, 68, 68, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>⚠ Disconnected</span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>📱</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>SMS (Twilio)</span>
                </div>
                {!!user.twilioNumber ? (
                  <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>✓ Connected</span>
                ) : (
                  <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', background: 'rgba(239, 68, 68, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>⚠ Disconnected</span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>📅</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>Google Calendar</span>
                </div>
                {user.googleCalendarConnected ? (
                  <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>✓ Connected</span>
                ) : (
                  <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', background: 'rgba(239, 68, 68, 0.15)', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>⚠ Disconnected</span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 🚀 God-Mode Prompt Editor */}
      <h3 style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>⚡</span> God-Mode Prompt Override
      </h3>
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px', marginBottom: '40px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
          Execute emergency or optimization system prompt overrides directly into the client's live Vapi agent.
        </p>
        <textarea 
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          style={{ width: '100%', height: '300px', backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '16px', fontSize: '13px', fontFamily: 'monospace', marginBottom: '16px', resize: 'vertical' }}
        />
        <button 
          onClick={handlePatchPrompt}
          disabled={isPatching}
          style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold', cursor: isPatching ? 'not-allowed' : 'pointer', opacity: isPatching ? 0.7 : 1 }}
        >
          {isPatching ? 'Deploying Override...' : '⚠ FORCE OVERRIDE AGENT PROMPT'}
        </button>
      </div>

      {/* 🚀 Captured Leads Sentinel */}
      <h3 style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>🔥</span> Global Leads Surveillance
      </h3>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #f59e0b', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 0 20px rgba(245, 158, 11, 0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#451a03', borderBottom: '1px solid #92400e' }}>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: 'bold', color: '#fde68a', textTransform: 'uppercase' }}>Prospect Name</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: 'bold', color: '#fde68a', textTransform: 'uppercase' }}>Prospect Phone</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: 'bold', color: '#fde68a', textTransform: 'uppercase' }}>Core Intent</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: 'bold', color: '#fde68a', textTransform: 'uppercase', width: '40%' }}>AI Summary Extraction</th>
            </tr>
          </thead>
          <tbody>
            {capturedLeads.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No active leads captured across this agent's entire network history.</td>
              </tr>
            ) : (
              capturedLeads.map((call: any) => {
                const data = call.analysis?.structuredData;
                return (
                  <tr key={"lead-"+call.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#f8fafc', fontWeight: 'bold' }}>{data.caller_name || 'Unknown'}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>{data.caller_phone || 'None given'}</td>
                    <td style={{ padding: '16px', fontSize: '13px' }}><span style={{ backgroundColor: '#0284c7', color: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>{data.intent || 'Unknown'}</span></td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.4' }}>{data.summary || 'No summary'}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#f8fafc' }}>Raw Telemetry Logs</h3>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Date & Time</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>End Reason</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Duration</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Cost</th>
              <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', width: '30%' }}>Summary</th>
            </tr>
          </thead>
          <tbody>
            {!calls || calls.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No call logic has been triggered for this AI agent yet.</td>
              </tr>
            ) : (
              calls.map((call: any) => {
                let minutes = 0;
                if (call.endedAt && call.startedAt) {
                  const seconds = (new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000;
                  minutes = Math.max(1, Math.ceil(seconds / 60)); // Minimum 1 minute per standard telecom billing.
                }
                const isFail = call.endedReason && !['customer-ended-call', 'assistant-ended-call', 'pipeline-error-openai-voice-failed'].includes(call.endedReason);
                
                return (
                  <tr key={call.id} style={{ borderBottom: '1px solid #334155', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#cbd5e1' }}>
                      {new Date(call.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        backgroundColor: isFail ? '#7f1d1d' : '#065f46', 
                        color: isFail ? '#fca5a5' : '#6ee7b7', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px',
                        textTransform: 'uppercase'
                      }}>
                        {call.endedReason?.replace(/-/g, ' ') || 'unknown'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#f8fafc', fontWeight: '500' }}>
                      {minutes}m
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#10b981', fontWeight: '500' }}>
                      ${call.cost?.toFixed(3) || '0.000'}
                    </td>
                    <td style={{ padding: '16px', fontSize: '12px', color: '#94a3b8' }}>
                      {call.summary ? (
                        <div style={{ maxHeight: '60px', overflowY: 'auto', lineHeight: '1.4' }}>{call.summary}</div>
                      ) : (
                        <span style={{ fontStyle: 'italic' }}>No summary generated.</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
