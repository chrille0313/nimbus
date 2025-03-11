import * as express from 'express';
import { CloudService } from './cloud.service';

const cloudService = new CloudService();

export async function getClouds(req: express.Request, res: express.Response) {
  const authenticatedUser = req.context.user;
  const clouds = await cloudService.getOwnedClouds(authenticatedUser.id);
  res.jsend.success(clouds);
}

export async function createCloud(req: express.Request, res: express.Response) {
  const requestDTO = {
    name: req.body.name,
    allocatedStorage: req.body.allocatedStorage
  };
  const authenticatedUser = req.context.user;
  const createdCloud = await cloudService.createCloud(requestDTO, authenticatedUser.id);
  res.status(201).jsend.success(createdCloud);
}

export async function getCloud(req: express.Request, res: express.Response) {
  const requestDTO = { id: req.params.id };

  if (!requestDTO.id) {
    throw new Error('Not Found');
  }

  const authenticatedUser = req.context.user;

  const cloud = await cloudService.getCloudById(requestDTO.id, authenticatedUser.id);

  if (!cloud) {
    throw new Error('Not Found'); // FIXME: handle properly
  }

  res.jsend.success(cloud);
}

export async function deleteCloud(req: express.Request, res: express.Response) {
  const requestDTO = { id: req.params.id };

  if (!requestDTO.id) {
    throw new Error('Not Found'); // FIXME: handle properly
  }

  const authenticatedUser = req.context.user;

  const cloud = await cloudService.getCloudById(requestDTO.id, authenticatedUser.id);

  if (!cloud) {
    throw new Error('Not Found'); // FIXME: handle properly
  }

  await cloudService.deleteCloudById(requestDTO.id, authenticatedUser.id);

  res.jsend.success(null!);
}
