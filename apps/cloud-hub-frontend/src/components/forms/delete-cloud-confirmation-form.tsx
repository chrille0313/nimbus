import { TypographyInlineCode } from '@/components/typography/inline-code';
import { ConfirmationButtons } from '@/components/forms/confirmation-buttons';
import { TriangleAlert } from 'lucide-react';
import * as API from '@repo/api-client';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';

export type DeleteCloudConfirmationFormProps = {
  id: string;
};

export async function DeleteCloudConfirmationForm({ id }: DeleteCloudConfirmationFormProps) {
  const response = await API.getCloud(id, {
    headers: await headers()
  });

  const cloud = response.data.data;

  if (!cloud) {
    return notFound();
  }

  async function handleConfirm() {
    'use server';
    await API.deleteCloud(id, {
      headers: await headers()
    });
    redirect('/clouds');
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <TriangleAlert className="size-12" />
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Are you sure?</h1>
      <div className="text-muted-foreground">
        <p>
          Do you really want to delete <TypographyInlineCode>{cloud.name}</TypographyInlineCode>?
        </p>
        <p>
          This action <span className="font-bold uppercase">cannot</span> be undone.
        </p>
      </div>
      <div className="flex gap-2">
        <ConfirmationButtons confirm={handleConfirm} confirmText="Delete" />
      </div>
    </div>
  );
}
