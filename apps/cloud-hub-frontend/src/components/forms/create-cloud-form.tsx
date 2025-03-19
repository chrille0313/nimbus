'use client';

import { z } from 'zod';
import { useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NameField } from '@/components/forms/fields';
import { useRouter } from 'next/navigation';
import { AlertCircle, CirclePlus, Loader2 } from 'lucide-react';
import { Form } from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';
import { SelectItem } from '@repo/ui/components/select';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { SelectField } from '@/components/forms/field';
import { unformatSI } from 'format-si-prefix';
import { ImageField } from '@/components/forms/image-field';
import { NumberField } from './number-field';

const formSchema = z.object({
  name: z.string().min(2),
  allocatedStorage: z.coerce.number().min(1),
  allocatedStorageUnit: z.enum(['B', 'KB', 'MB', 'GB', 'TB']),
  image: z.string().optional()
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateCloudForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      allocatedStorage: 5,
      allocatedStorageUnit: 'GB',
      image: ''
    }
  });

  function onSubmit(values: FormSchema) {
    values.allocatedStorage = unformatSI(
      `${values.allocatedStorage}${values.allocatedStorageUnit[0]}`
    );

    console.log(values);
  }

  return (
    <div className={cn('flex flex-col gap-6 p-6 md:p-8', className)} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Create New Cloud</h1>
        <p className="text-base font-normal text-muted-foreground">
          Fill in the details of the new cloud below
        </p>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <NameField control={form.control} required />
            <ImageField control={form.control} />
            <div className="flex gap-2">
              <div className="flex-1">
                <NumberField
                  control={form.control}
                  name="allocatedStorage"
                  label="Allocated Storage"
                  required
                />
              </div>
              <SelectField control={form.control} name="allocatedStorageUnit" label="Unit" required>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="KB">KB</SelectItem>
                <SelectItem value="MB">MB</SelectItem>
                <SelectItem value="GB">GB</SelectItem>
                <SelectItem value="TB">TB</SelectItem>
              </SelectField>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              Create
              {loading ? <Loader2 className="animate-spin" /> : <CirclePlus />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
