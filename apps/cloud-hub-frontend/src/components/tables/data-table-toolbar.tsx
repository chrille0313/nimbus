import { Input } from '@repo/ui/components/input';
import { Table } from '@tanstack/react-table';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <Input
      placeholder="Search files..."
      value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
      className="h-8 w-[150px] lg:w-3xs"
    />
  );
}
