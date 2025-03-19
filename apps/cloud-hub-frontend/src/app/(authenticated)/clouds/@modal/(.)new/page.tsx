'use client';

import { CreateCloudForm } from '@/components/forms/create-cloud-form';
import { Dialog, DialogTitle, DialogContent } from '@repo/ui/components/dialog';
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from 'radix-ui';

export default function NewCloudModal() {
  const router = useRouter();

  function handleOnOpenChange(open: boolean) {
    if (!open) {
      router.push('/clouds');
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOnOpenChange}>
      <DialogContent>
        {/* Title is needed to be accessible for screen readers, 
            but we hide it visually as there is a title provided with the form component */}
        <VisuallyHidden.Root>
          <DialogTitle>Create new cloud</DialogTitle>
        </VisuallyHidden.Root>
        <CreateCloudForm />
      </DialogContent>
    </Dialog>
  );
}
