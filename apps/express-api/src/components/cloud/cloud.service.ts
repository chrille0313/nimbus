import prisma from '@repo/db';
import { Cloud, User } from '@prisma/client';

export class CloudService {
  async getOwnedClouds(
    requestingUserId: string
  ): Promise<(Cloud & { owner: User; sharedWith: User[] })[]> {
    return prisma.cloud.findMany({
      where: {
        ownerId: requestingUserId
      },
      include: {
        owner: true,
        sharedWith: true
      }
    });
  }

  async getSharedClouds(
    requestingUserId: string
  ): Promise<(Cloud & { owner: User; sharedWith: User[] })[]> {
    return prisma.cloud.findMany({
      where: {
        sharedWith: {
          some: {
            id: requestingUserId
          }
        }
      },
      include: {
        owner: true,
        sharedWith: true
      }
    });
  }

  async getCloudById(cloudId: string, requestingUserId: string): Promise<Cloud | null> {
    return prisma.cloud.findFirst({
      where: {
        id: cloudId,
        OR: [
          {
            ownerId: requestingUserId
          },
          {
            sharedWith: {
              some: {
                id: requestingUserId
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
  }

  async createCloud(
    cloudData: Pick<Cloud, 'name' | 'allocatedStorage'>,
    requestingUserId: string
  ): Promise<Cloud & { owner: User; sharedWith: User[] }> {
    return prisma.cloud.create({
      data: {
        ...cloudData,
        ownerId: requestingUserId
      },
      include: {
        owner: true,
        sharedWith: true
      }
    });
  }

  async deleteCloudById(cloudId: string, requestingUserId: string): Promise<void> {
    await prisma.cloud.delete({
      where: {
        id: cloudId,
        ownerId: requestingUserId
      }
    });
  }
}
