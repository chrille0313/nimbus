import { LoginForm } from '@/components/auth/login-form';
import { requireUnAuthenticatedUser } from '@/lib/utils';

export default async function SignInPage() {
  await requireUnAuthenticatedUser();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
