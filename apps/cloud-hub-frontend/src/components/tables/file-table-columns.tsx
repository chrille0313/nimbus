'use client';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { GetCloudFiles200DataItem } from '@repo/api-client';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Edit, File, Folder, Link, MoreVertical, Trash } from 'lucide-react';
import { DataTableColumnHeader } from './data-table-column-header';
import { formatNumber } from '@/utils';

export const FileTableColumns: ColumnDef<GetCloudFiles200DataItem>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const icon = row.original.type === 'directory' ? <Folder /> : <File />;
      return (
        <div className="flex gap-2">
          {icon}
          <span className="font-medium">{name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Modified" />,
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as string;
      const formattedDate = new Date(date).toLocaleDateString('sv-SE');
      return <div className="flex">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return <div className="capitalize">{type}</div>;
    }
  },
  {
    accessorKey: 'size',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Size" />,
    cell: ({ row }) => {
      const size = row.getValue('size');
      return <div>{size != undefined ? formatNumber(Number(size), 'B') : ''}</div>;
    }
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
