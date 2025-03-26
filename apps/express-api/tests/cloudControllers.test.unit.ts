import { NotFoundError } from '../src/types/errors';
import { createCloudControllers } from '../src/components/cloud/cloud.controllers';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Request, Response } from 'express';
import { SeaweedFilerServer } from 'seaweedts/filer';
import { CloudService } from '../src/components/cloud/cloud.service';
// Mock dependencies
vi.mock('../src/components/cloud/cloud.dto');
vi.mock('../src/components/cloud/cloud.service');
vi.mock('seaweedts/filer');
describe('Cloud Controllers', () => {
  //Define functions to be mocked
  const mockCloudService = {
    getOwnedClouds: vi.fn(),
    getCloudById: vi.fn(),
    getSharedClouds: vi.fn(),
    createCloud: vi.fn(),
    updateCloudById: vi.fn(),
    deleteCloudById: vi.fn(),
    getFilesInCloud: vi.fn(),
    uploadFilesToCloud: vi.fn(),
    seaweedService: new SeaweedFilerServer()
  } as unknown as CloudService;
  const mockRequestDTOFactory = {
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getFiles: vi.fn(),
    uploadFiles: vi.fn()
  };
  const mockResponseDTOFactory = {
    from: vi.fn()
  };

  let req: Request;
  let res: Response;
  // Inject mock dependencies into the controller
  const cloudController = createCloudControllers(
    mockCloudService,
    mockRequestDTOFactory,
    mockResponseDTOFactory
  );
  beforeEach(() => {
    req = {
      context: { user: { id: '1' } }
    } as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      jsend: {
        success: vi.fn().mockReturnThis()
      }
    } as unknown as Response;
    vi.clearAllMocks();
  });

  describe('getClouds', () => {
    it('should return clouds for authenticated user', async () => {
      const mockClouds = [{ id: '1', name: 'Test Cloud' }];

      mockResponseDTOFactory.from.mockReturnValue(mockClouds[0]);
      mockCloudService.getOwnedClouds.mockResolvedValue(mockClouds);

      await cloudController.getClouds(req, res);

      expect(mockCloudService.getOwnedClouds).toHaveBeenCalledWith('1');
      expect(res.jsend.success).toHaveBeenCalledWith(mockClouds);
    });
  });

  describe('getCloud', () => {
    it('should return a cloud when found', async () => {
      const mockCloud = { id: '1', name: 'Test Cloud' };
      mockRequestDTOFactory.get.mockReturnValue({ id: '1', requestingUserId: '1' });
      mockResponseDTOFactory.from.mockReturnValue(mockCloud);
      mockCloudService.getCloudById.mockResolvedValue(mockCloud);

      await cloudController.getCloud(req, res);

      expect(mockCloudService.getCloudById).toHaveBeenCalledWith('1', '1');
      expect(res.jsend.success).toHaveBeenCalledWith(mockCloud);
    });

    it('should throw NotFoundError when cloud id is missing', async () => {
      mockRequestDTOFactory.get.mockReturnValue({});

      await expect(cloudController.getCloud(req, res)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when cloud is not found', async () => {
      mockRequestDTOFactory.get.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(null);

      await expect(cloudController.getCloud(req, res)).rejects.toThrow(NotFoundError);
    });
  });

  describe('createCloud', () => {
    it('should create and return a new cloud', async () => {
      const mockCloud = { id: '1', name: 'New Cloud' };
      mockRequestDTOFactory.create.mockReturnValue({
        name: 'New Cloud',
        allocatedStorage: BigInt(100),
        requestingUserId: '1'
      });
      mockResponseDTOFactory.from.mockReturnValue(mockCloud);
      mockCloudService.createCloud.mockResolvedValue(mockCloud);

      await cloudController.createCloud(req, res);

      expect(mockCloudService.createCloud).toHaveBeenCalledWith(
        { name: 'New Cloud', allocatedStorage: BigInt(100) },
        '1'
      );
      expect(res.status).toHaveBeenCalledWith(201);
      mockResponseDTOFactory.from.mockResolvedValue(mockCloud);
      expect(res.jsend.success).toHaveBeenCalledWith(mockCloud);
    });
  });

  describe('updateCloud', () => {
    it('should update and return the cloud', async () => {
      const mockCloud = { id: '1', name: 'Updated Cloud' };
      mockRequestDTOFactory.update.mockReturnValue({
        id: '1',
        name: 'Updated Cloud',
        requestingUserId: '1'
      });
      mockResponseDTOFactory.from.mockReturnValue(mockCloud);
      mockCloudService.getCloudById.mockResolvedValue(mockCloud);
      mockCloudService.updateCloudById.mockResolvedValue(mockCloud);

      await cloudController.updateCloud(req, res);

      expect(mockCloudService.updateCloudById).toHaveBeenCalledWith(
        { id: '1', name: 'Updated Cloud' },
        '1'
      );
      expect(res.jsend.success).toHaveBeenCalledWith(mockCloud);
    });

    it('should throw NotFoundError when cloud id is missing', async () => {
      mockRequestDTOFactory.update.mockReturnValue({});

      await expect(cloudController.updateCloud(req, res)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when cloud is not found', async () => {
      mockRequestDTOFactory.update.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(null);

      await expect(cloudController.updateCloud(req, res)).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteCloud', () => {
    it('should delete the cloud and return success', async () => {
      const mockCloud = { id: '1', name: 'Test Cloud' };
      mockRequestDTOFactory.delete.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(mockCloud);
    });
  });
});
