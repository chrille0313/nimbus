'use client';
import { Dialog } from '@repo/ui/components/dialog';
import { useRouter } from 'next/navigation';

export type DefaultOpenDialogProps = {
  backUrl?: string;
  children: React.ReactNode;
};

export function DefaultOpenDialog({ backUrl, children }: DefaultOpenDialogProps) {
  const router = useRouter();

  function handleOnOpenChange(open: boolean) {
    if (!open) {
      if (backUrl) {
        router.push(backUrl);
      } else {
        router.back();
      }
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOnOpenChange}>
      {children}
    </Dialog>
  );
}
