import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';
import { logAdminLogin, parseClientInfo } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const clientInfo = parseClientInfo(req);

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const authResult = verifyAdminCredentials(email, password);

    if (!authResult.valid || !authResult.role) {
      // Record failed security attempt
      await logAdminLogin({
        email: String(email).trim().toLowerCase(),
        status: 'FAILED',
        ip: clientInfo.ip,
        location: clientInfo.location,
        device: clientInfo.device,
        browser: clientInfo.browser,
        os: clientInfo.os,
        userAgent: clientInfo.userAgent,
        timestamp: new Date().toISOString(),
        reason: 'Incorrect password or unauthorized account',
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const sid = Math.random().toString(36).substring(2, 12) + Date.now().toString(36);

    // Record successful login
    await logAdminLogin({
      email: email.trim().toLowerCase(),
      status: 'SUCCESS',
      ip: clientInfo.ip,
      location: clientInfo.location,
      device: clientInfo.device,
      browser: clientInfo.browser,
      os: clientInfo.os,
      userAgent: clientInfo.userAgent,
      timestamp: new Date().toISOString(),
      sid,
    });

    const token = createAdminToken(email, authResult.role, sid, clientInfo.ip);

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: email.trim().toLowerCase(),
        role: authResult.role,
        isSuperAdmin: authResult.role === 'super_admin',
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
