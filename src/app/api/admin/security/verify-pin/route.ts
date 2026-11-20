import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession, verifySecurityPin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Staff users cannot access security at all
  if (session.role === 'staff') {
    return NextResponse.json(
      { error: 'Forbidden: Staff accounts cannot access security controls.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { pin } = body;

    if (!pin) {
      return NextResponse.json({ error: 'Security PIN is required' }, { status: 400 });
    }

    const isValid = verifySecurityPin(String(pin));

    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect Master Security PIN' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Security PIN verified successfully',
    });
  } catch (error) {
    console.error('PIN verification error:', error);
    return NextResponse.json({ error: 'Failed to verify PIN' }, { status: 500 });
  }
}

