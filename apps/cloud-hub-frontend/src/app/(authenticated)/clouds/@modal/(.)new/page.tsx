import { DefaultOpenDialog } from '@/components/default-open-dialog';
import { CreateCloudForm } from '@/components/forms/create-cloud-form';
import { DialogTitle, DialogContent } from '@repo/ui/components/dialog';
import { VisuallyHidden } from 'radix-ui';

export default function NewCloudModal() {
  return (
    <DefaultOpenDialog>
      <DialogContent>
        {/* Title is needed to be accessible for screen readers, 
            but we hide it visually as there is a title provided with the form component */}
        <VisuallyHidden.Root>
          <DialogTitle>Create new cloud</DialogTitle>
        </VisuallyHidden.Root>
        <CreateCloudForm />
      </DialogContent>
    </DefaultOpenDialog>
  );
}
