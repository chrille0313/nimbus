import { notFound } from 'next/navigation';
import * as API from '@repo/api-client';
import { headers } from 'next/headers';

export type CloudPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CloudPage({ params }: CloudPageProps) {
  const { id } = await params;
  const response = await API.getCloud(id, {
    headers: await headers()
  });

  console.log(response);

  const cloud = response.data.data;

  if (!cloud) {
    return notFound();
  }

  return <h1>{cloud.name}</h1>;
}
