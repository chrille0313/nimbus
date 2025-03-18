import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@repo/ui/components/sidebar';
import { NavUserDropdownContent } from '@/components/navigation/nav-user-dropdown-content';
import { MenuUserContent } from '@/components/user/menu-user-content';
import { Suspense } from 'react';
import { MenuUserSkeleton } from '@/components/user/menu-user-skeleton';
import Link from 'next/link';

export function MenuUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Suspense fallback={<MenuUserSkeleton />}>
                <MenuUserContent />
              </Suspense>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <NavUserDropdownContent>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Suspense fallback={<MenuUserSkeleton />}>
                  <MenuUserContent />
                </Suspense>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="#">
                  <BadgeCheck />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">
                  <CreditCard />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">
                  <Bell />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="#">
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/sign-out">
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </NavUserDropdownContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
