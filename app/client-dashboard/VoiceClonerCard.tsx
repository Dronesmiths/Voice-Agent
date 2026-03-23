"use client";

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

interface VoiceClonerProps {
  existingVoiceId?: string;
}

export default function VoiceClonerCard({ existingVoiceId }: VoiceClonerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(!!existingVoiceId);
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Maximum recommended ElevenLabs instant clone time is ~60s
  const MAX_SECONDS = 60;

  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const type = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        setAudioBlob(blob);
        
        // Stop all tracks to visually kill the red microphone icon in browser tabs
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_SECONDS - 1) {
            stopRecording();
            return MAX_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err: any) {
      console.error('Microphone Access Error:', err);
      setError('Please allow microphone access in your browser settings to clone your voice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setError('');
  };

  const handleUpload = async () => {
    if (!audioBlob) return;
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('voiceFile', audioBlob, 'clone_sample.webm');

      const response = await axios.post('/api/voice-clone', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#a855f7', '#d946ef', '#f43f5e'] // ElevenLabs thematic styling
        });
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to successfully sync voice profile.';
      setError(`Upload Failed: ${msg}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', background: isSuccess ? '#f0fdf4' : '#f3e8ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          {isSuccess ? '✅' : '🎙️'}
        </div>
        <div>
          <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 4px 0', fontWeight: '700', letterSpacing: '-0.5px' }}>Custom AI Voice Clone</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Record a 60-second clip below, and our model will instantly train your AI to sound exactly like you.</p>
        </div>
      </div>

      {isSuccess ? (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#16a34a', fontSize: '18px', fontWeight: 'bold' }}>Voice Cloned Successfully! 🚀</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Your live Vapi AI agent has been permanently structurally patched to use your new customized vocal signature. Give your dedicated number a call to hear yourself!</p>
          <button onClick={() => setIsSuccess(false)} style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginTop: '16px', fontWeight: '600', color: '#475569' }}>Retrain Voice Model</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '12px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Read This Script Aloud</p>
            <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#0f172a', margin: 0, lineHeight: '1.6' }}>
              "Hi, thanks for calling our business! I'm currently away from the phone right now, but I wanted to make sure you were taken care of. I can help answer any questions you have, get you booked on the calendar, or I can just take a message and pass it along to the team. How can I help you today?"
            </p>
          </div>

          {!audioBlob && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px 0' }}>
              {!isRecording ? (
                <button onClick={startRecording} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '50px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', transition: 'transform 0.1s' }}>
                  <span style={{ fontSize: '20px' }}>⏺</span> Start Recording
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                   <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', fontFamily: 'monospace', animation: 'pulse 1s infinite' }}>
                     00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
                   </div>
                   <button onClick={stopRecording} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     ⏹ Finish Recording
                   </button>
                </div>
              )}
            </div>
          )}

          {audioBlob && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f0f9ff', border: '1px solid #bae6fd', padding: '24px', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: '#0369a1', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🎧 Audio Captured Successfully ({recordingTime}s)
                </p>
                <audio src={URL.createObjectURL(audioBlob)} controls style={{ width: '100%', height: '40px' }} />
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button onClick={handleUpload} disabled={isUploading} style={{ flex: 1, background: '#8b5cf6', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading ? 0.7 : 1, boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>
                    {isUploading ? '⚙️ Cloning AI Voice Model...' : '🚀 Submit & Clone Voice'}
                  </button>
                  <button onClick={resetRecording} disabled={isUploading} style={{ background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: isUploading ? 'not-allowed' : 'pointer' }}>
                    Retake
                  </button>
                </div>
             </div>
          )}

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> {error}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
