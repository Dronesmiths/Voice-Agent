/* eslint-disable */
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    // If they hit the endpoint without a token, violently bounce them to the standalone interactive UI
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
    
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Set HTTP-only cookie for robust security
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'ai_pilots_client_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // 🚀 Instantly redirect them securely to their master Client Dashboard!
    return NextResponse.redirect(new URL('/client-dashboard', request.url));
  } catch (error) {
    console.error('[AUTH] Invalid token:', error);
    // If their email link is expired or broken, bounce them instantly so they can autonomously generate a new one!
    return NextResponse.redirect(new URL('/login?expired=true', request.url));
  }
}
