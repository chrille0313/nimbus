import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@repo/ui/components/sidebar';
import { Skeleton } from '@repo/ui/components/skeleton';

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="w-full flex items-center">
            <Skeleton className="size-8 rounded-lg mr-2 group-data-[collapsible=icon]:mr-0 transition-[margin]" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4" />
              <Skeleton className="h-2" />
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
