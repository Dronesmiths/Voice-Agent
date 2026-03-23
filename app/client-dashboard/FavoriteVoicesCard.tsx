"use client";

import React, { useState, useRef } from 'react';

interface FavoriteVoice {
  voiceId: string;
  name: string;
  preview_url: string;
}

export default function FavoriteVoicesCard({ favorites = [] }: { favorites?: FavoriteVoice[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (voice: FavoriteVoice) => {
    if (playingId === voice.voiceId) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      
      audioRef.current = new Audio(voice.preview_url);
      audioRef.current.onended = () => setPlayingId(null);
      audioRef.current.play();
      setPlayingId(voice.voiceId);
    }
  };

  if (!favorites || favorites.length === 0) {
    return null; // Structurally hide the card if the ledger is mathematically empty
  }

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          ❤️
        </div>
        <div>
          <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 4px 0', fontWeight: '700', letterSpacing: '-0.5px' }}>Your Favorite Voices</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Instantly playback the premium algorithmic voices you bookmarked from the global library.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {favorites.map((v) => (
          <div key={v.voiceId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '16px' }}>{v.name}</span>
            <button 
              onClick={() => togglePlay(v)}
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: playingId === v.voiceId ? '#ef4444' : '#2563eb', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', transition: 'all 0.2s' }}
            >
              {playingId === v.voiceId ? '⏸' : '▶️'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
