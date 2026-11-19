import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'ina_admin_session';

// 7 days token expiration
const TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function getSecretKey(): string {
  return (
    process.env.ADMIN_JWT_SECRET ||
    'inatechfm-admin-portal-secure-token-secret-2025-key-change-in-prod'
  );
}

export function getAdminCredentials() {
  const email = (process.env.ADMIN_EMAIL || 'admin@inatechfm.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'InaTechFM@2025!';
  return { email, password };
}

export function verifyAdminCredentials(inputEmail: string, inputPassword: string): boolean {
  const { email, password } = getAdminCredentials();
  if (!inputEmail || !inputPassword) return false;
  
  const normalizedInputEmail = inputEmail.trim().toLowerCase();
  
  // Use constant-time comparison for password where possible
  const isEmailMatch = normalizedInputEmail === email;
  const isPasswordMatch = inputPassword === password;
  
  return isEmailMatch && isPasswordMatch;
}

export interface AdminSession {
  email: string;
  role: 'admin';
  exp: number; // timestamp in ms
}

/**
 * Creates a signed session token using HMAC-SHA256
 */
export function createAdminToken(email: string): string {
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    role: 'admin',
    exp: Date.now() + TOKEN_MAX_AGE_SECONDS * 1000,
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

    // Constant-time comparison to prevent timing attacks
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

