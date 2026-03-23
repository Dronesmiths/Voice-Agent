/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    
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

    await connectToDatabase();
    const user = await User.findById(params.id).lean();
    
    if (!user) {
      return NextResponse.json({ error: 'Client not found in database.' }, { status: 404 });
    }

    // Natively fetch specific call logs and Assistant Config for this Vapi Agent ID
    let userCalls: any[] = [];
    let assistantConfig: any = null;
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    
    if (VAPI_API_KEY && user.vapiAgentId) {
      try {
        const [vapiRes, astRes] = await Promise.all([
          fetch('https://api.vapi.ai/call', { headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` } }),
          fetch(`https://api.vapi.ai/assistant/${user.vapiAgentId}`, { headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` } })
        ]);
        
        if (vapiRes.ok) {
          const allCalls = await vapiRes.json();
          userCalls = allCalls.filter((c: any) => c.assistantId === user.vapiAgentId).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        
        if (astRes.ok) {
          assistantConfig = await astRes.json();
        }
      } catch (err) {
        console.error("Vapi call sync failed gracefully:", err);
      }
    }

    return NextResponse.json({ success: true, user, calls: userCalls, assistant: assistantConfig });
  } catch (error: any) {
    console.error("[ADMIN USER API ERROR]", error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 🚀 God-Mode Vapi Prompt Injection Router
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;
      if (decoded.role !== 'superadmin') throw new Error('Insufficient privileges');
    } catch {
      return NextResponse.json({ error: 'Invalid master signature.' }, { status: 401 });
    }

    const body = await request.json();
    const { masterSystemPrompt } = body;
    
    if (!masterSystemPrompt) return NextResponse.json({ error: 'Missing prompt payload' }, { status: 400 });

    await connectToDatabase();
    const user = await User.findById(params.id).lean();
    if (!user || !user.vapiAgentId) return NextResponse.json({ error: 'Client or Agent ID not found.' }, { status: 404 });

    console.log(`[GOD-MODE] Patching Agent ${user.vapiAgentId} for Admin...`);
    
    const vapiResponse = await axios.patch(`https://api.vapi.ai/assistant/${user.vapiAgentId}`, {
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: masterSystemPrompt }]
      }
    }, {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });

    return NextResponse.json({ success: true, message: 'Agent Prompt Override Successful!' });
  } catch (error: any) {
    console.error("[GOD-MODE API ERROR]", error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to deploy prompt patch to Vapi.' }, { status: 500 });
  }
}
