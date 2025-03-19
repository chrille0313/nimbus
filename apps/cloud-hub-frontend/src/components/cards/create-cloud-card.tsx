import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function CreateCloudCard() {
  return (
    <Button
      variant="ghost"
      className="transition-all ease-in-out duration-250 border-dashed border-2 dark:hover:bg-accent/25"
      asChild
    >
      <Card className="w-full h-full shadow-none p-0">
        <Link href="/clouds/new" className="w-full h-full flex justify-center items-center">
          <Plus className="text-border size-8" />
        </Link>
      </Card>
    </Button>
  );
}
