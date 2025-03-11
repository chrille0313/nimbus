import { createServer } from '@/utils/server';
import { Express } from 'express-serve-static-core';
import * as api from './controllers';
import config from './config';
import OpenAPISpecification from '@repo/openapi-spec';

const PORT = config.port;

createServer(api, OpenAPISpecification)
  .then((server: Express) => {
    server.listen(PORT);
  })
  .catch((error: Error) => {
    console.error(error);
  });
