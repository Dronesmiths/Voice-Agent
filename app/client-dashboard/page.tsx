/* eslint-disable */
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';
import TranscriptViewer from './TranscriptViewer';
import LocalTime from './LocalTime';
import HelperBot from '../components/HelperBot';
import CompletionBar from './CompletionBar';
import VoiceClonerCard from './VoiceClonerCard';
import FavoriteVoicesCard from './FavoriteVoicesCard';
import ClientSafetyCard from './ClientSafetyCard';

export default async function ClientDashboardPage(props: { searchParams: Promise<{ agentId?: string }> }) {
  const searchParams = await props.searchParams;
  const urlAgentId = searchParams.agentId;
  const cookieStore = await cookies();
  const token = cookieStore.get('ai_pilots_client_session')?.value;

  if (!token) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', marginBottom: '16px' }}>Access Denied 🔒</h1>
        <p style={{ color: '#64748b' }}>Please use the secure link sent to your email to access your dashboard.</p>
      </div>
    );
  }

  let clientData: any = null;
  try {
    const jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // 🚀 NEW: Securely authenticate session against absolute truth in MongoDB
    console.log("[AUTH] Decoding JWT:", decoded);
    await connectToDatabase();
    let dbUser = await User.findOne({ email: decoded.email.toLowerCase().trim() });
    
    // Auto-migrate legacy Pabbly clients directly into MongoDB on their first visit
    if (!dbUser && decoded.email && decoded.vapiAgentId) {
      console.log(`[AUTH] Legacy JWT detected for ${decoded.email}. Auto-migrating to Database...`);
      dbUser = await User.create({
        email: decoded.email.toLowerCase().trim(),
        name: decoded.name || 'Legacy Client',
        twilioNumber: decoded.twilioNumber || '+10000000000',
        vapiAgentId: decoded.vapiAgentId
      });
    }

    if (!dbUser) {
       throw new Error("Unauthorized: User explicitly missing from central Database.");
    }
    
    clientData = dbUser;
  } catch (err: any) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', marginBottom: '16px' }}>Session Expired ⏱️</h1>
        <p style={{ color: '#64748b', marginBottom: '10px' }}>Your secure magic link has expired or is invalid. Please contact support.</p>
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '12px', maxWidth: '600px', wordBreak: 'break-all' }}>
          <strong>System Trace:</strong> {err.message || String(err)}
        </div>
      </div>
    );
  }

  let agentsList = clientData?.agents || [];
  
  // Legacy migration fallback for extremely old initial accounts
  if (agentsList.length === 0 && clientData?.vapiAgentId) {
    agentsList = [{
      name: clientData.name?.includes("'s") ? clientData.name : `${clientData.name || 'Client'}'s Main Line`,
      twilioNumber: clientData.twilioNumber,
      vapiAgentId: clientData.vapiAgentId,
      pabblySubscriptionId: clientData.pabblySubscriptionId
    }];
  }

  // Determine active target agent visually
  const activeAgent = agentsList.find((a: any) => a.vapiAgentId === urlAgentId) || agentsList[0];

  let calls = [];
  try {
    const response = await axios.get(`https://api.vapi.ai/call?assistantId=${activeAgent?.vapiAgentId}`, {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });
    calls = response.data || [];
  } catch (error) {
    console.error("[DASHBOARD] Error fetching Vapi calls:", error);
  }

  // Calculate high-level analytics for the client (1-minute minimal billing increments)
  const totalCalls = calls.length;
  const totalDurationMinutes = calls.reduce((acc: number, c: any) => {
    if (c.endedAt && c.startedAt) {
      const seconds = (new Date(c.endedAt).getTime() - new Date(c.startedAt).getTime()) / 1000;
      return acc + Math.max(1, Math.ceil(seconds / 60)); // Standard telecom minimum per-minute threshold!
    }
    return acc;
  }, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <header style={{ background: '#ffffff', padding: '20px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>AI</div>
          <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>AI Pilots</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <a href="/rewards" style={{ background: '#10b981', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }}>
             🎁 Earn Free Minutes
           </a>
           <a href="/onboarding" className="btn-glow" style={{ background: '#2563eb', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}>
             ⚙️ Configure AI Settings
           </a>
           <a href="/voice-library" style={{ background: '#8b5cf6', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)' }}>
             🔊 Premium Voices
           </a>
           <span style={{ color: '#64748b', fontSize: '14px', marginLeft: '10px' }}>Logged in as <strong>{clientData.name}</strong></span>
           <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569', fontSize: '16px' }}>
             {clientData.name?.charAt(0)?.toUpperCase() || 'U'}
           </div>
        </div>
      </header>
      
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#0f172a', margin: '0 0 10px 0', letterSpacing: '-1px' }}>Welcome back, {clientData.name.split(' ')[0]} 👋</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '18px' }}>Here is the live performance of your automated AI Voice Agent.</p>
        </div>

        {/* Gamified Onboarding Completion Engine */}
        <CompletionBar 
          hasSms={!!clientData.personalPhone} 
          hasCalendar={!!clientData.googleCalendarConnected} 
          hasWhatsapp={!!clientData.whatsappApiConnected} 
        />

        {/* Enterprise Audio Replication Node */}
        <VoiceClonerCard existingVoiceId={clientData.elevenLabsVoiceId} />

        {/* Gamified Bookmarked Voices Matrix */}
        <FavoriteVoicesCard favorites={clientData.favoriteVoices || []} />

        {/* Client Safety Toggles */}
        <ClientSafetyCard 
          agentId={activeAgent?.vapiAgentId} 
          initialSettings={activeAgent?.safetySettings || {}} 
        />

        {/* Dynamic Multi-Agent Tab Selector */}
        {agentsList.length > 1 && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap', background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ width: '100%', margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Business Line</p>
            {agentsList.map((agent: any, idx: number) => {
              const isActive = agent.vapiAgentId === activeAgent?.vapiAgentId;
              return (
                <a 
                  key={idx} 
                  href={`/client-dashboard?agentId=${agent.vapiAgentId}`}
                  style={{
                    padding: '10px 20px', 
                    borderRadius: '8px', 
                    background: isActive ? '#2563eb' : '#f1f5f9', 
                    color: isActive ? '#ffffff' : '#475569', 
                    fontWeight: '600', 
                    fontSize: '14px', 
                    textDecoration: 'none',
                    border: isActive ? '1px solid #1d4ed8' : '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 10px rgba(37, 99, 235, 0.3)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{isActive ? '📞' : '📱'}</span>
                  {agent.name || `Line #${idx + 1}`} ({agent.twilioNumber})
                </a>
              );
            })}
            

          </div>
        )}

        {/* Top KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', fontWeight: '600', letterSpacing: '1px' }}>YOUR DEDICATED NUMBER</p>
            <h3 style={{ fontSize: '32px', color: '#0f172a', margin: 0, fontWeight: '700', letterSpacing: '-1px' }}>{activeAgent?.twilioNumber || 'None'}</h3>
            <p style={{ fontSize: '14px', color: '#10b981', margin: '16px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <span style={{display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#10b981'}}></span> Agent is Online and Active
            </p>
          </div>
          
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', fontWeight: '600', letterSpacing: '1px' }}>TOTAL CALLS HANDLED</p>
            <h3 style={{ fontSize: '32px', color: '#0f172a', margin: 0, fontWeight: '700', letterSpacing: '-1px' }}>{totalCalls}</h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '16px 0 0 0' }}>All-time answered & dialed calls</p>
          </div>

          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', fontWeight: '600', letterSpacing: '1px' }}>BILLED MINUTES SPOKEN</p>
            <h3 style={{ fontSize: '32px', color: '#0f172a', margin: 0, fontWeight: '700', letterSpacing: '-1px' }}>{totalDurationMinutes} min</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '16px 0 0 0' }}>Billed in standard 60-second telecom allocations.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px dashed #cbd5e1', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', fontWeight: '600', letterSpacing: '1px' }}>REFERRAL CREDITS EARNED</p>
            <h3 style={{ fontSize: '32px', color: '#10b981', margin: 0, fontWeight: '700', letterSpacing: '-1px' }}>{clientData.available_credits || 0}</h3>
            <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>Your Unique Affiliate Link:</span>
              <span style={{ background: '#e2e8f0', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', color: '#0f172a', userSelect: 'all', cursor: 'copy' }}>
                dashboard.aipilots.site/invite/{clientData.referralCode || 'PENDING'}
              </span>
            </div>
          </div>
        </div>

        {/* LEAD CAPTURE TABLE */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
             <h2 style={{ fontSize: '22px', color: '#0f172a', margin: 0, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ fontSize: '24px' }}>🔥</span> High-Intent Captured Leads
             </h2>
             <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
               {calls.filter((c: any) => c.analysis?.structuredData?.is_lead).length} Leads Extracted
             </span>
          </div>
          
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f59e0b', overflow: 'hidden', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)' }}>
            {calls.filter((c: any) => c.analysis?.structuredData?.is_lead).length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <p style={{ margin: 0 }}>No high-intent leads captured yet. Once your AI extracts a caller's details, they will appear here automatically.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a' }}>
                  <tr>
                    <th style={{ padding: '16px 24px', color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>CALLER NAME</th>
                    <th style={{ padding: '16px 24px', color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>PROVIDED PHONE</th>
                    <th style={{ padding: '16px 24px', color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>PRIMARY INTENT</th>
                    <th style={{ padding: '16px 24px', color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>AI SUMMARY</th>
                  </tr>
                </thead>
                <tbody>
                  {calls
                    .filter((c: any) => c.analysis?.structuredData?.is_lead)
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((call: any) => {
                      const data = call.analysis?.structuredData;
                      return (
                        <tr key={"lead-"+call.id} style={{ borderBottom: '1px solid #fef3c7', transition: 'background-color 0.2s' }}>
                          <td style={{ padding: '16px 24px', fontSize: '15px', color: '#0f172a', fontWeight: 'bold' }}>
                            {data.caller_name || 'Unknown'}
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '15px', color: '#059669', fontWeight: '600' }}>
                            {data.caller_phone || 'None given'}
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                            <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>
                              {data.intent || 'Unknown'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '14px', color: '#475569', maxWidth: '300px', lineHeight: '1.4' }}>
                            {data.summary || 'No summary generated.'}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Call Logs Table */}
        <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 24px 0', fontWeight: '600' }}>Recent Call Logs</h2>
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          {calls.length === 0 ? (
            <div style={{ padding: '60px 40px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📞</div>
              <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 8px 0' }}>No calls recorded yet</h3>
              <p style={{ margin: 0 }}>Test your brilliant new agent by giving it a ring at <strong>{clientData.twilioNumber}</strong>!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '18px 24px', color: '#475569', fontWeight: '600', fontSize: '13px', letterSpacing: '0.5px' }}>DATE & TIME</th>
                  <th style={{ padding: '18px 24px', color: '#475569', fontWeight: '600', fontSize: '13px', letterSpacing: '0.5px' }}>STATUS</th>
                  <th style={{ padding: '18px 24px', color: '#475569', fontWeight: '600', fontSize: '13px', letterSpacing: '0.5px' }}>DURATION</th>
                  <th style={{ padding: '18px 24px', color: '#475569', fontWeight: '600', fontSize: '13px', letterSpacing: '0.5px' }}>TRANSCRIPT</th>
                </tr>
              </thead>
              <tbody>
                {calls.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((call: any) => {
                  const durationStr = call.startedAt && call.endedAt ? Math.round((new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000) + 's' : '-';
                  
                  return (
                    <tr key={call.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '20px 24px', fontSize: '15px', color: '#0f172a', fontWeight: '500' }}>
                        <LocalTime isoDate={call.createdAt} />
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', background: call.endedReason === 'customer_hung_up' || !call.endedReason ? '#dcfce7' : '#f1f5f9', color: call.endedReason === 'customer_hung_up' || !call.endedReason ? '#166534' : '#475569' }}>
                          {call.endedReason ? call.endedReason.replace(/_/g, ' ') : 'Completed'}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', fontSize: '15px', color: '#475569' }}>{durationStr}</td>
                      <td style={{ padding: '20px 24px', fontSize: '15px', color: '#475569', maxWidth: '350px' }}>
                        <TranscriptViewer transcript={call.transcript} isoDate={call.createdAt} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
      
      {/* 🚀 Mount the dedicated interactive onboarding assistant right onto the dashboard layer */}
      <HelperBot />
    </div>
  );
}
