import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['^/clouds/*', '^/dashboard/*', '^/shared/*', '^/auth/sign-out/*'];
const protectedRoutesWhenAuthenticated = ['^/auth/sign-in/*', '^/auth/sign-up/*'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => new RegExp(route).test(path));
  const isAuthProtected = protectedRoutesWhenAuthenticated.some((route) =>
    new RegExp(route).test(path)
  );

  const sessionCookie = getSessionCookie(request);

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (isAuthProtected && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...protectedRoutesWhenAuthenticated]
};
