import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['^/clouds/*', '^/dashboard/*', '^/shared/*', '^/auth/sign-out/*'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => new RegExp(route).test(path));

  const sessionCookie = getSessionCookie(request);

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/clouds', '/dashboard', '/shared', '/auth/sign-out']
};
