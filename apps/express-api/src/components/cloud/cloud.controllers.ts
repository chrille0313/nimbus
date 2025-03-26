import * as express from 'express';
import { NotFoundError } from '@/types/errors';
import { CloudService } from './cloud.service';
import { CloudRequestDTOFactory, CloudResponseDTOFactory } from './cloud.dto';

export function createCloudControllers(
  cloudService: CloudService,
  requestDtoFactory: CloudRequestDTOFactory,
  responseDtoFactory: CloudResponseDTOFactory
) {
  return {
    getClouds: async (req: express.Request, res: express.Response) => {
      const authenticatedUser = req.context.user;
      const clouds = await cloudService.getOwnedClouds(authenticatedUser.id);

      const response = clouds.map((cloud) => responseDtoFactory.from(cloud));
      res.jsend.success(response);
    },

    getCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = requestDtoFactory.get(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(requestDTO.id, requestDTO.requestingUserId);

      if (!cloud) {
        throw new NotFoundError();
      }

      const response = responseDtoFactory.from(cloud);
      res.jsend.success(response);
    },

    createCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = requestDtoFactory.create(req);
      const { requestingUserId, ...rest } = requestDTO;

      const createdCloud = await cloudService.createCloud(rest, requestingUserId);

      const response = responseDtoFactory.from(createdCloud);
      res.status(201).jsend.success(response);
    },

    updateCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = requestDtoFactory.update(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const cloud = await cloudService.getCloudById(requestDTO.id, requestDTO.requestingUserId);

      if (!cloud) {
        throw new NotFoundError();
      }

      const { requestingUserId, id, ...rest } = requestDTO;
      const updatedCloud = await cloudService.updateCloudById({ id, ...rest }, requestingUserId);

      const response = responseDtoFactory.from(updatedCloud);

      res.jsend.success(response);
    },

    deleteCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = requestDtoFactory.delete(req);

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
      const requestDTO = requestDtoFactory.getFiles(req);

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
      const requestDTO = requestDtoFactory.uploadFiles(req);

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
