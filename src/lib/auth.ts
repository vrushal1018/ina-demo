import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { isSessionOrIpRevoked } from '@/lib/audit';

export const ADMIN_COOKIE_NAME = 'ina_admin_session';

// 7 days token expiration
const TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function getSecretKey(): string {
  return (
    process.env.ADMIN_JWT_SECRET ||
    'inatechfm-admin-portal-secure-token-secret-2025-key-change-in-prod'
  );
}

export function getSecurityPin(): string {
  return (process.env.SECURITY_PIN || '2025').trim();
}

export function verifySecurityPin(inputPin: string): boolean {
  if (!inputPin) return false;
  const masterPin = getSecurityPin();
  return inputPin.trim() === masterPin;
}

export interface AuthVerificationResult {
  valid: boolean;
  role: 'super_admin' | 'staff' | null;
}

export function verifyAdminCredentials(inputEmail: string, inputPassword: string): AuthVerificationResult {
  if (!inputEmail || !inputPassword) {
    return { valid: false, role: null };
  }

  const normalizedInputEmail = inputEmail.trim().toLowerCase();

  // 1. Check Super Admin (Owner - Full Access including Security)
  const superAdminEmail = (process.env.ADMIN_EMAIL || 'admin@inatechfm.com').trim().toLowerCase();
  const superAdminPassword = process.env.ADMIN_PASSWORD || 'InaTechFM@2025!';

  if (normalizedInputEmail === superAdminEmail && inputPassword === superAdminPassword) {
    return { valid: true, role: 'super_admin' };
  }

  // 2. Check Staff / Job Poster (Can post jobs, CANNOT see security panel)
  const staffEmail = (process.env.STAFF_EMAIL || 'jobs@inatechfm.com').trim().toLowerCase();
  const staffPassword = process.env.STAFF_PASSWORD || 'InaJobs@2025!';

  if (normalizedInputEmail === staffEmail && inputPassword === staffPassword) {
    return { valid: true, role: 'staff' };
  }

  return { valid: false, role: null };
}

export interface AdminSession {
  email: string;
  role: 'super_admin' | 'staff';
  exp: number; // timestamp in ms
  sid?: string; // unique session id
  ip?: string; // login ip
}

/**
 * Creates a signed session token using HMAC-SHA256
 */
export function createAdminToken(
  email: string,
  role: 'super_admin' | 'staff' = 'super_admin',
  sid?: string,
  ip?: string
): string {
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    role,
    exp: Date.now() + TOKEN_MAX_AGE_SECONDS * 1000,
    sid,
    ip,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies a session token string
 */
export function verifyAdminToken(token: string): AdminSession | null {
  try {
    if (!token || !token.includes('.')) return null;

    const [payloadBase64, providedSignature] = token.split('.');
    if (!payloadBase64 || !providedSignature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', getSecretKey())
      .update(payloadBase64)
      .digest('base64url');

    const providedBuffer = Buffer.from(providedSignature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadJson) as AdminSession;

    if (!payload || !payload.exp || payload.exp <= Date.now()) {
      return null;
    }

    // Default to super_admin if older session token format
    if (!payload.role) {
      payload.role = 'super_admin';
    }

    // Check if session or IP was revoked
    if (isSessionOrIpRevoked(payload.sid, payload.ip)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the session token from Next.js server context or cookies
 */
export async function getServerAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies session token from NextRequest
 */
export function getRequestAdminSession(req: NextRequest): AdminSession | null {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
