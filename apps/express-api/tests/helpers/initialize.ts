import { CloudService } from '../../src/components/cloud/cloud.service';
import { auth } from '@/lib/auth';

export default async function Initialize() {
  // Sign up a user
  const user = await auth.api.signUpEmail({
    body: {
      name: 'testUser',
      username: 'testUsername',
      email: 'test@user.com',
      password: 'testUser'
    }
  });

  // Create cloud for the user
  const cloudService = new CloudService();
  await cloudService.createCloud(
    {
      name: 'cloud',
      allocatedStorage: 5
    },
    user.user.id
  );

  console.log('✨ 1 cloud successfully created!');
}
