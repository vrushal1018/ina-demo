import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession } from '@/lib/auth';
import { revokeDeviceSession } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only Super Admin can revoke sessions
  if (session.role !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only super administrators can revoke devices.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { logId, ip, sid } = body;

    if (!logId) {
      return NextResponse.json({ error: 'Log ID is required' }, { status: 400 });
    }

    const success = await revokeDeviceSession(logId, ip, sid);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to revoke device session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Device disconnected and access revoked successfully',
    });
  } catch (error) {
    console.error('Revoke session error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke session' },
      { status: 500 }
    );
  }
}

