import { CloudService } from '../src/components/cloud/cloud.service';
import { test, describe, expect, vi } from 'vitest';
import { Cloud, User } from '@repo/database';
import prisma from '../src/lib/__mocks__/prisma';
// import axios from 'axios';

// ~~~~~~~~~~~~~~~~~~~~ //
// ~    Test data     ~ //
// ~~~~~~~~~~~~~~~~~~~~ //

const testUser: User = {
  name: 'testUser',
  id: '1',
  email: 'test@user.se',
  emailVerified: true,
  image: 'https://example.com/test-user-image.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  username: 'testUser',
  displayUsername: 'testUser'
};
const testCloud: Cloud = {
  id: '1',
  name: 'Example Cloud',
  image: 'https://example.com/cloud-image.png',
  ownerId: '1',
  allocatedStorage: 100,
  createdAt: new Date(),
  updatedAt: new Date()
};
const testCloudOwner: Cloud & { owner: User; sharedWith: User[] } = {
  id: '1',
  name: 'Example Cloud',
  image: 'https://example.com/cloud-image.png',
  ownerId: '1',
  allocatedStorage: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: testUser,
  sharedWith: []
};
const cloudService = new CloudService(prisma);
// ~~~~~~~~~~~~~~~~~~~~ //
// ~    Unit Tests    ~ //
// ~~~~~~~~~~~~~~~~~~~~ //

vi.mock('../src/lib/prisma');

test('getClouds should return users clouds ', async () => {
  prisma.cloud.findMany.mockResolvedValue([testCloudOwner]);

  const clouds = await cloudService.getOwnedClouds(testUser.id);
  console.log(testCloudOwner);
  console.log('/%¤(/"#("%/#"¤/(#(#"/#"¤#"(/))))) ', clouds);
  expect(testCloudOwner).toMatchObject(clouds);
});

/*
 * getClouds
 * createCloud
 * getCloud
 * deleteCloud
 */
