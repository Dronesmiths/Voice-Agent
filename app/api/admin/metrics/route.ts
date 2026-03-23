/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;
      if (decoded.role !== 'superadmin') throw new Error('Insufficient privileges');
    } catch {
      return NextResponse.json({ error: 'Invalid master signature.' }, { status: 401 });
    }

    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    if (!VAPI_API_KEY) {
      return NextResponse.json({ error: 'VAPI key missing.' }, { status: 500 });
    }

    // Natively fetch organizational telemetry from VAPI
    const res = await fetch('https://api.vapi.ai/call', {
      headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to connect to Vapi.' }, { status: 500 });
    }

    const calls = await res.json();
    
    let totalMinutes = 0;
    let totalCost = 0;
    let completedCalls = 0;

    calls.forEach((call: any) => {
      // Vapi returns duration in minutes implicitly through costs or timestamps, but usually has a cost block
      if (call.cost) totalCost += call.cost;
      
      if (call.endedReason === 'customer-ended-call' || call.endedReason === 'assistant-ended-call') {
        completedCalls += 1;
      }
      
      const started = new Date(call.createdAt).getTime();
      const ended = new Date(call.endedAt || call.updatedAt).getTime();
      const minutes = (ended - started) / 1000 / 60;
      if (minutes > 0) {
        totalMinutes += minutes;
      }
    });

    return NextResponse.json({ 
      success: true, 
      metrics: {
        totalCalls: calls.length,
        completedCalls,
        totalMinutes: Math.round(totalMinutes),
        totalCost: parseFloat(totalCost.toFixed(2))
      }
    });
  } catch (error: any) {
    console.error("[ADMIN METRICS ERROR]", error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
