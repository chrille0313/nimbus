'use client';
import { Button } from '@repo/ui/components/button';
import { Loader2, LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function logout() {
    authClient.signOut({
      fetchOptions: {
        onError: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push('/auth/sign-in');
        }
      }
    });
  }

  function cancel() {
    router.back();
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <LogOut className="size-12" />
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Logging Out</h1>
      <div className="text-muted-foreground">
        <p className="">You are about to log out of your account.</p>
        <p className="">Are you sure you want to continue?</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={cancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={logout} disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          Logout
        </Button>
      </div>
    </div>
  );
}
