import * as React from 'react';
import { Users, Cloudy as Clouds, LayoutDashboard } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@repo/ui/components/sidebar';
import { NavStorage } from '@/components/navigation/nav-storage';
import { MenuUser } from '@/components/user/menu-user';
import { NavLogout } from '@/components/navigation/nav-logout';
import { SearchForm } from '@/components/search-form';
import { ColorModeToggle } from '@/components/color-mode-toggle';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <LayoutDashboard />,
      isActive: true
    },
    {
      title: 'My Clouds',
      url: '/clouds',
      icon: <Clouds />
    },
    {
      title: 'Shared',
      url: '/shared',
      icon: <Users />
    }
  ]
};

export type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <MenuUser />
        <div className="flex gap-2 group-data-[collapsible=icon]:hidden">
          <SearchForm />
          <ColorModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavStorage items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavLogout />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
