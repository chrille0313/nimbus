import { Request, Response } from 'express';
import OpenAPISpecification from '@repo/openapi-spec';
import { createCloudControllers } from './components/cloud/cloud.controllers';
import { CloudService } from './components/cloud/cloud.service';
import { CloudRequestDTOFactory, CloudResponseDTOFactory } from './components/cloud/cloud.dto';

function getSpecification(req: Request, res: Response) {
  res.json(OpenAPISpecification);
}

export default {
  getSpecification,
  ...createCloudControllers(
    new CloudService(),
    new CloudRequestDTOFactory(),
    new CloudResponseDTOFactory()
  )
};
