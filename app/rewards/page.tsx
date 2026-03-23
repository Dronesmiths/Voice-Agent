/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RewardsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ai_pilots_client_session')?.value;

  if (!token) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', marginBottom: '16px' }}>Access Denied 🔒</h1>
        <p style={{ color: '#64748b' }}>Please login to view your secure referral dashboard.</p>
        <Link href="/client-login" style={{ marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>&rarr; Login Here</Link>
      </div>
    );
  }

  let clientData: any = null;
  let successfulReferralsCount = 0;
  let referredClientsList: any[] = [];
  
  try {
    const jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    await connectToDatabase();
    clientData = await User.findOne({ email: decoded.email.toLowerCase().trim() });
    
    if (!clientData) {
      throw new Error("Client logic signature fundamentally missing from central Database.");
    }
    
    // Auto-generate Referral Code explicitly for legacy users interacting natively with UI
    if (!clientData.referralCode) {
      const newRef = `AIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      clientData.referralCode = newRef;
      await User.updateOne({ _id: clientData._id }, { $set: { referralCode: newRef } });
    }

    // Mathematically exact tracking logic against global user pool limits
    successfulReferralsCount = await User.countDocuments({ referredBy: clientData.referralCode });

    // Extract the raw structural ledger of referred clients for gamified psychological UI representation
    referredClientsList = await User.find(
      { referredBy: clientData.referralCode }, 
      'name createdAt'
    ).sort({ createdAt: -1 }).lean();

  } catch (err: any) {
    return (
      <div style={{ padding: '50px', color: 'red' }}>Session expired or fatal connection loss. Please re-login.</div>
    );
  }

  // Generate their standalone absolute tracking URL structure securely
  const referralLink = `https://dashboard.aipilots.site/invite/${clientData.referralCode}`;
  const totalFreeCredits = successfulReferralsCount * 50;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <header style={{ background: '#ffffff', padding: '20px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>AI</div>
          <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>AI Pilots</h2>
        </div>
        <Link href="/client-dashboard" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
          &larr; Back to Dashboard
        </Link>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'bounce 2.5s infinite ease-in-out' }}>🎁</div>
          <h1 style={{ fontSize: '36px', color: '#0f172a', margin: '0 0 16px 0', letterSpacing: '-1px', fontWeight: '800' }}>Give AI, Get Free Minutes</h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Share your custom referral link globally. When another verified business signs up for an AI Receptionist, <strong>we will instantly drop 50 Non-Expiring Rollover Minutes directly into your account!</strong>
          </p>
        </div>

        <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.1)', textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Your Unique Tracking Link</p>
          <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', fontSize: '18px', color: '#0f172a', fontWeight: '600', fontFamily: 'monospace', letterSpacing: '-0.5px' }}>
            {referralLink}
          </div>
          <p style={{ color: '#10b981', fontSize: '13px', marginTop: '16px', fontWeight: '600' }}>
            ✓ Traffic intercept endpoint for Tracking Signature <strong>{clientData.referralCode}</strong> is globally listening.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#64748b', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 8px 0' }}>Total Friends Referred</p>
            <h3 style={{ fontSize: '48px', color: '#0f172a', margin: 0, fontWeight: '800', letterSpacing: '-1px' }}>{successfulReferralsCount}</h3>
          </div>
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: 0.05 }}>💎</div>
            <p style={{ color: '#64748b', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 8px 0' }}>Lifetime Minutes Earned</p>
            <h3 style={{ fontSize: '48px', color: '#2563eb', margin: 0, fontWeight: '800', letterSpacing: '-1px' }}>{totalFreeCredits}</h3>
          </div>
        </div>

        {/* Gamified Real-Time Ledger */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: '700' }}>Recent Signups</h3>
          
          {referredClientsList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🌱</div>
              <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>You haven't referred anyone yet. Share your link above to start earning!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {referredClientsList.map((referredUser, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                      {referredUser.name ? referredUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#0f172a', fontWeight: '600', fontSize: '15px' }}>{referredUser.name || 'Anonymous User'}</p>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>Joined {new Date(referredUser.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>+50 Min</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
