import express from 'express';
import jsend from 'jsend';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise, Controllers } from 'swagger-routes-express';
import { apiReference } from '@scalar/express-api-reference';
import { APISpec } from '@repo/openapi-spec';

export async function createServer(
  controllers: Controllers,
  openAPISpec: APISpec
): Promise<Express> {
  console.log(summarise(openAPISpec));

  const server = express();

  // Add jsend response formatting
  server.use(jsend.middleware);

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

  return server;
}
