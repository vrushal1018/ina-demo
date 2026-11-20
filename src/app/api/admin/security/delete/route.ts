import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession } from '@/lib/auth';
import { deleteAuditLog } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only Super Admin can delete audit records
  if (session.role !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only super administrators can delete audit logs.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { logId } = body;

    if (!logId) {
      return NextResponse.json({ error: 'Log ID is required' }, { status: 400 });
    }

    const success = await deleteAuditLog(logId);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete audit record' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Audit log record removed successfully',
    });
  } catch (error) {
    console.error('Delete audit log error:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}

