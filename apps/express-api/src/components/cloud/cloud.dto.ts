import { Request } from 'express';

export class CloudDTOFactory {
  get(req: Request) {
    return {
      id: req.params.id,
      requestingUserId: req.context.user.id
    };
  }

  create(req: Request) {
    return {
      name: req.body.name,
      allocatedStorage: req.body.allocatedStorage,
      requestingUserId: req.context.user.id
    };
  }

  update(req: Request) {
    return {
      id: req.params.id,
      name: req.body.name,
      image: req.body.image,
      allocatedStorage: req.body.allocatedStorage,
      requestingUserId: req.context.user.id
    };
  }

  delete(req: Request) {
    return {
      id: req.params.id,
      requestingUserId: req.context.user.id
    };
  }

  getFiles(req: Request) {
    return {
      cloudId: req.params.id,
      path: req.params.path ?? '',
      requestingUserId: req.context.user.id
    };
  }

  uploadFiles(req: Request) {
    return {
      cloudId: req.params.id,
      rootDir: req.params.path ?? '',
      files: req.files,
      requestingUserId: req.context.user.id
    };
  }
}
