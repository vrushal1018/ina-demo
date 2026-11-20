import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getRequestAdminSession(req);

  if (!session) {
    return NextResponse.json(
      { authenticated: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
      isSuperAdmin: session.role === 'super_admin',
    },
  });
}
