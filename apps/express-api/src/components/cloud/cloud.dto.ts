import { Request } from 'express';

export class CloudDTOFactory {
  get(req: Request) {
    return {
      id: req.params.id
    };
  }

  create(req: Request) {
    return {
      name: req.body.name,
      allocatedStorage: req.body.allocatedStorage
    };
  }

  update(req: Request) {
    return {
      id: req.params.id,
      name: req.body.name,
      image: req.body.image,
      allocatedStorage: req.body.allocatedStorage
    };
  }

  delete(req: Request) {
    return {
      id: req.params.id
    };
  }
}
