import { CloudCard } from '@/components/cards/cloud-card';
import { CreateCloudCard } from '@/components/cards/create-cloud-card';
import { requireSession } from '@/lib/utils';
import { SidebarProvider } from '@repo/ui/components/sidebar';

export default async function CloudsPage() {
  await requireSession();

  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CreateCloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
          <CloudCard />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarProvider>
  );
}
