import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getMongoDb, isMongoConfigured } from '@/lib/mongodb';

export interface AdminLoginLog {
  id: string;
  email: string;
  status: 'SUCCESS' | 'FAILED';
  ip: string;
  location: string;
  device: string;
  browser: string;
  os: string;
  userAgent: string;
  timestamp: string;
  reason?: string;
}

const LOGS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'admin_logs.json');

export function parseClientInfo(req: NextRequest) {
  // Extract client IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  let ip = 'Unknown IP';

  if (forwardedFor) {
    ip = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    ip = realIp.trim();
  }

  // Normalize localhost
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1 (Localhost)';
  }

  // Extract Vercel geolocation headers if available
  const city = req.headers.get('x-vercel-ip-city') || '';
  const country = req.headers.get('x-vercel-ip-country') || '';
  let location = 'Local / Unknown Location';
  if (city && country) {
    location = `${decodeURIComponent(city)}, ${country}`;
  } else if (country) {
    location = country;
  }

  const userAgent = req.headers.get('user-agent') || 'Unknown Agent';

  // Parse OS
  let os = 'Unknown OS';
  if (/windows phone/i.test(userAgent)) os = 'Windows Phone';
  else if (/win64|win32|windows/i.test(userAgent)) os = 'Windows PC';
  else if (/android/i.test(userAgent)) os = 'Android Device';
  else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'Apple iOS';
  else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';

  // Parse Browser
  let browser = 'Unknown Browser';
  if (/edg/i.test(userAgent)) browser = 'Microsoft Edge';
  else if (/opr|opera/i.test(userAgent)) browser = 'Opera';
  else if (/chrome|crios/i.test(userAgent)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(userAgent)) browser = 'Apple Safari';

  // Device label
  let deviceType = 'Desktop';
  if (/mobile|android|iphone|ipod/i.test(userAgent)) {
    deviceType = 'Mobile Phone';
  } else if (/ipad|tablet/i.test(userAgent)) {
    deviceType = 'Tablet';
  }

  const device = `${browser} on ${os} (${deviceType})`;

  return { ip, location, device, browser, os, userAgent, deviceType };
}

function getLocalLogs(): AdminLoginLog[] {
  try {
    if (fs.existsSync(LOGS_FILE_PATH)) {
      const data = fs.readFileSync(LOGS_FILE_PATH, 'utf-8');
      return JSON.parse(data) as AdminLoginLog[];
    }
  } catch (err) {
    console.error('Error reading local admin logs:', err);
  }
  return [];
}

function saveLocalLogs(logs: AdminLoginLog[]) {
  try {
    const dir = path.dirname(LOGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Keep at most 200 logs
    const trimmed = logs.slice(0, 200);
    fs.writeFileSync(LOGS_FILE_PATH, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (err) {
    // Expected on read-only serverless filesystems
  }
}

export async function logAdminLogin(entry: Omit<AdminLoginLog, 'id'>) {
  const logItem: AdminLoginLog = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  };

  // 1. Save to MongoDB Atlas if available
  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection('admin_logs').insertOne({ ...logItem } as any);
      }
    } catch (err) {
      console.error('Failed to write audit log to MongoDB Atlas:', err);
    }
  }

  // 2. Save to local fallback file if possible
  const currentLogs = getLocalLogs();
  saveLocalLogs([logItem, ...currentLogs]);
}

export async function getAdminLoginLogs(limit = 50): Promise<AdminLoginLog[]> {
  // 1. Try MongoDB Atlas first
  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb();
      if (db) {
        const logs = await db
          .collection('admin_logs')
          .find({}, { projection: { _id: 0 } })
          .sort({ timestamp: -1 })
          .limit(limit)
          .toArray();
        if (logs && logs.length > 0) {
          return logs as unknown as AdminLoginLog[];
        }
      }
    } catch (err) {
      console.error('Failed to read audit logs from MongoDB Atlas:', err);
    }
  }

  // 2. Fallback to local logs
  return getLocalLogs().slice(0, limit);
}

