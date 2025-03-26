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
import { notFoundErrorAdapter } from '@/middleware/errorAdapters/not-found';
import '@/utils/big-int-extensions';
import cors from 'cors';

export async function createServer(
  controllers: Controllers,
  openAPISpec: APISpec
): Promise<Express> {
  console.log(summarise(openAPISpec));

  const server = express();

  // Add logging
  if (config.logToConsole) server.use(consoleLogs('dev'));
  if (config.logToFile) server.use(fileLogs(config.logFilePath));

  // Make sure json can format BigInt
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

  // Add jsend response formatting
  server.use(jsend.middleware);

  // Add CORS handling
  server.use(cors({ origin: config.trustedOrigins, credentials: true }));

  // Add auth handling (needs to be before express.json() middleware)
  server.all(`${config.apiBaseUrl}/auth/*splat`, toNodeHandler(auth));

  // Serve API documentation
  server.use(
    `${config.apiBaseUrl}/reference`,
    apiReference({
      spec: {
        url: `${config.apiBaseUrl}/specification`
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
      apiSpec: openAPISpec as any, // FIXME: Use correct type
      validateRequests: {
        // removeAdditional: 'all'
      },
      validateResponses: {
        // removeAdditional: 'all' // TODO: Remove additional in production to avoid leaking information
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
    createErrorMiddleware(
      betterAuthErrorAdapter,
      eoaValidatorErrorAdapter,
      nativeErrorAdapter,
      notFoundErrorAdapter
    )
  );

  return server;
}
