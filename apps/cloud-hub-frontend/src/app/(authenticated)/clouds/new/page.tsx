import { CreateCloudForm } from '@/components/forms/create-cloud-form';
import { Card, CardContent } from '@repo/ui/components/card';

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
