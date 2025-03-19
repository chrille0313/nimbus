import { CloudCard } from '@/components/cards/cloud-card';
import { CreateCloudCard } from '@/components/cards/create-cloud-card';
import { requireSession } from '@/lib/utils';
import { SidebarProvider } from '@repo/ui/components/sidebar';

export default async function CloudsPage() {
  await requireSession();

  const clouds = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    name: 'Cloud Name',
    image: undefined,
    usedSize: 94800000,
    allocatedSize: 12000000000
  }));

  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CreateCloudCard />
          {clouds.map((data) => (
            <CloudCard key={data.id} {...data} />
          ))}
        </div>
      </div>
    </SidebarProvider>
  );
}
