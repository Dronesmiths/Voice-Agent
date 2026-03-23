"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

interface VoiceSchema {
  voice_id: string;
  name: string;
  category: string;
  preview_url: string;
  labels?: Record<string, string>;
}

export default function VoiceLibraryCard({ initialFavorites = [] }: { initialFavorites?: any[] }) {
  const [voices, setVoices] = useState<VoiceSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Favorites State System
  const [favorites, setFavorites] = useState<any[]>(initialFavorites);
  
  // Real-time Audio Tracking Engine
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Vapi Auto-Patching State
  const [isPatching, setIsPatching] = useState<string | null>(null);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const { data } = await axios.get('/api/elevenlabs/library');
      if (data.success) {
        // Filter specifically for voices that physically possess an MP3 preview to avoid browser audio failures
        const playableVoices = data.voices.filter((v: VoiceSchema) => v.preview_url);
        // Grab the top 5 to keep the Gamified UI incredibly clean
        setVoices(playableVoices.slice(0, 5));
      }
    } catch (err) {
      setError('ElevenLabs sync structurally failed. Checking API Keys...');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = (voice: VoiceSchema) => {
    if (playingId === voice.voice_id) {
      // Pause
      if (audioRef.current) audioRef.current.pause();
      setPlayingId(null);
    } else {
      // Reset
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Create fresh buffer
      audioRef.current = new Audio(voice.preview_url);
      
      // Auto-teardown when finished hitting the end of the MP3 signature
      audioRef.current.onended = () => setPlayingId(null);
      
      audioRef.current.play();
      setPlayingId(voice.voice_id);
    }
  };

  const applyVoiceToAgent = async (voiceId: string) => {
    setIsPatching(voiceId);
    try {
      // We leverage the physically existing /api/voice-clone payload infrastructure!
      // But instead of uploading a blob, we write a small explicit patching route, OR just trigger a new standard REST update.
      // Wait, let's create a dedicated /patch-agent endpoint or just reuse a manual route!
      const { data } = await axios.post('/api/elevenlabs/patch-agent', { voiceId });
      
      if (data.success) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#1d4ed8', '#60a5fa'] 
        });
        alert("Voice successfully patched onto your Live Vapi Agent!");
      }
    } catch (err: any) {
      alert("Failed to physically patch Vapi: " + (err.response?.data?.error || err.message));
    } finally {
      setIsPatching(null);
    }
  };

  const toggleFavorite = async (voice: VoiceSchema) => {
    const isFav = favorites.some((f) => f.voiceId === voice.voice_id);
    const action = isFav ? 'remove' : 'add';

    // Optimistic UI Update 
    if (isFav) {
      setFavorites(favorites.filter((f) => f.voiceId !== voice.voice_id));
    } else {
      setFavorites([...favorites, { voiceId: voice.voice_id, name: voice.name, preview_url: voice.preview_url }]);
    }

    try {
      await axios.post('/api/user/favorite-voice', { 
        action, 
        voiceId: voice.voice_id, 
        name: voice.name, 
        preview_url: voice.preview_url 
      });
    } catch (err) {
      console.error('Failed to sync Gamified Favorites state safely back to Database');
    }
  };

  if (loading) return null;

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          🔊
        </div>
        <div>
          <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 4px 0', fontWeight: '700', letterSpacing: '-0.5px' }}>Premium Voice Vault</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Listen to top-tier algorithmic voices. Select any of them to natively snap it straight into your active phone line automatically.</p>
        </div>
      </div>

      {error ? (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {voices.map((v) => (
            <div key={v.voice_id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'box-shadow 0.2s' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{v.name}</h4>
                  <span style={{ fontSize: '11px', background: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {v.category || 'Standard'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => togglePlay(v)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: playingId === v.voice_id ? '#ef4444' : '#2563eb', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  >
                    {playingId === v.voice_id ? '⏸' : '▶'}
                  </button>
                  <button 
                    onClick={() => toggleFavorite(v)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fef2f2', color: favorites.some(f => f.voiceId === v.voice_id) ? '#ef4444' : '#cbd5e1', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <button 
                onClick={() => applyVoiceToAgent(v.voice_id)}
                disabled={isPatching === v.voice_id}
                style={{ width: '100%', background: '#0f172a', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: isPatching === v.voice_id ? 'wait' : 'pointer', opacity: isPatching === v.voice_id ? 0.7 : 1 }}
              >
                {isPatching === v.voice_id ? '⚙️ Patching System...' : 'Use This Voice'}
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
