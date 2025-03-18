'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Discord, Facebook, Github, Google, Microsoft } from '@/components/icons';
import LoginSideImage from '@/../public/images/space-sky.jpg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@repo/ui/components/form';
import { EmailField, PasswordField } from '@/components/forms/fields';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: z.string()
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: FormSchema) {
    authClient.signIn.email(
      {
        email: values.email,
        password: values.password
      },
      {
        onRequest: () => {
          setError(null);
          setLoading(true);
        },
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setLoading(false);

          switch (ctx.error.code) {
            case 'INVALID_EMAIL_OR_PASSWORD':
              form.setError('email', {
                type: 'manual',
                message: ctx.error.message
              });
              break;
            default:
              setError(ctx.error.message ?? ctx.error.statusText);
          }
        }
      }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert variant="destructive" className="">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card className="overflow-hidden p-0 shadow-lg">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your CloudHub account
                    </p>
                  </div>
                  <EmailField control={form.control} />
                  <div className="grid gap-3">
                    <PasswordField
                      control={form.control}
                      labelSlot={
                        <Link
                          href="/auth/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    Login
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <Button variant="outline" type="button" className="w-full">
                      <Google />
                      <span className="sr-only">Login with Google</span>
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <Microsoft />
                      <span className="sr-only">Login with Microsoft</span>
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <Github />
                      <span className="sr-only">Login with Github</span>
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <Facebook />
                      <span className="sr-only">Login with Facebook</span>
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <Discord />
                      <span className="sr-only">Login with Discord</span>
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/sign-up" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
            <div className="bg-muted relative hidden md:block">
              <Image
                src={LoginSideImage}
                alt="Night sky with stars"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                priority
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{' '}
          <Link href="terms-of-service">Terms of Service</Link> and{' '}
          <Link href="privacy-policy">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
