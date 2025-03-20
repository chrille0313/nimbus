import { DefaultOpenDialog } from '@/components/default-open-dialog';
import { DeleteCloudConfirmationForm } from '@/components/forms/delete-cloud-confirmation-form';
import { DialogTitle, DialogContent } from '@repo/ui/components/dialog';

import { VisuallyHidden } from 'radix-ui';

export type NewCloudModalProps = {
  params: Promise<{ id: string }>;
};

export default async function NewCloudModal({ params }: NewCloudModalProps) {
  const { id } = await params;

  return (
    <DefaultOpenDialog>
      <DialogContent>
        {/* Title is needed to be accessible for screen readers, 
            but we hide it visually as there is a title provided with the form component */}
        <VisuallyHidden.Root>
          <DialogTitle>Delete cloud</DialogTitle>
        </VisuallyHidden.Root>
        <DeleteCloudConfirmationForm id={id} />
      </DialogContent>
    </DefaultOpenDialog>
  );
}
