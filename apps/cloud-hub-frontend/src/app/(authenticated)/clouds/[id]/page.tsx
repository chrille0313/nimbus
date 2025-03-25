import { notFound } from 'next/navigation';
import * as API from '@repo/api-client';
import { headers } from 'next/headers';
import { Button } from '@repo/ui/components/button';
import { PlusCircle } from 'lucide-react';
import { Card } from '@repo/ui/components/card';
import { DataTable } from '@/components/tables/data-table';
import { FileTableColumns } from '@/components/tables/file-table-columns';

export type CloudPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CloudPage({ params }: CloudPageProps) {
  const { id } = await params;
  const response = await API.getCloud(id, {
    headers: await headers()
  });

  const cloud = response.data.data;

  if (!cloud) {
    return notFound();
  }

  const filesResponse = await API.getCloudFiles(id, {
    headers: await headers()
  });

  const cloudFiles = filesResponse.data.data;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <Card className="gap-6 p-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Files</h1>
            <p className="text-sm text-muted-foreground">Manage your files.</p>
          </div>
          <Button variant="outline" size="sm">
            <PlusCircle />
            <span>Add</span>
          </Button>
        </header>
        <div className="container mx-auto">
          <DataTable columns={FileTableColumns} data={cloudFiles} />
        </div>
      </Card>
    </div>
  );
}
