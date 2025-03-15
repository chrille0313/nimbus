import { CloudService } from '@/components/cloud/cloud.service';
import prisma from '@repo/database';
import { test, describe, expect } from '@jest/globals';
// import axios from 'axios';

// ~~~~~~~~~~~~~~~~~~~~~ //
// ~   Initialize DB   ~ //
// ~~~~~~~~~~~~~~~~~~~~~ //
/*
beforeAll(async () => {
  await prisma.user.createMany({
    data: [
      {
        name: 'verifiedUser',
        id: '2',
        email: 'verified@user.com',
        emailVerified: true,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'verifiedUsername',
        displayUsername: null
      },
      {
        name: 'unverifiedUser',
        id: '3',
        email: 'unverified@user.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'unverifiedUsername',
        displayUsername: null
      }
    ]
  });
  console.log('✨ 2 users successfully created!');

  await prisma.cloud.createMany({
    data: [
      {
        name: 'cloud',
        ownerId: '2',
        image: null,
        allocatedStorage: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  });
  console.log('✨ 1 cloud successfully created!');
});

// ~~~~~~~~~~~~~~~~~~~~~~ //
// ~      Clean DB      ~ //
// ~~~~~~~~~~~~~~~~~~~~~~ //

afterAll(async () => {
  const deleteUserDetails = prisma.user.deleteMany();
  const deleteCloudDetails = prisma.cloud.deleteMany();
  const deleteSessionDetails = prisma.session.deleteMany();
  const deleteAccountDetails = prisma.account.deleteMany();
  const deleteVerificationDetails = prisma.verification.deleteMany();

  await prisma.$transaction([
    deleteUserDetails,
    deleteCloudDetails,
    deleteSessionDetails,
    deleteAccountDetails,
    deleteVerificationDetails
  ]);

  await prisma.$disconnect();
});
*/
// ~~~~~~~~~~~~~~~~~~~~ //
// ~    Unit Tests    ~ //
// ~~~~~~~~~~~~~~~~~~~~ //

/*
 * getClouds
 * createCloud
 * getCloud
 * deleteCloud
 */

describe('Cloud Controller Unit Tests: createCloud()', () => {
  test('createCloud() with correct arguments should ', async () => {
    expect(true).toBe(true);
  });
});
