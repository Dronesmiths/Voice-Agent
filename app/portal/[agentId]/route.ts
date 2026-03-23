import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
  // Await params structurally to abide by newest NextJS 15 rendering standards globally
  const params = await context.params;
  const agentId = params.agentId;

  if (!agentId) {
    return new NextResponse('Missing Agent ID parameter.', { status: 400 });
  }

  try {
    await connectToDatabase();
    
    // Attempt to cryptographically locate the user using precisely their core UUID Agent ID
    const dbUser = await User.findOne({ vapiAgentId: agentId });

    if (!dbUser) {
      return new NextResponse('Invalid or expired Agent ID portal link. No active database record found.', { status: 404 });
    }

    // Generate a fresh JWT matrix exclusively for this client
    const jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
    const token = jwt.sign(
      { 
        email: dbUser.email,
        name: dbUser.name,
        twilioNumber: dbUser.twilioNumber,
        vapiAgentId: dbUser.vapiAgentId
      },
      jwtSecret,
      { expiresIn: '30d' } 
    );

    // Physically bypass the auth mechanism by directly injecting the HTTP-Only browser token
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

    // 🚀 Redirection straight to the active dashboard instance seamlessly!
    return NextResponse.redirect(new URL('/client-dashboard', request.url));
  } catch (error) {
    console.error('[PORTAL BROWSER] Internal routing extraction failed violently:', error);
    return new NextResponse('Internal server error loading immediate dashboard portal.', { status: 500 });
  }
}
