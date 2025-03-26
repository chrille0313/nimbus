import { Cloud, User } from '@repo/database';
import prisma from '@/lib/prisma';
import { SeaweedService } from './seaweed.service';

export class CloudService {
  private seaweedService = new SeaweedService();

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

  async getCloudById(
    cloudId: string,
    requestingUserId: string
  ): Promise<(Cloud & { owner: User; sharedWith: User[] }) | null> {
    const cloud = await prisma.cloud.findFirst({
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

    return cloud;
  }

  async createCloud(
    cloudData: Pick<Cloud, 'name' | 'allocatedStorage'>,
    requestingUserId: string
  ): Promise<Cloud & { owner: User; sharedWith: User[] }> {
    const createdCloud = await prisma.cloud.create({
      data: {
        ...cloudData,
        ownerId: requestingUserId
      },
      include: {
        owner: true,
        sharedWith: true
      }
    });

    await this.seaweedService.createCloud(createdCloud.ownerId, createdCloud.id);

    return createdCloud;
  }

  async updateCloudById(
    cloudData: Pick<Cloud, 'id' | 'name' | 'image' | 'allocatedStorage'>,
    requestingUserId: string
  ): Promise<Cloud & { owner: User; sharedWith: User[] }> {
    const { id, ...data } = cloudData;
    return prisma.cloud.update({
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
    await prisma.cloud.delete({
      where: {
        id: cloudId,
        ownerId: requestingUserId
      }
    });

    await this.seaweedService.deleteCloud(requestingUserId, cloudId);
  }

  async getFilesInCloud(cloudId: string, requestingUserId: string, path: string) {
    return await this.seaweedService.getFiles(requestingUserId, cloudId, path);
  }

  async uploadFilesToCloud(
    cloudId: string,
    requestingUserId: string,
    rootDir: string,
    files: Express.Multer.File[]
  ): Promise<void> {
    await this.seaweedService.uploadFilesToCloud(requestingUserId, cloudId, rootDir, files);
  }
}
