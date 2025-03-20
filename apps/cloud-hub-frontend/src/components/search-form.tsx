import { Search } from 'lucide-react';
import { Label } from '@repo/ui/components/label';
import { SidebarGroupContent, SidebarInput } from '@repo/ui/components/sidebar';

export interface SearchFormProps extends React.ComponentProps<'form'> {
  label?: string;
}

export function SearchForm({ label = 'Search...', ...props }: SearchFormProps) {
  return (
    <form {...props}>
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput id="search" placeholder={label} className="pl-8" />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </SidebarGroupContent>
    </form>
  );
}
