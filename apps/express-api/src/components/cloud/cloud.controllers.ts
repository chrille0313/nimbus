import * as express from 'express';
import { NotFoundError } from '@/types/errors';
import { CloudService } from './cloud.service';
import { CloudDTOFactory } from './cloud.dto';

const cloudService = new CloudService();
const dtoFactory = new CloudDTOFactory();

export async function getClouds(req: express.Request, res: express.Response) {
  const authenticatedUser = req.context.user;
  const clouds = await cloudService.getOwnedClouds(authenticatedUser.id);
  res.jsend.success(clouds);
}

export async function getCloud(req: express.Request, res: express.Response) {
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
}

export async function createCloud(req: express.Request, res: express.Response) {
  const requestDTO = dtoFactory.create(req);
  const authenticatedUser = req.context.user;
  const createdCloud = await cloudService.createCloud(requestDTO, authenticatedUser.id);
  res.status(201).jsend.success(createdCloud);
}

export async function deleteCloud(req: express.Request, res: express.Response) {
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
