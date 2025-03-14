import { AppSidebar } from '@/components/navigation/app-sidebar';
import { CurrentPathBreadcrumb } from '@/components/navigation/current-path-breadcrumb';
import { Separator } from '@repo/ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@repo/ui/components/sidebar';

export type AuthenticatedLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <CurrentPathBreadcrumb />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
