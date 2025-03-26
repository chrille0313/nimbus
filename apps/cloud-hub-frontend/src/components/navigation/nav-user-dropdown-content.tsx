'use client';

import { DropdownMenuContent } from '@repo/ui/components/dropdown-menu';
import { useSidebar } from '@repo/ui/components/sidebar';
import { Content as NavMenuContent } from '@radix-ui/react-dropdown-menu';

export function NavUserDropdownContent({
  children,
  ...props
}: React.ComponentProps<typeof NavMenuContent>) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={isMobile ? 'bottom' : 'right'}
      align="end"
      sideOffset={4}
      {...props}
    >
      {children}
    </DropdownMenuContent>
  );
}
