import { LogoutForm } from '@/components/auth/logout-form';
import { requireAuthenticatedUser } from '@/lib/utils';

export default async function SignOutPage() {
  await requireAuthenticatedUser();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background">
      <LogoutForm />
    </div>
  );
}
