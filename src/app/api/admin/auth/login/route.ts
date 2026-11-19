import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin email or password' },
        { status: 401 }
      );
    }

    const token = createAdminToken(email);

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: email.trim().toLowerCase(),
        role: 'admin',
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

