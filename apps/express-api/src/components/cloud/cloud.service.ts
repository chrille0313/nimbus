import { Cloud, User, PrismaClient } from '@repo/database';

export class CloudService {
  constructor(private persistance: PrismaClient) {}

  async getOwnedClouds(
    requestingUserId: string
  ): Promise<(Cloud & { owner: User; sharedWith: User[] })[]> {
    return this.persistance.cloud.findMany({
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
    return this.persistance.cloud.findMany({
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
    return this.persistance.cloud.findFirst({
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
    return this.persistance.cloud.create({
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

  async updateCloudById(
    cloudData: Pick<Cloud, 'id' | 'name' | 'image' | 'allocatedStorage'>,
    requestingUserId: string
  ): Promise<Cloud> {
    const { id, ...data } = cloudData;

    return this.persistance.cloud.update({
      where: {
        id,
        ownerId: requestingUserId
      },
      data,
      include: {
        owner: true,
        sharedWith: true
      }
    });
  }

  async deleteCloudById(cloudId: string, requestingUserId: string): Promise<void> {
    await this.persistance.cloud.delete({
      where: {
        id: cloudId,
        ownerId: requestingUserId
      }
    });
  }
}
