import { NextRequest, NextResponse } from 'next/server';
import { getRequestAdminSession } from '@/lib/auth';
import {
  getAllJobsAsync,
  addJobAsync,
  updateJobAsync,
  deleteJobAsync,
  JobDetails,
} from '@/data/jobs';

export async function GET(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = await getAllJobsAsync();
  return NextResponse.json({
    success: true,
    jobs,
    stats: {
      total: jobs.length,
      active: jobs.filter((j) => j.isActive !== false).length,
      inactive: jobs.filter((j) => j.isActive === false).length,
    },
  });
}

export async function POST(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      department,
      location,
      type,
      experience,
      tags,
      description,
      responsibilities,
      qualifications,
      isActive,
    } = body;

    if (!title?.trim() || !department?.trim() || !location?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: 'Title, Department, Location, and Description are required.' },
        { status: 400 }
      );
    }

    const currentJobs = await getAllJobsAsync();
    const nextId = currentJobs.reduce((max, j) => (j.id > max ? j.id : max), 0) + 1;

    // Normalize tags
    const normalizedTags: string[] = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === 'string'
      ? tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // Normalize responsibilities
    const normalizedResponsibilities: string[] = Array.isArray(responsibilities)
      ? responsibilities.map((r) => String(r).trim()).filter(Boolean)
      : typeof responsibilities === 'string'
      ? responsibilities
          .split('\n')
          .map((r) => r.trim())
          .filter(Boolean)
      : [];

    // Normalize qualifications
    const normalizedQualifications: string[] = Array.isArray(qualifications)
      ? qualifications.map((q) => String(q).trim()).filter(Boolean)
      : typeof qualifications === 'string'
      ? qualifications
          .split('\n')
          .map((q) => q.trim())
          .filter(Boolean)
      : [];

    const newJob: JobDetails = {
      id: nextId,
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: (type || 'Full-Time').trim(),
      experience: (experience || 'Not Specified').trim(),
      tags: normalizedTags.length > 0 ? normalizedTags : ['Full-Time'],
      description: description.trim(),
      responsibilities: normalizedResponsibilities,
      qualifications: normalizedQualifications,
      isActive: isActive !== false,
      createdAt: new Date().toISOString(),
    };

    const saved = await addJobAsync(newJob);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save job to persistent storage.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job posted successfully',
      job: newJob,
    });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json(
      { error: 'Failed to process request to create job.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const currentJobs = await getAllJobsAsync();
    const existingJob = currentJobs.find((j) => j.id === Number(id));

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Normalize tags if provided
    let normalizedTags = existingJob.tags;
    if (body.tags !== undefined) {
      normalizedTags = Array.isArray(body.tags)
        ? body.tags.map((t: string) => String(t).trim()).filter(Boolean)
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];
    }

    // Normalize responsibilities if provided
    let normalizedResponsibilities = existingJob.responsibilities;
    if (body.responsibilities !== undefined) {
      normalizedResponsibilities = Array.isArray(body.responsibilities)
        ? body.responsibilities.map((r: string) => String(r).trim()).filter(Boolean)
        : typeof body.responsibilities === 'string'
        ? body.responsibilities.split('\n').map((r: string) => r.trim()).filter(Boolean)
        : [];
    }

    // Normalize qualifications if provided
    let normalizedQualifications = existingJob.qualifications;
    if (body.qualifications !== undefined) {
      normalizedQualifications = Array.isArray(body.qualifications)
        ? body.qualifications.map((q: string) => String(q).trim()).filter(Boolean)
        : typeof body.qualifications === 'string'
        ? body.qualifications.split('\n').map((q: string) => q.trim()).filter(Boolean)
        : [];
    }

    const updates: Partial<JobDetails> = {
      title: body.title !== undefined ? String(body.title).trim() : existingJob.title,
      department: body.department !== undefined ? String(body.department).trim() : existingJob.department,
      location: body.location !== undefined ? String(body.location).trim() : existingJob.location,
      type: body.type !== undefined ? String(body.type).trim() : existingJob.type,
      experience: body.experience !== undefined ? String(body.experience).trim() : existingJob.experience,
      tags: normalizedTags,
      description: body.description !== undefined ? String(body.description).trim() : existingJob.description,
      responsibilities: normalizedResponsibilities,
      qualifications: normalizedQualifications,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : existingJob.isActive,
    };

    const updated = await updateJobAsync(Number(id), updates);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update job in storage.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job updated successfully',
      job: updated,
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to process request to update job.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = getRequestAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await req.json().catch(() => null);
      if (body && body.id) {
        id = String(body.id);
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const numId = Number(id);
    const success = await deleteJobAsync(numId);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
      deletedId: numId,
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to process request to delete job.' },
      { status: 500 }
    );
  }
}
