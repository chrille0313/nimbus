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

export interface CloudCardProps {}

export function CloudCard(props: CloudCardProps) {
  return (
    <Card className="pt-0 overflow-hidden">
      <AspectRatio ratio={2} className="relative">
        <Image src={PlaceholderImage} alt="Cloud Image" className="object-cover" fill />
      </AspectRatio>
      <CardHeader>
        <CardTitle>Cloud</CardTitle>
        <CardDescription>8/10 GB</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical size={100} />
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
  );
}
