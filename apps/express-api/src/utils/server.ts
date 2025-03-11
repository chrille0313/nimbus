import express from 'express';
import jsend from 'jsend';
import config from '@/config';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise, Controllers } from 'swagger-routes-express';
import { createErrorMiddleware } from '@/middleware/errorHandling';
import { consoleLogs } from '@/middleware/logging';
import { fileLogs } from '@/middleware/logging';
import { auth } from '@/lib/auth';
import { toNodeHandler } from 'better-auth/node';
import { authMiddleware } from '@/middleware/auth';
import { apiReference } from '@scalar/express-api-reference';
import { APISpec } from '@repo/openapi-spec';
import { betterAuthErrorAdapter } from '../middleware/errorAdapters/better-auth';
import { eoaValidatorErrorAdapter } from '../middleware/errorAdapters/express-openapi-validator';
import { nativeErrorAdapter } from '../middleware/errorAdapters/native';

export async function createServer(
  controllers: Controllers,
  openAPISpec: APISpec
): Promise<Express> {
  console.log(summarise(openAPISpec));

  const server = express();

  // Add logging
  if (config.logToConsole) server.use(consoleLogs('dev'));
  if (config.logToFile) server.use(fileLogs(config.logFilePath));

  // Add jsend response formatting
  server.use(jsend.middleware);

  // Add auth handling (needs to be before express.json() middleware)
  server.all('/api/v1/auth/*splat', toNodeHandler(auth));

  // Serve API documentation
  server.use(
    '/api/v1/reference',
    apiReference({
      spec: {
        url: '/api/v1/specification'
      },
      darkMode: true,
      theme: 'deepSpace'
    })
  );

  // Specify what type of request bodies the server can parse
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(express.text());

  // Add auth middleware
  server.use(authMiddleware);

  // Add request and response validation from the OpenAPI specification
  server.use(
    OpenApiValidator.middleware({
      apiSpec: openAPISpec as any, // FIXME: Don't use any
      validateRequests: {
        removeAdditional: 'all'
      },
      validateResponses: {
        // removeAdditional: 'all'
      },
      validateApiSpec: true
    })
  );

  // Autowire the controllers to the url paths in the OpenAPI specification - uses operationId
  const connect = connector(controllers, openAPISpec, {
    onCreateRoute: (method: string, descriptor) => {
      console.log(`${method}: ${descriptor[0]} - ${descriptor[1].name}`);
    }
  });

  connect(server);

  // Add error handlers
  server.use(
    createErrorMiddleware(betterAuthErrorAdapter, eoaValidatorErrorAdapter, nativeErrorAdapter)
  );

  return server;
}
