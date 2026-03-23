'use client';
import { useState } from 'react';

export default function ClientSafetyCard({ agentId, initialSettings }: { agentId: string, initialSettings: any }) {
  const [disableBooking, setDisableBooking] = useState(initialSettings?.disableBooking || false);
  const [disableSms, setDisableSms] = useState(initialSettings?.disableSms || false);
  const [humanFallback, setHumanFallback] = useState(initialSettings?.humanFallback || false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (key: string, currentValue: boolean) => {
    const newValue = !currentValue;
    
    // Optimistic UI update
    if (key === 'disableBooking') setDisableBooking(newValue);
    if (key === 'disableSms') setDisableSms(newValue);
    if (key === 'humanFallback') setHumanFallback(newValue);

    setIsSaving(true);
    try {
      const res = await fetch('/api/vapi/update-safety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          safetySettings: {
            disableBooking: key === 'disableBooking' ? newValue : disableBooking,
            disableSms: key === 'disableSms' ? newValue : disableSms,
            humanFallback: key === 'humanFallback' ? newValue : humanFallback
          }
        })
      });
      if (!res.ok) throw new Error('Failed to update safety settings');
    } catch(err) {
      console.error(err);
      // Revert optimism
      if (key === 'disableBooking') setDisableBooking(currentValue);
      if (key === 'disableSms') setDisableSms(currentValue);
      if (key === 'humanFallback') setHumanFallback(currentValue);
      alert("Failed to securely update AI Settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
      <div style={{ background: '#fee2e2', padding: '20px 24px', borderBottom: '1px solid #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', color: '#991b1b', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Client Safety Controls
          </h2>
          <p style={{ color: '#b91c1c', margin: '4px 0 0 0', fontSize: '14px' }}>Instantly restrict AI capabilities to prevent unapproved behavior during live calls.</p>
        </div>
        {isSaving && <span style={{ fontSize: '12px', background: '#fecaca', color: '#7f1d1d', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>Syncing AI Brain...</span>}
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Toggle 1 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '16px' }}>Disable Calendar Booking</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>The AI will be physically unable to view or book appointments.</p>
          </div>
          <button 
            onClick={() => handleToggle('disableBooking', disableBooking)}
            style={{ width: '48px', height: '26px', background: disableBooking ? '#ef4444' : '#cbd5e1', borderRadius: '20px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: disableBooking ? '24px' : '2px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </button>
        </div>

        {/* Toggle 2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '16px' }}>Disable SMS Texts</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>The AI will no longer text links or information to callers.</p>
          </div>
          <button 
            onClick={() => handleToggle('disableSms', disableSms)}
            style={{ width: '48px', height: '26px', background: disableSms ? '#ef4444' : '#cbd5e1', borderRadius: '20px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: disableSms ? '24px' : '2px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </button>
        </div>

        {/* Toggle 3 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '16px' }}>Force Human Fallback</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>The AI will instantly apologize and offer to take a message instead of fully helping.</p>
          </div>
          <button 
            onClick={() => handleToggle('humanFallback', humanFallback)}
            style={{ width: '48px', height: '26px', background: humanFallback ? '#ef4444' : '#cbd5e1', borderRadius: '20px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: humanFallback ? '24px' : '2px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </button>
        </div>

      </div>
    </div>
  );
}
