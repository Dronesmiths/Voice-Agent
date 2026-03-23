"use client";
import React, { useState } from 'react';

interface CompletionProps {
  hasSms: boolean;
  hasCalendar: boolean;
  hasWhatsapp: boolean;
}

import ConnectSmsForm from './ConnectSmsForm';
import confetti from 'canvas-confetti';

export default function CompletionBar({ hasSms, hasCalendar, hasWhatsapp }: CompletionProps) {
  // Score out of 3 (Agent is automatically 1/3)
  let stepsCompleted = 1; 
  if (hasSms) stepsCompleted++;
  if (hasCalendar) stepsCompleted++;

  React.useEffect(() => {
    const prevCount = parseInt(localStorage.getItem('aipilots_dopamine_score') || '0', 10);
    if (stepsCompleted > prevCount && prevCount !== 0) {
      // Explosive confetti burst natively rewarding power-user behavior!
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#16a34a', '#86efac', '#fde047', '#f43f5e']
      });
    }
    localStorage.setItem('aipilots_dopamine_score', stepsCompleted.toString());
  }, [stepsCompleted]);

  const percentage = Math.round((stepsCompleted / 3) * 100);

  return (
    <div style={{ marginBottom: '32px', background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: percentage === 100 ? '0 0 15px rgba(22, 163, 74, 0.2)' : '0 4px 6px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: percentage === 100 ? '#16a34a' : '#0f172a' }}>
            {percentage === 100 ? 'Enterprise Integrations Complete 🚀' : 'Finish setting up your AI Pilot'}
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
            {percentage === 100 ? 'All 3rd-party architectural pipelines are securely connected and active.' : 'Connect your external apps to unlock the full power of the autonomous agent.'}
          </p>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
          {percentage}%
        </div>
      </div>

      {/* Progress Bar Track */}
      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '4px', transition: 'width 0.5s ease-out' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        {/* SMS Card */}
        <div style={{ padding: '16px', border: '1px solid', borderColor: hasSms ? '#86efac' : '#e2e8f0', background: hasSms ? '#f0fdf4' : '#f8fafc', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>📱</span>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>SMS Text Alerts</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Receive instant call summary texts</div>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            {hasSms ? <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Connected</span> : <div style={{ width: '100%' }}><ConnectSmsForm /></div>}
          </div>
        </div>

        {/* Calendar Card */}
        <div style={{ padding: '16px', border: '1px solid', borderColor: hasCalendar ? '#86efac' : '#e2e8f0', background: hasCalendar ? '#f0fdf4' : '#f8fafc', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🗓️</span>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>Google Calendar API</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Allow AI to book appointments natively</div>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            {hasCalendar ? (
              <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Connected — Booking Engine Active 🟢</span>
            ) : (
              <a href="/api/oauth/google" style={{ textDecoration: 'none' }}>
                <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Connect Google OAuth</button>
              </a>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
