import { CloudCard } from '@/components/cards/cloud-card';
import { CreateCloudCard } from '@/components/cards/create-cloud-card';
import { requireSession } from '@/lib/utils';
import { SidebarProvider } from '@repo/ui/components/sidebar';
import * as API from '@repo/api-client';
import { headers } from 'next/headers';
import { CardGrid } from '@/components/containers/card-grid';

export default async function CloudsPage() {
  await requireSession();

  const response = await API.getClouds({
    headers: await headers()
  });

  const clouds = response.data.data;

  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <CardGrid>
          <CreateCloudCard />
          {clouds.map((data) => (
            // @ts-expect-error: The fields are not undefined here. This is a bug in orval.
            <CloudCard key={data.id} usedStorage={0} {...data} />
          ))}
        </CardGrid>
      </div>
    </SidebarProvider>
  );
}
