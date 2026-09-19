import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
// Retire the inherited application's administrative API. Rewoven authorizes every
// administrative operation against its own database session inside the route.
export function middleware(request:NextRequest){if(request.nextUrl.pathname.startsWith('/api/admin'))return NextResponse.json({error:'This legacy endpoint is retired.'},{status:410});return NextResponse.next()}
export const config={matcher:['/api/admin/:path*']};
