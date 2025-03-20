'use client';
import { Button } from '@repo/ui/components/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface ConfirmationButtonsProps {
  confirm: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText?: string;
}

export function ConfirmationButtons({
  confirm,
  onCancel,
  confirmText,
  cancelText = 'Cancel'
}: ConfirmationButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    setLoading(true);
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
    setLoading(false);
  }

  function handleConfirm() {
    setLoading(true);
    confirm();
    setLoading(false);
  }

  return (
    <>
      <Button variant="outline" onClick={handleCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
        {loading && <Loader2 className="animate-spin" />}
        {confirmText}
      </Button>
    </>
  );
}
