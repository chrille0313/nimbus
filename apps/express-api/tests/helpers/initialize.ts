import { CloudService } from '../../src/components/cloud/cloud.service';
import { auth } from '@/lib/auth';
import prisma from '@repo/database';

export default async function Initialize() {
  // Sign up a user
  const userWithClouds = await auth.api.signUpEmail({
    body: {
      name: 'testUser',
      username: 'testUsername',
      email: 'test@user.com',
      password: 'testUser'
    }
  });

  const otherUserWithClouds = await auth.api.signUpEmail({
    body: {
      name: 'testUser3',
      username: 'testUsername3',
      email: 'test@user3.com',
      password: 'testUser3'
    }
  });

  const userWithoutClouds = await auth.api.signUpEmail({
    body: {
      name: 'testUser2',
      username: 'testUsername2',
      email: 'test@user2.com',
      password: 'testUser2'
    }
  });

  // Create cloud for the user
  const cloudService = new CloudService(prisma);
  await cloudService.createCloud(
    {
      name: 'cloud',
      allocatedStorage: 5
    },
    userWithClouds.user.id
  );
  await cloudService.createCloud(
    {
      name: 'cloud',
      allocatedStorage: 5
    },
    otherUserWithClouds.user.id
  );
}
