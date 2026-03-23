"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Vapi from '@vapi-ai/web';
import { Play, Square, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceSchema {
  voice_id: string; // This will directly uniquely map safely to the 11Labs ID
  name: string;
  category: string;
}

const STATIC_VOICES: VoiceSchema[] = [
  { name: 'Sarah (Professional Female)', voice_id: '21m00Tcm4TlvDq8ikWAM', category: 'Premium' },
  { name: 'Bella (Friendly Female)', voice_id: 'EXAVITQu4vr4xnSDxMaL', category: 'Premium' },
  { name: 'Emily (Warm Female)', voice_id: 'bIHbv24MWmeRgasZH58o', category: 'Standard' },
  { name: 'Aunt Shirley (Southern Female)', voice_id: '9QPzUjm1evjwY2ENQBKU', category: 'Regional' },
  { name: 'Adam (Professional Male)', voice_id: 'pNInz6obbfdqGcgCEhFa', category: 'Premium' },
  { name: 'Antoni (Friendly Male)', voice_id: 'ErXwobaYiN019PkySvjV', category: 'Premium' },
  { name: 'Thomas (Calm Male)', voice_id: 'GBv7mTt0atIp3Br8iCZE', category: 'Standard' }
];

export default function VoiceLibraryCard({ initialFavorites = [] }: { initialFavorites?: any[] }) {
  const [voices] = useState<VoiceSchema[]>(STATIC_VOICES);
  const [loading, setLoading] = useState(false); // No longer strictly dynamically loading from broken 11Labs
  const [error, setError] = useState('');
  
  // Favorites State System
  const [favorites, setFavorites] = useState<any[]>(initialFavorites);
  
  // Real-time WebRTC Audio Tracking Engine
  const [vapiClient, setVapiClient] = useState<any>(null);
  const [testingVoiceId, setTestingVoiceId] = useState<string | null>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Vapi Auto-Patching State
  const [isPatching, setIsPatching] = useState<string | null>(null);

  useEffect(() => {
    // Client-side initialization exactly mathematically like the onboarding architecture
    const vapi = new Vapi('74c72495-b876-477b-84cd-3bcff1c23c0d');
    setVapiClient(vapi);
    
    vapi.on('call-end', () => {
      setTestingVoiceId(null);
      if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
    });

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
    };
  }, []);

  const handlePreviewVoice = (v: VoiceSchema, e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (!vapiClient) return;

    if (testingVoiceId === v.voice_id) {
      vapiClient.stop();
      setTestingVoiceId(null);
      return;
    }

    vapiClient.stop();
    setTestingVoiceId(v.voice_id + '-loading');

    vapiClient.start("76d5995a-d925-47d8-b6e9-e7e9d1dfc721", {
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [{
          role: "system",
          content: `You are ${v.name}. A human is organically test-driving your premium voice right now natively in their Agent Dashboard. Introduce yourself excitedly, let them safely speak back to you, and casually aggressively have an extremely brief, securely friendly 20-second conversation. You MUST politely seamlessly say goodbye and systematically automatically hang up explicitly after perfectly 2 or 3 short conversational interactions.`
        }]
      },
      voice: {
        provider: "11labs",
        voiceId: v.voice_id
      }
    }).then(() => {
      setTestingVoiceId(v.voice_id);
      
      callTimeoutRef.current = setTimeout(() => {
        vapiClient.stop();
        setTestingVoiceId(null);
        toast('Live WebRTC Preview limits formally reached (30s).', { icon: '⏱️' });
      }, 30000);
    }).catch((err: any) => {
      console.error(err);
      toast.error("Microphone access legally denied or explicit socket connection violently failed.");
      setTestingVoiceId(null);
    });
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

    // Optimistic UI Update structurally
    if (isFav) {
      setFavorites(favorites.filter((f) => f.voiceId !== voice.voice_id));
    } else {
      setFavorites([...favorites, { voiceId: voice.voice_id, name: voice.name, preview_url: '' }]);
    }

    try {
      await axios.post('/api/user/favorite-voice', { 
        action, 
        voiceId: voice.voice_id, 
        name: voice.name, 
        preview_url: '' 
      });
    } catch (err) {
      console.error('Failed to safely sync Gamified Favorites state natively back to Database');
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
                    onClick={(e) => handlePreviewVoice(v, e)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: testingVoiceId === v.voice_id ? '#ef4444' : '#2563eb', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                    title="Live Test this voice via Microphone"
                  >
                    {testingVoiceId === v.voice_id + '-loading' ? (
                      <Loader2 size={18} className="animate-spin text-white" />
                    ) : testingVoiceId === v.voice_id ? (
                      <Square size={18} className="fill-current animate-pulse text-white" />
                    ) : (
                      <Play size={18} className="fill-current ml-0.5 text-white" />
                    )}
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
