import * as express from 'express';
import { NotFoundError } from '@/types/errors';
import { CloudService } from './cloud.service';
import { CloudDTOFactory } from './cloud.dto';

export function createCloudControllers(cloudService: CloudService, dtoFactory: CloudDTOFactory) {
  return {
    getClouds: async (req: express.Request, res: express.Response) => {
      const authenticatedUser = req.context.user;
      const clouds = await cloudService.getOwnedClouds(authenticatedUser.id);
      res.jsend.success(clouds);
    },

    getCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.get(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(requestDTO.id, requestDTO.requestingUserId);

      if (!cloud) {
        throw new NotFoundError();
      }

      res.jsend.success(cloud);
    },

    createCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.create(req);
      const { requestingUserId, ...rest } = requestDTO;
      const createdCloud = await cloudService.createCloud(rest, requestingUserId);

      res.status(201).jsend.success(createdCloud);
    },

    updateCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.update(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(requestDTO.id, requestDTO.requestingUserId);

      if (!cloud) {
        throw new NotFoundError();
      }

      const { requestingUserId, id, ...rest } = requestDTO;
      const updatedCloud = await cloudService.updateCloudById({ id, ...rest }, requestingUserId);

      res.jsend.success(updatedCloud);
    },

    deleteCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.delete(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(requestDTO.id, requestDTO.requestingUserId);

      if (!cloud) {
        throw new NotFoundError();
      }

      await cloudService.deleteCloudById(requestDTO.id, requestDTO.requestingUserId);

      res.jsend.success(null!);
    },

    getCloudFiles: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.getFiles(req);

      if (!requestDTO.cloudId) {
        throw new NotFoundError();
      }

      const files = await cloudService.getFilesInCloud(
        requestDTO.cloudId,
        requestDTO.requestingUserId,
        requestDTO.path
      );

      res.jsend.success(files);
    },

    uploadFileToCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.uploadFiles(req);

      if (!requestDTO.cloudId) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(
        requestDTO.cloudId,
        requestDTO.requestingUserId
      );

      if (!cloud) {
        throw new NotFoundError();
      }

      if (!requestDTO.files || requestDTO.files.length === 0) {
        throw new NotFoundError(); // FIXME: Use correct error
      }

      await cloudService.uploadFilesToCloud(
        requestDTO.cloudId,
        requestDTO.requestingUserId,
        requestDTO.rootDir,
        requestDTO.files as Express.Multer.File[] // The middleware ensures this is an array
      );

      res.jsend.success({});
    }
  };
}
