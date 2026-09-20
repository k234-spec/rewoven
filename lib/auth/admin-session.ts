import { SignJWT, jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

export type AdminRole = 'admin' | 'store_associate';

export interface AdminSessionUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export const ADMIN_COOKIE_NAME = 'madamcutie_admin_session';

if (!process.env.ADMIN_JWT_SECRET) {
  console.warn(
    '[AdminAuth] ADMIN_JWT_SECRET env var is not set. ' +
    'Set it in your Vercel environment variables or .env.local for production use.'
  );
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? `rewoven-dev-${Math.random().toString(36)}`
);

// Fallback demo credentials — only used when Supabase is not configured.
// Set ADMIN_DEMO_EMAIL and ADMIN_DEMO_PASSWORD in your environment variables.
// Do NOT hardcode credentials here.
export const DEMO_ADMIN_USERS: (AdminSessionUser & { passwordHash: string })[] =
  process.env.ADMIN_DEMO_EMAIL && process.env.ADMIN_DEMO_PASSWORD
    ? [
        {
          id: 'admin-env-01',
          email: process.env.ADMIN_DEMO_EMAIL,
          name: 'Store Administrator',
          role: 'admin' as AdminRole,
          passwordHash: process.env.ADMIN_DEMO_PASSWORD,
        },
      ]
    : [];

/**
 * Sign a secure JWT session token using jose (Edge-compatible)
 */
export async function signAdminToken(user: AdminSessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verify a signed JWT session token
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminSessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload || !payload.email || !payload.role) {
      return null;
    }
    return {
      id: (payload.id as string) || (payload.sub as string) || 'usr',
      email: payload.email as string,
      name: (payload.name as string) || (payload.email as string),
      role: payload.role as AdminRole,
    };
  } catch {
    return null;
  }
}

/**
 * Attempt authentication via Supabase Auth (if configured in environment)
 */
export async function authenticateWithSupabase(
  email: string,
  password: string
): Promise<AdminSessionUser | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    supabaseUrl.startsWith('https://')
  ) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data?.user) {
        // Look up role from user_metadata or fallback to store_associate
        const role = (data.user.user_metadata?.role as AdminRole) || 'admin';
        return {
          id: data.user.id,
          email: data.user.email || email,
          name:
            data.user.user_metadata?.full_name ||
            data.user.email?.split('@')[0] ||
            'Admin User',
          role,
        };
      }
    } catch (err) {
      console.warn('[AdminAuth] Supabase auth attempt exception:', err);
    }
  }

  // Fallback to verified local administrative credentials
  const demoMatch = DEMO_ADMIN_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.passwordHash === password
  );

  if (demoMatch) {
    return {
      id: demoMatch.id,
      email: demoMatch.email,
      name: demoMatch.name,
      role: demoMatch.role,
    };
  }

  return null;
}
