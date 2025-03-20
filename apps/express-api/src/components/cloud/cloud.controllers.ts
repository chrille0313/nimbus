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

      const authenticatedUser = req.context.user;

      const cloud = await cloudService.getCloudById(requestDTO.id, authenticatedUser.id);

      if (!cloud) {
        throw new NotFoundError();
      }

      res.jsend.success(cloud);
    },

    createCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.create(req);
      const authenticatedUser = req.context.user;
      const createdCloud = await cloudService.createCloud(requestDTO, authenticatedUser.id);
      res.status(201).jsend.success(createdCloud);
    },

    updateCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.update(req);

      if (requestDTO.id === undefined) {
        throw new NotFoundError();
      }

      const authenticatedUser = req.context.user;

      const cloud = await cloudService.getCloudById(requestDTO.id, authenticatedUser.id);

      if (!cloud) {
        throw new NotFoundError();
      }

      const updatedCloud = await cloudService.updateCloudById(
        { ...requestDTO, id: requestDTO.id },
        authenticatedUser.id
      );

      res.jsend.success(updatedCloud);
    },

    deleteCloud: async (req: express.Request, res: express.Response) => {
      const requestDTO = dtoFactory.delete(req);

      if (!requestDTO.id) {
        throw new NotFoundError();
      }

      const authenticatedUser = req.context.user;

      const cloud = await cloudService.getCloudById(requestDTO.id, authenticatedUser.id);

      if (!cloud) {
        throw new NotFoundError();
      }

      await cloudService.deleteCloudById(requestDTO.id, authenticatedUser.id);

      res.jsend.success(null!);
    }
  };
}