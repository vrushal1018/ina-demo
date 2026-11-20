import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession, verifySecurityPin } from '@/lib/auth';
import { getAdminLoginLogs, parseClientInfo } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Strict check: Staff / other users cannot view security logs
  if (session.role === 'staff') {
    return NextResponse.json(
      { error: 'Forbidden: You do not have permission to access security audit logs.' },
      { status: 403 }
    );
  }

  // Optional extra layer: if PIN is passed via header, verify it
  const providedPin = req.headers.get('x-security-pin');
  if (providedPin && !verifySecurityPin(providedPin)) {
    return NextResponse.json(
      { error: 'Invalid Security PIN' },
      { status: 401 }
    );
  }

  try {
    const currentClient = parseClientInfo(req);
    const logs = await getAdminLoginLogs(50);

    return NextResponse.json({
      success: true,
      logs,
      currentClient,
    });
  } catch (error) {
    console.error('Error fetching admin security logs:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve security logs' },
      { status: 500 }
    );
  }
}
