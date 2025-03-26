import * as API from '@repo/api-client';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { DeleteCloudConfirmationForm } from '@/components/forms/delete-cloud-confirmation-form';

export type DeleteCloudPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteCloudPage({ params }: DeleteCloudPageProps) {
  const { id } = await params;

  const response = await API.getCloud(id, {
    headers: await headers()
  });

  const cloud = response.data.data;

  if (!cloud) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background">
      <DeleteCloudConfirmationForm id={id} name={cloud.name!} />
    </div>
  );
}
