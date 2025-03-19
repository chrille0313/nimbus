import { CreateCloudForm } from '@/components/forms/create-cloud-form';
import { EmailField } from '@/components/forms/email-field';
import { PasswordField } from '@/components/forms/password-field';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Form } from 'react-hook-form';
import Image from 'next/image';
import LoginSideImage from '@public/images/space-sky.jpg';

export default function NewCloudPage() {
  return (
    <div className="h-full flex items-center justify-center p-6 md:p-10">
      <Card className="shadow-xl">
        <CardContent>
          <CreateCloudForm />
        </CardContent>
      </Card>
    </div>
  );
}
