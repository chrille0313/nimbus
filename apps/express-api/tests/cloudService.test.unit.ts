import { beforeEach, it, describe, expect, vi } from 'vitest';
import { CloudService } from '../src/components/cloud/cloud.service';
import { Cloud, User } from '@repo/database';
import prisma from '../src/lib/__mocks__/prisma';

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
const testCloudShared: Cloud & { owner: User; sharedWith: User[] } = {
  id: '2',
  name: 'Example Cloud',
  image: 'https://example.com/cloud-image.png',
  ownerId: '2',
  allocatedStorage: BigInt(100),
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: testUser,
  sharedWith: [testUser]
};
const testCloudOwner: Cloud & { owner: User; sharedWith: User[] } = {
  id: '1',
  name: 'Example Cloud',
  image: 'https://example.com/cloud-image.png',
  ownerId: '1',
  allocatedStorage: BigInt(100),
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: testUser,
  sharedWith: []
};

// ~~~~~~~~~~~~~~~~~~~~ //
// ~    Unit Tests    ~ //
// ~~~~~~~~~~~~~~~~~~~~ //
vi.mock('seaweedts/filer');
vi.mock('../src/lib/prisma');
const cloudService = new CloudService();
describe('cloud.service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getClouds', () => {
    it('getClouds should return users clouds ', async () => {
      // Arrange
      prisma.cloud.findMany.mockResolvedValue([testCloudOwner]);
      // Act
      const clouds = await cloudService.getOwnedClouds('1');
      // Assert
      expect(prisma.cloud.findMany).toHaveBeenCalledWith({
        where: { ownerId: '1' },
        include: { owner: true, sharedWith: true }
      });
      expect(clouds).toEqual([testCloudOwner]);
    });
  });
  describe('getSharedClouds', () => {
    it('getSharedClouds should return the shared clouds to the user', async () => {
      prisma.cloud.findMany.mockResolvedValue([testCloudShared]);

      const sharedClouds = await cloudService.getSharedClouds('1');

      expect(prisma.cloud.findMany).toHaveBeenCalledWith({
        where: {
          sharedWith: {
            some: {
              id: '1'
            }
          }
        },
        include: { owner: true, sharedWith: true }
      });
      expect(sharedClouds).toEqual([testCloudShared]);
    });
  });

  describe('createCloud', () => {
    it('createCloud should create a cloud', async () => {
      prisma.cloud.create.mockResolvedValue(testCloudOwner);

      const createdCloud = await cloudService.createCloud(
        {
          name: 'Example Cloud',
          allocatedStorage: BigInt(100)
        },
        '1'
      );

      expect(prisma.cloud.create).toHaveBeenCalledWith({
        data: {
          name: 'Example Cloud',
          allocatedStorage: BigInt(100),
          ownerId: '1'
        },
        include: { owner: true, sharedWith: true }
      });
      expect(createdCloud).toEqual(testCloudOwner);
    });
  });

  describe('getCloud', () => {
    it('should return a single cloud by id', async () => {
      prisma.cloud.findFirst.mockResolvedValue(testCloudOwner);

      const cloud = await cloudService.getCloudById('1', '1');

      expect(prisma.cloud.findFirst).toHaveBeenCalledWith({
        where: {
          id: '1',
          OR: [
            {
              ownerId: '1'
            },
            {
              sharedWith: {
                some: {
                  id: '1'
                }
              }
            }
          ]
        },
        include: {
          owner: true,
          sharedWith: true
        }
      });
      expect(cloud).toEqual(testCloudOwner);
    });
  });

  describe('updateCloudById', () => {
    it('should update a cloud successfully', async () => {
      const updatedCloud = { ...testCloudOwner, name: 'Updated Cloud' };
      prisma.cloud.update.mockResolvedValue(updatedCloud);

      const result = await cloudService.updateCloudById(
        { id: '1', name: 'Updated Cloud', image: '', allocatedStorage: BigInt(200) },
        '1'
      );

      expect(prisma.cloud.update).toHaveBeenCalledWith({
        where: { id: '1', ownerId: '1' },
        data: { name: 'Updated Cloud', image: '', allocatedStorage: BigInt(200) },
        include: { owner: true, sharedWith: true }
      });
      expect(result).toEqual(updatedCloud);
    });
  });

  describe('deleteCloudById', () => {
    it('should delete a cloud successfully', async () => {
      prisma.cloud.delete.mockResolvedValue(undefined);

      await cloudService.deleteCloudById('1', '1');

      expect(prisma.cloud.delete).toHaveBeenCalledWith({
        where: { id: '1', ownerId: '1' }
      });
    });
  });
});
