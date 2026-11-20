import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession } from '@/lib/auth';
import { getAdminLoginLogs, parseClientInfo } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

