import { CloudService } from '../src/components/cloud/cloud.service';
import { CloudDTOFactory } from '../src/components/cloud/cloud.dto';
import { NotFoundError } from '../src/types/errors';
import { createCloudControllers } from '../src/components/cloud/cloud.controllers';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

// Mock dependencies
vi.mock('../src/components/cloud/cloud.service');
vi.mock('../src/components/cloud/cloud.dto');

describe('Cloud Controllers', () => {
    //Define functions to be mocked
    const mockCloudService = {
    getOwnedClouds: vi.fn(),
    getCloudById: vi.fn(),
    getSharedClouds: vi.fn(),
    createCloud: vi.fn(),
    updateCloudById: vi.fn(),
    deleteCloudById: vi.fn()
  };
  const mockDTOFactory = {
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  };

  let req: Request;
  let res: Response;
  // Inject mock dependencies into the controller
  const cloudController = createCloudControllers(mockCloudService, mockDTOFactory);
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
      req = {
        context: { user: { id: '1' } } 
      } as unknown as Request;

      mockCloudService.getOwnedClouds.mockResolvedValue(mockClouds);

      await cloudController.getClouds(req, res);

      expect(mockCloudService.getOwnedClouds).toHaveBeenCalledWith('1');
      expect(res.jsend.success).toHaveBeenCalledWith(mockClouds);
    });
  });

  describe('getCloud', () => {
    it('should return a cloud when found', async () => {
      const mockCloud = { id: '1', name: 'Test Cloud' };
      mockDTOFactory.get.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(mockCloud);

      await cloudController.getCloud(req, res);

      expect(mockCloudService.getCloudById).toHaveBeenCalledWith('1', '1');
      expect(res.jsend.success).toHaveBeenCalledWith(mockCloud);
    });

    it('should throw NotFoundError when cloud id is missing', async () => {
      mockDTOFactory.get.mockReturnValue({});

      await expect(cloudController.getCloud(req, res)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when cloud is not found', async () => {
      mockDTOFactory.get.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(null);

      await expect(cloudController.getCloud(req, res)).rejects.toThrow(NotFoundError);
    });
  });

  describe('createCloud', () => {
    it('should create and return a new cloud', async () => {
      const mockCloud = { id: '1', name: 'New Cloud' };
      mockDTOFactory.create.mockReturnValue({ name: 'New Cloud' });
      mockCloudService.createCloud.mockResolvedValue(mockCloud);

      await cloudController.createCloud(req, res);

      expect(mockCloudService.createCloud).toHaveBeenCalledWith({ name: 'New Cloud' }, '1');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.jsend.success).toHaveBeenCalledWith(mockCloud);
    });
  });

  describe('updateCloud', () => {
    it('should update and return the cloud', async () => {
      const mockCloud = { id: '1', name: 'Updated Cloud' };
      mockDTOFactory.update.mockReturnValue({ id: '1', name: 'Updated Cloud' });
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
      mockDTOFactory.update.mockReturnValue({});

      await expect(cloudController.updateCloud(req, res)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when cloud is not found', async () => {
      mockDTOFactory.update.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(null);

      await expect(cloudController.updateCloud(req, res)).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteCloud', () => {
    it('should delete the cloud and return success', async () => {
      const mockCloud = { id: '1', name: 'Test Cloud' };
      mockDTOFactory.delete.mockReturnValue({ id: '1' });
      mockCloudService.getCloudById.mockResolvedValue(mockCloud);
    });
  });
});
