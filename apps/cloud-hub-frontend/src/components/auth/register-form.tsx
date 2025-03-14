'use client';

import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/button';
import Link from 'next/link';
import { Discord, Facebook, Github, Google, Microsoft } from '@/components/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@repo/ui/components/form';
import {
  UsernameField,
  NameField,
  EmailField,
  PasswordField,
  ConfirmPasswordField
} from '@/components/forms/fields';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    email: z.string().email({
      message: 'Invalid email address.'
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your information below to get started
          </p>
        </div>
        <div className="grid gap-4">
          <NameField control={form.control} required />
          <UsernameField control={form.control} placeholder="Choose a username" required />
          <EmailField control={form.control} required />
          <PasswordField control={form.control} required />
          <ConfirmPasswordField control={form.control} required />
        </div>
        <Button type="submit">Create Account</Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Button variant="outline" type="button" className="w-full">
            <Google />
            <span className="sr-only">Sign up with Google</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Microsoft />
            <span className="sr-only">Sign up with Microsoft</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Github />
            <span className="sr-only">Sign up with Github</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Facebook />
            <span className="sr-only">Sign up with Facebook</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Discord />
            <span className="sr-only">Sign up with Discord</span>
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
