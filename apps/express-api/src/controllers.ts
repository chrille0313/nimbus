import { Request, Response } from 'express';
import OpenAPISpecification from '@repo/openapi-spec';

export function getSpecification(req: Request, res: Response) {
  res.json(OpenAPISpecification);
}

export * from './components/cloud/cloud.controllers';
