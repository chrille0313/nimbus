'server-only';
import { headers } from 'next/headers';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

export async function getSessionServerSide() {
  return (
    await authClient.getSession({
      fetchOptions: {
        headers: await headers()
      }
    })
  ).data;
}

export async function requireSession(redirectUrl = '/auth/sign-in') {
  const session = await getSessionServerSide();

  if (!session) {
    redirect(redirectUrl);
  }

  return session;
}

export async function getAuthenticatedUserServerSide() {
  return (await getSessionServerSide())?.user;
}

export async function requireAuthenticatedUser(redirectUrl = '/auth/sign-in') {
  const user = await getAuthenticatedUserServerSide();

  if (!user) {
    redirect(redirectUrl);
  }

  return user;
}

export async function requireUnAuthenticatedUser(redirectUrl = '/dashboard') {
  const user = await getAuthenticatedUserServerSide();

  if (user) {
    redirect(redirectUrl);
  }
}
