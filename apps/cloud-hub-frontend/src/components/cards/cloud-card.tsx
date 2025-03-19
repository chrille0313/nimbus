import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu';
import { Button } from '@repo/ui/components/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Download, EllipsisVertical, Pencil, Settings, Share, Trash } from 'lucide-react';
import { AspectRatio } from '@repo/ui/components/aspect-ratio';
import PlaceholderImage from '@public/images/placeholder.svg';
import { formatNumber } from '@/utils';

export interface CloudCardProps {
  id: string;
  name: string;
  image?: string;
  usedSize: number;
  allocatedSize: number;
}

export function CloudCard(props: CloudCardProps) {
  return (
    <Link href={`/clouds/${props.id}`}>
      <Card className="pt-0 overflow-hidden hover:shadow-xl transition-all ease-in-out duration-250">
        <AspectRatio ratio={2} className="relative">
          <Image
            src={props.image ?? PlaceholderImage}
            alt="Cloud Image"
            className="object-cover"
            fill
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>
            {`${formatNumber(props.usedSize, 'B')} / ${formatNumber(props.allocatedSize, 'B')}`}
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Pencil />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#">
                      <Trash />
                      Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Share />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
