import { NextResponse } from 'next/server';
import {
  authenticateWithSupabase,
  signAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth/admin-session';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await authenticateWithSupabase(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. Access denied.' },
        { status: 401 }
      );
    }

    const token = await signAdminToken(user);

    const response = NextResponse.json({
      success: true,
      user,
      message: `Welcome back, ${user.name}`,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('[AdminLogin] Error:', err);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
